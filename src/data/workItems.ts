import { resume } from "./resume";

export type WorkMedia =
  | { kind: "image"; src: string; alt?: string }
  | { kind: "video"; src: string; poster?: string };

export type WorkItem = {
  id: string;
  title: string;
  category: string;
  tools: string;
  /** Cover shown in carousel/grid */
  cover: WorkMedia;
  /** ArtStation-style detail content */
  overview: string;
  bullets: string[];
  stack: readonly string[];
  links?: { label: string; href: string }[];
  gallery?: WorkMedia[];
};

export const workItems: WorkItem[] = [
  {
    id: resume.keyProjects[0].slug,
    title: resume.keyProjects[0].title,
    category: "AI & 3D Web Platform",
    tools: "React, Three.js, Tailwind, WebGL",
    cover: { kind: "image", src: "/images/callhq.png", alt: "3D Viewer cover" },
    overview: resume.keyProjects[0].summary,
    bullets: [
      "Built a responsive marketing + product experience focused on speed, clarity, and conversion.",
      "Integrated a custom real-time 3D viewer for product interaction and customization.",
      "Designed UI/UX patterns for self-serve onboarding and scalable content iteration.",
    ],
    stack: resume.keyProjects[0].stack,
    links: [{ label: "MetaShop AI", href: "https://metashop.ai" }],
    gallery: [{ kind: "image", src: "/images/callhq.png", alt: "Viewer detail" }],
  },
  {
    id: resume.keyProjects[1].slug,
    title: resume.keyProjects[1].title,
    category: "3D Pipeline & R&D",
    tools: "Nerfstudio, Gaussian Splatting, Blender, Automation",
    cover: { kind: "image", src: "/images/orrdr.png", alt: "Pipeline cover" },
    overview: resume.keyProjects[1].summary,
    bullets: [
      "Rebuilt pipeline into a production-grade system optimized for consistency and throughput.",
      "Established delivery standards: capture → training → QA → export → client handoff.",
      "Enabled enterprise adoption with reliable outputs and predictable timelines.",
    ],
    stack: resume.keyProjects[1].stack,
    gallery: [{ kind: "image", src: "/images/orrdr.png", alt: "Pipeline preview" }],
  },
  {
    id: resume.keyProjects[2].slug,
    title: resume.keyProjects[2].title,
    category: "Ops Automation",
    tools: "Workflow design, tooling, AI-assisted automation",
    cover: { kind: "image", src: "/images/whatsapp.png", alt: "Automation cover" },
    overview: resume.keyProjects[2].summary,
    bullets: [
      "Designed tracking + processing workflows to eliminate repetitive operational work.",
      "Created a scalable handoff system for multi-stage production pipelines.",
      "Improved reliability and throughput across teams and projects.",
    ],
    stack: resume.keyProjects[2].stack,
    gallery: [{ kind: "image", src: "/images/whatsapp.png", alt: "Automation detail" }],
  },
  {
    id: resume.keyProjects[3].slug,
    title: resume.keyProjects[3].title,
    category: "Motion Systems",
    tools: "After Effects, Blender, Templates",
    cover: { kind: "image", src: "/images/broki.png", alt: "Education cover" },
    overview: resume.keyProjects[3].summary,
    bullets: [
      "Built reusable template libraries to speed up production and ensure consistency.",
      "Collaborated with teams to improve storytelling, pacing, and visual clarity.",
      "Optimized workflows for high-volume delivery without compromising quality.",
    ],
    stack: resume.keyProjects[3].stack,
    gallery: [{ kind: "image", src: "/images/broki.png", alt: "Education detail" }],
  },
];

