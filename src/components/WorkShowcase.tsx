import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { projects, categoryLabels, type ProjectCategory } from "../data/projects";
import "./styles/WorkShowcase.css";

const categories: ("all" | ProjectCategory)[] = ["all", "3d", "motion", "uiux", "development"];
const categoryDisplayLabels: Record<string, string> = {
  all: "All Work",
  ...categoryLabels,
};

const cardVariants = {
  hidden: { opacity: 0, y: 40, scale: 0.95, filter: "blur(8px)" },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    filter: "blur(0px)",
    transition: {
      delay: i * 0.08,
      duration: 0.7,
      ease: [0.22, 1, 0.36, 1],
    },
  }),
  exit: { opacity: 0, scale: 0.95, filter: "blur(6px)", transition: { duration: 0.3 } },
};

const WorkShowcase = () => {
  const [activeCategory, setActiveCategory] = useState<"all" | ProjectCategory>("all");
  const navigate = useNavigate();

  const filtered = useMemo(
    () =>
      activeCategory === "all"
        ? projects
        : projects.filter((p) => p.category === activeCategory),
    [activeCategory]
  );

  return (
    <section className="work-showcase" id="work">
      <div className="work-showcase-inner section-container">
        <motion.h2
          className="work-showcase-title"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          Selected <span>Work</span>
        </motion.h2>

        {/* Category Tabs */}
        <motion.div
          className="work-tabs"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          {categories.map((cat) => (
            <button
              key={cat}
              className={`work-tab ${activeCategory === cat ? "work-tab-active" : ""}`}
              onClick={() => setActiveCategory(cat)}
              data-cursor="disable"
            >
              {categoryDisplayLabels[cat]}
              {activeCategory === cat && (
                <motion.span className="work-tab-indicator" layoutId="tab-indicator" />
              )}
            </button>
          ))}
        </motion.div>

        {/* Project Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            className="work-grid"
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            {filtered.map((project, i) => (
              <motion.article
                key={project.id}
                className={`work-card ${project.gridSize === "large" ? "work-card-large" : ""}`}
                variants={cardVariants}
                custom={i}
                onClick={() => navigate(`/project/${project.id}`)}
                whileHover={{ y: -6 }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                data-cursor="disable"
              >
                <div className="work-card-media">
                  <img
                    src={project.cover.kind === "image" ? project.cover.src : project.cover.poster ?? ""}
                    alt={project.title}
                    loading="lazy"
                  />
                  <div className="work-card-overlay">
                    <span className="work-card-view">View Project →</span>
                  </div>
                </div>
                <div className="work-card-info">
                  <span className="work-card-category">{project.categoryLabel}</span>
                  <h3 className="work-card-title">{project.title}</h3>
                  <p className="work-card-subtitle">{project.subtitle}</p>
                  <div className="work-card-tools">
                    {project.tools.slice(0, 3).map((t) => (
                      <span key={t} className="work-card-tool">{t}</span>
                    ))}
                  </div>
                </div>
              </motion.article>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
};

export default WorkShowcase;
