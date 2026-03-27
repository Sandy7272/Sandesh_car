import { motion } from "framer-motion";
import { ArrowUpRight, ArrowDown } from "lucide-react";

const EASE = [0.22, 1, 0.36, 1] as const;

const processSteps = [
  { num: "01", title: "Capture", desc: "Drone scanning, video, photogrammetry" },
  { num: "02", title: "Process", desc: "NeRF & Gaussian Splatting pipelines" },
  { num: "03", title: "Optimize", desc: "Mesh decimation, LOD, texture compression" },
  { num: "04", title: "Deliver", desc: "Production viewers, AR, embeddable widgets" },
];

const About = () => (
  <section id="about" className="relative bg-[#090909] py-24 md:py-32 lg:py-40 overflow-hidden">
    {/* Accent line */}
    <div className="pointer-events-none absolute right-0 top-[15%] z-0 hidden h-[50%] w-[2px] bg-gradient-to-b from-transparent via-[hsl(var(--primary))]/30 to-transparent md:block" />

    <div className="container-custom relative z-10">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: EASE }}
        className="mb-16 md:mb-20"
      >
        <p className="section-label mb-4">About</p>
        <h2 className="font-display text-[clamp(2.5rem,5vw,4.5rem)] font-bold leading-[0.95] text-white">
          The person<br />
          <span className="text-white/30">behind the pixels</span>
        </h2>
      </motion.div>

      {/* Two-column content */}
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_1px_1fr] gap-12 lg:gap-0">
        {/* Left column — bio */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.1, ease: EASE }}
          className="lg:pr-16"
        >
          <p className="font-body text-[16px] md:text-[17px] leading-[1.85] text-white/55">
            I'm Sandesh Gadakh — a 3D artist, motion designer, and creative technologist
            based in Pune, India. I don't just design; I engineer experiences end to end.
          </p>
          <p className="mt-6 font-body text-[16px] md:text-[17px] leading-[1.85] text-white/55">
            At MetaShop AI, I built the video-to-3D pipeline, the viewer product, and
            automated the production system. Previously at Byju's, I designed motion
            systems that reached millions — awarded Best Employee three times.
          </p>

          {/* CTAs */}
          <div className="mt-10 flex flex-wrap items-center gap-4">
            <a
              href="#contact"
              className="group inline-flex items-center gap-2 rounded-full bg-white px-7 py-3.5 font-body text-[13px] font-semibold text-[#090909] transition-all duration-400 hover:bg-white/90"
            >
              Let's talk
              <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" strokeWidth={2.2} />
            </a>
            <a
              href="/resume.pdf"
              download
              className="group inline-flex items-center gap-2 rounded-full border border-white/15 px-7 py-3.5 font-body text-[13px] font-medium text-white/70 hover:border-white/30 hover:text-white transition-all duration-400"
            >
              Resume
              <ArrowDown className="h-3.5 w-3.5 opacity-60" strokeWidth={2} />
            </a>
          </div>

          {/* Education row */}
          <div className="mt-12 grid grid-cols-2 gap-8 border-t border-white/[0.06] pt-8">
            <div>
              <p className="font-mono-custom text-[9px] uppercase tracking-[0.2em] text-white/25 mb-2">Education</p>
              <p className="font-body text-[13px] text-white/55">Bachelor of Fine Arts</p>
            </div>
            <div>
              <p className="font-mono-custom text-[9px] uppercase tracking-[0.2em] text-white/25 mb-2">Certifications</p>
              <p className="font-body text-[13px] text-white/55">Unreal · Blender · WebXR</p>
            </div>
          </div>
        </motion.div>

        {/* Divider */}
        <div className="hidden lg:block w-[1px] bg-white/[0.06]" />

        {/* Right column — process */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.25, ease: EASE }}
          className="lg:pl-16"
        >
          <p className="font-mono-custom text-[10px] uppercase tracking-[0.2em] text-white/25 mb-8">
            How I Build Systems
          </p>

          <div className="space-y-6">
            {processSteps.map((step, i) => (
              <motion.div
                key={step.num}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3 + i * 0.1, ease: EASE }}
                className="group flex gap-5 p-5 rounded-xl border border-transparent hover:border-white/[0.06] hover:bg-white/[0.02] transition-all duration-500"
              >
                <span className="font-mono-custom text-[11px] text-[hsl(var(--primary))]/60 mt-1 shrink-0">
                  {step.num}
                </span>
                <div>
                  <h4 className="font-display text-[16px] font-bold text-white group-hover:text-[hsl(var(--primary))] transition-colors duration-500">
                    {step.title}
                  </h4>
                  <p className="mt-1 font-body text-[13px] text-white/35 leading-relaxed">
                    {step.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Availability badge */}
          <div className="mt-10 inline-flex items-center gap-2.5 rounded-full border border-dashed border-white/10 bg-white/[0.02] px-5 py-2.5">
            <div className="w-2 h-2 rounded-full bg-green-500/70 animate-pulse" />
            <span className="font-mono-custom text-[10px] uppercase tracking-[0.18em] text-white/35">
              Open to work · 2025
            </span>
          </div>
        </motion.div>
      </div>
    </div>
  </section>
);

export default About;
