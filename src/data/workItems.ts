import { resume } from "./resume";

export type WorkMedia =
  | { kind: "image"; src: string; alt?: string }
  | { kind: "video"; src: string; poster?: string }
  | { kind: "model"; src: string; alt?: string };

export type WorkCategory = "3d" | "motion" | "video-to-3d" | "uiux";

export type WorkItem = {
  id: string;
  title: string;
  category: WorkCategory;
  categoryLabel: string;
  tools: string;
  cover: WorkMedia;
  overview: string;
  bullets: string[];
  stack: readonly string[];
  links?: { label: string; href: string }[];
  gallery?: WorkMedia[];
};

export type WorkCategoryInfo = {
  slug: WorkCategory;
  title: string;
  subtitle: string;
  description: string;
  cover: string;
  accentGradient: string;
};

export const workCategories: WorkCategoryInfo[] = [
  {
    slug: "3d",
    title: "3D Work",
    subtitle: "Interactive 3D Experiences",
    description: "Product visualization, Gaussian Splatting, NeRF reconstructions, and real-time 3D web viewers.",
    cover: "/images/callhq.png",
    accentGradient: "from-cyan-500/20 to-blue-600/20",
  },
  {
    slug: "motion",
    title: "Motion Graphics",
    subtitle: "Cinematic Animation",
    description: "Educational animations, brand motion systems, and dynamic visual storytelling for millions of viewers.",
    cover: "/images/broki.png",
    accentGradient: "from-orange-500/20 to-red-600/20",
  },
  {
    slug: "video-to-3d",
    title: "Video to 3D",
    subtitle: "AI-Powered Pipeline",
    description: "Enterprise-grade video-to-3D reconstruction using NeRF and Gaussian Splatting techniques.",
    cover: "/images/orrdr.png",
    accentGradient: "from-purple-500/20 to-pink-600/20",
  },
  {
    slug: "uiux",
    title: "UI/UX Design",
    subtitle: "Case Studies",
    description: "Product design, user research, and interface systems for AI-powered platforms.",
    cover: "/images/whatsapp.png",
    accentGradient: "from-emerald-500/20 to-teal-600/20",
  },
];

