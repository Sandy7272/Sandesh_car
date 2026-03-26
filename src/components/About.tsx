import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowDown, ArrowUp, ArrowUpRight } from "lucide-react";
import { LIGHT_CARD_NAV } from "@/components/LightCardChrome";

const TITLES = [
  "Creative Technologist",
  "3D Artist",
  "Motion Designer",
  "Creative Developer",
];

const scrollToId = (id: string) => {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
};

const StarGlyph = () => (
  <svg className="h-3 w-3 shrink-0 text-white" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
    <path d="M12 2L13.5 8.5L22 12L13.5 15.5L12 22L10.5 15.5L2 12L10.5 8.5L12 2Z" />
  </svg>
);

const TypewriterTitle = ({ active }: { active: boolean }) => {
  const [display, setDisplay] = useState("");
  const timerRef = useRef<number>(0);

  useEffect(() => {
    if (!active) {
      window.clearTimeout(timerRef.current);
      return;
    }

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reducedMotion) {
      setDisplay(TITLES[0]);
      return;
    }

    const state = { ti: 0, i: 0, phase: "typing" as "typing" | "pause" | "deleting" };

    const step = () => {
      window.clearTimeout(timerRef.current);
      const full = TITLES[state.ti % TITLES.length];

      if (state.phase === "typing") {
        if (state.i < full.length) {
          state.i += 1;
          setDisplay(full.slice(0, state.i));
          timerRef.current = window.setTimeout(step, 52);
        } else {
          state.phase = "pause";
          timerRef.current = window.setTimeout(step, 2400);
        }
      } else if (state.phase === "pause") {
        state.phase = "deleting";
        timerRef.current = window.setTimeout(step, 320);
      } else {
        if (state.i > 0) {
          state.i -= 1;
          setDisplay(full.slice(0, state.i));
          timerRef.current = window.setTimeout(step, 28);
        } else {
          state.ti = (state.ti + 1) % TITLES.length;
          state.phase = "typing";
          timerRef.current = window.setTimeout(step, 480);
        }
      }
    };

    setDisplay("");
    state.ti = 0;
    state.i = 0;
    state.phase = "typing";
    step();

    return () => window.clearTimeout(timerRef.current);
  }, [active]);

  return (
    <h2
      className="font-body text-[clamp(2.1rem,5.6vw,4.1rem)] font-semibold leading-[1.05] tracking-tight text-white"
      aria-live="polite"
    >
      {display}
      <span className="typewriter-cursor ml-0.5 inline-block text-[#8f9a6b]" aria-hidden>
        _
      </span>
    </h2>
  );
};

const AboutMenu = () => {
  const [open, setOpen] = useState(false);
  const go = (id: string) => {
    setOpen(false);
    scrollToId(id);
  };

  return (
    <div className="relative z-30">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="flex h-11 w-11 items-center justify-center rounded-full bg-white text-[#111111] shadow-lg transition-transform hover:scale-105"
        aria-expanded={open}
        aria-label={open ? "Close menu" : "Menu"}
      >
        <span className="flex flex-col gap-[5px]">
          <span
            className={`block h-[2px] w-[14px] rounded-full bg-[#111111] transition-transform ${open ? "translate-y-[3.5px] rotate-45" : ""}`}
          />
          <span
            className={`block h-[2px] w-[14px] rounded-full bg-[#111111] transition-transform ${open ? "-translate-y-[3.5px] -rotate-45" : ""}`}
          />
        </span>
      </button>

      <AnimatePresence>
        {open && (
          <motion.nav
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.2 }}
            className="absolute right-0 top-full z-40 mt-3 min-w-[200px] overflow-hidden rounded-2xl border border-white/10 bg-[#141414] py-2 shadow-2xl ring-1 ring-white/5"
          >
            {LIGHT_CARD_NAV.map(({ label, id }) => (
              <button
                key={id}
                type="button"
                onClick={() => go(id)}
                className="flex w-full px-5 py-2.5 text-left font-body text-[14px] font-medium text-white/90 hover:bg-white/[0.06]"
              >
                {label}
              </button>
            ))}
          </motion.nav>
        )}
      </AnimatePresence>
    </div>
  );
};

