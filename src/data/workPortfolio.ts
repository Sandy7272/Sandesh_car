/* ────────────────────────────────────────────
   Work Portfolio — structured by category
   ──────────────────────────────────────────── */

export type MediaItem =
  | { kind: "image"; src: string; alt?: string }
  | { kind: "video"; src: string; poster?: string }
  | { kind: "embed"; src: string; title?: string }; // for Sketchfab / YouTube etc.

export interface WorkPiece {
  id: string;
  title: string;
  subtitle?: string;
  description: string;
  thumbnail: string;
  tools: string[];
  gallery: MediaItem[];
  /** Optional external link (Sketchfab, Behance, live site …) */
  externalUrl?: string;
  /** Optional live embed URL (BabylonJS viewer, YouTube, etc.) */
  liveEmbedUrl?: string;
  /** Only for UI/UX — case-study fields */
  caseStudy?: {
    problem: string;
    process: string;
    solution: string;
    results?: string;
    wireframes?: string[];
    finalScreens?: string[];
  };
}

export interface WorkCategory {
  slug: string;
  label: string;
  tagline: string;
  accent: string; // CSS colour token per category
  icon: string; // emoji/icon hint
  featured?: boolean;
  /** Short metric label shown as a stat pill */
  metric?: string;
  pieces: WorkPiece[];
}

/* ── CATEGORIES ─────────────────────────── */

