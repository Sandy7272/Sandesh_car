import { useState } from "react";
import { motion, type PanInfo } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";

const categories = [
  {
    id: "3d",
    title: "3D",
    description: "Dark, depth-heavy visuals with subtle spatial motion and lighting.",
    href: "/work/3d",
    gradient:
      "radial-gradient(ellipse at 25% 30%, rgba(96,180,255,0.35) 0%, rgba(0,0,0,0.0) 55%), linear-gradient(150deg,#0a0a0a 20%, #101726 100%)",
    glow: "rgba(96,180,255,0.28)",
  },
  {
    id: "motion",
    title: "Motion Graphics",
    description: "Animated gradients and cinematic pacing for high-energy visual narratives.",
    href: "/work/motion",
    gradient:
      "radial-gradient(ellipse at 75% 35%, rgba(162,155,254,0.4) 0%, rgba(0,0,0,0.0) 50%), linear-gradient(130deg,#140d22 0%, #0a0a0a 100%)",
    glow: "rgba(162,155,254,0.26)",
  },
  {
    id: "uiux",
    title: "UI/UX",
    description: "Minimal, sharp typography and clear structure with strong usability.",
    href: "/work/uiux",
    gradient:
      "radial-gradient(ellipse at 50% 20%, rgba(223,255,74,0.22) 0%, rgba(0,0,0,0) 45%), linear-gradient(180deg,#f7f8fb 0%, #d9dee8 100%)",
    glow: "rgba(223,255,74,0.24)",
  },
  {
    id: "video-to-3d",
    title: "Video-to-3D",
    description: "Tech-forward workflows with scan, reconstruction and delivery pipelines.",
    href: "/work/video-to-3d",
    gradient:
      "radial-gradient(ellipse at 70% 60%, rgba(120,80,255,0.32) 0%, rgba(0,0,0,0) 50%), linear-gradient(155deg,#120d1f 0%, #0a0a0a 100%)",
    glow: "rgba(120,80,255,0.26)",
  },
] as const;

const EASE = [0.22, 1, 0.36, 1] as const;
const MotionLink = motion(Link);

const Work = () => {
  const [activeId, setActiveId] = useState<string | null>(null);
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const onMobileCardAction = (id: string, href: string) => {
    const isMobile = typeof window !== "undefined" && window.innerWidth < 768;
    if (!isMobile) return;
    if (expandedId === id) {
      window.location.href = href;
      return;
    }
    setExpandedId(id);
  };

  const onMobileSwipe = (id: string, href: string, _e: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    const isMobile = typeof window !== "undefined" && window.innerWidth < 768;
    if (!isMobile) return;
    if (Math.abs(info.offset.x) > 72 || Math.abs(info.velocity.x) > 520) {
      window.location.href = href;
      return;
    }
    if (Math.abs(info.offset.y) < 24) setExpandedId(id);
  };

  return (
    <section id="work" className="relative overflow-hidden bg-[#0a0a0a] section-padding">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(1100px 520px at 18% 15%, hsl(var(--primary) / 0.1) 0%, transparent 55%), radial-gradient(1000px 500px at 85% 80%, rgba(120,80,255,0.1) 0%, transparent 60%)",
        }}
      />

      <div className="container-custom relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.65, ease: EASE }}
          className="mb-10 md:mb-12"
        >
          <p className="section-label mb-3">Selected Work</p>
          <h2 className="h2-fluid font-body font-semibold leading-[1.04] tracking-tight text-white">
            Interactive Work System
          </h2>
          <p className="body-fluid mt-4 max-w-[62ch] font-body leading-relaxed text-white/58">
            Explore by category. Each card opens a dedicated work space with focused projects and deeper details.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 md:gap-6 lg:gap-7">
          {categories.map((category, i) => {
            const dimmed = activeId !== null && activeId !== category.id && expandedId !== category.id;
            const expanded = expandedId === category.id;
            return (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.6, delay: i * 0.06, ease: EASE }}
              >
                <MotionLink
                  to={category.href}
                  drag={typeof window !== "undefined" && window.innerWidth < 768 ? "x" : false}
                  dragConstraints={{ left: 0, right: 0 }}
                  dragElastic={0.16}
                  onDragEnd={(e, info) => onMobileSwipe(category.id, category.href, e, info)}
                  onClick={(e) => {
                    const isMobile = typeof window !== "undefined" && window.innerWidth < 768;
                    if (!isMobile) return;
                    e.preventDefault();
                    onMobileCardAction(category.id, category.href);
                  }}
                  onHoverStart={() => setActiveId(category.id)}
                  onHoverEnd={() => setActiveId(null)}
                  className="group relative block overflow-hidden rounded-2xl border border-white/[0.1] bg-white/[0.03] p-6 md:p-7"
                  style={{
                    minHeight: "clamp(260px, 33vw, 350px)",
                    opacity: dimmed ? 0.5 : 1,
                  }}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  transition={{ duration: 0.45, ease: EASE }}
                >
                  <motion.div
                    aria-hidden
                    className="absolute inset-0"
                    style={{ background: category.gradient }}
                    whileHover={{ scale: 1.08 }}
                    transition={{ duration: 0.8, ease: EASE }}
                  />

                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/60 via-black/28 to-black/14" />

                  <motion.div
                    aria-hidden
                    className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full blur-2xl"
                    style={{ backgroundColor: category.glow, opacity: 0 }}
                    whileHover={{ opacity: 1 }}
                    transition={{ duration: 0.35, ease: EASE }}
                  />

                  <div className="relative z-10 flex h-full flex-col justify-between">
                    <div>
                      <p className="font-mono-custom text-[10px] uppercase tracking-[0.22em] text-white/60">
                        Category {String(i + 1).padStart(2, "0")}
                      </p>
                      <motion.h3
                        className="mt-4 font-body text-[clamp(1.65rem,3.2vw,2.6rem)] font-semibold leading-[1.02] tracking-tight text-white"
                        whileHover={{ color: "rgba(255,255,255,1)" }}
                        transition={{ duration: 0.3 }}
                      >
                        {category.title}
                      </motion.h3>
                      <motion.p
                        className={`mt-4 max-w-[34ch] font-body text-[14px] leading-relaxed text-white/72 transition-all duration-300 ${
                          expanded ? "max-h-40 opacity-100" : "max-h-24 opacity-90"
                        }`}
                        whileHover={{ color: "rgba(255,255,255,0.94)" }}
                        transition={{ duration: 0.3 }}
                      >
                        {category.description}
                      </motion.p>
                    </div>

                    <div className="mt-8 inline-flex min-h-[44px] w-fit items-center gap-2 rounded-full border border-white/[0.22] bg-black/20 px-4 py-2 font-mono-custom text-[11px] uppercase tracking-[0.16em] text-white/88">
                      {expanded ? "Tap again to open" : "Explore"}
                      <ArrowUpRight className="h-3.5 w-3.5" strokeWidth={2.2} />
                    </div>
                  </div>
                </MotionLink>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Work;