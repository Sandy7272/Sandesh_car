import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, Download } from "lucide-react";

const cardBase =
  "rounded-[1.35rem] md:rounded-[1.75rem] border border-white/[0.06] bg-[#141414] overflow-hidden";

const scrollTo = (id: string) => {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
};

const bentoNav = [
  { label: "Home", id: "home" },
  { label: "Work", id: "work" },
  { label: "About", id: "about" },
  { label: "Contact", id: "contact" },
];

const HERO_LINES = [
  "I build purposeful 3D & motion.",
  "Real-time viewers. Pipeline tooling.",
  "Creative technology, shipped.",
];

const SphereOrb = () => (
  <div className="relative mx-auto flex h-36 w-36 items-center justify-center md:h-44 md:w-44">
    <div
      className="absolute inset-0 rounded-full opacity-40 blur-2xl"
      style={{
        background: "radial-gradient(circle, rgba(74,222,128,0.55) 0%, transparent 65%)",
      }}
    />
    <div
      className="relative h-full w-full rounded-full"
      style={{
        background: `
          radial-gradient(circle at 32% 28%, #86efac 0%, transparent 42%),
          radial-gradient(circle at 70% 65%, #14532d 0%, #052e16 85%)
        `,
        boxShadow: `
          inset -12px -16px 28px rgba(0,0,0,0.55),
          inset 8px 12px 20px rgba(255,255,255,0.15),
          0 24px 48px rgba(0,0,0,0.45)
        `,
      }}
    >
      <div
        className="absolute inset-0 rounded-full opacity-25"
        style={{
          backgroundImage: `repeating-linear-gradient(
            -18deg,
            transparent 0 3px,
            rgba(0,0,0,0.12) 3px 4px
          )`,
        }}
      />
    </div>
  </div>
);

const BentoTypewriter = ({ active }: { active: boolean }) => {
  const [display, setDisplay] = useState("");
  const t = useRef<number>(0);
  const state = useRef({ li: 0, i: 0, phase: "typing" as "typing" | "pause" | "deleting" });

  useEffect(() => {
    if (!active) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      setDisplay(HERO_LINES[0]);
      return;
    }

    const tick = () => {
      window.clearTimeout(t.current);
      const full = HERO_LINES[state.current.li % HERO_LINES.length];
      const { phase } = state.current;

      if (phase === "typing") {
        if (state.current.i < full.length) {
          state.current.i += 1;
          setDisplay(full.slice(0, state.current.i));
          t.current = window.setTimeout(tick, 42);
        } else {
          state.current.phase = "pause";
          t.current = window.setTimeout(tick, 2000);
        }
      } else if (phase === "pause") {
        state.current.phase = "deleting";
        t.current = window.setTimeout(tick, 280);
      } else {
        if (state.current.i > 0) {
          state.current.i -= 1;
          setDisplay(full.slice(0, state.current.i));
          t.current = window.setTimeout(tick, 22);
        } else {
          state.current.li = (state.current.li + 1) % HERO_LINES.length;
          state.current.phase = "typing";
          t.current = window.setTimeout(tick, 400);
        }
      }
    };

    state.current = { li: 0, i: 0, phase: "typing" };
    setDisplay("");
    tick();
    return () => window.clearTimeout(t.current);
  }, [active]);

  return (
    <h2
      className="font-hero text-2xl font-bold leading-tight tracking-tight text-white md:text-3xl lg:text-[2rem]"
      aria-live="polite"
    >
      {display}
      <span className="typewriter-cursor ml-0.5 inline font-normal text-primary">_</span>
    </h2>
  );
};

