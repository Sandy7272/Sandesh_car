import { useState, useEffect, useRef, useCallback } from "react";
import { MdClose, MdArrowOutward, MdArrowBack, MdArrowForward } from "react-icons/md";
import type { WorkCategory, WorkPiece, MediaItem } from "../data/workPortfolio";
import { workCategories, getCategoryBySlug } from "../data/workPortfolio";
import "./styles/WorkDetailPage.css";

/* ── tiny media renderer ────────────────── */
const Media = ({ media, className = "" }: { media: MediaItem; className?: string }) => {
  if (media.kind === "video")
    return (
      <video
        className={`wdp-media ${className}`}
        src={media.src}
        poster={media.poster}
        autoPlay muted playsInline loop controls={false}
      />
    );
  if (media.kind === "embed")
    return (
      <iframe
        className={`wdp-media wdp-embed ${className}`}
        src={media.src}
        title={media.title ?? ""}
        allow="autoplay; fullscreen; xr-spatial-tracking"
        allowFullScreen
      />
    );
  return <img className={`wdp-media ${className}`} src={media.src} alt={media.alt ?? ""} loading="lazy" />;
};

/* ── Lightbox ───────────────────────────── */
const Lightbox = ({
  items, startIdx, onClose,
}: { items: MediaItem[]; startIdx: number; onClose: () => void }) => {
  const [idx, setIdx] = useState(startIdx);
  const prev = () => setIdx((i) => (i === 0 ? items.length - 1 : i - 1));
  const next = () => setIdx((i) => (i === items.length - 1 ? 0 : i + 1));

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  return (
    <div className="wdp-lightbox" onClick={onClose}>
      <div className="wdp-lightbox-inner" onClick={(e) => e.stopPropagation()}>
        <Media media={items[idx]} className="wdp-lightbox-img" />
        {items.length > 1 && (
          <>
            <button className="wdp-lb-arrow wdp-lb-prev" onClick={prev}><MdArrowBack /></button>
            <button className="wdp-lb-arrow wdp-lb-next" onClick={next}><MdArrowForward /></button>
          </>
        )}
        <button className="wdp-lb-close" onClick={onClose}><MdClose /></button>
        <div className="wdp-lb-counter">{idx + 1} / {items.length}</div>
      </div>
    </div>
  );
};

