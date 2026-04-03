export type ProjectCategory = "3d" | "motion" | "uiux" | "development";

export type ProjectMedia =
  | { kind: "image"; src: string; alt?: string }
  | { kind: "video"; src: string; poster?: string };

export interface Project {
  id: string;
  title: string;
  category: ProjectCategory;
  categoryLabel: string;
  subtitle: string;
  description: string;
  cover: ProjectMedia;
  tools: string[];
  year: string;
  client?: string;
  links?: { label: string; href: string }[];
  gallery: ProjectMedia[];
  highlights: string[];
  /** UI/UX specific */
  caseStudy?: {
    problem: string;
    process: string;
    outcome: string;
  };
  /** Grid size hint: "large" takes 2 cols */
  gridSize?: "normal" | "large";
}

export const categoryLabels: Record<ProjectCategory, string> = {
  "3d": "3D Work",
  motion: "Motion Graphics",
  uiux: "UI/UX Design",
  development: "Development",
};

export const projects: Project[] = [
  // ── 3D WORK ──
  {
    id: "enterprise-3d-pipeline",
    title: "Enterprise 3D Production Pipeline",
    category: "3d",
    categoryLabel: "3D Work",
    subtitle: "NeRF & Gaussian Splatting Pipeline",
    description:
      "Rebuilt MetaShop AI's video-to-3D pipeline from scratch into a production-grade system using NeRF and Gaussian Splatting research. Onboarded enterprise clients including L&T Realty and Kesari Weddings with reliable, predictable outputs.",
    cover: { kind: "image", src: "/images/orrdr.png", alt: "3D Pipeline" },
    tools: ["Blender", "Nerfstudio", "Gaussian Splatting", "3ds Max", "Substance Painter"],
    year: "2023",
    client: "MetaShop AI",
    gallery: [
      { kind: "image", src: "/images/orrdr.png", alt: "Pipeline overview" },
      { kind: "image", src: "/images/Solidx.png", alt: "3D output" },
      { kind: "image", src: "/images/sapphire.png", alt: "Product render" },
    ],
    highlights: [
      "Rebuilt pipeline into production-grade system optimized for consistency and throughput",
      "Established delivery standards: capture → training → QA → export → client handoff",
      "Enabled enterprise adoption with reliable outputs and predictable timelines",
      "Processed 50+ client projects end-to-end",
    ],
    gridSize: "large",
  },
  {
    id: "3d-product-renders",
    title: "3D Product Visualization",
    category: "3d",
    categoryLabel: "3D Work",
    subtitle: "Photorealistic Product Renders",
    description:
      "High-fidelity 3D product renders for e-commerce and marketing. Created photorealistic visualizations using Blender and Substance Painter for various product categories.",
    cover: { kind: "image", src: "/images/Solidx.png", alt: "Product renders" },
    tools: ["Blender", "Substance Painter", "Photoshop"],
    year: "2023",
    gallery: [
      { kind: "image", src: "/images/Solidx.png", alt: "Product render 1" },
      { kind: "image", src: "/images/bond.png", alt: "Product render 2" },
    ],
    highlights: [
      "Photorealistic rendering with PBR materials",
      "Optimized for web and print media",
      "Consistent lighting and composition system",
    ],
  },
  {
    id: "real-estate-3d",
    title: "Real Estate 3D Tours",
    category: "3d",
    categoryLabel: "3D Work",
    subtitle: "Immersive Property Walkthroughs",
    description:
      "Created immersive 3D tours and walkthroughs for L&T Realty and other real estate clients using NeRF-based capture and Gaussian Splatting reconstruction.",
    cover: { kind: "image", src: "/images/sapphire.png", alt: "Real estate 3D" },
    tools: ["Nerfstudio", "Gaussian Splatting", "Blender"],
    year: "2024",
    client: "L&T Realty",
    gallery: [
      { kind: "image", src: "/images/sapphire.png", alt: "Property tour" },
    ],
    highlights: [
      "Immersive property visualization for enterprise clients",
      "NeRF-based capture workflow for photorealistic results",
      "Delivered walkthroughs for luxury real estate projects",
    ],
  },

  // ── MOTION GRAPHICS ──
  {
    id: "stem-content-system",
    title: "STEM Educational Content System",
    category: "motion",
    categoryLabel: "Motion Graphics",
    subtitle: "Animated Learning Modules for Byju's",
    description:
      "Delivered 100+ animated learning modules and engineered a template system reducing per-module production time by 40% across a 15+ designer team at Byju's.",
    cover: { kind: "image", src: "/images/broki.png", alt: "Education content" },
    tools: ["After Effects", "Blender", "Maya", "Premiere Pro"],
    year: "2022",
    client: "Byju's",
    gallery: [
      { kind: "image", src: "/images/broki.png", alt: "Animation module" },
      { kind: "image", src: "/images/preview1.png", alt: "Preview" },
    ],
    highlights: [
      "Built reusable template libraries speeding up production",
      "Collaborated with teams to improve storytelling and visual clarity",
      "Optimized workflows for high-volume delivery",
      "Won Best Employee Award 3× among 400+ team members",
    ],
    gridSize: "large",
  },
  {
    id: "brand-motion",
    title: "Brand Motion Design",
    category: "motion",
    categoryLabel: "Motion Graphics",
    subtitle: "Animated Brand Identities",
    description:
      "Created animated brand identities and motion design systems for various clients during freelance work, focusing on memorable visual storytelling.",
    cover: { kind: "image", src: "/images/Maxlife.png", alt: "Brand motion" },
    tools: ["After Effects", "Illustrator", "Cinema 4D"],
    year: "2021",
    gallery: [
      { kind: "image", src: "/images/Maxlife.png", alt: "Brand animation" },
    ],
    highlights: [
      "Created cohesive motion design systems",
      "Animated logos and brand reveals",
      "Delivered across social media and broadcast formats",
    ],
  },

  // ── UI/UX ──
  {
    id: "metashop-platform",
    title: "MetaShop AI Platform",
    category: "uiux",
    categoryLabel: "UI/UX Design",
    subtitle: "AI-Powered E-Commerce Experience",
    description:
      "Designed and built the company's first client-facing self-service product — an AI-powered website with integrated custom 3D viewer for product interaction and customization.",
    cover: { kind: "image", src: "/images/callhq.png", alt: "MetaShop platform" },
    tools: ["Figma", "React", "Three.js", "Tailwind CSS"],
    year: "2024",
    client: "MetaShop AI",
    links: [{ label: "Visit MetaShop AI", href: "https://metashop.ai" }],
    gallery: [
      { kind: "image", src: "/images/callhq.png", alt: "Platform overview" },
      { kind: "image", src: "/images/radix.png", alt: "UI components" },
    ],
    highlights: [
      "Built responsive marketing + product experience focused on conversion",
      "Integrated custom real-time 3D viewer for product interaction",
      "Designed UI/UX patterns for self-serve onboarding",
      "Scalable content iteration system",
    ],
    caseStudy: {
      problem: "MetaShop AI needed a self-service platform where customers could independently explore, customize, and interact with 3D product models — replacing the manual demo-driven sales process.",
      process: "Designed user flows for self-serve onboarding, built a custom Three.js-based 3D viewer, iterated on UI patterns through rapid prototyping with React and Tailwind CSS.",
      outcome: "Launched the company's first client-facing product, enabling customers to independently customize 3D models and reducing sales team workload significantly.",
    },
    gridSize: "large",
  },
  {
    id: "ops-dashboard",
    title: "Operations Dashboard",
    category: "uiux",
    categoryLabel: "UI/UX Design",
    subtitle: "Internal Tools Design",
    description:
      "Designed file tracking and automated processing workflows, creating intuitive dashboards that eliminated 70% of repetitive manual operations.",
    cover: { kind: "image", src: "/images/whatsapp.png", alt: "Ops dashboard" },
    tools: ["Figma", "React", "Workflow Design"],
    year: "2023",
    gallery: [
      { kind: "image", src: "/images/whatsapp.png", alt: "Dashboard" },
    ],
    highlights: [
      "Designed tracking + processing workflows",
      "Created scalable handoff system for multi-stage pipelines",
      "Improved reliability and throughput across teams",
    ],
    caseStudy: {
      problem: "Manual file tracking and repetitive operational tasks were bottlenecking production at MetaShop AI, causing delays and inconsistencies.",
      process: "Mapped existing workflows, identified automation opportunities, designed intuitive dashboards with clear status visibility and automated handoffs.",
      outcome: "Eliminated 70% of repetitive manual operations and enabled 3× output scaling across the team.",
    },
  },

  // ── DEVELOPMENT ──
  {
    id: "ai-ecommerce-3d-viewer",
    title: "AI-Powered 3D Viewer",
    category: "development",
    categoryLabel: "Development",
    subtitle: "React + Three.js Web Application",
    description:
      "Architected and delivered a responsive website with real-time 3D product visualization — the company's first self-service product enabling customers to independently customize and interact with 3D models.",
    cover: { kind: "image", src: "/images/callhq.png", alt: "3D Viewer app" },
    tools: ["React", "Three.js", "TypeScript", "Tailwind CSS", "Vite"],
    year: "2024",
    client: "MetaShop AI",
    links: [
      { label: "Live Site", href: "https://metashop.ai" },
    ],
    gallery: [
      { kind: "image", src: "/images/callhq.png", alt: "App overview" },
    ],
    highlights: [
      "Custom Three.js 3D viewer with real-time interaction",
      "Responsive design with mobile-first approach",
      "AI-assisted development workflow",
      "Production-grade performance optimization",
    ],
    gridSize: "large",
  },
  {
    id: "ops-automation",
    title: "Operations Automation",
    category: "development",
    categoryLabel: "Development",
    subtitle: "Workflow Automation Infrastructure",
    description:
      "Designed and built automated processing workflows that eliminated repetitive manual operations, enabling 3× output scaling across the organization.",
    cover: { kind: "image", src: "/images/whatsapp.png", alt: "Automation" },
    tools: ["Python", "AI Tools", "Process Automation", "Workflow Design"],
    year: "2023",
    links: [
      { label: "GitHub", href: "https://github.com/Sandy7272" },
    ],
    gallery: [
      { kind: "image", src: "/images/whatsapp.png", alt: "Automation system" },
    ],
    highlights: [
      "70% reduction in manual operations",
      "3× output scaling achieved",
      "End-to-end workflow automation",
      "Scalable architecture for future growth",
    ],
  },
  {
    id: "portfolio-website",
    title: "Personal Portfolio",
    category: "development",
    categoryLabel: "Development",
    subtitle: "3D Interactive Portfolio",
    description:
      "This very portfolio — built with React, Three.js, GSAP, and Framer Motion. Features a 3D character model, smooth scroll animations, and cinematic interactions.",
    cover: { kind: "image", src: "/images/preview1.png", alt: "Portfolio" },
    tools: ["React", "Three.js", "GSAP", "TypeScript", "Framer Motion"],
    year: "2024",
    links: [
      { label: "GitHub", href: "https://github.com/Sandy7272" },
    ],
    gallery: [
      { kind: "image", src: "/images/preview1.png", alt: "Portfolio preview" },
    ],
    highlights: [
      "Interactive 3D character with mouse tracking",
      "GSAP ScrollTrigger animations throughout",
      "Cinematic page transitions",
      "Fully responsive design",
    ],
  },
];

export function getProjectsByCategory(category: ProjectCategory): Project[] {
  return projects.filter((p) => p.category === category);
}

export function getProjectById(id: string): Project | undefined {
  return projects.find((p) => p.id === id);
}

export function getRelatedProjects(id: string, limit = 3): Project[] {
  const current = getProjectById(id);
  if (!current) return [];
  return projects
    .filter((p) => p.id !== id && p.category === current.category)
    .slice(0, limit)
    .concat(
      projects
        .filter((p) => p.id !== id && p.category !== current.category)
        .slice(0, limit)
    )
    .slice(0, limit);
}
