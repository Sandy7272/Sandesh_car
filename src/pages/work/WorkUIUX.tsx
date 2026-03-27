import WorkCategoryPage from "./WorkCategoryPage";

const projects = [
  { name: "MetaShop AI — Self-Service Platform", desc: "Client-facing AI-powered website with integrated custom 3D viewer — first self-service product", tags: ["React", "Three.js"] },
  { name: "E-Commerce Product Pages", desc: "Product pages with real-time 3D visualization enabling customers to customize and interact with 3D models", tags: ["UI/UX", "Tailwind CSS"] },
  { name: "3D Viewer Interface", desc: "Embeddable 3D viewer widget designed for enterprise reliability and fast loading", tags: ["WebGL", "Widget"] },
  { name: "Dashboard & Admin Tools", desc: "Internal tools for managing 3D pipelines, client projects, and production workflows", tags: ["Figma", "Design System"] },
  { name: "Motion UI Systems", desc: "Reusable animation systems and component libraries for consistent brand expression", tags: ["Motion UI", "Templates"] },
  { name: "Marketing Website Design", desc: "Brand websites designed for client acquisition with strong visual storytelling", tags: ["Photoshop", "Illustrator"] },
];

const WorkUIUX = () => (
  <WorkCategoryPage
    title="UI/UX Projects"
    subtitle="20+ UI/UX Projects"
    description="Clean product interfaces, systems thinking, and interaction clarity. From self-service platforms to embeddable 3D viewers — designed for enterprise adoption."
    light
    projects={projects}
  />
);

export default WorkUIUX;
