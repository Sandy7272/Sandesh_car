import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useMotionValueEvent, useScroll } from "framer-motion";

const navLinks = [
  { label: "Work", id: "work" },
  { label: "Experience", id: "experience" },
  { label: "About", id: "about" },
  { label: "Contact", id: "contact" },
];

const EASE = [0.22, 1, 0.36, 1] as const;

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const lastY = useRef(0);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (y) => {
    const diff = y - lastY.current;
    setHidden(diff > 8 && y > 200);
    setScrolled(y > 60);
    lastY.current = y;
  });

  const scrollTo = (id: string) => {
    setMobileOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: hidden ? -100 : 0 }}
        transition={{ duration: 0.5, ease: EASE }}
        className="fixed top-0 left-0 w-full z-[100]"
      >
        <div
          className="transition-all duration-500"
          style={{
            background: scrolled
              ? "rgba(9,9,9,0.72)"
              : "transparent",
            backdropFilter: scrolled ? "blur(20px) saturate(1.4)" : "none",
            borderBottom: scrolled ? "1px solid rgba(255,255,255,0.05)" : "1px solid transparent",
          }}
        >
          <div className="container-custom flex items-center justify-between h-[72px] lg:h-[80px]">
            {/* Logo */}
            <motion.a
              href="#home"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: EASE }}
              className="flex items-center gap-3"
            >
              <div className="w-9 h-9 rounded-full bg-gradient-to-br from-white/15 to-white/5 border border-white/10 flex items-center justify-center">
                <span className="font-display text-[15px] font-bold text-white">S</span>
              </div>
              <span className="font-display text-[14px] font-medium text-white/90 hidden sm:block">
                Sandesh Gadakh
              </span>
            </motion.a>

            {/* Desktop nav */}
            <motion.nav
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4, ease: EASE }}
              className="hidden md:flex items-center gap-1"
            >
              {navLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => scrollTo(link.id)}
                  className="relative px-4 py-2 font-body text-[13px] font-medium text-white/55 hover:text-white transition-colors duration-300 group"
                >
                  {link.label}
                  <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-[1.5px] bg-[hsl(var(--primary))] group-hover:w-[60%] transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]" />
                </button>
              ))}
              <a
                href="mailto:gadakhsandesh@gmail.com"
                className="ml-4 px-5 py-2.5 rounded-full bg-white text-[#090909] font-body text-[12px] font-semibold tracking-[-0.01em] hover:bg-white/90 transition-colors duration-300"
              >
                Get in touch
              </a>
            </motion.nav>

            {/* Mobile hamburger */}
            <button
              className="md:hidden flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/[0.04]"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
            >
              <span className="flex flex-col gap-[5px]">
                <span className={`block w-5 h-[1.5px] bg-white transition-all duration-300 ${mobileOpen ? "rotate-45 translate-y-[3.25px]" : ""}`} />
                <span className={`block w-5 h-[1.5px] bg-white transition-all duration-300 ${mobileOpen ? "-rotate-45 -translate-y-[3.25px]" : ""}`} />
              </span>
            </button>
          </div>
        </div>
      </motion.header>

      {/* Full-screen mobile overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[99] bg-[#090909]/95 backdrop-blur-xl flex flex-col items-center justify-center"
            onClick={() => setMobileOpen(false)}
          >
            <nav className="flex flex-col items-center gap-2">
              {navLinks.map((link, i) => (
                <motion.button
                  key={link.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  transition={{ duration: 0.5, delay: i * 0.08, ease: EASE }}
                  onClick={(e) => { e.stopPropagation(); scrollTo(link.id); }}
                  className="font-display text-[2.5rem] font-bold text-white/90 hover:text-[hsl(var(--primary))] transition-colors py-2"
                >
                  {link.label}
                </motion.button>
              ))}
            </nav>
            <motion.a
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              href="mailto:gadakhsandesh@gmail.com"
              className="mt-10 px-8 py-3.5 rounded-full bg-white text-[#090909] font-body text-[14px] font-semibold"
              onClick={(e) => e.stopPropagation()}
            >
              Get in touch
            </motion.a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Header;
