/**
 * Case-study-only content, keyed by project id.
 *
 * Everything here is design rationale — how and why the interfaces were
 * shaped. No invented metrics, employers, or outcomes.
 */

export interface CaseStudySystemGroup {
  label: string;
  items: string[];
}

/** A numbered hotspot placed over the project image (percentages). */
export interface CaseStudyCallout {
  n: number;
  x: number;
  y: number;
  label: string;
}

/** A named interface state, shown as a designed chip in the case study. */
export interface CaseStudyState {
  label: string;
  note: string;
  tone: "idle" | "active" | "success" | "error";
}

/** A pre-cropped detail zoom of the project image. */
export interface CaseStudyDetail {
  src: string;
  title: string;
  note: string;
}

export interface CaseStudy {
  slug: string;
  context: string;
  role: string;
  userFlow: string[];
  system: CaseStudySystemGroup[];
  visualDesign: string[];
  callouts: CaseStudyCallout[];
  states: CaseStudyState[];
  details: CaseStudyDetail[];
}

export const caseStudies: Record<string, CaseStudy> = {
  "gamma-code": {
    slug: "gamma-code",
    context:
      "AI coding assistants had matured as standalone panels bolted beside editors. The result was a split-attention problem: code on one side, reasoning on the other, with the developer constantly reconciling the two. Gamma Code treats assistance as a property of the editor rather than an application running next to it.",
    role: "Product design, interaction design, and frontend engineering",
    userFlow: [
      "Open a project — workspace restores with the editor focused",
      "Select code and invoke the command palette",
      "AI panel proposes a diff in place, beside the source",
      "Accept, revise, or dismiss without leaving the file",
      "Terminal confirms execution; session state updates silently",
    ],
    system: [
      {
        label: "Typography",
        items: [
          "Monospace owns code, terminal, and command surfaces",
          "Sans-serif is reserved for chrome and configuration",
          "A single tabular treatment keeps line numbers and diff gutters aligned",
        ],
      },
      {
        label: "Color",
        items: [
          "Syntax palette calibrated for readability over multi-hour sessions rather than contrast peaks",
          "Accent is used only for active state — never as decoration",
          "Session health is carried by a status indicator, not a badge count",
        ],
      },
      {
        label: "Layout",
        items: [
          "Three-zone workspace: rail, editor, assistant — stable across every view",
          "Panels collapse along their own axis so the editor never reflows",
          "Command palette is a single search field over every destination",
        ],
      },
      {
        label: "Motion",
        items: [
          "Panel transitions preserve spatial memory — things move to where you expect",
          "AI generation is an inline indicator, not a blocking overlay",
          "Nothing animates while the cursor is active in the editor",
        ],
      },
    ],
    visualDesign: [
      "The assistant panel is a peer of the editor, not an overlay — both share the same hairline, the same baseline, the same type scale.",
      "Diff gutters align to the line-number column so review reads as a continuation of editing rather than a separate mode.",
      "Status lives in a single quiet rail; the workspace is designed to look the same when everything is fine.",
    ],
    callouts: [
      { n: 1, x: 5.5, y: 13, label: "Activity rail" },
      { n: 2, x: 14.5, y: 30, label: "File explorer" },
      { n: 3, x: 47, y: 55, label: "Monaco editor" },
      { n: 4, x: 87, y: 33, label: "AI assistant" },
      { n: 5, x: 87, y: 78, label: "PTY terminal" },
      { n: 6, x: 93.5, y: 9, label: "Panel layout" },
    ],
    states: [
      {
        label: "Idle",
        note: "Editor focused; the assistant waits for a selection or a prompt.",
        tone: "idle",
      },
      {
        label: "Generating",
        note: "An inline indicator runs beside the request — the editor stays usable.",
        tone: "active",
      },
      {
        label: "Diff ready",
        note: "The proposal renders in the gutter beside the source for review.",
        tone: "active",
      },
      {
        label: "Accepted",
        note: "Applying clears the proposal; the terminal confirms execution.",
        tone: "success",
      },
      {
        label: "Permission",
        note: "Commands with side effects pause for an explicit confirmation.",
        tone: "error",
      },
    ],
    details: [
      {
        src: "/projects/gamma-code-detail-1.jpg",
        title: "The assistant",
        note: "Reasoning and the proposed change sit beside the code, never over it.",
      },
      {
        src: "/projects/gamma-code-detail-2.jpg",
        title: "Execution",
        note: "Terminal, problems, and output live where the work happens.",
      },
      {
        src: "/projects/gamma-code-detail-3.jpg",
        title: "The editor",
        note: "Dense code stays legible; hierarchy is carried by weight, not color.",
      },
    ],
  },

  aerotrack: {
    slug: "aerotrack",
    context:
      "Live flight data is inherently spatial and inherently dense. One viewport can hold thousands of moving entities, each with altitude, speed, heading, and identity. The design problem was not how to display the data — the map does that — but how to decide what the viewer should be looking at, and when.",
    role: "Product design, geospatial visualization, and frontend engineering",
    userFlow: [
      "Map opens at a continental zoom with traffic aggregated into clusters",
      "Zooming resolves clusters into individual aircraft progressively",
      "Selecting an aircraft anchors a detail card beside its marker",
      "Layer toggles and filters sit at the periphery of the viewport",
      "Filter and camera state persist across pan, zoom, and selection",
    ],
    system: [
      {
        label: "Typography",
        items: [
          "Tabular numerals for every telemetry value so digits do not jitter as they update",
          "Monospace for callsigns, codes, and identifiers",
          "Hierarchy is carried by size and weight before color",
        ],
      },
      {
        label: "Color",
        items: [
          "Every hue encodes information — altitude band, aircraft type, operational status",
          "The map stays desaturated so encoded color remains legible against it",
          "Selection is expressed by contrast, not by a second competing color",
        ],
      },
      {
        label: "Layout",
        items: [
          "The map is the interface; panels are edges, not containers",
          "Controls sit at the periphery to protect the viewport",
          "Secondary panels collapse rather than overlay on small screens",
        ],
      },
      {
        label: "Motion",
        items: [
          "Positions interpolate between polls rather than snapping",
          "Detail cards translate from the marker so spatial context is never broken",
          "Cluster expansion is zoom-driven, never an animated delay",
        ],
      },
    ],
    visualDesign: [
      "Zoom level is the primary instrument — it decides whether the picture is a distribution or a set of individuals.",
      "Aircraft markers are drawn with a consistent silhouette family so type differences read as category, not as noise.",
      "The detail card is anchored to geography rather than docked, because the answer to 'where' is part of the answer to 'what'.",
    ],
    callouts: [
      { n: 1, x: 64, y: 3.5, label: "Search & filters" },
      { n: 2, x: 8.7, y: 33, label: "Aircraft detail" },
      { n: 3, x: 18.6, y: 15, label: "Map controls" },
      { n: 4, x: 52, y: 42, label: "Live map canvas" },
      { n: 5, x: 33, y: 92, label: "Tracked flights" },
      { n: 6, x: 97, y: 11, label: "Layer settings" },
    ],
    states: [
      {
        label: "Loading",
        note: "The map renders first; telemetry fills in as tiles resolve.",
        tone: "idle",
      },
      {
        label: "Live",
        note: "Positions interpolate between polls so markers glide instead of jump.",
        tone: "active",
      },
      {
        label: "Selected",
        note: "The detail card anchors to the marker and keeps the geography visible.",
        tone: "active",
      },
      {
        label: "Filtered",
        note: "Filter state is persistent and always visible in the command bar.",
        tone: "success",
      },
      {
        label: "No match",
        note: "An empty result states which filter is responsible and offers a reset.",
        tone: "error",
      },
    ],
    details: [
      {
        src: "/projects/aerotrack-detail-1.jpg",
        title: "Flight detail",
        note: "Telemetry is tabular and anchored to the aircraft, not docked away.",
      },
      {
        src: "/projects/aerotrack-detail-2.jpg",
        title: "Discovery",
        note: "Search and filters sit in one bar so the viewport stays protected.",
      },
      {
        src: "/projects/aerotrack-detail-3.jpg",
        title: "The table",
        note: "A scannable ledger for when the question is precise, not spatial.",
      },
    ],
  },

  "virtual-workflow-builder": {
    slug: "virtual-workflow-builder",
    context:
      "Node-based editors inherit a promise: if the shape of the system is visible, its behaviour becomes predictable. That promise breaks when execution state lives somewhere other than the node. The builder was designed so that every question about a pipeline — what runs, what finished, what failed — is answerable by looking at the canvas.",
    role: "Product design, interaction design, and frontend engineering",
    userFlow: [
      "Open a pipeline — the canvas restores at the last known viewport",
      "Browse the categorized library and drag a node into place",
      "Connect nodes; validation reports immediately on the edge",
      "Configure parameters in the inspector without leaving the canvas",
      "Execute and watch state resolve node by node",
    ],
    system: [
      {
        label: "Typography",
        items: [
          "Node titles are the only display type on the canvas",
          "Monospace carries parameters, identifiers, and runtime output",
          "Inspector type is set one step below the canvas to keep the graph primary",
        ],
      },
      {
        label: "Color",
        items: [
          "Shape encodes function; color encodes state — the two never trade places",
          "State colors are reserved: idle, processing, success, error",
          "Connectors inherit neutral gray so node state stays dominant",
        ],
      },
      {
        label: "Layout",
        items: [
          "Canvas is edge-to-edge; every panel is dismissible",
          "Node library and inspector are symmetric — creation and configuration balance",
          "Minimap is fixed to the corner and never moves with selection",
        ],
      },
      {
        label: "Motion",
        items: [
          "Magnetic snapping confirms placement before release",
          "Edge routing recalculates with a short settle rather than a hard jump",
          "Execution progress advances along the edge direction",
        ],
      },
    ],
    visualDesign: [
      "Connections are drawn beneath nodes so crossings read as routing rather than collision.",
      "Each node carries its own status on its border, which removes the need for a separate monitoring surface.",
      "The inspector slides rather than replaces, because losing sight of the graph while editing it defeats the model.",
    ],
    callouts: [
      { n: 1, x: 43, y: 3, label: "Execution toolbar" },
      { n: 2, x: 9, y: 45, label: "Node library" },
      { n: 3, x: 52, y: 47, label: "Pipeline canvas" },
      { n: 4, x: 91, y: 30, label: "Properties inspector" },
      { n: 5, x: 76, y: 87, label: "Minimap" },
      { n: 6, x: 24, y: 92, label: "Canvas controls" },
    ],
    states: [
      {
        label: "Idle",
        note: "Nodes rest on the grid; nothing signals until something changes.",
        tone: "idle",
      },
      {
        label: "Validating",
        note: "Connections are checked as they are drawn, before anything runs.",
        tone: "active",
      },
      {
        label: "Running",
        note: "State advances along the edge direction, node by node.",
        tone: "active",
      },
      {
        label: "Complete",
        note: "Resolved nodes hold a quiet success mark on their border.",
        tone: "success",
      },
      {
        label: "Failed",
        note: "The failing node carries the error; upstream work stays readable.",
        tone: "error",
      },
    ],
    details: [
      {
        src: "/projects/workflow-builder-detail-1.jpg",
        title: "The library",
        note: "Nodes are grouped by intent so creation is a lookup, not a hunt.",
      },
      {
        src: "/projects/workflow-builder-detail-2.jpg",
        title: "The graph",
        note: "State lives on the node border, so the canvas is the monitor.",
      },
      {
        src: "/projects/workflow-builder-detail-3.jpg",
        title: "The inspector",
        note: "Configuration slides in without ever hiding the pipeline.",
      },
    ],
  },

  eazeworkflow: {
    slug: "eazeworkflow",
    context:
      "Six modules, one dashboard. The risk with multi-module products is not feature coverage — it is the seams. Each module can be individually excellent and collectively illegible. Most of the design work here was deciding what to make identical.",
    role: "Product design, design system, and frontend engineering",
    userFlow: [
      "Land on the overview — the signal from each module is already surfaced",
      "Move between modules from a persistent minimal sidebar",
      "Drill into a module without losing dashboard context",
      "Return to the overview with filters and range intact",
      "Run an AI action in place, from wherever it is relevant",
    ],
    system: [
      {
        label: "Typography",
        items: [
          "One scale serves every module so numbers compare across surfaces",
          "Metric values are set large and tabular; labels stay small and quiet",
          "Module identity comes from content, not from a different typeface",
        ],
      },
      {
        label: "Color",
        items: [
          "Semantic color is shared across analytics, finance, and status",
          "Charts draw from a fixed series palette, reused everywhere",
          "Accent marks the current selection, not the brand",
        ],
      },
      {
        label: "Layout",
        items: [
          "A single card rhythm — same radius, same padding, same header treatment",
          "Navigation never nests deeper than two levels",
          "Overview cards are a command center, not a grid of shortcuts",
        ],
      },
      {
        label: "Motion",
        items: [
          "Module switching is client-side and instant",
          "Charts animate their first draw, then hold still",
          "Hover states reveal detail without shifting layout",
        ],
      },
    ],
    visualDesign: [
      "The sidebar is deliberately thin — it orients without competing with the data.",
      "Card headers follow one template across all six modules, which is what makes them read as one product.",
      "Charts are drawn in the same stroke weight and label style regardless of the domain they describe.",
    ],
    callouts: [
      { n: 1, x: 17, y: 40, label: "Module navigation" },
      { n: 2, x: 45, y: 13.5, label: "Global search" },
      { n: 3, x: 41, y: 40, label: "Task board" },
      { n: 4, x: 76, y: 40, label: "Analytics" },
      { n: 5, x: 55, y: 78, label: "Progress & actions" },
      { n: 6, x: 87, y: 13.5, label: "Identity & alerts" },
    ],
    states: [
      {
        label: "Overview",
        note: "Every module surfaces its one important signal before interaction.",
        tone: "idle",
      },
      {
        label: "In progress",
        note: "Work in motion is marked on the card, never in a separate view.",
        tone: "active",
      },
      {
        label: "Complete",
        note: "Done reads as resolved, not as a brighter version of pending.",
        tone: "success",
      },
      {
        label: "Needs attention",
        note: "Attention is reserved — if everything is urgent, nothing is.",
        tone: "error",
      },
      {
        label: "Empty",
        note: "An empty module explains what belongs there and offers the first action.",
        tone: "idle",
      },
    ],
    details: [
      {
        src: "/projects/eazeworkflow-detail-1.jpg",
        title: "Navigation",
        note: "One thin rail carries all six modules — never more than two levels.",
      },
      {
        src: "/projects/eazeworkflow-detail-2.jpg",
        title: "The board",
        note: "Card rhythm, radius, and header treatment are identical everywhere.",
      },
      {
        src: "/projects/eazeworkflow-detail-3.jpg",
        title: "The charts",
        note: "Same stroke, same labels — a shared visual language across domains.",
      },
    ],
  },

  "distributed-banking": {
    slug: "distributed-banking",
    context:
      "Financial interfaces are read under anxiety. Users arrive already alert to risk, and every ambiguity — an unclear fee, an unlabelled state, a silent delay — reads as a threat rather than an oversight. The design goal was an interface that is boring in the way that inspires trust: predictable, explicit, and legible under stress.",
    role: "Product design and interaction design",
    userFlow: [
      "Open the dashboard — balance and recent activity are visible without interaction",
      "Start a transfer; the wizard discloses one step at a time",
      "Confirm details on a summary step before anything is committed",
      "Authenticate through a deliberately plain, single-purpose screen",
      "Receive a confirmation that states exactly what happened",
    ],
    system: [
      {
        label: "Typography",
        items: [
          "Amounts are tabular and right-aligned so columns scan vertically",
          "Status words are spelled out — never icon-only",
          "Body copy is set slightly larger than typical product UI",
        ],
      },
      {
        label: "Color",
        items: [
          "Color confirms status; it never carries meaning alone",
          "Destructive and reversible actions are visually distinct",
          "Neutral surfaces dominate so state changes are unmissable",
        ],
      },
      {
        label: "Layout",
        items: [
          "Balance and activity lead every screen — the two things checked most",
          "The transfer wizard is linear with a visible position indicator",
          "Sensitive data is masked by default and revealed on demand",
        ],
      },
      {
        label: "Motion",
        items: [
          "Transitions between steps slide in the direction of progress",
          "Confirmation resolves with a short settle, then holds",
          "Validation appears inline as the field loses focus",
        ],
      },
    ],
    visualDesign: [
      "The confirmation screen restates the amount, the recipient, and the result in plain language — reassurance is content, not animation.",
      "Security controls are present but low-contrast until they are needed, so the product does not feel like a checkpoint.",
      "Error messages name the specific field and the specific fix; generic failure copy is treated as a bug.",
    ],
    callouts: [
      { n: 1, x: 19, y: 8, label: "Account identity" },
      { n: 2, x: 40, y: 27, label: "Balance card" },
      { n: 3, x: 40, y: 43, label: "Primary actions" },
      { n: 4, x: 40, y: 73, label: "Transaction history" },
      { n: 5, x: 79, y: 37, label: "Quick transfer" },
      { n: 6, x: 79, y: 76, label: "Scheduled payments" },
    ],
    states: [
      {
        label: "Draft",
        note: "A transfer in progress shows exactly what will happen, before it does.",
        tone: "idle",
      },
      {
        label: "Confirming",
        note: "A summary step restates amount and recipient before commitment.",
        tone: "active",
      },
      {
        label: "Authenticating",
        note: "A plain, single-purpose screen — one decision, no competition.",
        tone: "active",
      },
      {
        label: "Completed",
        note: "Confirmation states what happened in plain language, then settles.",
        tone: "success",
      },
      {
        label: "Declined",
        note: "Failure names the cause and the next step; no generic dead ends.",
        tone: "error",
      },
    ],
    details: [
      {
        src: "/projects/distributed-banking-detail-1.jpg",
        title: "Balance first",
        note: "The two things people check lead the screen — no interaction needed.",
      },
      {
        src: "/projects/distributed-banking-detail-2.jpg",
        title: "History",
        note: "Tabular amounts and spelled-out statuses scan vertically, fast.",
      },
      {
        src: "/projects/distributed-banking-detail-3.jpg",
        title: "Recipients",
        note: "Frequent destinations are one tap; nothing is hidden behind a menu.",
      },
    ],
  },

  "scalable-ecommerce": {
    slug: "scalable-ecommerce",
    context:
      "Most abandonment in commerce happens between intent and completion. The shopper has already decided; the interface's job is to not get in the way. This project treats the path from discovery to confirmation as a single continuous surface rather than a series of pages.",
    role: "Product design and interaction design",
    userFlow: [
      "Arrive through search or category — results are already filtered",
      "Refine with the sidebar; results update without an apply step",
      "Open a product — imagery and the primary action lead",
      "Add to cart from a slide-out that preserves browsing context",
      "Check out in ordered sections with inline validation",
    ],
    system: [
      {
        label: "Typography",
        items: [
          "Price is the second-largest element on any card, after the image",
          "Product titles clamp consistently so grids stay aligned",
          "Checkout copy is set for scanning, not for reading",
        ],
      },
      {
        label: "Color",
        items: [
          "Product imagery supplies the color; the chrome stays neutral",
          "Accent is reserved for the primary action on each screen",
          "Availability and discount states use a fixed semantic pair",
        ],
      },
      {
        label: "Layout",
        items: [
          "Filters are a persistent column on desktop, a sheet on mobile",
          "The cart is an overlay, never a navigation target",
          "Checkout sections are sequential with a persistent summary",
        ],
      },
      {
        label: "Motion",
        items: [
          "Adding to cart confirms in place rather than redirecting",
          "Gallery transitions are swipe-first on touch",
          "Filter changes crossfade results instead of collapsing the grid",
        ],
      },
    ],
    visualDesign: [
      "Product cards give most of their area to the image — the photograph is the decision surface.",
      "The sticky action bar keeps 'Add to cart' reachable regardless of scroll position on the detail page.",
      "Form errors appear where the correction has to happen, so the eye never travels back up the page.",
    ],
    callouts: [
      { n: 1, x: 9.5, y: 45, label: "Filter column" },
      { n: 2, x: 48, y: 7, label: "Search & chips" },
      { n: 3, x: 38, y: 50, label: "Product grid" },
      { n: 4, x: 84, y: 40, label: "Product detail" },
      { n: 5, x: 76, y: 66, label: "Tabs & specs" },
      { n: 6, x: 88, y: 7, label: "Cart & wishlist" },
    ],
    states: [
      {
        label: "Browsing",
        note: "Filters apply immediately — there is no Apply button to forget.",
        tone: "idle",
      },
      {
        label: "In cart",
        note: "Adding confirms in place; the slide-out preserves browsing context.",
        tone: "active",
      },
      {
        label: "Validating",
        note: "Checkout fields validate inline, as they lose focus.",
        tone: "active",
      },
      {
        label: "Order placed",
        note: "Confirmation restates items, address, and total without ambiguity.",
        tone: "success",
      },
      {
        label: "Payment failed",
        note: "The message names the field and the fix — never a generic error.",
        tone: "error",
      },
    ],
    details: [
      {
        src: "/projects/scalable-ecommerce-detail-1.jpg",
        title: "Refinement",
        note: "A persistent column of filters with instant, predictable results.",
      },
      {
        src: "/projects/scalable-ecommerce-detail-2.jpg",
        title: "Discovery",
        note: "Cards give their area to the photograph — the real decision surface.",
      },
      {
        src: "/projects/scalable-ecommerce-detail-3.jpg",
        title: "The decision",
        note: "Imagery, price, and the primary action lead; everything else waits.",
      },
    ],
  },
};

export function getCaseStudy(slug: string): CaseStudy | undefined {
  return caseStudies[slug];
}
