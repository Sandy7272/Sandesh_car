import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = ["Work", "About", "Contact"];

const Header = () => {
  const [activeSection, setActiveSection] = useState("");
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    let rafId: number | null = null;

    const handleScroll = () => {
      if (rafId) cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        const sections = ["work", "about", "contact"];
        for (const id of sections.reverse()) {
          const el = document.getElementById(id);
          if (el && el.getBoundingClientRect().top <= 200) {
            setActiveSection(id);
            return;
          }
        }
        setActiveSection("");
      });
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  const scrollTo = (id: string) => {
    setMobileOpen(false);
    document.getElementById(id.toLowerCase())?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <header className="fixed top-0 left-0 w-full z-[100]">
        <div className="container-custom flex items-center justify-between h-16 sm:h-18 lg:h-20">
          <a href="#home" className="font-mono-custom uppercase text-[12px] tracking-[0.15em] text-foreground">
            <span className="font-bold">Portfolio,</span> Sandesh
          </a>
          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <button
                key={link}
                onClick={() => scrollTo(link)}
                className="font-mono-custom uppercase text-[11px] tracking-[0.15em] text-muted-foreground hover:text-primary transition-smooth relative"
              >
                {activeSection === link.toLowerCase() && (
                  <span className="absolute -left-3 top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-primary" />
                )}
                {link}
              </button>
            ))}
          </nav>
          {/* Mobile hamburger */}
          <button
            className="md:hidden flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/[0.03]"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
          >
            <span className="flex flex-col gap-1.5">
              <span className={`block w-5 h-[1px] bg-foreground transition-all duration-300 ${mobileOpen ? "rotate-45 translate-y-[3.5px]" : ""}`} />
              <span className={`block w-5 h-[1px] bg-foreground transition-all duration-300 ${mobileOpen ? "-rotate-45 -translate-y-[3.5px]" : ""}`} />
            </span>
          </button>
        </div>
      </header>

      {/* Mobile overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[99] bg-black/60 backdrop-blur-sm"
              onClick={() => setMobileOpen(false)}
            />
            <motion.aside
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              className="fixed right-0 top-0 z-[100] h-screen w-[82%] max-w-[360px] border-l border-white/10 bg-[#0a0a0a] px-6 pt-24"
            >
              <nav className="flex flex-col gap-4">
                {navLinks.map((link) => (
                  <button
                    key={link}
                    onClick={() => scrollTo(link)}
                    className="w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-4 text-left font-body text-lg text-white transition-smooth active:scale-[0.98]"
                  >
                    {link}
                  </button>
                ))}
              </nav>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Header;
