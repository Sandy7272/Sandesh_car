import { useParams, useNavigate } from "react-router-dom";
import { MdArrowBack, MdArrowOutward } from "react-icons/md";
import { workCategories, workItems, type WorkItem } from "../data/workItems";
import { useEffect, useState } from "react";
import WorkDetailModal from "../components/WorkDetailModal";
import "../components/styles/WorkCategoryPage.css";

const WorkCategoryPage = () => {
  const { category } = useParams<{ category: string }>();
  const navigate = useNavigate();
  const [selectedItem, setSelectedItem] = useState<WorkItem | null>(null);

  const catInfo = workCategories.find((c) => c.slug === category);
  const items = workItems.filter((w) => w.category === category);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [category]);

  if (!catInfo) {
    return (
      <div className="wcp-not-found">
        <p>Category not found.</p>
        <button onClick={() => navigate("/")}>Go Home</button>
      </div>
    );
  }

  return (
    <div className="wcp">
      {/* Header */}
      <header className="wcp-header">
        <button className="wcp-back" onClick={() => navigate("/#work")} data-cursor="disable">
          <MdArrowBack /> Back
        </button>
        <div className="wcp-hero">
          <span className="wcp-kicker">{catInfo.subtitle}</span>
          <h1>{catInfo.title}</h1>
          <p className="wcp-desc">{catInfo.description}</p>
          <div className="wcp-stat">
            <span className="wcp-stat-num">{items.length}</span>
            <span className="wcp-stat-label">Projects</span>
          </div>
        </div>
      </header>

      {/* Project Grid */}
      <section className="wcp-grid">
        {items.map((item, idx) => (
          <article
            key={item.id}
            className="wcp-card"
            onClick={() => setSelectedItem(item)}
            style={{ animationDelay: `${idx * 0.08}s` }}
            data-cursor="disable"
          >
            <div className="wcp-card-image">
              {item.cover.kind === "image" && (
                <img src={item.cover.src} alt={item.cover.alt ?? item.title} loading="lazy" />
              )}
              {item.cover.kind === "video" && (
                <video src={item.cover.src} poster={item.cover.poster} muted loop playsInline autoPlay />
              )}
              <div className="wcp-card-overlay" />
            </div>
            <div className="wcp-card-info">
              <div className="wcp-card-top">
                <span className="wcp-card-tools">{item.tools}</span>
                <div className="wcp-card-arrow"><MdArrowOutward /></div>
              </div>
              <h3>{item.title}</h3>
              <p>{item.overview}</p>
              <div className="wcp-card-stack">
                {item.stack.slice(0, 4).map((s) => (
                  <span key={s} className="wcp-tag">{s}</span>
                ))}
              </div>
            </div>
          </article>
        ))}
      </section>

      {selectedItem && (
        <WorkDetailModal item={selectedItem} onClose={() => setSelectedItem(null)} />
      )}
    </div>
  );
};

export default WorkCategoryPage;