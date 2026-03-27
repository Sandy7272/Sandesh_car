import WorkCategoryPage from "./WorkCategoryPage";

const projects = [
  { name: "Enterprise 3D Production Pipeline", desc: "Rebuilt video-to-3D rendering pipeline from scratch using NeRF and Gaussian Fields research", tags: ["Nerfstudio", "Gaussian Splatting"] },
  { name: "Real Estate Walkthroughs", desc: "Photorealistic walkthroughs delivered within 24 hours via automated NeRF pipeline for L&T Realty", tags: ["NeRF", "Automation"] },
  { name: "Automated Model Generation", desc: "Complete pipeline from data processing to training execution to output export — 70% manual reduction", tags: ["Pipeline", "AI"] },
  { name: "Drone Capture Systems", desc: "Coordinated on-ground teams including videographers and drone operators for 3D reconstruction", tags: ["Drone", "Photogrammetry"] },
  { name: "Image-to-3D Products", desc: "Converting product images to real-time 3D assets for e-commerce — LOD optimization & AR export", tags: ["Image-to-3D", "AR Ready"] },
  { name: "Custom 3D Viewer Platform", desc: "AI-powered website with integrated custom 3D viewer using React, Three.js & AI-assisted development", tags: ["React", "Three.js"] },
];

const WorkVideoTo3D = () => (
  <WorkCategoryPage
    title="Video → 3D Pipeline"
    subtitle="AI Pipeline Engineering & Automation"
    description="Tech-forward workflows with scan, reconstruction and delivery pipelines. Transformed an early-stage video-to-3D system into an enterprise-grade production platform within 12 months."
    projects={projects}
  />
);

export default WorkVideoTo3D;
