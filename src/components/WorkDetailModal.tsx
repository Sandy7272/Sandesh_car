import { useEffect } from "react";
import { MdClose, MdArrowOutward } from "react-icons/md";
import type { WorkItem, WorkMedia } from "../data/workItems";
import "./styles/WorkDetailModal.css";

const Media = ({ media }: { media: WorkMedia }) => {
  if (media.kind === "video") {
    return (
      <video
        className="work-detail-media"
        src={media.src}
        poster={media.poster}
        autoPlay
        muted
        playsInline
        loop
        controls={false}
      />
    );
  }
  return <img className="work-detail-media" src={media.src} alt={media.alt ?? ""} loading="lazy" />;
};

type Props = {
  item: WorkItem;
  onClose: () => void;
};

const WorkDetailModal = ({ item, onClose }: Props) => {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    <div className="work-detail-overlay" role="dialog" aria-modal="true" aria-label={item.title}>
      <button className="work-detail-backdrop" onClick={onClose} aria-label="Close detail" />

      <div className="work-detail-panel">
        <div className="work-detail-top">
          <div className="work-detail-meta">
            <div className="work-detail-kicker">{item.category}</div>
            <h2 className="work-detail-title">{item.title}</h2>
            <p className="work-detail-overview">{item.overview}</p>
            <div className="work-detail-tags">
              {item.stack.map((t) => (
                <span className="work-detail-tag" key={t}>
                  {t}
                </span>
              ))}
            </div>
            <div className="work-detail-links">
              {item.links?.map((l) => (
                <a key={l.href} href={l.href} target="_blank" rel="noreferrer" className="work-detail-link">
                  {l.label} <MdArrowOutward />
                </a>
              ))}
            </div>
          </div>
          <button className="work-detail-close" onClick={onClose} aria-label="Close detail">
            <MdClose />
          </button>
        </div>

        <div className="work-detail-grid">
          <div className="work-detail-gallery">
            <div className="work-detail-hero">
              <Media media={item.cover} />
            </div>
            {item.gallery?.slice(0, 8).map((m, idx) => (
              <div className="work-detail-thumb" key={`${item.id}-${idx}`}>
                <Media media={m} />
              </div>
            ))}
          </div>
          <div className="work-detail-side">
            <div className="work-detail-block">
              <h3>Tools & focus</h3>
              <p>{item.tools}</p>
            </div>
            <div className="work-detail-block">
              <h3>Highlights</h3>
              <ul>
                {item.bullets.map((b) => (
                  <li key={b}>{b}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WorkDetailModal;

