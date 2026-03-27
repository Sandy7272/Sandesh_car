import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

const EASE = [0.22, 1, 0.36, 1] as const;

const Contact = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVisible(true); },
      { threshold: 0.15 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="contact" className="relative bg-[#090909] py-24 md:py-32 lg:py-40">
      <div className="container-custom">
        <div
          ref={ref}
          className="relative overflow-hidden rounded-[2rem] md:rounded-[2.5rem]"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(60px)",
            filter: visible ? "blur(0px)" : "blur(12px)",
            transition: "all 1.2s cubic-bezier(0.22, 1, 0.36, 1)",
          }}
        >
          {/* Background — warm light gradient */}
          <div
            className="absolute inset-0"
            style={{
              background: "linear-gradient(135deg, #f5f0eb 0%, #e8e3dd 40%, #ddd8d2 100%)",
            }}
          />

          {/* Decorative blur orbs */}
          <div
            className="pointer-events-none absolute -right-[15%] top-[10%] h-[80%] w-[50%] rounded-full opacity-30"
            style={{
              background: "radial-gradient(circle, rgba(232,168,73,0.4) 0%, transparent 60%)",
              filter: "blur(60px)",
            }}
          />
          <div
            className="pointer-events-none absolute -left-[10%] bottom-[5%] h-[60%] w-[40%] rounded-full opacity-20"
            style={{
              background: "radial-gradient(circle, rgba(162,155,254,0.4) 0%, transparent 60%)",
              filter: "blur(50px)",
            }}
          />

          {/* Content */}
          <div className="relative z-10 p-10 md:p-16 lg:p-20">
            <div className="max-w-2xl">
              {/* Eyebrow */}
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, ease: EASE }}
                className="font-mono-custom text-[10px] uppercase tracking-[0.2em] text-[#090909]/40 mb-6"
              >
                Get in touch
              </motion.p>

              {/* Big headline */}
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.1, ease: EASE }}
                className="font-display text-[clamp(2.2rem,5vw,4rem)] font-bold leading-[1.05] tracking-tight text-[#090909]"
              >
                Let's build something
                <br />
                <span className="text-[#090909]/35">extraordinary together</span>
              </motion.h2>

              {/* Description */}
              <motion.p
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: 0.2, ease: EASE }}
                className="mt-6 font-body text-[15px] md:text-[16px] leading-relaxed text-[#090909]/50 max-w-lg"
              >
                Have something that needs exceptional 3D, motion, or creative technology?
                I'd love to hear what you're building.
              </motion.p>

              {/* CTA */}
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: 0.3, ease: EASE }}
                className="mt-10"
              >
                <a
                  href="mailto:gadakhsandesh@gmail.com"
                  className="group inline-flex items-center gap-3 rounded-full bg-[#090909] px-8 py-4 md:px-10 md:py-5 font-body text-[14px] md:text-[15px] font-semibold text-white shadow-[0_20px_60px_rgba(0,0,0,0.3)] transition-all duration-500 hover:shadow-[0_30px_80px_rgba(0,0,0,0.4)] hover:scale-[1.02]"
                >
                  Contact Me
                  <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" strokeWidth={2.2} />
                </a>
              </motion.div>

              {/* Contact info */}
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: 0.45, ease: EASE }}
                className="mt-10 flex flex-wrap items-center gap-x-5 gap-y-2"
              >
                <a
                  href="mailto:gadakhsandesh@gmail.com"
                  className="font-mono-custom text-[11px] uppercase tracking-[0.12em] text-[#090909]/40 hover:text-[#090909]/70 transition-colors"
                >
                  gadakhsandesh@gmail.com
                </a>
                <span className="text-[#090909]/20">·</span>
                <a
                  href="tel:+917447337272"
                  className="font-mono-custom text-[11px] uppercase tracking-[0.12em] text-[#090909]/40 hover:text-[#090909]/70 transition-colors"
                >
                  +91 74473 37272
                </a>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
