import { motion } from "framer-motion";
import { ArrowUpRight, ArrowDown } from "lucide-react";
import { AnimatedSection, StaggerContainer, StaggerItem } from "./AnimatedSection";

const EASE = [0.22, 1, 0.36, 1] as const;

const processSteps = [
  { num: "01", title: "Capture", desc: "Drone scanning, video, photogrammetry" },
  { num: "02", title: "Process", desc: "NeRF & Gaussian Splatting pipelines" },
  { num: "03", title: "Optimize", desc: "Mesh decimation, LOD, texture compression" },
  { num: "04", title: "Deliver", desc: "Production viewers, AR, embeddable widgets" },
];

const skills = [
  { category: "3D & Real-time", tools: "Blender, 3DS Max, Maya, Unreal Engine, Nerfstudio, Gaussian Splatting, Three.js, Substance Painter" },
  { category: "Motion & Design", tools: "After Effects, Premiere Pro, Figma, Photoshop, Illustrator, UI/UX Design" },
  { category: "Web & Automation", tools: "React, Three.js, Tailwind CSS, REST APIs, AI-assisted Development" },
  { category: "AI & Emerging Tech", tools: "Gaussian Fields, NeRF, Image-to-3D, AI-Powered Product Dev" },
];

const About = () => (
  <section id="about" className="relative bg-background py-24 md:py-32 lg:py-40 overflow-hidden">
    <div className="pointer-events-none absolute right-0 top-[15%] z-0 hidden h-[50%] w-[2px] bg-gradient-to-b from-transparent via-primary/30 to-transparent md:block" />

    <div className="container-custom relative z-10">
      <AnimatedSection className="mb-16 md:mb-20">
        <p className="section-label mb-4">About</p>
        <h2 className="font-display text-[clamp(2.5rem,5vw,4.5rem)] font-bold leading-[0.95] text-foreground">
          The person<br />
          <span className="text-foreground/30">behind the pixels</span>
        </h2>
      </AnimatedSection>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_1px_1fr] gap-12 lg:gap-0">
        <AnimatedSection delay={0.1} className="lg:pr-16">
          <p className="font-body text-[16px] md:text-[17px] leading-[1.85] text-foreground/55">
            I'm Sandesh Gadakh — a Product Builder, Creative Technologist, and 3D Generalist
            based in Pune, India. With 4+ years of experience spanning 3D design, motion graphics,
            AI-driven workflows, and product development, I transform early-stage ideas into
            production-grade platforms.
          </p>
          <p className="mt-6 font-body text-[16px] md:text-[17px] leading-[1.85] text-foreground/55">
            At MetaShop AI, I built the video-to-3D pipeline, the viewer product, and
            automated the production system — delivering 50+ client projects across real estate,
            education, and e-commerce. Previously at Byju's, I designed motion
            systems that reached millions — awarded Best Employee three times among 400+ designers.
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-4">
            <a
              href="#contact"
              className="group inline-flex items-center gap-2 rounded-full bg-foreground px-7 py-3.5 font-body text-[13px] font-semibold text-background transition-all duration-400 hover:opacity-90"
            >
              Let's talk
              <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" strokeWidth={2.2} />
            </a>
            <a
              href="/resume.pdf"
              download
              className="group inline-flex items-center gap-2 rounded-full border border-foreground/15 px-7 py-3.5 font-body text-[13px] font-medium text-foreground/70 hover:border-foreground/30 hover:text-foreground transition-all duration-400"
            >
              Resume
              <ArrowDown className="h-3.5 w-3.5 opacity-60" strokeWidth={2} />
            </a>
          </div>

          {/* Education & Certifications from resume */}
          <div className="mt-12 grid grid-cols-2 gap-8 border-t border-foreground/[0.06] pt-8">
            <div>
              <p className="font-mono-custom text-[9px] uppercase tracking-[0.2em] text-foreground/25 mb-2">Education</p>
              <p className="font-body text-[13px] text-foreground/55">B.Sc. Media Graphics & Animation</p>
              <p className="font-body text-[11px] text-foreground/35 mt-1">Pune University · 2019–2021</p>
            </div>
            <div>
              <p className="font-mono-custom text-[9px] uppercase tracking-[0.2em] text-foreground/25 mb-2">Certifications</p>
              <p className="font-body text-[13px] text-foreground/55">Adobe Certified Professional</p>
              <p className="font-body text-[11px] text-foreground/35 mt-1">Illustrator · Photoshop</p>
            </div>
          </div>

          {/* Skills grid */}
          <div className="mt-8 border-t border-foreground/[0.06] pt-8">
            <p className="font-mono-custom text-[9px] uppercase tracking-[0.2em] text-foreground/25 mb-5">Skills & Tools</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {skills.map((s) => (
                <div key={s.category}>
                  <p className="font-body text-[12px] font-semibold text-foreground/60 mb-1">{s.category}</p>
                  <p className="font-body text-[11px] text-foreground/35 leading-relaxed">{s.tools}</p>
                </div>
              ))}
            </div>
          </div>
        </AnimatedSection>

        <div className="hidden lg:block w-[1px] bg-foreground/[0.06]" />

        <AnimatedSection delay={0.25} className="lg:pl-16">
          <p className="font-mono-custom text-[10px] uppercase tracking-[0.2em] text-foreground/25 mb-8">
            How I Build Systems
          </p>

          <StaggerContainer className="space-y-6" staggerDelay={0.1}>
            {processSteps.map((step) => (
              <StaggerItem key={step.num}>
                <div className="group flex gap-5 p-5 rounded-xl border border-transparent hover:border-foreground/[0.06] hover:bg-foreground/[0.02] transition-all duration-500">
                  <span className="font-mono-custom text-[11px] text-primary/60 mt-1 shrink-0">
                    {step.num}
                  </span>
                  <div>
                    <h4 className="font-display text-[16px] font-bold text-foreground group-hover:text-primary transition-colors duration-500">
                      {step.title}
                    </h4>
                    <p className="mt-1 font-body text-[13px] text-foreground/35 leading-relaxed">
                      {step.desc}
                    </p>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>

          {/* Key Projects from resume */}
          <div className="mt-10 border-t border-foreground/[0.06] pt-8">
            <p className="font-mono-custom text-[10px] uppercase tracking-[0.2em] text-foreground/25 mb-6">
              Key Projects
            </p>
            <div className="space-y-5">
              {[
                { title: "AI-Powered E-Commerce & 3D Viewer", tech: "React, Three.js, Tailwind CSS, AI-assisted dev", desc: "Company's first self-service product with real-time 3D visualization" },
                { title: "Enterprise 3D Production Pipeline", tech: "Blender, Nerfstudio, Gaussian Splatting, Substance", desc: "Video-to-3D pipeline rebuilt from scratch; onboarded L&T Realty and Kesari Weddings" },
                { title: "Operations Automation", tech: "AI Tools, Process Automation, Workflow Design", desc: "Eliminated 70% manual operations, enabled 3× output scaling" },
              ].map((proj) => (
                <div key={proj.title} className="group p-4 rounded-xl hover:bg-foreground/[0.02] transition-all duration-400">
                  <h5 className="font-body text-[14px] font-semibold text-foreground/70 group-hover:text-foreground transition-colors">
                    {proj.title}
                  </h5>
                  <p className="font-mono-custom text-[9px] uppercase tracking-[0.15em] text-primary/50 mt-1">{proj.tech}</p>
                  <p className="font-body text-[12px] text-foreground/35 mt-2 leading-relaxed">{proj.desc}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-10 inline-flex items-center gap-2.5 rounded-full border border-dashed border-foreground/10 bg-foreground/[0.02] px-5 py-2.5">
            <div className="w-2 h-2 rounded-full bg-green-500/70 animate-pulse" />
            <span className="font-mono-custom text-[10px] uppercase tracking-[0.18em] text-foreground/35">
              Open to work · 2025
            </span>
          </div>
        </AnimatedSection>
      </div>
    </div>
  </section>
);

export default About;
