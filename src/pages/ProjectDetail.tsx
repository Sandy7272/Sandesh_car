import { useParams, useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { MdArrowBack, MdArrowOutward } from "react-icons/md";
import { getProjectById, getRelatedProjects, type ProjectMedia } from "../data/projects";
import "./ProjectDetail.css";

const Media = ({ media }: { media: ProjectMedia }) => {
  if (media.kind === "video") {
    return (
      <video
        className="pd-media"
        src={media.src}
        poster={media.poster}
        autoPlay
        muted
        playsInline
        loop
      />
    );
  }
  return <img className="pd-media" src={media.src} alt={media.alt ?? ""} loading="lazy" />;
};

const ease = [0.22, 1, 0.36, 1] as const;

const ProjectDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const project = id ? getProjectById(id) : undefined;
  const related = id ? getRelatedProjects(id, 3) : [];

  if (!project) {
    return (
      <div className="pd-not-found">
        <h2>Project not found</h2>
        <button onClick={() => navigate("/")} className="pd-back-btn">
          <MdArrowBack /> Back to Home
        </button>
      </div>
    );
  }

  return (
    <motion.div
      className="pd-page"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Top Bar */}
      <div className="pd-topbar">
        <button onClick={() => navigate("/")} className="pd-back-btn" data-cursor="disable">
          <MdArrowBack /> Back
        </button>
        <span className="pd-topbar-category">{project.categoryLabel}</span>
      </div>

      {/* Hero */}
      <motion.div
        className="pd-hero"
        initial={{ opacity: 0, scale: 1.02 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease }}
      >
        <Media media={project.cover} />
        <div className="pd-hero-gradient" />
      </motion.div>

      {/* Content */}
      <div className="pd-content">
        <div className="pd-header">
          <motion.div
            className="pd-meta"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2, ease }}
          >
            <span className="pd-kicker">{project.categoryLabel} · {project.year}</span>
            <h1 className="pd-title">{project.title}</h1>
            <p className="pd-subtitle">{project.subtitle}</p>
            {project.client && (
              <p className="pd-client">Client: <strong>{project.client}</strong></p>
            )}
          </motion.div>

          <motion.div
            className="pd-actions"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.35, ease }}
          >
            {project.links?.map((l) => (
              <a
                key={l.href}
                href={l.href}
                target="_blank"
                rel="noreferrer"
                className="pd-link"
              >
                {l.label} <MdArrowOutward />
              </a>
            ))}
          </motion.div>
        </div>

        {/* Description + Tools */}
        <motion.div
          className="pd-body"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3, ease }}
        >
          <div className="pd-description">
            <h3>Overview</h3>
            <p>{project.description}</p>
          </div>

          <div className="pd-sidebar">
            <div className="pd-block">
              <h3>Tools & Tech</h3>
              <div className="pd-tags">
                {project.tools.map((t) => (
                  <span key={t} className="pd-tag">{t}</span>
                ))}
              </div>
            </div>

            <div className="pd-block">
              <h3>Highlights</h3>
              <ul className="pd-highlights">
                {project.highlights.map((h) => (
                  <li key={h}>{h}</li>
                ))}
              </ul>
            </div>
          </div>
        </motion.div>

        {/* Case Study (UI/UX projects) */}
        {project.caseStudy && (
          <motion.div
            className="pd-case-study"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4, ease }}
          >
            <h3 className="pd-section-title">Case Study</h3>
            <div className="pd-case-grid">
              <div className="pd-case-card">
                <h4>Problem</h4>
                <p>{project.caseStudy.problem}</p>
              </div>
              <div className="pd-case-card">
                <h4>Process</h4>
                <p>{project.caseStudy.process}</p>
              </div>
              <div className="pd-case-card">
                <h4>Outcome</h4>
                <p>{project.caseStudy.outcome}</p>
              </div>
            </div>
          </motion.div>
        )}

        {/* Gallery */}
        {project.gallery.length > 0 && (
          <motion.div
            className="pd-gallery-section"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.45, ease }}
          >
            <h3 className="pd-section-title">Gallery</h3>
            <div className="pd-gallery">
              {project.gallery.map((m, i) => (
                <div key={i} className="pd-gallery-item">
                  <Media media={m} />
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Related Projects */}
        {related.length > 0 && (
          <motion.div
            className="pd-related"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.5, ease }}
          >
            <h3 className="pd-section-title">More Projects</h3>
            <div className="pd-related-grid">
              {related.map((r) => (
                <Link
                  key={r.id}
                  to={`/project/${r.id}`}
                  className="pd-related-card"
                  onClick={() => window.scrollTo(0, 0)}
                >
                  <div className="pd-related-media">
                    <img
                      src={r.cover.kind === "image" ? r.cover.src : r.cover.poster ?? ""}
                      alt={r.title}
                      loading="lazy"
                    />
                  </div>
                  <div className="pd-related-info">
                    <span className="pd-related-cat">{r.categoryLabel}</span>
                    <h4>{r.title}</h4>
                  </div>
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

export default ProjectDetail;
