import WorkCategoryPage from "./WorkCategoryPage";

const projects = [
  { name: "Byju's STEM Motion System", desc: "Reusable motion template system for animated STEM education — 100+ modules across science, math & physics", tags: ["After Effects", "3D Animation"] },
  { name: "Product Reveal Animations", desc: "Cinematic 3D product reveals combining Gaussian Splatting renders with kinetic typography", tags: ["Blender", "Product Viz"] },
  { name: "Event Montages", desc: "High-energy event recap videos for India Bike Week, Tata activations & Kesari Weddings", tags: ["Premiere Pro", "Drone"] },
  { name: "Brand Identity Animations", desc: "Short-form animated brand identities and logo reveals for startups — 15+ brands in 5-day turnaround", tags: ["Cinema 4D", "Logo"] },
  { name: "Educational Content", desc: "Motion graphics consumed by millions of students across India at Byju's", tags: ["2.5D", "Education"] },
  { name: "Marketing Visuals", desc: "3D marketing visuals and motion assets to support client acquisition at MetaShop AI", tags: ["Motion Design", "Marketing"] },
];

const WorkMotion = () => (
  <WorkCategoryPage
    title="Motion Graphics"
    subtitle="Cinematic Animation & Visual Storytelling"
    description="Animated gradients and cinematic pacing for high-energy visual narratives. From educational systems reaching millions to cinematic product reveals and brand identities."
    projects={projects}
  />
);

export default WorkMotion;
