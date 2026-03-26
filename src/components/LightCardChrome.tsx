import { useId, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUp } from "lucide-react";

export const LIGHT_CARD_NAV = [
  { label: "Home", id: "home" },
  { label: "Work", id: "work" },
  { label: "About", id: "about" },
  { label: "Contact", id: "contact" },
] as const;

const scrollToId = (id: string) => {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
};

/** Chrome heart with unique gradient ids (safe when multiple on page). */
export const ChromeHeart = ({ className = "" }: { className?: string }) => {
  const uid = useId().replace(/:/g, "");
  const gMain = `chrome-main-${uid}`;
  const gShine = `chrome-shine-${uid}`;

  return (
    <span className={`inline-flex shrink-0 mt-1 ${className}`} aria-hidden>
      <svg width="36" height="36" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id={gMain} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="35%" stopColor="#b8b8b8" />
            <stop offset="55%" stopColor="#5c5c5c" />
            <stop offset="72%" stopColor="#d4d4d4" />
            <stop offset="100%" stopColor="#8a8a8a" />
          </linearGradient>
          <linearGradient id={gShine} x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.9" />
            <stop offset="50%" stopColor="#ffffff" stopOpacity="0" />
          </linearGradient>
        </defs>
        <path
          d="M24 41.2l-1.6-1.45C12.4 30.8 6 25.15 6 18.2c0-4.55 3.65-8.2 8.15-8.2 2.55 0 5 1.2 6.85 3.1A8.05 8.05 0 0 1 33.85 10c4.5 0 8.15 3.65 8.15 8.2 0 6.95-6.4 12.6-16.4 21.55L24 41.2z"
          fill={`url(#${gMain})`}
        />
        <path
          d="M24 41.2l-1.6-1.45C12.4 30.8 6 25.15 6 18.2c0-4.55 3.65-8.2 8.15-8.2 2.55 0 5 1.2 6.85 3.1A8.05 8.05 0 0 1 33.85 10c4.5 0 8.15 3.65 8.15 8.2 0 6.95-6.4 12.6-16.4 21.55L24 41.2z"
          fill={`url(#${gShine})`}
        />
      </svg>
    </span>
  );
};

/** Blurred metallic knot for depth (absolute positioning). */
export const LiquidChromeKnot = () => (
  <div
    className="pointer-events-none absolute -right-[20%] top-1/2 h-[140%] w-[70%] -translate-y-1/2 rounded-[50%] opacity-[0.35]"
    style={{
      background:
        "conic-gradient(from 140deg at 50% 50%, #c0c0c0, #6a6a6a, #e2e2e2, #7a7a7a, #d8d8d8, #5a5a5a, #c0c0c0)",
      filter: "blur(48px)",
    }}
    aria-hidden
  />
);

/** Helmet, envelope, orb cluster — reference-style liquid chrome. */
export const LiquidChromeCluster = ({ className = "" }: { className?: string }) => (
  <div
    className={`relative mx-auto flex h-[240px] w-full max-w-[420px] items-center justify-center lg:mx-0 lg:h-[320px] lg:max-w-none ${className}`}
  >
    <div
      className="absolute right-[8%] top-[18%] h-28 w-36 rotate-[-12deg] rounded-lg shadow-2xl md:h-[8.5rem] md:w-[10rem]"
      style={{
        background: "linear-gradient(145deg, #f0f0f0 0%, #9a9a9a 45%, #5a5a5a 100%)",
        boxShadow: "inset 0 2px 6px rgba(255,255,255,0.85), 0 16px 40px rgba(0,0,0,0.25)",
      }}
    >
      <div
        className="absolute left-[15%] top-[22%] h-[42%] w-[70%] rounded-[999px] opacity-90"
        style={{
          background: "linear-gradient(180deg, rgba(0,0,0,0.55) 0%, rgba(60,60,60,0.85) 100%)",
          boxShadow: "inset 0 0 20px rgba(255,255,255,0.25)",
        }}
      />
    </div>

    <div
      className="absolute left-[12%] top-[28%] h-16 w-20 rotate-[8deg] rounded-md md:h-[4.5rem] md:w-[5.5rem]"
      style={{
        background: "linear-gradient(125deg, #eaeaea, #7d7d7d)",
        boxShadow: "0 12px 28px rgba(0,0,0,0.2), inset 0 1px 0 rgba(255,255,255,0.9)",
      }}
    >
      <div className="absolute inset-x-[18%] top-[32%] h-[2px] rounded-full bg-[#4a4a4a]/60" />
      <div className="absolute inset-x-[18%] top-[52%] h-[2px] rounded-full bg-[#4a4a4a]/40" />
    </div>

    <div
      className="absolute -bottom-1 right-[18%] h-24 w-24 rounded-full md:h-28 md:w-28"
      style={{
        background: "radial-gradient(circle at 35% 30%, #ffffff 0%, #b0b0b0 35%, #4f4f4f 75%, #2a2a2a 100%)",
        boxShadow:
          "0 20px 50px rgba(0,0,0,0.35), inset -8px -8px 20px rgba(0,0,0,0.35), inset 12px 12px 24px rgba(255,255,255,0.35)",
      }}
    />
  </div>
);

/** Menu + back-to-top controls for light elevated cards. */
export const LightCardFloatingControls = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const go = (id: string) => {
    setMenuOpen(false);
    scrollToId(id);
  };

  const backToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    setMenuOpen(false);
  };

  return (
    <>
      <div className="absolute right-5 top-5 z-20 md:right-7 md:top-7">
        <button
          type="button"
          onClick={() => setMenuOpen(!menuOpen)}
          className="flex h-11 w-11 items-center justify-center rounded-full bg-white/90 text-[#111111] shadow-md backdrop-blur-sm transition-transform hover:scale-105"
          aria-expanded={menuOpen}
          aria-label={menuOpen ? "Close menu" : "Menu"}
        >
          <span className="flex flex-col gap-[5px]">
            <span
              className={`block h-[2px] w-[14px] rounded-full bg-[#111111] transition-transform ${menuOpen ? "translate-y-[3.5px] rotate-45" : ""}`}
            />
            <span
              className={`block h-[2px] w-[14px] rounded-full bg-[#111111] transition-transform ${menuOpen ? "-translate-y-[3.5px] -rotate-45" : ""}`}
            />
          </span>
        </button>

        <AnimatePresence>
          {menuOpen && (
            <motion.nav
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.2 }}
              className="absolute right-0 top-full z-30 mt-3 min-w-[180px] overflow-hidden rounded-2xl border border-black/10 bg-white py-2 shadow-xl"
            >
              {LIGHT_CARD_NAV.map(({ label, id }) => (
                <button
                  key={id}
                  type="button"
                  onClick={() => go(id)}
                  className="flex w-full px-5 py-2.5 text-left font-body text-[14px] font-medium text-[#111111] hover:bg-black/[0.04]"
                >
                  {label}
                </button>
              ))}
            </motion.nav>
          )}
        </AnimatePresence>
      </div>

      <button
        type="button"
        onClick={backToTop}
        className="absolute bottom-5 right-5 z-20 flex h-10 w-10 items-center justify-center rounded-full border border-black/[0.08] bg-white/85 text-[#333333] shadow-sm backdrop-blur-sm transition-colors hover:bg-white md:bottom-7 md:right-7"
        aria-label="Back to top"
      >
        <ArrowUp className="h-4 w-4" strokeWidth={2.2} />
      </button>
    </>
  );
};
