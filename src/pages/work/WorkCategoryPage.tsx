import { motion } from "framer-motion";
import { Link } from "react-router-dom";

type WorkCategoryPageProps = {
  title: string;
  subtitle: string;
  description: string;
  light?: boolean;
  showViewer?: boolean;
};

const placeholderCards = [
  "Project One",
  "Project Two",
  "Project Three",
  "Project Four",
  "Project Five",
  "Project Six",
];

const WorkCategoryPage = ({
  title,
  subtitle,
  description,
  light = false,
  showViewer = true,
}: WorkCategoryPageProps) => {
  const bg = light ? "bg-[#f6f7fb] text-[#0a0a0a]" : "bg-[#0a0a0a] text-white";
  const card = light
    ? "border-black/10 bg-white text-[#111]"
    : "border-white/10 bg-white/[0.03] text-white";

  return (
    <main className={`min-h-screen ${bg}`}>
      <section className="container-custom px-4 md:px-6 pt-12 md:pt-16 pb-20">
        <div className="flex items-center justify-between gap-4">
          <Link
            to="/"
            className={`rounded-full border px-4 py-2 text-sm font-body transition-smooth ${
              light ? "border-black/20 hover:bg-black/[0.05]" : "border-white/20 hover:bg-white/[0.06]"
            }`}
          >
            Back Home
          </Link>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          className="mt-10 md:mt-14"
        >
          <p className={`font-mono-custom text-[10px] uppercase tracking-[0.2em] ${light ? "text-black/50" : "text-white/55"}`}>
            {subtitle}
          </p>
          <h1 className="mt-3 font-body text-[clamp(2.2rem,6vw,5rem)] leading-[1.02] font-semibold tracking-tight">
            {title}
          </h1>
          <p className={`mt-5 max-w-2xl font-body text-[15px] leading-[1.9] ${light ? "text-[#333]" : "text-white/70"}`}>
            {description}
          </p>
        </motion.div>

        {showViewer && (
          <motion.section
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className={`mt-10 overflow-hidden rounded-[1.25rem] border p-5 md:p-6 ${card}`}
          >
            <div
              className="relative aspect-[16/8] w-full overflow-hidden rounded-[1rem]"
              style={{
                background:
                  "radial-gradient(ellipse at 30% 35%, rgba(120,130,255,0.25) 0%, transparent 60%), linear-gradient(135deg, #111 0%, #1a1a1a 100%)",
              }}
            >
              <div className="absolute left-4 top-4 rounded-full border border-white/20 bg-black/30 px-3 py-1 font-mono-custom text-[10px] uppercase tracking-[0.14em] text-white/90">
                Viewer placeholder
              </div>
            </div>
          </motion.section>
        )}

        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
          {placeholderCards.map((name, i) => (
            <motion.article
              key={name}
              initial={{ opacity: 0, y: 16, filter: "blur(6px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ duration: 0.6, delay: i * 0.06, ease: [0.22, 1, 0.36, 1] }}
              className={`overflow-hidden rounded-[1.2rem] border ${card}`}
            >
              <div
                className="aspect-[16/10]"
                style={{
                  background:
                    "radial-gradient(ellipse at 30% 30%, rgba(120,130,255,0.22) 0%, transparent 55%), linear-gradient(135deg, #131313 0%, #1a1a1a 100%)",
                }}
              />
              <div className="p-5">
                <p className={`font-mono-custom text-[10px] uppercase tracking-[0.16em] ${light ? "text-black/45" : "text-white/45"}`}>
                  Placeholder
                </p>
                <h3 className="mt-2 font-body text-lg font-semibold">{name}</h3>
              </div>
            </motion.article>
          ))}
        </div>
      </section>
    </main>
  );
};

export default WorkCategoryPage;