const BentoGrid = () => {
  const ref = useRef<HTMLElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const ob = new IntersectionObserver(([e]) => setInView(e.isIntersecting), { threshold: 0.08 });
    ob.observe(el);
    return () => ob.disconnect();
  }, []);

  const fade = (delay: number) => ({
    initial: { opacity: 0, y: 16 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-40px" },
    transition: { duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] },
  });

  return (
    <section ref={ref} className="relative bg-[#050505] py-14 md:py-20 lg:py-24">
      <div className="container-custom px-4 md:px-6">
        <motion.p {...fade(0)} className="font-mono-custom mb-8 text-[10px] uppercase tracking-[0.22em] text-white/40 md:mb-10">
          Bento layout · snapshot
        </motion.p>

        <div className="bento-grid">
          {/* Featured build — left tall */}
          <motion.article {...fade(0.05)} className={`bento-brand ${cardBase} flex flex-col p-5 md:min-h-0`}>
            <div className="flex items-start gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white/5 text-sm font-hero font-bold text-primary">
                M
              </div>
              <div>
                <p className="font-hero text-[15px] font-semibold text-white">MetaShop viewer</p>
                <p className="mt-2 font-body text-[13px] leading-relaxed text-white/55">
                  Production 3D viewer & embed — React, Three.js, WebXR.
                </p>
              </div>
            </div>
            <div className="mt-auto flex flex-1 items-end pt-8">
              <div className="flex h-36 w-full items-center justify-center rounded-2xl bg-[#0c0c0c] ring-1 ring-white/[0.07]">
                <span className="font-mono-custom text-[10px] uppercase tracking-[0.2em] text-primary/90">
                  3D / Real-time
                </span>
              </div>
            </div>
          </motion.article>

          {/* Hero center — wide */}
          <motion.article {...fade(0)} className={`bento-hero ${cardBase} flex flex-col items-center p-6 text-center md:min-h-[340px] md:p-8`}>
            <div className="mb-6 flex flex-wrap items-center justify-center gap-1 rounded-full border border-white/[0.08] bg-white/[0.04] px-1.5 py-1 backdrop-blur-sm">
              {bentoNav.map(({ label, id }) => (
                <button
                  key={id}
                  type="button"
                  onClick={() => scrollTo(id)}
                  className={`rounded-full px-3 py-1.5 font-mono-custom text-[10px] uppercase tracking-[0.12em] transition-colors ${
                    label === "Home"
                      ? "bg-primary text-primary-foreground"
                      : "text-white/60 hover:text-white"
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>

            <SphereOrb />

            <div className="mt-7 max-w-md">
              <BentoTypewriter active={inView} />
              <p className="mt-3 font-body text-[13px] text-white/50">
                Motion &amp; interaction — always part of the idea.
              </p>
            </div>
          </motion.article>

          {/* Profile — right tall */}
          <motion.article {...fade(0.08)} className={`bento-profile ${cardBase} md:min-h-0`}>
            <div
              className="flex h-full min-h-[280px] flex-col items-center justify-end bg-gradient-to-b from-[#1a1a1a] to-[#0a0a0a] p-6 md:min-h-0"
              style={{
                backgroundImage:
                  "radial-gradient(ellipse at 50% 20%, rgba(18,100,255,0.08), transparent 50%), linear-gradient(180deg, #1c1c1c 0%, #0d0d0d 100%)",
              }}
            >
              <div className="mb-auto mt-8 flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-white/15 to-white/5 ring-2 ring-white/10">
                <span className="font-hero text-3xl font-bold text-white">SG</span>
              </div>
              <p className="font-mono-custom text-[10px] uppercase tracking-[0.18em] text-white/40">Pune, India</p>
              <p className="mt-1 font-hero text-lg font-semibold text-white">Sandesh Gadakh</p>
            </div>
          </motion.article>

          {/* Open source / community — left tall row 2 */}
          <motion.article {...fade(0.1)} className={`bento-oss ${cardBase} flex flex-col justify-between p-5`}>
            <div>
              <p className="font-mono-custom text-[10px] uppercase tracking-[0.2em] text-white/40">Community</p>
              <p className="mt-2 font-hero text-lg font-semibold text-white">Talks &amp; tooling</p>
            </div>
            <div className="flex flex-1 flex-col items-center justify-center py-8">
              <div className="rounded-2xl bg-[#0c0c0c] px-6 py-4 ring-1 ring-white/10">
                <p className="text-center font-hero text-xl font-bold text-primary">WebXR</p>
                <p className="mt-1 text-center font-mono-custom text-[9px] uppercase tracking-[0.15em] text-white/45">
                  + Creative dev
                </p>
              </div>
            </div>
            <p className="font-body text-xs text-white/50">Sharing workflows across 3D &amp; the web.</p>
          </motion.article>

          {/* Media strip */}
          <motion.article {...fade(0.12)} className={`bento-media ${cardBase} group relative`}>
            <a href="#work" data-cursor className="relative flex aspect-[16/9] md:aspect-[2.2/1] items-end overflow-hidden">
              <div
                className="absolute inset-0 bg-gradient-to-br from-orange-950/80 via-background to-purple-950/40 transition-transform duration-700 group-hover:scale-105"
                style={{
                  backgroundImage:
                    "radial-gradient(circle at 20% 50%, rgba(255,69,0,0.25), transparent 45%), radial-gradient(circle at 80% 30%, rgba(120,80,255,0.2), transparent 40%)",
                }}
              />
              <div className="relative z-10 flex w-full items-center justify-between gap-4 bg-gradient-to-t from-black/90 to-transparent p-5">
                <p className="max-w-[75%] font-body text-[13px] font-medium leading-snug text-white">
                  From capture to interactive delivery — case studies inside.
                </p>
                <ArrowUpRight className="h-5 w-5 shrink-0 text-primary" strokeWidth={2} />
              </div>
            </a>
          </motion.article>

          {/* Tools */}
          <motion.article {...fade(0.14)} className={`bento-tools ${cardBase} p-5`}>
            <p className="font-mono-custom text-[10px] uppercase tracking-[0.2em] text-white/40">Tools I use</p>
            <div className="mt-4 flex flex-wrap gap-2">
              {["Blender", "Unreal", "Three.js", "React", "Figma"].map((tool) => (
                <span
                  key={tool}
                  className="rounded-xl border border-white/10 bg-white/[0.04] px-3 py-2 font-mono-custom text-[10px] uppercase tracking-[0.1em] text-white/75"
                >
                  {tool}
                </span>
              ))}
            </div>
          </motion.article>

          {/* Resume */}
          <motion.article {...fade(0.16)} className={`bento-resume ${cardBase} flex flex-col justify-center p-5`}>
            <a
              href="/resume.pdf"
              download
              className="group flex flex-col gap-2 text-[#ff6b6b] transition-colors hover:text-[#ff8f7a]"
            >
              <span className="text-xs" aria-hidden>
                ★ ★
              </span>
              <span className="font-hero text-base font-bold leading-tight md:text-lg">
                Download my
                <br />
                resume
              </span>
              <Download className="mt-1 h-4 w-4 opacity-80 transition-transform group-hover:translate-y-0.5" />
            </a>
          </motion.article>

          {/* Experience */}
          <motion.article {...fade(0.18)} className={`bento-exp ${cardBase} flex flex-col justify-between gap-4 p-6 sm:flex-row sm:items-center`}>
            <div>
              <p className="font-hero text-4xl font-bold text-white md:text-5xl">5+ yrs</p>
              <p className="mt-1 font-body text-sm text-white/50">Building 3D products, motion &amp; pipelines</p>
            </div>
            <div className="flex h-28 w-28 shrink-0 items-center justify-center rounded-3xl bg-gradient-to-br from-white/[0.08] to-transparent ring-1 ring-white/10">
              <span className="font-hero text-lg font-bold tracking-widest text-primary/90">3D</span>
            </div>
          </motion.article>
        </div>
      </div>
    </section>
  );
};

export default BentoGrid;