/* ── Single piece card ──────────────────── */
const PieceCard = ({
  piece, accent, onOpenLightbox, style
}: {
  piece: WorkPiece; accent: string;
  onOpenLightbox: (items: MediaItem[], idx: number) => void;
  style?: React.CSSProperties;
}) => {
  const [expanded, setExpanded] = useState(false);
  const [imgLoaded, setImgLoaded] = useState(false);

  return (
    <div className={`wdp-piece ${expanded ? "wdp-piece--expanded" : ""}`} style={style}>
      {/* Live embed */}
      {piece.liveEmbedUrl && (
        <div className="wdp-live-embed">
          <div className="wdp-live-badge">● LIVE DEMO</div>
          <iframe
            src={piece.liveEmbedUrl}
            allow="autoplay; fullscreen; xr-spatial-tracking"
            allowFullScreen
            className="wdp-embed"
          />
        </div>
      )}

      {/* Thumbnail */}
      <div
        className={`wdp-piece-thumb ${!imgLoaded ? "loading" : ""}`}
        onClick={() => onOpenLightbox(piece.gallery.length ? piece.gallery : [{ kind: "image", src: piece.thumbnail }], 0)}
      >
        <img
          src={piece.thumbnail}
          alt={piece.title}
          loading="lazy"
          onLoad={() => setImgLoaded(true)}
        />
        <div className="wdp-piece-overlay">
          <span>View Gallery</span>
        </div>
      </div>

      {/* Info — restructured: subtitle → title → desc → tools → case study → link */}
      <div className="wdp-piece-body">
        {piece.subtitle && <p className="wdp-piece-subtitle">{piece.subtitle}</p>}
        <h3 className="wdp-piece-title">{piece.title}</h3>
        <p className="wdp-piece-desc">{piece.description}</p>

        <div className="wdp-piece-tools">
          {piece.tools.map((t) => (
            <span className="wdp-tool-tag" key={t} style={{ borderColor: `${accent}44` }}>
              {t}
            </span>
          ))}
        </div>

        {/* Case study expand */}
        {piece.caseStudy && (
          <button
            className="wdp-case-toggle"
            onClick={() => setExpanded(!expanded)}
          >
            {expanded ? "Case Study ↑" : "Case Study ↓"}
          </button>
        )}

        {expanded && piece.caseStudy && (
          <div className="wdp-case-study">
            <div className="wdp-case-block">
              <h4>Problem</h4>
              <p>{piece.caseStudy.problem}</p>
            </div>
            <div className="wdp-case-block">
              <h4>Process</h4>
              <p>{piece.caseStudy.process}</p>
            </div>
            <div className="wdp-case-block">
              <h4>Solution</h4>
              <p>{piece.caseStudy.solution}</p>
            </div>
            {piece.caseStudy.results && (
              <div className="wdp-case-block wdp-case-results">
                <h4>Results</h4>
                <p>{piece.caseStudy.results}</p>
              </div>
            )}
            {piece.caseStudy.wireframes && piece.caseStudy.wireframes.length > 0 && (
              <div className="wdp-case-images">
                <h4>Wireframes</h4>
                <div className="wdp-case-img-row">
                  {piece.caseStudy.wireframes.map((src, i) => (
                    <img key={i} src={src} alt={`Wireframe ${i + 1}`} loading="lazy"
                      onClick={() => onOpenLightbox(piece.caseStudy!.wireframes!.map(s => ({ kind: "image" as const, src: s })), i)} />
                  ))}
                </div>
              </div>
            )}
            {piece.caseStudy.finalScreens && piece.caseStudy.finalScreens.length > 0 && (
              <div className="wdp-case-images">
                <h4>Final Designs</h4>
                <div className="wdp-case-img-row">
                  {piece.caseStudy.finalScreens.map((src, i) => (
                    <img key={i} src={src} alt={`Final ${i + 1}`} loading="lazy"
                      onClick={() => onOpenLightbox(piece.caseStudy!.finalScreens!.map(s => ({ kind: "image" as const, src: s })), i)} />
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Gallery thumbnails */}
        {piece.gallery.length > 1 && (
          <div className="wdp-piece-gallery-row">
            {piece.gallery.slice(0, 4).map((m, i) => (
              <div
                className="wdp-piece-gallery-thumb"
                key={i}
                onClick={() => onOpenLightbox(piece.gallery, i)}
              >
                {m.kind === "image" ? (
                  <img src={m.src} alt={m.alt ?? ""} loading="lazy" />
                ) : m.kind === "video" ? (
                  <video src={m.src} poster={m.poster} muted />
                ) : null}
              </div>
            ))}
            {piece.gallery.length > 4 && (
              <div
                className="wdp-piece-gallery-thumb wdp-piece-gallery-more"
                onClick={() => onOpenLightbox(piece.gallery, 4)}
              >
                +{piece.gallery.length - 4}
              </div>
            )}
          </div>
        )}

        {/* External link */}
        {piece.externalUrl && (
          <a
            href={piece.externalUrl}
            target="_blank"
            rel="noreferrer"
            className="wdp-piece-ext"
            style={{ borderColor: `${accent}44`, color: accent }}
          >
            View Live <MdArrowOutward />
          </a>
        )}
      </div>
    </div>
  );
};

/* ── MAIN PAGE ──────────────────────────── */
const WorkDetailPage = () => {
  const [activeSlug, setActiveSlug] = useState<string | null>(null);
  const [lightbox, setLightbox] = useState<{ items: MediaItem[]; idx: number } | null>(null);
  const pageRef = useRef<HTMLDivElement>(null);
  const savedScrollY = useRef(0);

  const category: WorkCategory | undefined = activeSlug
    ? getCategoryBySlug(activeSlug)
    : undefined;

  /* Listen for open event from Work cards */
  useEffect(() => {
    const handler = (e: Event) => {
      const slug = (e as CustomEvent).detail;
      savedScrollY.current = window.scrollY;
      setActiveSlug(slug);
      document.body.style.overflow = "hidden";
    };
    window.addEventListener("open-work-detail", handler);
    return () => window.removeEventListener("open-work-detail", handler);
  }, []);

  const close = useCallback(() => {
    setActiveSlug(null);
    document.body.style.overflow = "";
    window.location.hash = "";
    // Restore scroll position
    requestAnimationFrame(() => {
      window.scrollTo({ top: savedScrollY.current, behavior: "instant" as ScrollBehavior });
    });
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && !lightbox) close();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [close, lightbox]);

  if (!activeSlug || !category) return null;

  return (
    <div
      className="wdp-overlay"
      ref={pageRef}
      style={{ "--page-accent": category.accent } as React.CSSProperties}
    >
      {/* Top bar — compact with category label in header */}
      <header className="wdp-header">
        <button className="wdp-back" onClick={close} data-cursor="disable">
          <MdArrowBack /> <span>Back</span>
        </button>

        <div className="wdp-header-cat">
          <span className="wdp-header-cat-icon">{category.icon}</span>
          <span className="wdp-header-cat-label">{category.label}</span>
        </div>

        {/* Category tabs */}
        <nav className="wdp-tabs">
          {workCategories.map((c) => (
            <button
              key={c.slug}
              className={`wdp-tab ${c.slug === activeSlug ? "wdp-tab--active" : ""}`}
              onClick={() => {
                setActiveSlug(c.slug);
                pageRef.current?.scrollTo({ top: 0, behavior: "smooth" });
              }}
              style={
                c.slug === activeSlug
                  ? { borderColor: c.accent, color: c.accent }
                  : undefined
              }
              data-cursor="disable"
            >
              <span className="wdp-tab-icon">{c.icon}</span>
              <span className="wdp-tab-label">{c.label}</span>
            </button>
          ))}
        </nav>

        <button className="wdp-close" onClick={close} data-cursor="disable">
          <MdClose />
        </button>
      </header>

      {/* Grid of pieces — no hero section */}
      <div className="wdp-grid">
        {category.pieces.map((piece, i) => (
          <PieceCard
            key={piece.id}
            piece={piece}
            accent={category.accent}
            onOpenLightbox={(items, idx) => setLightbox({ items, idx })}
            style={{ "--piece-delay": `${i * 0.08}s` } as React.CSSProperties}
          />
        ))}
      </div>

      {/* Lightbox */}
      {lightbox && (
        <Lightbox
          items={lightbox.items}
          startIdx={lightbox.idx}
          onClose={() => setLightbox(null)}
        />
      )}
    </div>
  );
};

export default WorkDetailPage;
