// Zero-dependency element screenshots via Chrome DevTools Protocol.
//
// Complements `shot.mjs`: rather than sweeping the whole page, this scrolls a
// single selector into view and captures its bounding box, which is much
// faster when verifying one section.
//
// Usage: node scripts/elsnap.mjs <url> <cssSelector> <outPng> [width]
import { spawn } from "node:child_process";
import {
  mkdtempSync,
  readFileSync,
  writeFileSync,
  rmSync,
  existsSync,
} from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";

const CHROME =
  process.env.CHROME_PATH ??
  "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";

const url = process.argv[2];
const selector = process.argv[3];
const out = process.argv[4] ?? "/tmp/elsnap.png";
const width = parseInt(process.argv[5] ?? "1440", 10);

if (!url || !selector) {
  console.error("usage: node scripts/elsnap.mjs <url> <selector> <outPng> [width]");
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
const target = list.find((t) => t.type === "page");
if (!target) throw new Error("no page target");

const ws = new WebSocket(target.webSocketDebuggerUrl);
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

try {
  await send("Page.enable");
  await send("Emulation.setDeviceMetricsOverride", {
    width,
    height: 900,
    deviceScaleFactor: 2,
    mobile: width < 700,
  });
  await send("Page.navigate", { url });
  await sleep(2500);
  await evaluate("document.fonts ? document.fonts.ready.then(() => 1) : 1");

  const found = await evaluate(
    `(() => { const el = document.querySelector(${JSON.stringify(selector)}); if (!el) return null; const r = el.getBoundingClientRect(); return { x: r.x, y: r.y, w: r.width, h: r.height }; })()`
  );
  if (!found) throw new Error(`selector not found: ${selector}`);

  await evaluate(
    `document.querySelector(${JSON.stringify(selector)}).scrollIntoView({ block: "start", behavior: "instant" })`
  );
  await sleep(1600);

  // Force every framer-motion reveal to its resting state.
  await evaluate(`(() => {
    document.querySelectorAll('*').forEach((el) => {
      const op = el.style.opacity;
      if (op !== '' && parseFloat(op) < 0.99) {
        el.style.setProperty('opacity', '1', 'important');
        el.style.setProperty('transform', 'none', 'important');
      }
    });
    return 1;
  })()`);
  await sleep(600);

  // Dev-tools overlays live in shadow roots, so the walk has to pierce them.
  await evaluate(`(() => {
    const css = document.createElement('style');
    css.textContent = 'nextjs-portal,#devtools-indicator,.nextjs-toast,nav{display:none!important}';
    document.head.appendChild(css);
    const walk = (root) => {
      root.querySelectorAll('*').forEach((el) => {
        if (el.classList.contains('grain-overlay')) return;
        if (getComputedStyle(el).position !== 'fixed') return;
        const r = el.getBoundingClientRect();
        if (r.width > 0 && r.height > 0) el.style.setProperty('display', 'none', 'important');
        if (el.shadowRoot) walk(el.shadowRoot);
      });
    };
    walk(document);
    return 1;
  })()`);
  await sleep(250);

  const box = await evaluate(
    `(() => { const el = document.querySelector(${JSON.stringify(selector)}); const r = el.getBoundingClientRect(); return { x: r.x + window.scrollX, y: r.y + window.scrollY, width: r.width, height: r.height }; })()`
  );

  const shot = await send("Page.captureScreenshot", {
    format: "png",
    clip: { ...box, scale: 2 },
    captureBeyondViewport: true,
  });
  writeFileSync(out, Buffer.from(shot.data, "base64"));
  console.log(`${out}  ${Math.round(box.width)}x${Math.round(box.height)} (css px)`);
} catch (err) {
  console.error(err);
  process.exitCode = 1;
} finally {
  ws.close();
  cleanup();
}
