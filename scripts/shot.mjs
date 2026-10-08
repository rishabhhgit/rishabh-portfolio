// Zero-dependency full-page screenshots via Chrome DevTools Protocol.
//
// Captures a sweep of viewport tiles and writes them, plus a manifest, so a
// companion script can stitch. `Page.captureBeyondViewport` is unreliable on
// this page: it silently drops paint below ~8000px once the document has many
// composited layers.
//
// Usage: node scripts/shot.mjs <url> <outPrefix> <widths>
import { spawn } from "node:child_process";
import {
  mkdtempSync,
  readFileSync,
  writeFileSync,
  rmSync,
  existsSync,
  mkdirSync,
} from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";

const CHROME =
  process.env.CHROME_PATH ??
  "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";

const url = process.argv[2];
const outPrefix = process.argv[3] ?? "/tmp/shot";
const widths = (process.argv[4] ?? "1440").split(",").map((w) => parseInt(w, 10));
const VIEWPORT_H = 900;

if (!url) {
  console.error("usage: node scripts/shot.mjs <url> <outPrefix> <widths>");
  process.exit(1);
}

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

const profile = mkdtempSync(join(tmpdir(), "chrome-cdp-"));
const chrome = spawn(
  CHROME,
  [
    "--headless=new",
    "--remote-debugging-port=0",
    `--user-data-dir=${profile}`,
    "--no-first-run",
    "--no-default-browser-check",
    "--disable-gpu",
    "--hide-scrollbars",
    "--force-device-scale-factor=1",
    "--font-render-hinting=none",
    "about:blank",
  ],
  { stdio: ["ignore", "ignore", "pipe"] },
);

let chromeStderr = "";
chrome.stderr.on("data", (d) => (chromeStderr += d.toString()));

const cleanup = () => {
  try {
    chrome.kill("SIGKILL");
  } catch {}
  try {
    rmSync(profile, { recursive: true, force: true });
  } catch {}
};

async function waitForPort() {
  const portFile = join(profile, "DevToolsActivePort");
  for (let i = 0; i < 100; i++) {
    if (existsSync(portFile)) {
      const [port] = readFileSync(portFile, "utf8").split("\n");
      if (port) return parseInt(port, 10);
    }
    await sleep(100);
  }
  throw new Error("chrome did not expose DevToolsActivePort\n" + chromeStderr);
}

const port = await waitForPort();
const list = await fetch(`http://127.0.0.1:${port}/json/list`).then((r) => r.json());
const page = list.find((t) => t.type === "page");
if (!page) throw new Error("no page target");

const ws = new WebSocket(page.webSocketDebuggerUrl);
await new Promise((res, rej) => {
  ws.onopen = res;
  ws.onerror = rej;
});

let id = 0;
const pending = new Map();
ws.onmessage = (ev) => {
  const msg = JSON.parse(ev.data);
  if (msg.id && pending.has(msg.id)) {
    const { resolve, reject } = pending.get(msg.id);
    pending.delete(msg.id);
    if (msg.error) reject(new Error(JSON.stringify(msg.error)));
    else resolve(msg.result);
  }
};

const send = (method, params = {}) =>
  new Promise((resolve, reject) => {
    const mid = ++id;
    pending.set(mid, { resolve, reject });
    ws.send(JSON.stringify({ id: mid, method, params }));
  });

const evaluate = async (expression) => {
  const { result, exceptionDetails } = await send("Runtime.evaluate", {
    expression,
    returnByValue: true,
    awaitPromise: true,
  });
  if (exceptionDetails) throw new Error(JSON.stringify(exceptionDetails));
  return result.value;
};