export const workItems: WorkItem[] = [
  // ── 3D Work ──
  {
    id: "3d-product-viewer",
    title: "AI-Powered 3D Product Viewer",
    category: "3d",
    categoryLabel: "3D Work",
    tools: "React, Three.js, WebGL, Tailwind CSS",
    cover: { kind: "image", src: "/images/callhq.png", alt: "3D Viewer" },
    overview: resume.keyProjects[0].summary,
    bullets: [
      "Real-time 3D product visualization with orbit controls",
      "Custom shader materials and environment mapping",
      "Responsive layout with integrated product configurator",
    ],
    stack: resume.keyProjects[0].stack,
    links: [{ label: "MetaShop AI", href: "https://metashop.ai" }],
    gallery: [{ kind: "image", src: "/images/callhq.png", alt: "Viewer detail" }],
  },
  {
    id: "3d-real-estate",
    title: "Real Estate 3D Walkthrough",
    category: "3d",
    categoryLabel: "3D Work",
    tools: "Blender, Three.js, Gaussian Splatting",
    cover: { kind: "image", src: "/images/orrdr.png", alt: "Real Estate 3D" },
    overview: "Immersive 3D walkthroughs for L&T Realty properties using photogrammetry and Gaussian Splatting.",
    bullets: [
      "Photorealistic environment capture and reconstruction",
      "Web-based interactive walkthrough experience",
      "Delivered for L&T Realty client projects",
    ],
    stack: ["Blender", "Three.js", "Gaussian Splatting", "WebGL"],
    gallery: [{ kind: "image", src: "/images/orrdr.png", alt: "Walkthrough" }],
  },
  {
    id: "3d-product-renders",
    title: "Product 3D Renders",
    category: "3d",
    categoryLabel: "3D Work",
    tools: "Blender, Substance Painter, 3ds Max",
    cover: { kind: "image", src: "/images/callhq.png", alt: "Product Renders" },
    overview: "High-fidelity 3D product renders for e-commerce and marketing campaigns.",
    bullets: [
      "Photorealistic material and lighting setup",
      "Batch rendering pipeline for product catalogs",
      "Optimized for web and print delivery",
    ],
    stack: ["Blender", "Substance Painter", "3ds Max", "V-Ray"],
    gallery: [{ kind: "image", src: "/images/callhq.png", alt: "Render" }],
  },

  // ── Motion Graphics ──
  {
    id: "motion-stem-education",
    title: "STEM Educational Animations",
    category: "motion",
    categoryLabel: "Motion Graphics",
    tools: "After Effects, Blender, Premiere Pro",
    cover: { kind: "image", src: "/images/broki.png", alt: "STEM Animation" },
    overview: resume.keyProjects[3].summary,
    bullets: [
      "100+ animated learning modules for Byju's platform",
      "Template system reducing production time by 40%",
      "Best Employee Award 3× among 400+ designers",
    ],
    stack: resume.keyProjects[3].stack,
    gallery: [{ kind: "image", src: "/images/broki.png", alt: "Animation" }],
  },
  {
    id: "motion-brand-system",
    title: "Brand Motion System",
    category: "motion",
    categoryLabel: "Motion Graphics",
    tools: "After Effects, Cinema 4D, Illustrator",
    cover: { kind: "image", src: "/images/broki.png", alt: "Brand Motion" },
    overview: "Reusable motion design systems for consistent brand identity across platforms.",
    bullets: [
      "Modular animation components for rapid content creation",
      "Brand guideline-compliant motion templates",
      "Cross-platform optimization for social media",
    ],
    stack: ["After Effects", "Cinema 4D", "Illustrator", "Media Encoder"],
    gallery: [{ kind: "image", src: "/images/broki.png", alt: "Brand motion" }],
  },
  {
    id: "motion-explainers",
    title: "Explainer Video Series",
    category: "motion",
    categoryLabel: "Motion Graphics",
    tools: "After Effects, Premiere Pro, Audition",
    cover: { kind: "image", src: "/images/broki.png", alt: "Explainer" },
    overview: "Engaging explainer videos combining 2D animation, typography, and voiceover for complex topics.",
    bullets: [
      "Script-to-screen production pipeline",
      "Dynamic typography and data visualization",
      "Delivered for education and SaaS clients",
    ],
    stack: ["After Effects", "Premiere Pro", "Audition", "Illustrator"],
    gallery: [{ kind: "image", src: "/images/broki.png", alt: "Explainer" }],
  },

  // ── Video to 3D ──
  {
    id: "v2-3d-nerf-pipeline",
    title: "NeRF Reconstruction Pipeline",
    category: "video-to-3d",
    categoryLabel: "Video to 3D",
    tools: "Nerfstudio, COLMAP, Python",
    cover: { kind: "image", src: "/images/orrdr.png", alt: "NeRF Pipeline" },
    overview: resume.keyProjects[1].summary,
    bullets: [
      "End-to-end video capture to 3D model pipeline",
      "Custom training configurations for optimal quality",
      "Automated QA and export workflows",
    ],
    stack: resume.keyProjects[1].stack,
    gallery: [{ kind: "image", src: "/images/orrdr.png", alt: "NeRF" }],
  },
  {
    id: "v2-3d-gaussian-splatting",
    title: "Gaussian Splatting Scenes",
    category: "video-to-3d",
    categoryLabel: "Video to 3D",
    tools: "3D Gaussian Splatting, CUDA, Python",
    cover: { kind: "image", src: "/images/orrdr.png", alt: "Gaussian Splatting" },
    overview: "Real-time neural rendering using 3D Gaussian Splatting for photorealistic scene reconstruction.",
    bullets: [
      "Real-time rendering at 60+ FPS",
      "Point cloud to splat conversion pipeline",
      "Web-based viewer integration",
    ],
    stack: ["3D Gaussian Splatting", "CUDA", "Python", "WebGL"],
    gallery: [{ kind: "image", src: "/images/orrdr.png", alt: "Splat" }],
  },
  {
    id: "v2-3d-kesari",
    title: "Kesari Weddings 3D Experience",
    category: "video-to-3d",
    categoryLabel: "Video to 3D",
    tools: "Nerfstudio, Blender, Three.js",
    cover: { kind: "image", src: "/images/orrdr.png", alt: "Kesari Weddings" },
    overview: "Immersive 3D wedding venue reconstructions from drone and handheld video footage.",
    bullets: [
      "Drone + handheld multi-angle capture methodology",
      "High-fidelity venue reconstruction",
      "Interactive web viewer for client presentations",
    ],
    stack: ["Nerfstudio", "Blender", "Three.js", "COLMAP"],
    gallery: [{ kind: "image", src: "/images/orrdr.png", alt: "Kesari" }],
  },

  // ── UI/UX ──
  {
    id: "uiux-metashop-platform",
    title: "MetaShop AI Platform Design",
    category: "uiux",
    categoryLabel: "UI/UX Design",
    tools: "Figma, React, Tailwind CSS",
    cover: { kind: "image", src: "/images/whatsapp.png", alt: "MetaShop UI" },
    overview: "End-to-end product design for an AI-powered e-commerce platform with 3D integration.",
    bullets: [
      "User research and journey mapping for 3D commerce",
      "Design system with 50+ reusable components",
      "Self-service onboarding flow reducing support tickets by 60%",
    ],
    stack: ["Figma", "React", "Tailwind CSS", "Framer"],
    links: [{ label: "MetaShop AI", href: "https://metashop.ai" }],
    gallery: [{ kind: "image", src: "/images/whatsapp.png", alt: "Platform" }],
  },
  {
    id: "uiux-dashboard",
    title: "3D Pipeline Dashboard",
    category: "uiux",
    categoryLabel: "UI/UX Design",
    tools: "Figma, React, Chart.js",
    cover: { kind: "image", src: "/images/whatsapp.png", alt: "Dashboard" },
    overview: "Operations dashboard for tracking 3D production pipeline status and client deliverables.",
    bullets: [
      "Real-time project tracking and status visualization",
      "Client-facing progress reports",
      "Automated notification system design",
    ],
    stack: ["Figma", "React", "Tailwind CSS", "Chart.js"],
    gallery: [{ kind: "image", src: "/images/whatsapp.png", alt: "Dashboard" }],
  },
  {
    id: "uiux-portfolio",
    title: "Portfolio Website Design",
    category: "uiux",
    categoryLabel: "UI/UX Design",
    tools: "Figma, React, Three.js, GSAP",
    cover: { kind: "image", src: "/images/callhq.png", alt: "Portfolio" },
    overview: "Cinematic portfolio website combining 3D visuals, scroll storytelling, and premium typography.",
    bullets: [
      "Scroll-driven narrative with image sequence animation",
      "Interactive 3D showcase sections",
      "Awwwards-level micro-interactions and transitions",
    ],
    stack: ["React", "Three.js", "GSAP", "Tailwind CSS"],
    gallery: [{ kind: "image", src: "/images/callhq.png", alt: "Portfolio" }],
  },
];

