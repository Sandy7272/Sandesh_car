"use client";

import * as React from "react";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Marquee from "react-fast-marquee";
import { cn } from "@/lib/utils";
import { Heart, ArrowUpRight, Mail, Phone, ChevronUp } from "lucide-react";
import { FaGithub, FaLinkedinIn, FaInstagram } from "react-icons/fa";
import { resume } from "../../data/resume";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

/* ── inline styles (theme-adaptive) ── */
const STYLES = `
@import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800;900&display=swap');

.cinematic-footer-wrapper {
  font-family: 'Plus Jakarta Sans', sans-serif;
  -webkit-font-smoothing: antialiased;

  --pill-bg-1: rgba(255,255,255,0.03);
  --pill-bg-2: rgba(255,255,255,0.01);
  --pill-shadow: rgba(0,0,0,0.5);
  --pill-highlight: rgba(255,255,255,0.1);
  --pill-inset-shadow: rgba(0,0,0,0.8);
  --pill-border: rgba(255,255,255,0.08);

  --pill-bg-1-hover: rgba(255,255,255,0.08);
  --pill-bg-2-hover: rgba(255,255,255,0.02);
  --pill-border-hover: rgba(255,255,255,0.2);
  --pill-shadow-hover: rgba(0,0,0,0.7);
  --pill-highlight-hover: rgba(255,255,255,0.2);
}

@keyframes footer-breathe {
  0% { transform: translate(-50%, -50%) scale(1); opacity: 0.6; }
  100% { transform: translate(-50%, -50%) scale(1.1); opacity: 1; }
}

@keyframes footer-scroll-marquee {
  from { transform: translateX(0); }
  to { transform: translateX(-50%); }
}

@keyframes footer-heartbeat {
  0%, 100% { transform: scale(1); filter: drop-shadow(0 0 5px rgba(239,68,68,0.5)); }
  15%, 45% { transform: scale(1.2); filter: drop-shadow(0 0 10px rgba(239,68,68,0.8)); }
  30% { transform: scale(1); }
}

.animate-footer-breathe {
  animation: footer-breathe 8s ease-in-out infinite alternate;
}

.animate-footer-heartbeat {
  animation: footer-heartbeat 2s cubic-bezier(0.25, 1, 0.5, 1) infinite;
}

.footer-bg-grid {
  background-size: 60px 60px;
  background-image:
    linear-gradient(to right, rgba(255,255,255,0.03) 1px, transparent 1px),
    linear-gradient(to bottom, rgba(255,255,255,0.03) 1px, transparent 1px);
  mask-image: linear-gradient(to bottom, transparent, black 30%, black 70%, transparent);
  -webkit-mask-image: linear-gradient(to bottom, transparent, black 30%, black 70%, transparent);
}

.footer-aurora {
  background: radial-gradient(
    circle at 50% 50%,
    rgba(94, 234, 212, 0.12) 0%,
    rgba(94, 234, 212, 0.04) 40%,
    transparent 70%
  );
}

.footer-glass-pill {
  background: linear-gradient(145deg, var(--pill-bg-1) 0%, var(--pill-bg-2) 100%);
  box-shadow:
      0 10px 30px -10px var(--pill-shadow),
      inset 0 1px 1px var(--pill-highlight),
      inset 0 -1px 2px var(--pill-inset-shadow);
  border: 1px solid var(--pill-border);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
}

.footer-glass-pill:hover {
  background: linear-gradient(145deg, var(--pill-bg-1-hover) 0%, var(--pill-bg-2-hover) 100%);
  border-color: var(--pill-border-hover);
  box-shadow:
      0 20px 40px -10px var(--pill-shadow-hover),
      inset 0 1px 1px var(--pill-highlight-hover);
}

.footer-giant-bg-text {
  font-size: 26vw;
  line-height: 0.75;
  font-weight: 900;
  letter-spacing: -0.05em;
  color: transparent;
  -webkit-text-stroke: 1px rgba(255,255,255,0.05);
  background: linear-gradient(180deg, rgba(255,255,255,0.1) 0%, transparent 60%);
  -webkit-background-clip: text;
  background-clip: text;
}

.footer-text-glow {
  background: linear-gradient(180deg, #eae5ec 0%, rgba(234,229,236,0.4) 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  filter: drop-shadow(0px 0px 20px rgba(234,229,236,0.15));
}
`;

