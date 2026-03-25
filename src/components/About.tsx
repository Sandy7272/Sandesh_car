const About = () => (
  <section id="about" className="section-padding">
    <div className="container-custom grid grid-cols-1 lg:grid-cols-[40%_60%] gap-12 lg:gap-16 relative">
      {/* Left */}
      <div className="relative">
        <p className="section-label mb-4">About</p>
        <h2 className="section-heading text-foreground">About Me</h2>
        {/* Background text */}
        <p
          className="absolute top-1/2 left-0 -translate-y-1/2 font-display italic text-[8rem] lg:text-[12rem] text-foreground/[0.04] leading-none pointer-events-none select-none whitespace-nowrap"
        >
          SANDESH
        </p>
      </div>

      {/* Right */}
      <div className="space-y-6">
        <p className="font-body text-[15px] text-muted-foreground leading-[1.9]">
          I'm Sandesh Gadakh — a 3D Artist, Motion Designer, and Creative Technologist based in Pune, India.
          I don't just design; I engineer experiences end to end.
        </p>
        <p className="font-body text-[15px] text-muted-foreground leading-[1.9]">
          At MetaShop AI, I built the video-to-3D pipeline, the viewer product, and automated the entire production system.
          Previously at Byju's, I designed motion systems that reached millions — awarded Best Employee three times.
        </p>

        <div className="grid grid-cols-2 gap-4 mt-8">
          <div>
            <p className="font-mono-custom uppercase text-[10px] tracking-[0.15em] text-muted-foreground mb-2">Education</p>
            <p className="font-mono-custom text-[12px] text-foreground/80">Bachelor of Fine Arts</p>
          </div>
          <div>
            <p className="font-mono-custom uppercase text-[10px] tracking-[0.15em] text-muted-foreground mb-2">Certifications</p>
            <p className="font-mono-custom text-[12px] text-foreground/80">Unreal Engine · Blender · WebXR</p>
          </div>
        </div>

        <a
          href="#contact"
          className="inline-block font-mono-custom text-[12px] uppercase tracking-[0.15em] text-primary hover:underline underline-offset-4 transition-smooth mt-6"
        >
          Let's work together →
        </a>
      </div>
    </div>
  </section>
);

export default About;
