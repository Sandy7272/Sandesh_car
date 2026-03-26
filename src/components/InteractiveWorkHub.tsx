import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { workCategories } from "@/data/workCategories";

const InteractiveWorkHub = () => {
  const [active, setActive] = useState(0);
  const MotionLink = motion(Link);

  return (
    <section className="bg-[#0a0a0a] py-16 md:py-24">
      <div className="container-custom px-4 md:px-6">
        <div className="mb-8 md:mb-10">
          <p className="font-mono-custom text-[10px] uppercase tracking-[0.2em] text-white/45">
            Main Experience
          </p>
          <h2 className="mt-2 font-body text-[clamp(2rem,4.6vw,4rem)] font-semibold leading-[1.05] tracking-tight text-white">
            Work categories
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-5 xl:grid-cols-4">
          {workCategories.map((cat, i) => {
            const isActive = active === i;
            return (
              <MotionLink
                key={cat.slug}
                to={`/work/${cat.slug}`}
                onMouseEnter={() => setActive(i)}
                layout
                transition={{ layout: { duration: 0.45, ease: [0.22, 1, 0.36, 1] } }}
                whileHover={{ scale: 1.03 }}
                className="group relative block min-h-[380px] overflow-hidden rounded-[1.4rem] border border-white/10 bg-[#121212] md:min-h-[420px]"
              >
                <div className="absolute inset-0" style={{ background: cat.gradient }} />
                <motion.img
                  src={cat.previewImage}
                  alt={cat.title}
                  loading="lazy"
                  className="absolute inset-0 h-full w-full object-cover opacity-35 mix-blend-screen"
                  animate={{
                    scale: isActive ? 1.03 : 1,
                    filter: isActive ? "blur(0px)" : "blur(1.5px)",
                  }}
                  transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                <div className="relative z-10 flex h-full flex-col p-6 md:p-7">
                  <div className="mb-auto">
                    <p className="font-mono-custom text-[10px] uppercase tracking-[0.18em] text-white/55">
                      {cat.subtitle}
                    </p>
                    <h3 className="mt-2 font-body text-3xl md:text-4xl font-semibold text-white tracking-tight">
                      {cat.title}
                    </h3>
                  </div>

                  <div>
                    <p className="font-body text-[14px] leading-relaxed text-white/70 max-w-[36ch]">
                      {cat.description}
                    </p>
                    <span className="mt-5 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/[0.04] px-5 py-2.5 font-body text-[13px] font-semibold text-white transition-smooth group-hover:bg-white/[0.08]">
                      Explore
                      <ArrowUpRight className="h-4 w-4" />
                    </span>
                  </div>
                </div>

                {isActive && (
                  <motion.div
                    layoutId="cursorGlow"
                    className="pointer-events-none absolute -bottom-8 -right-8 h-28 w-28 rounded-full opacity-60 blur-xl"
                    style={{ background: cat.accent }}
                  />
                )}
              </MotionLink>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default InteractiveWorkHub;

