<<<<<<< HEAD
import { useState, useRef, useEffect } from "react";
import { MdArrowOutward } from "react-icons/md";
import { workCategories } from "../data/workPortfolio";
import "./styles/Work.css";

const Work = () => {
  const [hoveredSlug, setHoveredSlug] = useState<string | null>(null);
  const sectionRef = useRef<HTMLDivElement>(null);

  /* Navigate to detail page */
  const openCategory = (slug: string) => {
    window.dispatchEvent(new CustomEvent("open-work-detail", { detail: slug }));
  };

  /* Parallax tilt on hover */
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>, slug: string) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 12;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * -12;
    card.style.transform = `perspective(800px) rotateY(${x}deg) rotateX(${y}deg) scale(1.02)`;
    setHoveredSlug(slug);
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    e.currentTarget.style.transform = "";
    setHoveredSlug(null);
  };

  /* Intersection Observer for scroll reveal */
  useEffect(() => {
    const cards = sectionRef.current?.querySelectorAll(".work-cat-card");
    if (!cards) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            (entry.target as HTMLElement).classList.add("work-cat-card--visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );
    cards.forEach((c) => observer.observe(c));
    return () => observer.disconnect();
  }, []);
=======
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { MdArrowOutward } from "react-icons/md";
import { workCategories, workItems } from "../data/workItems";
import "./styles/Work.css";

const Work = () => {
  const navigate = useNavigate();
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>, idx: number) => {
    const card = cardRefs.current[idx];
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 8;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * -8;
    card.style.transform = `perspective(800px) rotateY(${x}deg) rotateX(${y}deg) scale3d(1.03, 1.03, 1.03)`;
  };

  const handleMouseLeave = (idx: number) => {
    setHoveredIdx(null);
    const card = cardRefs.current[idx];
    if (card) card.style.transform = "perspective(800px) rotateY(0) rotateX(0) scale3d(1,1,1)";
  };
>>>>>>> 128591712244bdc8736831dd58920d98227e584b

  return (
    <div className="work-section" id="work" ref={sectionRef}>
      <div className="work-container section-container">
        <div className="work-header">
<<<<<<< HEAD
          <h2>
            My <span>Work</span>
          </h2>
          <p className="work-subtitle">
            Explore my creative universe — from polygons to pixels
          </p>
        </div>

        <div className="work-cat-grid">
          {workCategories.map((cat, i) => {
            const isHovered = hoveredSlug === cat.slug;
            return (
              <div
                className={`work-cat-card work-cat-card--${cat.slug}`}
                key={cat.slug}
                style={
                  {
                    "--cat-accent": cat.accent,
                    "--cat-delay": `${i * 0.12}s`,
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
                {/* Glow backdrop */}
                <div
                  className="work-cat-glow"
                  style={{ opacity: isHovered ? 1 : 0 }}
                />

                {/* Thumbnail mosaic */}
                <div className="work-cat-mosaic">
                  {cat.pieces.slice(0, 3).map((p, j) => (
                    <div
                      className={`work-cat-thumb work-cat-thumb--${j}`}
                      key={p.id}
                    >
                      <img src={p.thumbnail} alt={p.title} loading="lazy" />
=======
          <span className="work-kicker">Portfolio</span>
          <h2>Selected Work</h2>
          <p className="work-subtitle">Explore my projects across 3D, motion, AI pipelines, and product design.</p>
        </div>

        <div className="work-category-grid">
          {workCategories.map((cat, idx) => {
            const count = workItems.filter((w) => w.category === cat.slug).length;
            return (
              <div
                key={cat.slug}
                ref={(el) => { cardRefs.current[idx] = el; }}
                className={`work-category-card ${hoveredIdx === idx ? "is-hovered" : ""}`}
                onMouseEnter={() => setHoveredIdx(idx)}
                onMouseMove={(e) => handleMouseMove(e, idx)}
                onMouseLeave={() => handleMouseLeave(idx)}
                onClick={() => navigate(`/work/${cat.slug}`)}
                style={{ willChange: "transform" }}
                data-cursor="disable"
              >
                <div className="work-card-image">
                  <img src={cat.cover} alt={cat.title} loading="lazy" />
                  <div className="work-card-overlay" />
                </div>
                <div className="work-card-content">
                  <div className="work-card-top">
                    <span className="work-card-count">{String(count).padStart(2, "0")} Projects</span>
                    <div className="work-card-arrow">
                      <MdArrowOutward />
>>>>>>> 128591712244bdc8736831dd58920d98227e584b
                    </div>
                  ))}
                </div>

                {/* Card info */}
                <div className="work-cat-info">
                  <span className="work-cat-icon">{cat.icon}</span>
                  <h3 className="work-cat-label">{i + 1}. {cat.label}</h3>
                  <p className="work-cat-tagline">{cat.tagline}</p>
                  <div className="work-cat-count">
                    {cat.pieces.length} projects
                  </div>
                  <div className="work-card-bottom">
                    <h3>{cat.title}</h3>
                    <p className="work-card-sub">{cat.subtitle}</p>
                    <p className="work-card-desc">{cat.description}</p>
                  </div>
                </div>
<<<<<<< HEAD

                {/* Arrow */}
                <div className="work-cat-arrow">
                  <MdArrowOutward />
                </div>
=======
>>>>>>> 128591712244bdc8736831dd58920d98227e584b
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Work;