/* ── Magnetic Button ── */
type MagneticButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> &
  React.AnchorHTMLAttributes<HTMLAnchorElement> & {
    as?: React.ElementType;
  };

const MagneticButton = React.forwardRef<HTMLElement, MagneticButtonProps>(
  ({ className, children, as: Component = "button", ...props }, forwardedRef) => {
    const localRef = useRef<HTMLElement>(null);

    useEffect(() => {
      if (typeof window === "undefined") return;
      const el = localRef.current;
      if (!el) return;

      const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (prefersReduced) return;

      const onMove = (e: MouseEvent) => {
        const rect = el.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        gsap.to(el, {
          x: x * 0.35,
          y: y * 0.35,
          scale: 1.05,
          ease: "power2.out",
          duration: 0.4,
        });
      };

      const onLeave = () => {
        gsap.to(el, {
          x: 0,
          y: 0,
          scale: 1,
          ease: "elastic.out(1, 0.3)",
          duration: 1.2,
        });
      };

      el.addEventListener("mousemove", onMove);
      el.addEventListener("mouseleave", onLeave);
      return () => {
        el.removeEventListener("mousemove", onMove);
        el.removeEventListener("mouseleave", onLeave);
      };
    }, []);

    return (
      <Component
        ref={(node: HTMLElement | null) => {
          (localRef as React.MutableRefObject<HTMLElement | null>).current = node;
          if (typeof forwardedRef === "function") forwardedRef(node);
          else if (forwardedRef)
            (forwardedRef as React.MutableRefObject<HTMLElement | null>).current = node;
        }}
        className={cn("cursor-pointer", className)}
        {...props}
      >
        {children}
      </Component>
    );
  }
);
MagneticButton.displayName = "MagneticButton";

/* ── Marquee ── */
const MarqueeItem = () => (
  <span className="inline-flex items-center gap-8 text-[clamp(14px,1.5vw,18px)] font-medium tracking-widest uppercase whitespace-nowrap px-6"
    style={{ color: "rgba(234,229,236,0.25)" }}
  >
    Creative Technologist ✦ 3D Artist ✦ Product Builder ✦ Motion Designer ✦
    WebGL Developer ✦ UI/UX Thinker ✦
  </span>
);

/* ── Social links ── */
const socialLinks = [
  { label: "GitHub", href: "https://github.com/Sandy7272", icon: FaGithub },
  { label: "LinkedIn", href: resume.links.linkedin, icon: FaLinkedinIn },
  { label: "Instagram", href: "https://www.instagram.com/sandesh_gadakh/", icon: FaInstagram },
];

