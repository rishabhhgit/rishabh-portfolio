export interface Project {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  category: string;
  image: string;
  githubUrl: string;
  technology: string[];
  aiTools?: string[];
  designChallenge: string;
  designApproach: string;
  interfaceDecisions: string[];
  interactionDetails: string[];
  informationArchitecture?: string[];
  designRationale?: string[];
  featured: boolean;
  accent?: string;
  layoutVariant?: 'full' | 'split' | 'asymmetric';
}

export const projects: Project[] = [
  {
    id: "gamma-code",
    title: "Gamma Code",
    subtitle: "AI-Powered Development Environment",
    description:
      "A desktop IDE that weaves AI assistance into the editor, terminal, and file system — so developers can navigate complex codebases without losing context. Built with Electron and Monaco, integrating multiple LLM providers for intelligent code generation, refactoring, and execution.",
    category: "AI · Developer Tools · Desktop",
    image: "/projects/gamma-code.jpg",
    githubUrl: "https://github.com/rishabhhgit/GammaCode",
    technology: [
      "React",
      "TypeScript",
      "Electron",
      "Node.js",
      "WebSockets",
      "Monaco Editor",
      "Zod",
      "Turborepo",
    ],
    aiTools: ["Claude", "Cline", "Kilo Code", "GitHub Copilot"],
    designChallenge:
      "Modern AI coding tools combine several complex systems — code editing, AI interaction, terminal execution, file management, Git workflows, context management, permissions, and session recovery. The design challenge is making all of these feel like one coherent, keyboard-first product without overwhelming information density.",
    designApproach:
      "Created a modular, multi-panel workspace architecture emphasizing spatial hierarchy, progressive disclosure, and fluid interaction patterns. The AI copilot panel sits inline rather than covering the code, maintaining context continuity. Session state is visualized through subtle status indicators rather than intrusive notifications.",
    interfaceDecisions: [
      "Side-by-side editor and AI panel layout preserves code context during AI interactions.",
      "Command palette consolidates complex UI actions into a searchable, keyboard-first interface.",
      "Unobtrusive session recovery mechanism surfaces through a minimal status bar indicator.",
      "Syntax highlighting palette is calibrated for readability across long coding sessions.",
    ],
    interactionDetails: [
      "Keyboard-first navigation with discoverable shortcuts via the command palette.",
      "Smooth panel collapse/expand transitions that preserve spatial memory.",
      "Context-aware hover states that reveal architectural details without obstructing workflow.",
      "AI generation state is shown with a subtle inline indicator, never blocking the editor.",
    ],
    informationArchitecture: [
      "Workspace → Project → Files → Editor → AI Context",
      "Command Palette → Quick Actions → Settings → Extensions",
      "Terminal → Session → Execution → Output → History",
      "Git → Branch → Stage → Commit → Push",
    ],
    designRationale: [
      "Progressive disclosure prevents the multi-panel workspace from becoming visually overwhelming.",
      "The AI panel is positioned to the side — not overlaid — so code is never hidden during generation.",
      "Session recovery is designed as a background safety net rather than a disruptive modal flow.",
      "PTY terminal integration uses native system fonts to maintain visual consistency with the user's environment.",
    ],
    featured: true,
    accent: "#8a6410",
    layoutVariant: "full",
  },
  {
    id: "aerotrack",
    title: "AeroTrack",
    subtitle: "Real-Time Flight Intelligence Interface",
    description:
      "A geospatial intelligence platform visualizing 6,500+ aircraft across 30+ countries in real time. Built on MapLibre GL with multi-layer caching and asynchronous data ingestion spanning 900+ global map tiles.",
    category: "Geospatial · Real-Time Data · Visualization",
    image: "/projects/aerotrack.jpg",
    githubUrl: "https://github.com/rishabhhgit/AeroTrack",
    technology: [
      "React",
      "TypeScript",
      "Node.js",
      "Express",
      "MapLibre GL",
      "OpenSky API",
      "GeoJSON",
    ],
    aiTools: ["Claude", "GitHub Copilot"],
    designChallenge:
      "Visualizing thousands of concurrently moving entities while maintaining UI responsiveness and cognitive clarity. The interface must handle extreme information density — aircraft positions, altitudes, speeds, routes, and states — without becoming an unintelligible scatter of data points.",
    designApproach:
      "Leveraged hardware-accelerated vector tile rendering and zoom-aware clustering to provide a scalable, interactive map experience. Data layers are revealed progressively based on zoom level, and aircraft selection triggers a contextual detail panel that doesn't obscure the surrounding geography.",
    interfaceDecisions: [
      "Dynamic clustering adapts to zoom level, reducing visual noise at continental views while revealing individual aircraft at regional zoom.",
      "Floating control panel for layer toggling and filtering sits at the map periphery to maximize viewport.",
      "Distinct color coding and custom iconography differentiate aircraft by type, altitude band, and operational status.",
      "Responsive layout maximizes the map viewport on all devices, collapsing secondary panels on mobile.",
    ],
    interactionDetails: [
      "Sub-frame pan and zoom interactions through hardware-accelerated WebGL rendering.",
      "Aircraft selection triggers an animated metadata card with flight details, route, and telemetry.",
      "Filter state persists across map interactions, never resetting unexpectedly.",
      "Real-time data updates flow in without visual jank — positions interpolate smoothly between API polls.",
    ],
    informationArchitecture: [
      "Map Canvas → Zoom Levels → Clusters → Individual Aircraft",
      "Search → Airline → Flight Number → Route → Aircraft",
      "Filters → Altitude → Country → Aircraft Type → Status",
      "Aircraft Selection → Detail Panel → Telemetry → Route Map",
    ],
    designRationale: [
      "Zoom-aware clustering is essential for geospatial UX — showing 6,500 markers at once would destroy legibility.",
      "The detail card appears beside the aircraft, not in a sidebar, to maintain spatial context on the map.",
      "Color encodes meaning (altitude bands, status) rather than decoration — every hue carries information.",
      "Multi-layer caching ensures the interface remains responsive even on slower connections.",
    ],
    featured: true,
    accent: "#0e7490",
    layoutVariant: "split",
  },
  {
    id: "virtual-workflow-builder",
    title: "Workflow Builder",
    subtitle: "Visual AI Pipeline Orchestration",
    description:
      "A node-based visual editor for constructing, validating, and executing complex AI and media processing workflows. Uses a DAG architecture with drag-and-drop composition, real-time validation, and background execution via Trigger.dev.",
    category: "Product Design · Workflow · Interaction",
    image: "/projects/workflow-builder.jpg",
    githubUrl: "https://github.com/rishabhhgit/Virtual-Workflow-Builder",
    technology: [
      "Next.js",
      "TypeScript",
      "PostgreSQL",
      "Clerk",
      "Trigger.dev",
      "Gemini API",
    ],
    aiTools: ["Claude", "Kilo Code"],
    designChallenge:
      "Translating complex backend execution logic — DAG validation, parallel processing, error propagation, and state management — into an approachable visual canvas that non-technical creators can compose workflows on without understanding the underlying orchestration.",
    designApproach:
      "Focused on an interactive node-editor paradigm with clear visual semantics: node shape encodes function, color encodes state, and connection lines show data flow direction. Execution state lives directly on each node, providing immediate visual feedback without requiring a separate monitoring view.",
    interfaceDecisions: [
      "Distinct node states (idle, processing, success, error) are communicated through border color and subtle iconography.",
      "Categorized sidebar library organizes node types for rapid discovery and configuration.",
      "Typographic hierarchy within node property panels reduces cognitive load during configuration.",
      "Canvas minimap provides rapid orientation across large, multi-branch pipelines.",
    ],
    interactionDetails: [
      "Drag-and-drop node placement with magnetic snapping to the implicit grid.",
      "Smart edge routing with bezier curves that avoid overlapping nodes.",
      "Contextual right-click menus for quick node operations — duplicate, delete, disconnect.",
      "Validation feedback appears inline as connections are made, preventing invalid DAGs before execution.",
    ],
    informationArchitecture: [
      "Canvas → Node Library → Drag to Place → Configure → Connect",
      "Node → Properties Panel → Parameters → Validation → Status",
      "Pipeline → Validate DAG → Execute → Monitor → Results",
      "History → Versions → Rollback → Compare",
    ],
    designRationale: [
      "Execution state on the node itself removes the need for a separate monitoring dashboard.",
      "Smart edge routing keeps large canvases readable — crossed lines destroy comprehension in DAG editors.",
      "The minimap is essential at scale — users need spatial orientation when workflows grow beyond the viewport.",
      "Inline validation prevents frustrating runtime errors by catching invalid connections at design time.",
    ],
    featured: true,
    accent: "#b45309",
    layoutVariant: "asymmetric",
  },
  {
    id: "eazeworkflow",
    title: "Eazeworkflow",
    subtitle: "Multi-Module Productivity Platform",
    description:
      "An integrated productivity suite unifying task management, coding analytics with LeetCode tracking, AI-assisted content generation, job application tracking, and financial management into a single coherent dashboard experience.",
    category: "Productivity · Dashboard · SaaS",
    image: "/projects/eazeworkflow.jpg",
    githubUrl: "https://github.com/rishabhhgit/dev-EazeWorkflow",
    technology: [
      "React",
      "TypeScript",
      "Node.js",
      "Express",
      "PostgreSQL",
      "Redis",
      "JWT",
      "Gemini API",
    ],
    aiTools: ["Claude", "GitHub Copilot"],
    designChallenge:
      "Harmonizing six distinct product modules — tasks, code analytics, AI features, job tracking, finance, and LeetCode tracking — into a cohesive dashboard that doesn't feel like six different apps bolted together. The core question: how do you make unrelated productivity functions feel like one coherent product?",
    designApproach:
      "Applied strict design-system thinking to enforce visual consistency across modules. A unified navigation pattern, shared component library, and consistent data-visualization language create coherence. Each module respects the same spacing, typography, and interaction patterns while maintaining distinct functional identity.",
    interfaceDecisions: [
      "Persistent minimal sidebar enables effortless cross-module navigation without disorientation.",
      "Standardized data visualization components work identically across coding analytics and financial modules.",
      "Card-based dashboard layout segments tools while maintaining visual rhythm and alignment.",
      "Essential metrics surface at the top of the hierarchy for immediate visibility on the overview.",
    ],
    interactionDetails: [
      "Client-side routing provides instantaneous module switching without full-page reloads.",
      "Interactive charts with contextual tooltips on hover reveal detailed breakdowns.",
      "Consistent micro-interactions for form elements — inputs, toggles, selections — across all modules.",
      "AI-assisted features use a unified interaction pattern regardless of the module they appear in.",
    ],
    informationArchitecture: [
      "Dashboard Overview → Module Cards → Quick Actions → Drill-Down",
      "Sidebar → Dashboard · Tasks · Analytics · Jobs · Finance",
      "Analytics → Coding Stats · LeetCode Progress · Trends · Insights",
      "AI Features → Content Generation · Task Suggestions · Analytics Insights",
    ],
    designRationale: [
      "Design-system enforcement is critical when multiple functional modules must coexist — visual consistency creates perceived unity.",
      "The overview dashboard acts as a command center, surfacing the most important signals from each module.",
      "Navigation is never nested beyond two levels — preventing users from getting lost in module hierarchies.",
      "AI features are woven into existing modules rather than siloed, making them feel native rather than bolted on.",
    ],
    featured: false,
    accent: "#4d7c0f",
    layoutVariant: "split",
  },
  {
    id: "distributed-banking",
    title: "Secure Banking",
    subtitle: "Peer-to-Peer Financial Platform",
    description:
      "A digital banking application designed around trust — facilitating peer-to-peer transfers, scheduled payments, and transaction history within an interface that communicates security and reliability at every touchpoint.",
    category: "Fintech · Product Design · Security UX",
    image: "/projects/banking.jpg",
    githubUrl: "https://github.com/rishabhhgit/banking-wallet-mvp",
    technology: [
      "React",
      "Node.js",
      "Express",
      "PostgreSQL",
      "Redis",
      "JWT",
    ],
    designChallenge:
      "Designing trust-building interfaces for financial transactions while simplifying complex multi-step security flows. Every interaction involving money must feel safe, reversible, and transparent — visual design choices directly affect user confidence.",
    designApproach:
      "Adopted a pristine, minimal aesthetic focused on legibility and clear typography to convey reliability. Security indicators are persistent but non-intrusive. The transfer wizard uses progressive disclosure to break complex multi-step flows into digestible segments.",
    interfaceDecisions: [
      "Dashboard prominently displays balance and recent activity — the two pieces of information users check most frequently.",
      "Step-by-step transfer wizard reduces cognitive load for peer-to-peer payment flows.",
      "Clear visual status indicators for transaction states — pending, completed, failed — use color and iconography.",
      "Two-factor authentication interface is streamlined to minimize friction while maintaining security standards.",
    ],
    interactionDetails: [
      "Clear, specific error messaging during validation failures — not generic 'something went wrong' states.",
      "Smooth transitions between wizard steps maintain orientation in multi-step flows.",
      "Confirmation animations on successful transactions provide satisfying closure.",
      "Sensitive data (account numbers) is masked by default with reveal-on-demand.",
    ],
    designRationale: [
      "Trust in financial interfaces is built through clarity — ambiguity creates anxiety about money.",
      "The transfer wizard uses progressive disclosure because showing all options at once overwhelms users during sensitive transactions.",
      "2FA is designed as a speed bump, not a wall — just enough friction to confirm intent without driving abandonment.",
      "Transaction history uses consistent formatting so amounts and statuses are scannable at a glance.",
    ],
    featured: false,
    accent: "#8c2f39",
    layoutVariant: "asymmetric",
  },
  {
    id: "scalable-ecommerce",
    title: "E-Commerce Platform",
    subtitle: "Product Discovery & Purchase Experience",
    description:
      "A digital storefront built around the discovery-to-purchase journey — layered filtering, persistent cart, and a checkout flow designed so every step remains legible and every interaction feels responsive.",
    category: "E-Commerce · Product · Conversion",
    image: "/projects/ecommerce.jpg",
    githubUrl: "https://github.com/rishabhhgit/scalable-e-commerce-backend",
    technology: [
      "React",
      "Node.js",
      "Express",
      "PostgreSQL",
      "Redis",
      "Stripe",
    ],
    designChallenge:
      "Creating a frictionless path to purchase by optimizing product discovery, filtering, and multi-step checkout. Every extra click or moment of confusion during checkout represents potential abandoned revenue.",
    designApproach:
      "Emphasized high-quality product imagery, clear information hierarchy, and a persistent cart that allows quick review without losing browsing context. The checkout flow is segmented into logical sections that progress linearly.",
    interfaceDecisions: [
      "Product detail pages lead with imagery and clear calls-to-action — the path to 'Add to Cart' is never ambiguous.",
      "Robust sidebar filtering system supports rapid product discovery with instant result updates.",
      "Slide-out cart allows quick review without navigating away from the current browsing context.",
      "Checkout flow is organized into logical, sequential sections — shipping, payment, confirmation.",
    ],
    interactionDetails: [
      "Instant visual feedback when adding items to cart — a brief animation confirms the action.",
      "Smooth image gallery transitions on product pages — swipe on mobile, click on desktop.",
      "Form validation during checkout is inline and real-time, not deferred to form submission.",
      "Filter selections produce immediate results without requiring a 'Apply' button.",
    ],
    designRationale: [
      "Persistent cart access prevents the jarring context switch of navigating to a separate cart page.",
      "Inline form validation reduces checkout abandonment — users fix errors as they go, not after submission.",
      "Product cards prioritize image and price — the two signals that most influence purchase decisions.",
      "The filter system uses OR logic within categories and AND logic between categories — matching mental models.",
    ],
    featured: false,
    accent: "#6b2d5b",
    layoutVariant: "full",
  },
];
