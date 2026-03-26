import { useEffect, useRef, useState } from "react";

const AnimatedSection = ({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVisible(true); },
      { threshold: 0.15 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(50px)",
        filter: visible ? "blur(0px)" : "blur(6px)",
        transition: "all 0.9s cubic-bezier(0.22, 1, 0.36, 1)",
      }}
    >
      {children}
    </div>
  );
};

const About = () => (
  <section id="about" className="section-padding">
    <div className="container-custom grid grid-cols-1 lg:grid-cols-[40%_60%] gap-12 lg:gap-16 relative">
      {/* Left */}
      <AnimatedSection className="relative">
        <p className="section-label mb-4">About</p>
        <h2 className="section-heading text-foreground">About Me</h2>
        <p className="absolute top-1/2 left-0 -translate-y-1/2 font-display italic text-[8rem] lg:text-[12rem] text-foreground/[0.04] leading-none pointer-events-none select-none whitespace-nowrap">
          SANDESH
        </p>
      </AnimatedSection>

      {/* Right */}
      <AnimatedSection className="space-y-6" style-delay="150ms">
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
      </AnimatedSection>
    </div>
  </section>
);

export default About;
