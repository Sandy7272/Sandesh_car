import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUp } from "lucide-react";

/** Case studies + project grid tiles in #work */
const WORK_COUNT = 8;

const scrollToId = (id: string) => {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
};

const navItems: { label: string; id: string; badge?: string }[] = [
  { label: "Home", id: "home" },
  { label: "About me", id: "about" },
  { label: "Works", id: "work", badge: `+ ${WORK_COUNT}` },
  { label: "Contact", id: "contact" },
];

const StarIcon = () => (
  <svg
    viewBox="0 0 24 24"
    className="w-3.5 h-3.5 shrink-0 text-white"
    fill="currentColor"
    aria-hidden
  >
    <path d="M12 2l1.8 7.2L21 12l-7.2 2.8L12 22l-1.8-7.2L3 12l7.2-2.8L12 2z" />
  </svg>
);

const Footer = () => {
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
    <footer className="relative bg-[#111111] text-white overflow-hidden">
      <div className="container-custom pt-16 pb-28 md:pb-24 px-4 md:px-8">
        {/* Top: name + menu */}
        <div className="flex items-start justify-between gap-6 mb-14 md:mb-16">
          <h2
            className="font-hero font-bold lowercase leading-[0.95] tracking-tight text-white max-w-[85%]"
            style={{ fontSize: "clamp(2.75rem, 11vw, 8rem)" }}
          >
            sandesh gadakh
          </h2>
          <div className="relative shrink-0 pt-2">
            <button
              type="button"
              onClick={() => setMenuOpen(!menuOpen)}
              className="flex h-12 w-12 items-center justify-center rounded-full bg-white text-[#111111] shadow-lg transition-transform hover:scale-105"
              aria-expanded={menuOpen}
              aria-label={menuOpen ? "Close menu" : "Open menu"}
            >
              <span className="flex flex-col gap-1.5">
                <span
                  className={`block h-0.5 w-4 bg-[#111111] transition-transform ${menuOpen ? "translate-y-[5px] rotate-45" : ""}`}
                />
                <span
                  className={`block h-0.5 w-4 bg-[#111111] transition-transform ${menuOpen ? "-translate-y-[5px] -rotate-45" : ""}`}
                />
              </span>
            </button>

            <AnimatePresence>
              {menuOpen && (
                <motion.nav
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.2 }}
                  className="absolute right-0 top-full z-10 mt-3 min-w-[200px] rounded-2xl border border-white/10 bg-[#1a1a1a] py-3 shadow-xl"
                >
                  {navItems.map(({ label, id }) => (
                    <button
                      key={id}
                      type="button"
                      onClick={() => go(id)}
                      className="flex w-full items-center gap-2 px-5 py-2.5 text-left font-body text-[15px] font-medium text-white/90 hover:bg-white/5"
                    >
                      {label}
                      {id === "work" && (
                        <span className="ml-auto rounded-full bg-[#d4e95d] px-2 py-0.5 font-mono text-[11px] font-semibold text-[#111111]">
                          + {WORK_COUNT}
                        </span>
                      )}
                    </button>
                  ))}
                </motion.nav>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Three cards */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3 md:gap-5">
          {/* Nav card */}
          <div className="flex flex-col gap-1 rounded-[20px] bg-[#1a1a1a] p-6 md:p-8">
            <nav className="flex flex-col gap-3">
              {navItems.map(({ label, id, badge }) => (
                <button
                  key={id}
                  type="button"
                  onClick={() => go(id)}
                  className="flex items-center gap-2 text-left font-body text-[15px] font-medium text-white transition-opacity hover:opacity-80"
                >
                  {label}
                  {badge && (
                    <span className="ml-1 rounded-full bg-[#d4e95d] px-2 py-0.5 font-mono text-[11px] font-semibold text-[#111111]">
                      {badge}
                    </span>
                  )}
                </button>
              ))}
            </nav>
          </div>

          {/* Contact card */}
          <div className="flex flex-col gap-3">
            <a
              href="mailto:gadakhsandesh@gmail.com"
              className="flex items-center gap-3 rounded-[20px] bg-[#1a1a1a] p-5 md:p-6 transition-opacity hover:opacity-90"
            >
              <StarIcon />
              <span className="font-body text-[14px] text-white/95">
                gadakhsandesh@gmail.com
              </span>
            </a>
            <a
              href="tel:+917447337272"
              className="flex items-center gap-3 rounded-[20px] bg-[#1a1a1a] p-5 md:p-6 transition-opacity hover:opacity-90"
            >
              <StarIcon />
              <span className="font-body text-[14px] text-white/95">
                +91 74473 37272
              </span>
            </a>
          </div>

          {/* Social + copyright */}
          <div className="flex flex-col justify-between rounded-[20px] bg-[#1a1a1a] p-6 md:p-8">
            <div>
              <p className="font-body text-[15px] font-bold text-white">Follow me</p>
              <a
                href="https://www.linkedin.com/in/"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 inline-block font-body text-[14px] text-white/90 underline-offset-4 hover:underline"
              >
                LinkedIn
              </a>
            </div>
            <p className="mt-10 font-body text-[11px] leading-relaxed text-[#888888] md:mt-8">
              Sandesh Gadakh | 3D Artist & Creative Technologist © {new Date().getFullYear()}
            </p>
          </div>
        </div>
      </div>

      {/* Back to top */}
      <button
        type="button"
        onClick={backToTop}
        className="absolute bottom-6 right-4 md:right-8 flex h-11 w-11 items-center justify-center rounded-full bg-[#2a2a2a] text-[#b0b0b0] transition-colors hover:bg-[#333333] hover:text-white"
        aria-label="Back to top"
      >
        <ArrowUp className="h-5 w-5" strokeWidth={2} />
      </button>
    </footer>
  );
};

export default Footer;
