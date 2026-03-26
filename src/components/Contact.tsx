import { useEffect, useRef, useState } from "react";

const Contact = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVisible(true); },
      { threshold: 0.2 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="contact" className="section-padding min-h-[60vh] flex items-center">
      <div
        ref={ref}
        className="container-custom text-center"
        style={{
          opacity: visible ? 1 : 0,
          transform: visible ? "translateY(0) scale(1)" : "translateY(60px) scale(0.97)",
          filter: visible ? "blur(0px)" : "blur(8px)",
          transition: "all 1s cubic-bezier(0.22, 1, 0.36, 1)",
        }}
      >
        <h2 className="font-display italic text-foreground leading-[0.95]" style={{ fontSize: "clamp(4rem, 9vw, 8rem)" }}>
          Let's Build
        </h2>
        <h2 className="font-display italic text-primary leading-[0.95] mb-8" style={{ fontSize: "clamp(4rem, 9vw, 8rem)" }}>
          Together.
        </h2>
        <p className="font-body text-[15px] text-muted-foreground mb-6">
          Have a project that needs exceptional 3D work? Let's talk.
        </p>
        <a
          href="mailto:gadakhsandesh@gmail.com"
          className="font-mono-custom text-base text-foreground underline underline-offset-4 hover:text-primary transition-smooth"
        >
          gadakhsandesh@gmail.com
        </a>
        <div className="flex items-center justify-center gap-2 mt-6 font-mono-custom text-[11px] uppercase tracking-[0.15em] text-muted-foreground">
          <a href="#" className="hover:text-primary transition-smooth">LinkedIn</a>
          <span>·</span>
          <a href="#" className="hover:text-primary transition-smooth">GitHub</a>
          <span>·</span>
          <span>+91 74473 37272</span>
        </div>
      </div>
    </section>
  );
};

export default Contact;
