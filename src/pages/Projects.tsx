import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";
import Header from "@/components/Header";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import { projects } from "@/data/projects";

const Projects = () => {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      <Header />

      <main className="pt-24 pb-14 md:pt-28 md:pb-20">
        <section className="container-custom">
          <div className="grid grid-cols-1 gap-8 md:gap-10 lg:grid-cols-[34%_66%]">
            <div className="lg:sticky lg:top-28 h-fit">
              <h1 className="font-body text-[clamp(2.2rem,5vw,5.2rem)] font-semibold leading-[1.02] tracking-tight text-white">
                Projects
              </h1>
              <p className="mt-5 max-w-[28ch] font-body text-[15px] leading-relaxed text-white/65">
                A snapshot of product challenges I have designed, built, and shipped recently.
              </p>
              <Link
                to="/#work"
                className="mt-8 inline-flex items-center gap-2 rounded-full border border-white/35 px-6 py-3 font-body text-[14px] font-semibold text-white transition-[transform,background-color] duration-300 hover:bg-white/10 hover:scale-[1.03]"
              >
                Back to Home
                <ArrowUpRight className="h-4 w-4" strokeWidth={2.4} />
              </Link>
            </div>

            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
              {projects.map((project, index) => (
                <motion.article
                  key={project.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.55, delay: index * 0.05, ease: [0.22, 1, 0.36, 1] }}
                  className={`group relative overflow-hidden rounded-[1.5rem] border border-white/10 bg-[#151515] ${
                    index % 3 === 1 ? "md:translate-y-8" : ""
                  }`}
                >
                  <div className="absolute inset-0" style={{ background: project.gradient }} />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/25 to-transparent" />

                  <div className="relative h-[260px] md:h-[300px]">
                    <div className="absolute inset-0 flex items-center justify-center p-8">
                      <div
                        className="h-full w-full rounded-3xl border border-white/15"
                        style={{
                          background:
                            "linear-gradient(145deg, rgba(255,255,255,0.14) 0%, rgba(255,255,255,0.03) 55%, rgba(0,0,0,0.24) 100%)",
                          boxShadow: "inset 0 1px 0 rgba(255,255,255,0.25), 0 24px 70px rgba(0,0,0,0.55)",
                        }}
                      />
                    </div>
                  </div>

                  <div className="relative z-10 px-5 pb-5">
                    <div className="mb-3 flex items-center gap-2">
                      {project.tags.slice(0, 2).map((tag) => (
                        <span
                          key={`${project.id}-${tag}`}
                          className="rounded-full border border-white/15 bg-black/35 px-3 py-1 font-mono-custom text-[10px] uppercase tracking-[0.14em] text-white/80"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    <h3 className="font-body text-[1.15rem] font-semibold tracking-tight text-white">
                      {project.title} <span className="text-white/65">{project.subtitle}</span>
                    </h3>
                    <p className="mt-2 text-[13px] leading-relaxed text-white/60">{project.description}</p>
                    <Link
                      to={`/projects/${project.id}`}
                      className="mt-4 inline-flex items-center gap-1.5 font-mono-custom text-[11px] uppercase tracking-[0.16em] text-white/70 transition-colors group-hover:text-white"
                    >
                      View case
                      <ArrowUpRight className="h-3.5 w-3.5" />
                    </Link>
                  </div>
                </motion.article>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Contact />
      <Footer />
    </div>
  );
};

export default Projects;
