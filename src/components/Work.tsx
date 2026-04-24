import { useState, useRef, useEffect, useCallback } from "react";
import { MdArrowOutward } from "react-icons/md";
import { workCategories } from "../data/workPortfolio";
import "./styles/Work.css";

const Work = () => {
  const [hoveredSlug, setHoveredSlug] = useState<string | null>(null);
  const sectionRef = useRef<HTMLDivElement>(null);

  const openCategory = (slug: string) => {
    window.dispatchEvent(new CustomEvent("open-work-detail", { detail: slug }));
  };

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>, slug: string) => {
      const card = e.currentTarget;
      const rect = card.getBoundingClientRect();
      const px = (e.clientX - rect.left) / rect.width;
      const py = (e.clientY - rect.top) / rect.height;
      card.style.setProperty("--mouse-x", `${px * 100}%`);
      card.style.setProperty("--mouse-y", `${py * 100}%`);
      setHoveredSlug(slug);
    },
    []
  );

  const handleMouseLeave = useCallback(() => {
    setHoveredSlug(null);
  }, []);

  useEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;

    const els = sectionRef.current?.querySelectorAll(".work-row, .work-feature");
    if (!els) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            (entry.target as HTMLElement).classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );
    els.forEach((c) => observer.observe(c));
    return () => observer.disconnect();
  }, []);

  // Featured first
  const sorted = [...workCategories].sort((a, b) => {
    if (a.featured && !b.featured) return -1;
    if (!a.featured && b.featured) return 1;
    return 0;
  });

  const featured = sorted.find((c) => c.featured);
  const rest = sorted.filter((c) => !c.featured);

  const totalProjects = workCategories.reduce((sum, c) => sum + c.pieces.length, 0);

  return (
    <div className="work-section" id="work" ref={sectionRef}>
      <div className="work-container section-container">
        {/* Editorial Header */}
        <div className="work-header">
          <div className="work-header-top">
            <span className="work-kicker">
              <span className="work-kicker-dot" /> Selected Work · 2024 — 2025
            </span>
            <span className="work-header-meta">
              {workCategories.length} Categories · {totalProjects} Projects
            </span>
          </div>
          <h2 className="work-title">
            Work that <em>moves</em><br />
            people, pixels & <span>polygons</span>.
          </h2>
        </div>

        {/* FEATURED — wide cinematic block */}
        {featured && (
          <div
            className="work-feature"
            style={{ ["--cat-accent" as string]: featured.accent } as React.CSSProperties}
            onMouseMove={(e) => handleMouseMove(e, featured.slug)}
            onMouseLeave={handleMouseLeave}
            onClick={() => openCategory(featured.slug)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => e.key === "Enter" && openCategory(featured.slug)}
            data-cursor="disable"
          >
            <div className="work-feature-glow" style={{ opacity: hoveredSlug === featured.slug ? 1 : 0 }} />

            <div className="work-feature-media">
              {featured.pieces.slice(0, 3).map((p, j) => (
                <div className={`work-feature-thumb work-feature-thumb--${j}`} key={p.id}>
                  <img src={p.thumbnail} alt={p.title} loading="lazy" />
                </div>
              ))}
              <div className="work-feature-vignette" />
            </div>

            <div className="work-feature-content">
              <div className="work-feature-badge">
                <span className="work-feature-pulse" />
                Featured Case
              </div>
              <h3 className="work-feature-title">
                <span className="work-feature-icon">{featured.icon}</span>
                {featured.label}
              </h3>
              <p className="work-feature-tagline">{featured.tagline}</p>
              <div className="work-feature-meta">
                <span>{featured.pieces.length} Projects</span>
                {featured.metric && <span className="dot">·</span>}
                {featured.metric && <span className="accent">{featured.metric}</span>}
              </div>
              <button className="work-feature-cta" tabIndex={-1}>
                Explore Case <MdArrowOutward />
              </button>
            </div>
          </div>
        )}

        {/* EDITORIAL LIST — numbered rows */}
        <div className="work-list">
          {rest.map((cat, i) => {
            const isHover = hoveredSlug === cat.slug;
            return (
              <div
                className="work-row"
                key={cat.slug}
                style={
                  {
                    "--cat-accent": cat.accent,
                    "--row-delay": `${i * 0.08}s`,
                  } as React.CSSProperties
                }
                onMouseMove={(e) => handleMouseMove(e, cat.slug)}
                onMouseLeave={handleMouseLeave}
                onClick={() => openCategory(cat.slug)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => e.key === "Enter" && openCategory(cat.slug)}
                data-cursor="disable"
              >
                <div className="work-row-num">0{i + 2}</div>

                <div className="work-row-main">
                  <div className="work-row-head">
                    <span className="work-row-icon">{cat.icon}</span>
                    <h3 className="work-row-label">{cat.label}</h3>
                    <span className="work-row-count">/ {cat.pieces.length} Projects</span>
                  </div>
                  <p className="work-row-tagline">{cat.tagline}</p>
                  {cat.metric && <span className="work-row-metric">{cat.metric}</span>}
                </div>

                {/* Peek thumbnails — appear on hover */}
                <div className="work-row-peek">
                  {cat.pieces.slice(0, 3).map((p, j) => (
                    <div
                      className={`work-row-peek-thumb peek-${j}`}
                      key={p.id}
                      style={{ transitionDelay: isHover ? `${j * 60}ms` : "0ms" }}
                    >
                      <img src={p.thumbnail} alt={p.title} loading="lazy" />
                    </div>
                  ))}
                </div>

                <div className="work-row-arrow">
                  <MdArrowOutward />
                </div>

                {/* Animated bottom border */}
                <span className="work-row-line" />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Work;
