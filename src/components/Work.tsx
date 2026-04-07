import { useState, useRef, useEffect } from "react";
import { MdArrowOutward } from "react-icons/md";
import { workCategories } from "../data/workPortfolio";
import "./styles/Work.css";

const Work = () => {
  const [hoveredSlug, setHoveredSlug] = useState<string | null>(null);
  const sectionRef = useRef<HTMLDivElement>(null);

  const openCategory = (slug: string) => {
    window.dispatchEvent(new CustomEvent("open-work-detail", { detail: slug }));
  };

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

  return (
    <div className="work-section" id="work" ref={sectionRef}>
      <div className="work-container section-container">
        <div className="work-header">
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
                <div
                  className="work-cat-glow"
                  style={{ opacity: isHovered ? 1 : 0 }}
                />

                <div className="work-cat-mosaic">
                  {cat.pieces.slice(0, 3).map((p, j) => (
                    <div
                      className={`work-cat-thumb work-cat-thumb--${j}`}
                      key={p.id}
                    >
                      <img src={p.thumbnail} alt={p.title} loading="lazy" />
                    </div>
                  ))}
                </div>

                <div className="work-cat-info">
                  <span className="work-cat-icon">{cat.icon}</span>
                  <h3 className="work-cat-label">{i + 1}. {cat.label}</h3>
                  <p className="work-cat-tagline">{cat.tagline}</p>
                  <div className="work-cat-count">
                    {cat.pieces.length} projects
                  </div>
                </div>

                <div className="work-cat-arrow">
                  <MdArrowOutward />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Work;