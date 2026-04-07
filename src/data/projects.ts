export type Category = "3D" | "Motion Graphics" | "UI/UX" | "Development";

export interface ProjectData {
  title: string;
  slug: string;
  category: Category;
  thumbnail: string;
  images: string[];
  videos?: string[];
  description: string;
  tools: string[];
  caseStudy?: {
    problem: string;
    process: string;
    wireframes: string[];
    finalDesign: string[];
  };
}

export const projects: ProjectData[] = [
  {
    title: "MetaShop 3D Viewer",
    slug: "metashop-3d-viewer",
    category: "3D",
    thumbnail: "/images/callhq.png", // Re-using existing placeholder structure
    images: ["/images/callhq.png", "/images/whatsapp.png", "/images/broki.png"],
    description: "An AI-powered 3D viewer designed for e-commerce, allowing seamless integration of realistic product models directly onto web interfaces using WebGL.",
    tools: ["Three.js", "React", "WebGL", "Python", "AWS"],
  },
  {
    title: "Immersive Scrollytelling",
    slug: "immersive-scrollytelling",
    category: "Development",
    thumbnail: "/images/whatsapp.png",
    images: ["/images/whatsapp.png", "/images/callhq.png", "/images/orrdr.png"],
    description: "A highly performant interactive portfolio experience heavily driven by GSAP scrollytelling physics and HTML5 Canvas frames.",
    tools: ["GSAP", "React", "HTML5 Canvas", "Tailwind"],
  },
  {
    title: "Educational Assets",
    slug: "educational-assets",
    category: "Motion Graphics",
    thumbnail: "/images/broki.png",
    images: ["/images/broki.png", "/images/orrdr.png"],
    description: "Designed a series of educational 3D motion graphics and reusable animation template libraries for a digital learning platform, improving production efficiency.",
    tools: ["Blender", "After Effects", "Spline", "Cinema4D"],
  },
  {
    title: "VFX & Commercial Render",
    slug: "vfx-commercial-render",
    category: "UI/UX",
    thumbnail: "/images/orrdr.png",
    images: ["/images/orrdr.png", "/images/whatsapp.png"],
    description: "An end-to-end commercial render pipeline delivering high-quality broadcast assets and a cohesive user experience structure.",
    tools: ["Unreal Engine", "Substance Painter", "Nuke", "Figma"],
    caseStudy: {
      problem: "The client needed a photorealistic visualization mapped seamlessly into an immersive UI layer without sacrificing performance on mobile devices.",
      process: "We initiated a full wireframe teardown, rebuilt the rendering pipeline using baked lightmaps, and established a continuous deployment UX strategy.",
      wireframes: ["/images/callhq.png"],
      finalDesign: ["/images/orrdr.png", "/images/whatsapp.png"]
    }
  }
];

export const getProjectBySlug = (slug: string) => {
  return projects.find((p) => p.slug === slug);
};

export const getRelatedProjects = (slug: string, limit = 3) => {
  return projects.filter((p) => p.slug !== slug).slice(0, limit);
};
