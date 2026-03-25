import { motion } from "framer-motion";

const fadeUp = (delay: number) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] },
});

const Hero = () => {
  return (
    <section className="min-h-screen flex items-center section-padding">
      <div className="container-custom grid grid-cols-1 lg:grid-cols-[55%_45%] gap-12 lg:gap-8 items-center">
        {/* Left column */}
        <div className="space-y-8">
          <motion.div {...fadeUp(0)} className="flex items-center gap-2 font-mono-custom text-[11px] uppercase tracking-[0.15em] text-muted-foreground">
            Available for work <span className="inline-block w-2 h-2 rounded-full bg-green-500 animate-blink" />
          </motion.div>

          <div>
            <motion.h1
              {...fadeUp(0.08)}
              className="font-display italic text-foreground leading-[0.95]"
              style={{ fontSize: "clamp(4rem, 10vw, 9rem)" }}
            >
              Sandesh
            </motion.h1>
            <motion.h1
              {...fadeUp(0.16)}
              className="font-display italic text-primary leading-[0.95]"
              style={{ fontSize: "clamp(4rem, 10vw, 9rem)" }}
            >
              Gadakh.
            </motion.h1>
          </div>

          <motion.p {...fadeUp(0.24)} className="font-body text-base text-muted-foreground max-w-md leading-relaxed">
            3D Artist & Creative Technologist. Building immersive spatial experiences — from Gaussian Splatting to real-time AR/VR.
          </motion.p>

          <motion.div {...fadeUp(0.32)} className="flex flex-wrap gap-4">
            <a
              href="#work"
              className="inline-flex items-center font-mono-custom text-[12px] uppercase tracking-[0.15em] bg-primary text-primary-foreground px-7 py-3.5 rounded-full hover:brightness-110 transition-smooth"
            >
              View Work →
            </a>
            <a
              href="#"
              className="inline-flex items-center font-mono-custom text-[12px] uppercase tracking-[0.15em] border border-foreground/[0.15] text-foreground px-7 py-3.5 rounded-full hover:border-primary hover:text-primary transition-smooth"
            >
              Download CV
            </a>
          </motion.div>

          <motion.div {...fadeUp(0.4)} className="flex items-center gap-0 font-mono-custom text-[11px] uppercase tracking-[0.15em]">
            {[
              { num: "4+", label: "Years" },
              { num: "50+", label: "Projects" },
              { num: "3×", label: "Best Employee" },
            ].map((stat, i) => (
              <div key={i} className={`flex flex-col gap-1 ${i > 0 ? "border-l border-foreground/[0.07] pl-6 ml-6" : ""}`}>
                <span className="text-foreground text-lg font-display italic">{stat.num}</span>
                <span className="text-muted-foreground">{stat.label}</span>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Right column — featured project */}
        <motion.div
          {...fadeUp(0.3)}
          className="relative group cursor-pointer overflow-hidden rounded-lg aspect-[4/5] lg:aspect-[3/4]"
          style={{ background: "linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)" }}
        >
          <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent z-10" />
          <div className="absolute top-4 right-4 z-20">
            <span className="pill">2024</span>
          </div>
          <div className="absolute bottom-6 left-6 right-6 z-20">
            <p className="font-body text-foreground text-lg mb-2">L&T Realty Virtual Tour</p>
            <span className="pill">Real Estate · 3D</span>
          </div>
          <div className="absolute inset-0 transition-smooth group-hover:scale-[1.02] group-hover:brightness-110" style={{ background: "linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)" }} />
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
