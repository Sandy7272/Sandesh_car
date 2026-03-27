import WorkCategoryPage from "./WorkCategoryPage";

const projects = [
  { name: "L&T Realty — Sample Flat Walkthroughs", desc: "Gaussian Splat walkthroughs of luxury flats in Thane and Noida via automated NeRF pipeline", tags: ["Gaussian Splatting", "Real Estate"] },
  { name: "Ultraviolette EV Showroom", desc: "Full spatial reconstruction of the EV showroom for interactive brand experience", tags: ["AR Ready", "Automotive"] },
  { name: "Kesari Weddings — 12 Goa Resorts", desc: "12 resort villas reconstructed from drone and handheld footage for virtual walkthroughs", tags: ["Virtual Tour", "Events"] },
  { name: "India Bike Week 2025", desc: "Full 3D environment capture of IBW grounds — activation zones, stages, brand installations", tags: ["Live Event", "3D Capture"] },
  { name: "Italica Furniture — 154 Products", desc: "Automated pipeline converting 154 SKUs into real-time 3D assets for web viewers & AR", tags: ["E-commerce", "Product 3D"] },
  { name: "Material Depot — Surface Library", desc: "1000+ tile and surface SKUs digitized as PBR material assets with embedded AR viewer", tags: ["Materials", "PBR"] },
];

const Work3D = () => (
  <WorkCategoryPage
    title="3D Spatial Work"
    subtitle="Immersive Environments & Product Visualization"
    description="Dark, depth-heavy visuals with subtle spatial motion and lighting. From real estate walkthroughs to product visualization — each project leverages Gaussian Splatting, NeRF, and real-time 3D viewers."
    projects={projects}
  />
);

export default Work3D;