const About = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [titleActive, setTitleActive] = useState(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([e]) => setTitleActive(e.isIntersecting),
      { threshold: 0.2 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const backToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative overflow-hidden bg-[#0a0a0a] py-20 md:py-28 lg:py-32"
    >
      <div
        className="pointer-events-none absolute right-0 top-[12%] z-10 hidden h-[55%] w-[3px] bg-[#ff6b6b] md:block"
        aria-hidden
      />

      <div className="container-custom relative z-10 px-6 md:px-12">
        <div className="mb-12 flex items-start justify-between gap-6 md:mb-16">
          <div className="flex items-center gap-2.5 text-white/90">
            <StarGlyph />
            <span className="font-mono-custom text-[11px] uppercase tracking-[0.22em]">About me</span>
          </div>
          <AboutMenu />
        </div>

        <TypewriterTitle active={titleActive} />

        <div className="mt-8 max-w-2xl space-y-6 md:mt-10">
          <p className="font-body text-[15px] leading-[1.88] text-white/75 md:text-base">
            👋 I&apos;m Sandesh Gadakh — a 3D artist, motion designer, and creative technologist based in Pune,
            India. I don&apos;t just design; I engineer experiences end to end.
          </p>
          <p className="font-body text-[15px] leading-[1.88] text-white/75 md:text-base">
            At MetaShop AI, I built the video-to-3D pipeline, the viewer product, and automated the production
            system. Previously at Byju&apos;s, I designed motion systems that reached millions — awarded Best
            Employee three times.
          </p>
        </div>

        <div className="mt-10 flex flex-wrap items-center gap-4">
          <a
            href="#contact"
            data-cursor
            className="group inline-flex items-center gap-2 rounded-full bg-[#ff6b6b] px-7 py-3.5 font-hero text-[14px] font-semibold text-[#0a0a0a] transition-[transform,filter] hover:brightness-[1.06] active:scale-[0.98] md:text-[15px]"
          >
            Let&apos;s talk
            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" strokeWidth={2.5} />
          </a>
          <a
            href="/resume.pdf"
            download
            className="group inline-flex items-center gap-2 rounded-full border border-white/35 bg-transparent px-7 py-3.5 font-hero text-[14px] font-semibold text-white transition-smooth hover:border-white/55 md:text-[15px]"
          >
            Download Resume
            <ArrowDown className="h-4 w-4 opacity-90" strokeWidth={2.4} />
          </a>
        </div>

        <div className="mt-14 grid grid-cols-2 gap-8 border-t border-white/[0.08] pt-10 md:max-w-xl">
          <div>
            <p className="font-mono-custom mb-2 text-[10px] uppercase tracking-[0.18em] text-white/45">Education</p>
            <p className="font-mono-custom text-[12px] text-white/80">Bachelor of Fine Arts</p>
          </div>
          <div>
            <p className="font-mono-custom mb-2 text-[10px] uppercase tracking-[0.18em] text-white/45">
              Certifications
            </p>
            <p className="font-mono-custom text-[12px] text-white/80">Unreal Engine · Blender · WebXR</p>
          </div>
        </div>
      </div>

      <div className="pointer-events-none absolute bottom-6 right-6 z-20 flex items-center gap-3 md:bottom-10 md:right-10">
        <div
          className="pointer-events-auto hidden rounded-full border border-dashed border-white/25 bg-[#121212]/90 px-4 py-2 lg:block"
          aria-hidden
        >
          <p className="font-mono-custom text-[9px] uppercase tracking-[0.2em] text-white/55">Open to work · 2025</p>
        </div>
        <button
          type="button"
          onClick={backToTop}
          className="pointer-events-auto flex h-11 w-11 items-center justify-center rounded-full border border-white/12 bg-[#161616] text-white transition-colors hover:bg-[#1c1c1c]"
          aria-label="Back to top"
        >
          <ArrowUp className="h-4 w-4" strokeWidth={2.2} />
        </button>
      </div>
    </section>
  );
};

export default About;
