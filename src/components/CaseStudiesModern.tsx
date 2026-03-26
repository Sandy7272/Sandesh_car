import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

const studies = [
  {
    id: "metashop",
    title: "Website design -\nMetaShop",
    tags: ["Website UX", "3D Product Design"],
    summary:
      "Building an enterprise-ready 3D viewer website focused on clarity, conversion, and product storytelling.",
    accent:
      "radial-gradient(ellipse at 78% 90%, rgba(120,80,255,0.45) 0%, rgba(120,80,255,0.04) 44%, transparent 65%)",
  },
  {
    id: "video-to-3d",
    title: "Website design -\nVideo-to-3D",
    tags: ["Data Driven Design", "Pipeline UX"],
    summary:
      "Clarifying a complex capture-to-3D pipeline through structured visuals, modular sections, and guided interaction.",
    accent:
      "radial-gradient(ellipse at 76% 88%, rgba(255,69,0,0.34) 0%, rgba(255,69,0,0.05) 42%, transparent 66%)",
  },
  {
    id: "real-estate",
    title: "Website design -\nReal Estate 3D",
    tags: ["Virtual Tours", "Conversion UX"],
    summary:
      "Turning property showcases into immersive, easy-to-navigate web journeys with clear hierarchy and action points.",
    accent:
      "radial-gradient(ellipse at 78% 90%, rgba(74,158,255,0.35) 0%, rgba(74,158,255,0.05) 45%, transparent 68%)",
  },
] as const;

const EASE = [0.22, 1, 0.36, 1] as const;

const CardVisual = ({ accent }: { accent: string }) => (
  <div className="relative h-full min-h-[220px] w-full overflow-hidden rounded-[1.4rem] bg-[#e7e5e5]">
    <div className="absolute inset-0" style={{ background: accent }} />
    <div className="absolute inset-0 bg-gradient-to-t from-black/[0.03] via-transparent to-transparent" />

    <motion.div
      className="absolute right-[8%] top-[15%] h-[72%] w-[72%] rounded-[1rem] border border-black/15 bg-white shadow-[0_18px_35px_rgba(0,0,0,0.18)]"
      style={{ transform: "rotate(-16deg)" }}
      whileHover={{ rotate: -12, scale: 1.03 }}
      transition={{ duration: 0.55, ease: EASE }}
    >
      <div className="h-[16%] w-full border-b border-black/10 bg-[#f6f6f6]" />
      <div className="grid h-[84%] w-full grid-cols-2 gap-2 p-2.5">
        <div className="rounded-md bg-[#111111]" />
        <div className="rounded-md bg-[#dcdcdc]" />
        <div className="col-span-2 rounded-md bg-[#ececec]" />
      </div>
    </motion.div>
  </div>
);

const StudyCard = ({
  title,
  tags,
  summary,
  accent,
  index,
}: {
  title: string;
  tags: readonly string[];
  summary: string;
  accent: string;
  index: number;
}) => (
  <motion.article
    initial={{ opacity: 0, y: 24 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount: 0.2 }}
    transition={{ duration: 0.65, ease: EASE, delay: Math.min(index * 0.08, 0.2) }}
    whileHover={{ y: -4, scale: 1.01 }}
    whileTap={{ scale: 0.98 }}
    className="relative overflow-hidden rounded-[2rem] border border-black/[0.08] bg-[#eceaea] px-7 py-7 shadow-[0_18px_50px_rgba(0,0,0,0.3)] md:px-10 md:py-10"
  >
    <div className="absolute right-4 top-4 z-20">
      <a
        href="#contact"
        className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-[#a79cff] text-white shadow-[0_12px_24px_rgba(120,80,255,0.3)] transition-transform hover:scale-105"
        aria-label="Open project discussion"
      >
        <ArrowUpRight className="h-5 w-5" />
      </a>
    </div>

    <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-[1fr_44%]">
      <div className="pr-2">
        <h3 className="whitespace-pre-line font-body text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold leading-[1.02] tracking-tight text-[#101010]">
          {title}
        </h3>

        <div className="mt-5 flex flex-wrap gap-2">
          {tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-black/15 bg-white/60 px-3.5 py-1.5 font-mono-custom text-[10px] uppercase tracking-[0.13em] text-black/60"
            >
              {tag}
            </span>
          ))}
        </div>

        <p className="body-fluid mt-6 max-w-[46ch] font-body leading-relaxed text-black/65">
          {summary}
        </p>
      </div>

      <CardVisual accent={accent} />
    </div>
  </motion.article>
);

const CaseStudiesModern = () => (
  <section id="work" className="relative bg-[#050505] py-16 md:py-24">
    <div className="container-custom space-y-8 px-4 md:space-y-10 md:px-6">
      <div className="max-w-3xl">
        <p className="section-label mb-3">Selected work</p>
        <h2 className="h2-fluid font-body font-semibold leading-[1.02] tracking-tight text-white">
          Web experience case studies
        </h2>
      </div>

      <div className="space-y-6 md:space-y-8">
        {studies.map((study, i) => (
          <StudyCard key={study.id} {...study} index={i} />
        ))}
      </div>
    </div>
  </section>
);

export default CaseStudiesModern;
