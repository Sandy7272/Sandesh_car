import { motion } from "framer-motion";
import { ArrowUp } from "lucide-react";

const EASE = [0.22, 1, 0.36, 1] as const;

const navItems = [
  { label: "Work", id: "work" },
  { label: "Experience", id: "experience" },
  { label: "About", id: "about" },
  { label: "Contact", id: "contact" },
];

const scrollTo = (id: string) => {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
};

const Footer = () => {
  const backToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <footer className="relative bg-[#060606] text-white overflow-hidden">
      <div className="container-custom pt-20 pb-8 md:pt-28 md:pb-10">
        {/* Giant name */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: EASE }}
          className="mb-16 md:mb-20"
        >
          <h2
            className="font-display font-black lowercase leading-[0.88] tracking-tight text-white/[0.04]"
            style={{ fontSize: "clamp(3rem, 14vw, 10rem)" }}
          >
            sandesh
            <br />
            gadakh
          </h2>
        </motion.div>

        {/* Bottom row */}
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-10 border-t border-white/[0.06] pt-8">
          {/* Nav links */}
          <nav className="flex flex-wrap gap-x-6 gap-y-2">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollTo(item.id)}
                className="font-body text-[13px] text-white/30 hover:text-white/70 transition-colors duration-300"
              >
                {item.label}
              </button>
            ))}
            <a
              href="https://www.linkedin.com/in/"
              target="_blank"
              rel="noopener noreferrer"
              className="font-body text-[13px] text-white/30 hover:text-white/70 transition-colors duration-300"
            >
              LinkedIn
            </a>
          </nav>

          {/* Right side */}
          <div className="flex items-center gap-6">
            <p className="font-mono-custom text-[10px] uppercase tracking-[0.15em] text-white/15">
              © {new Date().getFullYear()} Sandesh Gadakh
            </p>
            <button
              onClick={backToTop}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-white/[0.08] bg-white/[0.03] text-white/40 hover:bg-white/[0.08] hover:text-white transition-all duration-300"
              aria-label="Back to top"
            >
              <ArrowUp className="h-4 w-4" strokeWidth={2} />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
