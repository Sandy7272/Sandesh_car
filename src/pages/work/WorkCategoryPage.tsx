import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SmoothScroll from "@/components/SmoothScroll";
import { AnimatedSection, StaggerContainer, StaggerItem } from "@/components/AnimatedSection";

type WorkCategoryPageProps = {
  title: string;
  subtitle: string;
  description: string;
  light?: boolean;
  showViewer?: boolean;
  projects?: { name: string; desc: string; tags: string[] }[];
};

const defaultProjects = [
  { name: "Project One", desc: "Placeholder project description", tags: ["3D", "WebGL"] },
  { name: "Project Two", desc: "Placeholder project description", tags: ["Motion", "Design"] },
  { name: "Project Three", desc: "Placeholder project description", tags: ["AR", "VR"] },
  { name: "Project Four", desc: "Placeholder project description", tags: ["Pipeline", "Auto"] },
  { name: "Project Five", desc: "Placeholder project description", tags: ["Product", "Viz"] },
  { name: "Project Six", desc: "Placeholder project description", tags: ["Creative", "Tech"] },
];

const EASE = [0.22, 1, 0.36, 1] as const;

const WorkCategoryPage = ({
  title,
  subtitle,
  description,
  light = false,
  showViewer = true,
  projects,
}: WorkCategoryPageProps) => {
  const items = projects || defaultProjects;
  const bg = light ? "bg-[#f6f7fb] text-[#0a0a0a]" : "bg-background text-foreground";
  const card = light
    ? "border-black/10 bg-white text-[#111] hover:border-black/20 hover:shadow-lg"
    : "border-foreground/[0.06] bg-foreground/[0.02] text-foreground hover:border-foreground/[0.12] hover:bg-foreground/[0.04]";
  const mutedText = light ? "text-black/50" : "text-foreground/45";
  const dimText = light ? "text-black/35" : "text-foreground/30";

  return (
    <SmoothScroll>
      <main className={`min-h-screen ${bg}`}>
        {!light && <Header />}
        <section className="container-custom px-4 md:px-6 pt-24 md:pt-28 pb-20">
          <AnimatedSection>
            <Link
              to="/"
              className={`inline-flex items-center gap-2 rounded-full border px-5 py-2.5 text-sm font-body transition-all duration-300 ${
                light ? "border-black/20 hover:bg-black/[0.05]" : "border-foreground/15 hover:bg-foreground/[0.06]"
              }`}
            >
              <ArrowLeft className="w-4 h-4" />
              Back Home
            </Link>
          </AnimatedSection>

          <AnimatedSection delay={0.1} className="mt-10 md:mt-14">
            <p className={`font-mono-custom text-[10px] uppercase tracking-[0.2em] ${mutedText}`}>
              {subtitle}
            </p>
            <h1 className="mt-3 font-display text-[clamp(2.2rem,6vw,5rem)] leading-[1.02] font-bold tracking-tight">
              {title}
            </h1>
            <p className={`mt-5 max-w-2xl font-body text-[15px] leading-[1.9] ${mutedText}`}>
              {description}
            </p>
          </AnimatedSection>

          {showViewer && (
            <AnimatedSection delay={0.2} className="mt-10">
              <div className={`overflow-hidden rounded-[1.25rem] border p-5 md:p-6 ${card} transition-all duration-500`}>
                <div
                  className="relative aspect-[16/8] w-full overflow-hidden rounded-[1rem]"
                  style={{
                    background:
                      "radial-gradient(ellipse at 30% 35%, hsl(var(--primary) / 0.15) 0%, transparent 60%), linear-gradient(135deg, hsl(var(--background)) 0%, hsl(var(--card)) 100%)",
                  }}
                >
                  <div className={`absolute left-4 top-4 rounded-full border px-3 py-1 font-mono-custom text-[10px] uppercase tracking-[0.14em] ${light ? "border-black/15 bg-white/80 text-black/70" : "border-foreground/20 bg-background/30 text-foreground/90"}`}>
                    Viewer placeholder
                  </div>
                </div>
              </div>
            </AnimatedSection>
          )}

          <StaggerContainer className="mt-12 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5" staggerDelay={0.06}>
            {items.map((item) => (
              <StaggerItem key={item.name}>
                <article
                  className={`overflow-hidden rounded-[1.2rem] border transition-all duration-500 group cursor-default ${card}`}
                  style={{ willChange: "border-color, background-color, box-shadow" }}
                >
                  <div
                    className="aspect-[16/10] group-hover:scale-[1.03] transition-transform duration-700"
                    style={{
                      background:
                        "radial-gradient(ellipse at 30% 30%, hsl(var(--primary) / 0.12) 0%, transparent 55%), linear-gradient(135deg, hsl(var(--card)) 0%, hsl(var(--background)) 100%)",
                    }}
                  />
                  <div className="p-5">
                    <div className="flex flex-wrap gap-1.5 mb-3">
                      {item.tags.map((tag) => (
                        <span key={tag} className={`font-mono-custom text-[8px] uppercase tracking-[0.14em] px-2 py-0.5 rounded-full border ${light ? "border-black/10 text-black/40" : "border-foreground/[0.08] text-foreground/30"}`}>
                          {tag}
                        </span>
                      ))}
                    </div>
                    <h3 className="font-display text-lg font-semibold">{item.name}</h3>
                    <p className={`mt-1 font-body text-[12px] ${dimText}`}>{item.desc}</p>
                  </div>
                </article>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </section>
        <Footer />
      </main>
    </SmoothScroll>
  );
};

export default WorkCategoryPage;
