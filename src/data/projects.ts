export type ProjectMedia =
  | { kind: "placeholder" }
  | { kind: "image"; src: string; alt?: string }
  | { kind: "video"; src: string; poster?: string };

export type Project = {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  tags: string[];
  ctaLabel: string;
  /** Optional: set later when you upload assets */
  media: ProjectMedia;
  gradient: string;
  accent: string;
};

export const projects: Project[] = [
  {
    id: "metashop-3d-viewer",
    title: "MetaShop AI",
    subtitle: "3D Viewer",
    description:
      "A client-facing self‑service experience with a real‑time 3D viewer — designed for fast loading, clean interaction, and enterprise reliability.",
    tags: ["React", "Three.js", "WebXR", "AWS"],
    ctaLabel: "Open project",
    media: { kind: "placeholder" },
    gradient:
      "radial-gradient(ellipse at 30% 65%, rgba(120,80,255,0.18) 0%, rgba(60,130,255,0.06) 40%, transparent 70%)",
    accent: "#A29BFE",
  },
  {
    id: "video-to-3d-pipeline",
    title: "Video → 3D",
    subtitle: "Production Pipeline",
    description:
      "An automated pipeline that converts video into production‑ready 3D outputs — optimized for consistency, speed, and scale.",
    tags: ["Gaussian Splatting", "NeRF", "Nerfstudio", "Python"],
    ctaLabel: "Open project",
    media: { kind: "placeholder" },
    gradient:
      "radial-gradient(ellipse at 70% 35%, rgba(255,69,0,0.16) 0%, rgba(255,69,0,0.06) 40%, transparent 70%)",
    accent: "#ff6b6b",
  },
  {
    id: "real-estate-3d",
    title: "Real Estate",
    subtitle: "3D Delivery",
    description:
      "A complete capture‑to‑web workflow for immersive real estate experiences — from scanning to interactive delivery.",
    tags: ["Photogrammetry", "Three.js", "Unreal", "Workflow"],
    ctaLabel: "Open project",
    media: { kind: "placeholder" },
    gradient:
      "radial-gradient(ellipse at 55% 80%, rgba(60,180,255,0.16) 0%, rgba(30,90,128,0.06) 40%, transparent 70%)",
    accent: "#60b4ff",
  },
];

