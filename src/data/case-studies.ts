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

export interface CaseStudy {
  slug: string;
  context: string;
  role: string;
  userFlow: string[];
  system: CaseStudySystemGroup[];
  visualDesign: string[];
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
  },
};

export function getCaseStudy(slug: string): CaseStudy | undefined {
  return caseStudies[slug];
}