export const workCategories: WorkCategory[] = [
  /* ▸ VIDEO TO 3D (featured) */
  {
    slug: "video-to-3d",
    label: "Video to 3D",
    tagline: "L&T Realty · Kesari Resort · Ultraviolette — live web viewers",
    accent: "#34d399",
    icon: "📹",
    featured: true,
    metric: "Live on web",
    pieces: [
      {
        id: "v2three-01",
        title: "L&T Realty — Evara Heights",
        subtitle: "Gaussian Splat virtual tour",
        description:
          "L&T needed apartment buyers to feel the space before construction finished. We turned phone video footage into a photorealistic walkthrough that now runs in any browser — no app, no download, no compromise.",
        thumbnail: "/images/work-v2three-01.png",
        tools: ["Nerfstudio", "Gaussian Splatting", "BabylonJS"],
        gallery: [
          { kind: "image", src: "/images/work-v2three-01.png", alt: "Evara Heights walkthrough" },
          { kind: "image", src: "/images/work-v2three-02.png", alt: "Detail view" },
        ],
        liveEmbedUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
      },
      {
        id: "v2three-02",
        title: "NeRF Urban Scene Pipeline",
        subtitle: "Research & development",
        description:
          "Built the internal R&D pipeline that takes raw video → trained NeRF → clean mesh export. The system that powers every client delivery at MetaShop AI.",
        thumbnail: "/images/work-v2three-02.png",
        tools: ["Nerfstudio", "Blender", "COLMAP"],
        gallery: [
          { kind: "image", src: "/images/work-v2three-02.png" },
          { kind: "image", src: "/images/work-v2three-03.png" },
        ],
      },
      {
        id: "v2three-03",
        title: "Kesari Resort — La Cabana",
        subtitle: "Hospitality virtual tour",
        description:
          "Guests book resort rooms they've never visited. This Gaussian Splat tour lets them walk every corner of La Cabana from their phone before they arrive.",
        thumbnail: "/images/work-v2three-03.png",
        tools: ["Gaussian Splatting", "BabylonJS", "HTML/CSS"],
        gallery: [
          { kind: "image", src: "/images/work-v2three-03.png" },
          { kind: "image", src: "/images/work-v2three-04.png" },
        ],
        liveEmbedUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
      },
      {
        id: "v2three-04",
        title: "Product Scan — Photogrammetry Pipeline",
        subtitle: "Small-object capture pipeline",
        description:
          "150+ photos → production-ready 3D model in under 4 hours. Built the capture-to-web pipeline so clients can list products with interactive 3D instead of flat images.",
        thumbnail: "/images/work-v2three-04.png",
        tools: ["Meshroom", "Blender", "Three.js"],
        gallery: [{ kind: "image", src: "/images/work-v2three-04.png" }],
      },
      {
        id: "v2three-05",
        title: "Rejuve360 — Real Estate Tour",
        subtitle: "Real estate walkthrough",
        description:
          "Full property walkthrough with dual navigation modes: flythrough for presentation, teleport for self-guided exploration. Delivered as an embeddable web URL.",
        thumbnail: "/images/work-v2three-05.png",
        tools: ["Gaussian Splatting", "BabylonJS", "WebGL"],
        gallery: [
          { kind: "image", src: "/images/work-v2three-05.png" },
          { kind: "image", src: "/images/work-v2three-06.png" },
        ],
      },
      {
        id: "v2three-06",
        title: "AR Product Viewer — WebXR",
        subtitle: "WebXR-powered",
        description:
          "Point your phone at any surface, see the product at real scale with dimension labels overlaid in camera. No app install. Pure web, pure WebXR.",
        thumbnail: "/images/work-v2three-06.png",
        tools: ["model-viewer", "WebXR", "Three.js"],
        gallery: [{ kind: "image", src: "/images/work-v2three-06.png" }],
      },
    ],
  },

  /* ▸ 3D WORK */
  {
    slug: "3d",
    label: "3D Work",
    tagline: "Byju's · MetaShop AI · freelance client work",
    accent: "#5eead4",
    icon: "🧊",
    metric: "4+ years",
    pieces: [
      {
        id: "3d-01",
        title: "MetaShop 3D Viewer",
        subtitle: "Interactive product visualisation",
        description:
          "The viewer that powers MetaShop AI's client demos. Real-time orbit, zoom, material switching — built to handle heavy Gaussian Splat models without dropping frames.",
        thumbnail: "/images/work-3d-01.png",
        tools: ["Three.js", "React", "WebGL", "Blender"],
        gallery: [
          { kind: "image", src: "/images/work-3d-01.png", alt: "Viewer hero" },
          { kind: "image", src: "/images/work-3d-02.png", alt: "Detail" },
        ],
        externalUrl: "https://sketchfab.com",
      },
      {
        id: "3d-02",
        title: "Fantasy Environment",
        subtitle: "Game-ready scene",
        description:
          "Stylised low-poly environment built in Blender with baked lighting and PBR materials. Optimised for real-time rendering.",
        thumbnail: "/images/work-3d-02.png",
        tools: ["Blender", "Substance Painter", "Unity"],
        gallery: [
          { kind: "image", src: "/images/work-3d-02.png" },
          { kind: "image", src: "/images/work-3d-03.png" },
        ],
      },
      {
        id: "3d-03",
        title: "Sci-Fi Character",
        subtitle: "High-poly sculpt & retopo",
        description:
          "Full character pipeline — sculpt in ZBrush, retopology, UV mapping, texturing, and final render.",
        thumbnail: "/images/work-3d-03.png",
        tools: ["ZBrush", "Blender", "Substance Painter", "Marvelous Designer"],
        gallery: [
          { kind: "image", src: "/images/work-3d-03.png" },
          { kind: "image", src: "/images/work-3d-04.png" },
        ],
      },
      {
        id: "3d-04",
        title: "Product Visualization",
        subtitle: "Studio-quality render",
        description:
          "Photorealistic product renders for e-commerce catalogues — lighting, staging and post-production.",
        thumbnail: "/images/work-3d-04.png",
        tools: ["Blender", "Cycles", "Photoshop"],
        gallery: [
          { kind: "image", src: "/images/work-3d-04.png" },
          { kind: "image", src: "/images/work-3d-05.png" },
        ],
      },
      {
        id: "3d-05",
        title: "Architectural Walkthrough",
        subtitle: "Real estate interior",
        description:
          "Interactive architectural walkthrough for a luxury apartment project. Delivered as a web-based experience.",
        thumbnail: "/images/work-3d-05.png",
        tools: ["3ds Max", "V-Ray", "Unreal Engine"],
        gallery: [
          { kind: "image", src: "/images/work-3d-05.png" },
          { kind: "image", src: "/images/work-3d-06.png" },
        ],
      },
      {
        id: "3d-06",
        title: "Vehicle Concept",
        subtitle: "Hard-surface modelling",
        description:
          "Concept vehicle designed from scratch — hard-surface modelling with detailed mechanical parts.",
        thumbnail: "/images/work-3d-06.png",
        tools: ["Blender", "Substance Painter", "KeyShot"],
        gallery: [{ kind: "image", src: "/images/work-3d-06.png" }],
      },
    ],
  },

  /* ▸ MOTION GRAPHICS */
  {
    slug: "motion-graphics",
    label: "Motion Graphics Work",
    tagline: "Byju's · 100+ modules · 40% faster pipeline",
    accent: "#c084fc",
    icon: "🎬",
    metric: "100+ modules",
    pieces: [
      {
        id: "mograph-01",
        title: "Educational STEM Module",
        subtitle: "Byju's — learning content",
        description:
          "Byju's needed STEM content that held a 12-year-old's attention for 8 minutes. Designed a reusable animation template system — 40% faster per module, consistent across a 15-person team.",
        thumbnail: "/images/work-mograph-01.png",
        tools: ["After Effects", "Blender", "Premiere Pro"],
        gallery: [
          { kind: "image", src: "/images/work-mograph-01.png" },
          { kind: "image", src: "/images/work-mograph-02.png" },
        ],
      },
      {
        id: "mograph-02",
        title: "Title Sequence Design",
        subtitle: "Broadcast graphics",
        description:
          "Cinematic title sequence with 3D type, particle systems and seamless transitions.",
        thumbnail: "/images/work-mograph-02.png",
        tools: ["After Effects", "Cinema 4D", "Premiere Pro"],
        gallery: [
          { kind: "image", src: "/images/work-mograph-02.png" },
          { kind: "image", src: "/images/work-mograph-03.png" },
        ],
      },
      {
        id: "mograph-03",
        title: "Logo Reveal Animation",
        subtitle: "Brand identity motion",
        description:
          "Dynamic logo animation with liquid morph effects. Delivered in multiple formats for social, web and broadcast.",
        thumbnail: "/images/work-mograph-03.png",
        tools: ["After Effects", "Illustrator"],
        gallery: [{ kind: "image", src: "/images/work-mograph-03.png" }],
      },
      {
        id: "mograph-04",
        title: "Explainer Video",
        subtitle: "SaaS product walkthrough",
        description:
          "2-minute animated explainer covering product features, user flow and CTA — designed for landing page embed.",
        thumbnail: "/images/work-mograph-04.png",
        tools: ["After Effects", "Figma", "Lottie"],
        gallery: [
          { kind: "image", src: "/images/work-mograph-04.png" },
          { kind: "image", src: "/images/work-mograph-05.png" },
        ],
      },
      {
        id: "mograph-05",
        title: "Social Media Pack",
        subtitle: "Animated stories & reels",
        description:
          "Template-based motion graphics pack for Instagram stories and reels. 20+ templates with editable text layers.",
        thumbnail: "/images/work-mograph-05.png",
        tools: ["After Effects", "Canva", "Premiere Pro"],
        gallery: [{ kind: "image", src: "/images/work-mograph-05.png" }],
      },
      {
        id: "mograph-06",
        title: "Kinetic Typography",
        subtitle: "Spoken-word visual",
        description:
          "Bold kinetic type animation synced to audio — clean transitions, impactful timing.",
        thumbnail: "/images/work-mograph-06.png",
        tools: ["After Effects", "Illustrator"],
        gallery: [
          { kind: "image", src: "/images/work-mograph-06.png" },
          { kind: "image", src: "/images/work-mograph-01.png" },
        ],
      },
    ],
  },

  /* ▸ UI / UX */
  {
    slug: "ui-ux",
    label: "UI UX Work",
    tagline: "MetaShop AI · e-commerce · SaaS dashboards",
    accent: "#fb923c",
    icon: "🎨",
    metric: "3× demos",
    pieces: [
      {
        id: "uiux-01",
        title: "MetaShop AI Website",
        subtitle: "Product marketing site",
        description:
          "MetaShop AI had a complex AI + 3D product that nobody outside the team understood. This site made it legible — and tripled demo request volume in the first month.",
        thumbnail: "/images/work-uiux-01.png",
        tools: ["Figma", "React", "Tailwind CSS"],
        gallery: [
          { kind: "image", src: "/images/work-uiux-01.png" },
          { kind: "image", src: "/images/work-uiux-02.png" },
        ],
        externalUrl: "https://metashop.ai",
        caseStudy: {
          problem:
            "Early-stage startup needed a website that explains a complex 3D/AI product simply while driving demo requests.",
          process:
            "Competitive audit → user flow mapping → wireframes → hi-fi mockups → React build with iterative client feedback.",
          solution:
            "Minimal, scroll-driven narrative with an embedded 3D viewer as the centrepiece — letting the product speak for itself.",
          results: "3× increase in demo requests within the first month of launch.",
          wireframes: ["/images/work-uiux-03.png"],
          finalScreens: ["/images/work-uiux-01.png", "/images/work-uiux-02.png"],
        },
      },
      {
        id: "uiux-02",
        title: "Analytics Dashboard",
        subtitle: "B2B SaaS interface",
        description:
          "Data-dense dashboard with customisable widgets, dark theme, real-time charts and role-based views.",
        thumbnail: "/images/work-uiux-02.png",
        tools: ["Figma", "Design System", "Recharts"],
        gallery: [
          { kind: "image", src: "/images/work-uiux-02.png" },
          { kind: "image", src: "/images/work-uiux-03.png" },
        ],
        caseStudy: {
          problem:
            "Users struggled with information overload — too many metrics, no hierarchy, slow page loads.",
          process:
            "Stakeholder interviews → card sorting → progressive disclosure wireframes → prototype testing with 8 users.",
          solution:
            "Widget-based layout with a smart default view and user-customisable arrangements. Reduced cognitive load by 60%.",
        },
      },
      {
        id: "uiux-03",
        title: "Mobile App — Fitness Tracker",
        subtitle: "Consumer health app",
        description:
          "Clean, gesture-driven fitness app with workout logging, progress charts and social features.",
        thumbnail: "/images/work-uiux-03.png",
        tools: ["Figma", "Protopie", "Lottie"],
        gallery: [
          { kind: "image", src: "/images/work-uiux-03.png" },
          { kind: "image", src: "/images/work-uiux-04.png" },
        ],
      },
      {
        id: "uiux-04",
        title: "E-Commerce Redesign",
        subtitle: "Conversion optimisation",
        description:
          "Cart abandonment at 78%. Session recordings showed users bailing at the address step. Redesigned checkout to 3-step with progress indicator and guest option. Abandonment dropped to 52%.",
        thumbnail: "/images/work-uiux-04.png",
        tools: ["Figma", "Hotjar", "Google Analytics"],
        gallery: [
          { kind: "image", src: "/images/work-uiux-04.png" },
          { kind: "image", src: "/images/work-uiux-05.png" },
        ],
        caseStudy: {
          problem: "Cart abandonment at 78%. Users complained about confusing checkout flow and lack of trust signals.",
          process: "Heuristic review → Hotjar session analysis → checkout funnel redesign → usability testing.",
          solution:
            "Simplified 3-step checkout with progress indicator, trust badges and guest checkout option.",
          results: "Cart abandonment reduced to 52% — a 33% improvement.",
        },
      },
      {
        id: "uiux-05",
        title: "Design System",
        subtitle: "Component library",
        description:
          "Scalable design system with tokens, components, patterns and documentation. Used across 4 product teams.",
        thumbnail: "/images/work-uiux-05.png",
        tools: ["Figma", "Storybook", "Tokens Studio"],
        gallery: [
          { kind: "image", src: "/images/work-uiux-05.png" },
          { kind: "image", src: "/images/work-uiux-06.png" },
        ],
      },
      {
        id: "uiux-06",
        title: "Landing Page — SaaS",
        subtitle: "Conversion-focused design",
        description:
          "High-converting landing page with scroll animations, social proof section and multi-step CTA form.",
        thumbnail: "/images/work-uiux-06.png",
        tools: ["Figma", "Webflow", "GSAP"],
        gallery: [{ kind: "image", src: "/images/work-uiux-06.png" }],
      },
    ],
  },
];

/* ── helpers ──────────────────────────────── */
export const getCategoryBySlug = (slug: string) =>
  workCategories.find((c) => c.slug === slug);

export const getPieceById = (categorySlug: string, pieceId: string) => {
  const cat = getCategoryBySlug(categorySlug);
  return cat?.pieces.find((p) => p.id === pieceId);
};