async function shoot(width) {
  const tileDir = `${outPrefix}-${width}-tiles`;
  mkdirSync(tileDir, { recursive: true });

  await send("Emulation.setDeviceMetricsOverride", {
    width,
    height: VIEWPORT_H,
    deviceScaleFactor: 2,
    mobile: width < 700,
  });
  await send("Page.enable");
  await send("Page.navigate", { url });
  await sleep(2500);
  await evaluate("document.fonts ? document.fonts.ready.then(() => 1) : 1");

  const docHeight = Math.ceil(await evaluate("document.documentElement.scrollHeight"));

  // Walk the page so every `whileInView` reveal has fired, then settle.
  for (let y = 0; y < docHeight; y += Math.floor(VIEWPORT_H * 0.75)) {
    await send("Runtime.evaluate", { expression: `window.scrollTo({ top: ${y}, behavior: "instant" })` });
    await sleep(240);
  }
  await send("Runtime.evaluate", { expression: 'window.scrollTo({ top: 0, behavior: "instant" })' });
  await sleep(700);

  // Framer-motion only ever *reduces* inline opacity; Tailwind hover
  // overlays are class-based, so they are left alone.
  await evaluate(`(() => {
    let n = 0;
    document.querySelectorAll('*').forEach((el) => {
      const op = el.style.opacity;
      if (op !== '' && parseFloat(op) < 0.99) {
        el.style.setProperty('opacity', '1', 'important');
        el.style.setProperty('transform', 'none', 'important');
        el.style.setProperty('filter', 'none', 'important');
        n++;
      }
    });
    return n;
  })()`);
  await sleep(700);

  const realHeight = Math.ceil(await evaluate("document.documentElement.scrollHeight"));

  const tiles = [];
  let y = 0;
  while (y < realHeight) {
    await send("Runtime.evaluate", { expression: `window.scrollTo({ top: ${y}, behavior: "instant" })` });
    await sleep(340);
    const actualY = await evaluate(
      "Math.round(window.scrollY || document.documentElement.scrollTop || 0)"
    );

    // The nav is fixed, so it would stamp into every tile — drop it from
    // every tile except the first.
    if (actualY > 0) {
      // Drop every fixed/absolute-positioned overlay (nav, dev-tools badges)
      // so they only appear on the first tile. The grain layer is left alone:
      // it is full-bleed and uniform, so it tiles cleanly.
      const hiddenFixed = await evaluate(
        `(() => {
          let n = 0;
          const walk = (root) => {
            root.querySelectorAll('*').forEach((el) => {
              if (el.classList.contains('grain-overlay')) return;
              const cs = getComputedStyle(el);
              if (cs.position === 'fixed') {
                const r = el.getBoundingClientRect();
                if (r.width > 0 && r.height > 0) {
                  el.setAttribute('data-qa-hidden', '');
                  el.style.setProperty('display', 'none', 'important');
                  n++;
                }
              }
              if (el.shadowRoot) walk(el.shadowRoot);
            });
          };
          walk(document);
          return n;
        })()`
      );
      const stillFixed = await evaluate(
        `(() => {
          let n = 0;
          const walk = (root) => {
            root.querySelectorAll('*').forEach((el) => {
              const cs = getComputedStyle(el);
              if (cs.position === 'fixed') {
                const r = el.getBoundingClientRect();
                if (r.width > 0 && r.height > 0 && !el.classList.contains('grain-overlay')) n++;
              }
              if (el.shadowRoot) walk(el.shadowRoot);
            });
          };
          walk(document);
          return n;
        })()`
      );
      if (stillFixed > 0) console.log(`  warn: ${stillFixed} fixed elements still painted (hidden ${hiddenFixed})`);
      await sleep(150);
    }

    const shot = await send("Page.captureScreenshot", { format: "png" });
    const file = join(tileDir, `${String(tiles.length).padStart(3, "0")}.png`);
    writeFileSync(file, Buffer.from(shot.data, "base64"));
    tiles.push({ file, y: actualY });

    if (actualY > 0) {
      await evaluate(
        "(() => { document.querySelectorAll('[data-qa-hidden]').forEach(n => { n.removeAttribute('data-qa-hidden'); n.style.removeProperty('display'); }); return 1; })()"
      );
    }

    if (actualY + VIEWPORT_H >= realHeight) break;
    y = actualY + VIEWPORT_H;
  }

  writeFileSync(
    join(tileDir, "manifest.json"),
    JSON.stringify({ width, height: realHeight, viewport: VIEWPORT_H, tiles }, null, 2)
  );
  console.log(`${tileDir}  ${width}x${realHeight}  ${tiles.length} tiles`);
}

try {
  await send("Page.enable");
  for (const w of widths) await shoot(w);
} catch (err) {
  console.error(err);
  process.exitCode = 1;
} finally {
  ws.close();
  cleanup();
}
