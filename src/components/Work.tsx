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

  return (
    <div className="work-section" id="work">
      <div className="work-container section-container">
        <div className="work-header">
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
                    </div>
                  </div>
                  <div className="work-card-bottom">
                    <h3>{cat.title}</h3>
                    <p className="work-card-sub">{cat.subtitle}</p>
                    <p className="work-card-desc">{cat.description}</p>
                  </div>
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
