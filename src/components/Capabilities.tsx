const capabilities = [
  { num: "01", title: "3D Design & Rendering", tags: ["Blender", "3DS Max", "Maya", "Unreal", "Substance"] },
  { num: "02", title: "Video to 3D / NeRF", tags: ["Gaussian Splatting", "Nerfstudio", "Drone Capture"] },
  { num: "03", title: "Motion Graphics", tags: ["After Effects", "Premiere Pro", "2.5D Animation"] },
  { num: "04", title: "AR / VR Experiences", tags: ["WebXR", "Real-time 3D", "Unreal Engine"] },
  { num: "05", title: "3D Web Viewers", tags: ["Three.js", "View in AR", "Embeddable Widget"] },
  { num: "06", title: "UI/UX Design", tags: ["Figma", "Photoshop", "Illustrator", "Motion UI"] },
];

const Capabilities = () => (
  <section className="section-padding">
    <div className="container-custom">
      <p className="section-label mb-4">Capabilities</p>
      <h2 className="section-heading text-foreground mb-16">What I Build</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-0">
        {capabilities.map((cap) => (
          <div
            key={cap.num}
            className="group border-t border-foreground/[0.07] hover:border-primary pt-8 pb-10 pr-6 transition-smooth"
          >
            <span className="font-mono-custom text-[11px] text-muted-foreground tracking-[0.15em]">{cap.num}</span>
            <h3 className="font-body font-medium text-lg text-foreground mt-3 mb-4">{cap.title}</h3>
            <div className="flex flex-wrap gap-2">
              {cap.tags.map((tag) => (
                <span key={tag} className="pill">{tag}</span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default Capabilities;
