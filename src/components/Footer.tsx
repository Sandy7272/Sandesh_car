import { ArrowUp } from "lucide-react";
import { AnimatedSection } from "./AnimatedSection";

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
    <footer className="relative bg-background text-foreground overflow-hidden">
      <div className="container-custom pt-20 pb-8 md:pt-28 md:pb-10">
        <AnimatedSection>
          <h2
            className="font-display font-black lowercase leading-[0.88] tracking-tight text-foreground/[0.04]"
            style={{ fontSize: "clamp(3rem, 14vw, 10rem)" }}
          >
            sandesh
            <br />
            gadakh
          </h2>
        </AnimatedSection>

        <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-10 border-t border-foreground/[0.06] pt-8 mt-16 md:mt-20">
          <nav className="flex flex-wrap gap-x-6 gap-y-2">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollTo(item.id)}
                className="font-body text-[13px] text-foreground/30 hover:text-foreground/70 transition-colors duration-300"
              >
                {item.label}
              </button>
            ))}
            <a
              href="https://www.linkedin.com/in/sandesh-gadakh"
              target="_blank"
              rel="noopener noreferrer"
              className="font-body text-[13px] text-foreground/30 hover:text-foreground/70 transition-colors duration-300"
            >
              LinkedIn
            </a>
            <a
              href="https://github.com/Sandy7272"
              target="_blank"
              rel="noopener noreferrer"
              className="font-body text-[13px] text-foreground/30 hover:text-foreground/70 transition-colors duration-300"
            >
              GitHub
            </a>
          </nav>

          <div className="flex items-center gap-6">
            <p className="font-mono-custom text-[10px] uppercase tracking-[0.15em] text-foreground/15">
              © {new Date().getFullYear()} Sandesh Gadakh
            </p>
            <button
              onClick={backToTop}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-foreground/[0.08] bg-foreground/[0.03] text-foreground/40 hover:bg-foreground/[0.08] hover:text-foreground transition-all duration-300"
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
