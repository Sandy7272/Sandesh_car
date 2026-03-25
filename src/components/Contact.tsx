const Contact = () => (
  <section id="contact" className="section-padding min-h-[60vh] flex items-center">
    <div className="container-custom text-center">
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

export default Contact;