/* ── MAIN FOOTER ── */
export function CinematicFooter() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const giantTextRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const linksRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined" || !wrapperRef.current) return;

    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        giantTextRef.current,
        { y: "10vh", scale: 0.8, opacity: 0 },
        {
          y: "0vh",
          scale: 1,
          opacity: 1,
          ease: "power1.out",
          scrollTrigger: {
            trigger: wrapperRef.current,
            start: "top 80%",
            end: "bottom bottom",
            scrub: 1,
          },
        }
      );

      gsap.fromTo(
        [headingRef.current, linksRef.current],
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: wrapperRef.current,
            start: "top 40%",
            end: "bottom bottom",
            scrub: 1,
          },
        }
      );
    }, wrapperRef);

    return () => ctx.revert();
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const year = new Date().getFullYear();

  return (
    <>
      <style>{STYLES}</style>

      <footer
        ref={wrapperRef}
        className="cinematic-footer-wrapper relative overflow-hidden"
        style={{ background: "var(--backgroundColor, #0a0e17)" }}
      >
        {/* Background layers */}
        <div className="absolute inset-0 footer-bg-grid pointer-events-none" />
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 w-[120%] h-[120%] animate-footer-breathe footer-aurora pointer-events-none" />
        </div>

        {/* Giant background text */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden">
          <div ref={giantTextRef} className="footer-giant-bg-text" aria-hidden="true">
            SANDESH
          </div>
        </div>

        {/* Marquee strip */}
        <div className="relative overflow-hidden py-6" style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
          <Marquee speed={40} gradient={false} autoFill={true}>
            <MarqueeItem />
            <MarqueeItem />
          </Marquee>
        </div>

        {/* Main content */}
        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 pt-24 pb-12">
          {/* Heading */}
          <div ref={headingRef} className="mb-20">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] mb-4" style={{ color: "var(--accentColor, #5eead4)" }}>
              Let's Connect
            </p>
            <h2 className="footer-text-glow text-[clamp(36px,6vw,80px)] font-extrabold leading-[0.95] tracking-tight max-w-4xl">
              Ready to build
              <br />
              something amazing?
            </h2>
          </div>

          {/* Links grid */}
          <div ref={linksRef} className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-20">
            {/* Contact */}
            <div className="space-y-4">
              <h4 className="text-sm font-bold uppercase tracking-[0.2em]" style={{ color: "rgba(234,229,236,0.4)" }}>Contact</h4>
              <MagneticButton
                as="a"
                href={`mailto:${resume.email}`}
                className="footer-glass-pill flex items-center gap-3 rounded-2xl px-5 py-3.5 text-sm w-fit"
                style={{ color: "rgba(234,229,236,0.7)" }}
                data-cursor="disable"
              >
                <Mail className="w-4 h-4" style={{ color: "var(--accentColor)" }} />
                {resume.email}
              </MagneticButton>
              <MagneticButton
                as="a"
                href={`tel:${resume.phone.replace(/[^+\d]/g, "")}`}
                className="footer-glass-pill flex items-center gap-3 rounded-2xl px-5 py-3.5 text-sm w-fit"
                style={{ color: "rgba(234,229,236,0.7)" }}
                data-cursor="disable"
              >
                <Phone className="w-4 h-4" style={{ color: "var(--accentColor)" }} />
                {resume.phone}
              </MagneticButton>
            </div>

            {/* Social */}
            <div className="space-y-4">
              <h4 className="text-sm font-bold uppercase tracking-[0.2em]" style={{ color: "rgba(234,229,236,0.4)" }}>Social</h4>
              {socialLinks.map((s) => (
                <MagneticButton
                  key={s.label}
                  as="a"
                  href={s.href}
                  target="_blank"
                  rel="noreferrer"
                  className="footer-glass-pill flex items-center gap-3 rounded-2xl px-5 py-3.5 text-sm w-fit group"
                  style={{ color: "rgba(234,229,236,0.7)" }}
                  data-cursor="disable"
                >
                  <s.icon className="w-4 h-4" style={{ color: "var(--accentColor)" }} />
                  {s.label}
                  <ArrowUpRight className="w-3.5 h-3.5 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
                </MagneticButton>
              ))}
            </div>

            {/* Scroll to top */}
            <div className="flex flex-col items-start md:items-end justify-between gap-6">
              <div>
                <h4 className="text-sm font-bold uppercase tracking-[0.2em] mb-3" style={{ color: "rgba(234,229,236,0.4)" }}>Education</h4>
                {resume.education.map((ed) => (
                  <p key={`${ed.title}-${ed.when}`} className="text-xs leading-relaxed" style={{ color: "rgba(234,229,236,0.45)" }}>
                    {ed.title}, {ed.org} — {ed.when}
                  </p>
                ))}
              </div>
              <MagneticButton
                onClick={scrollToTop}
                className="footer-glass-pill flex items-center gap-2 rounded-full px-5 py-3 text-xs font-semibold uppercase tracking-widest"
                style={{ color: "var(--accentColor)" }}
                data-cursor="disable"
              >
                <ChevronUp className="w-4 h-4" />
                Back to top
              </MagneticButton>
            </div>
          </div>

          {/* Bottom bar */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 pt-8" style={{ borderTop: "1px solid rgba(255,255,255,0.05)" }}>
            <p className="text-xs flex items-center gap-1.5" style={{ color: "rgba(234,229,236,0.35)" }}>
              © {year} Sandesh Gadakh. Crafted with
              <Heart className="w-3 h-3 animate-footer-heartbeat" style={{ color: "#ef4444" }} />
            </p>
            <p className="text-xs" style={{ color: "rgba(234,229,236,0.25)" }}>
              Creative Technologist · 3D Product Builder
            </p>
          </div>
        </div>
      </footer>
    </>
  );
}
