import { Link, useParams } from "react-router-dom";
import { projects } from "@/data/projects";
import { ArrowLeft, ArrowUpRight } from "lucide-react";

const ProjectDetail = () => {
  const { id } = useParams();
  const project = projects.find((p) => p.id === id);

  if (!project) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] text-white flex items-center justify-center px-6">
        <div className="max-w-lg w-full">
          <p className="font-mono-custom text-[10px] uppercase tracking-[0.22em] text-white/50">
            Not found
          </p>
          <h1 className="mt-3 font-body text-3xl font-semibold tracking-tight">
            Project doesn&apos;t exist
          </h1>
          <p className="mt-4 font-body text-white/70 leading-relaxed">
            This project id isn&apos;t in the data yet.
          </p>
          <Link
            to="/#work"
            className="mt-8 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.04] px-6 py-3 font-body font-semibold text-white hover:bg-white/[0.06] transition-smooth"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Work
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      <div className="container-custom px-6 md:px-12 pt-10 pb-20">
        <div className="flex items-center justify-between gap-6">
          <Link
            to="/#work"
            className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.04] px-5 py-2.5 font-body font-semibold text-white hover:bg-white/[0.06] transition-smooth"
          >
            <ArrowLeft className="h-4 w-4" />
            Back
          </Link>
          <a
            href="#contact"
            className="inline-flex items-center gap-2 rounded-full bg-[#ff6b6b] px-6 py-2.5 font-body font-semibold text-[#0a0a0a] hover:brightness-[1.05] transition-smooth"
          >
            Let&apos;s talk
            <ArrowUpRight className="h-4 w-4" strokeWidth={2.5} />
          </a>
        </div>

        <p className="mt-10 font-mono-custom text-[10px] uppercase tracking-[0.22em] text-white/50">
          Project
        </p>
        <h1 className="mt-4 font-body text-[clamp(2.4rem,5.5vw,5rem)] font-semibold tracking-tight leading-[1.02]">
          {project.title} <span className="text-white/70">{project.subtitle}</span>
        </h1>
        <p className="mt-6 max-w-2xl font-body text-[15px] leading-[1.9] text-white/70">
          {project.description}
        </p>

        <div className="mt-8 flex flex-wrap gap-2">
          {project.tags.map((t) => (
            <span
              key={t}
              className="rounded-full border border-white/12 bg-white/[0.04] px-3 py-1.5 font-mono-custom text-[10px] uppercase tracking-[0.12em] text-white/75"
            >
              {t}
            </span>
          ))}
        </div>

        <div className="mt-12 overflow-hidden rounded-[1.75rem] border border-white/10 bg-white/[0.03]">
          <div
            className="h-[52vh] min-h-[320px]"
            style={{
              background: project.gradient,
            }}
          />
        </div>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
            <p className="font-mono-custom text-[10px] uppercase tracking-[0.22em] text-white/55">
              Role
            </p>
            <p className="mt-3 font-body text-white/80 leading-relaxed">
              3D Artist · Motion Designer · Creative Technologist
            </p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
            <p className="font-mono-custom text-[10px] uppercase tracking-[0.22em] text-white/55">
              Focus
            </p>
            <p className="mt-3 font-body text-white/80 leading-relaxed">
              Visual quality, interactive delivery, performance, and production reliability.
            </p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
            <p className="font-mono-custom text-[10px] uppercase tracking-[0.22em] text-white/55">
              Next
            </p>
            <p className="mt-3 font-body text-white/80 leading-relaxed">
              When you upload assets, this page will render the real image/video.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetail;

