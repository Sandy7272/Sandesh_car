import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import {
  ChromeHeart,
  LiquidChromeCluster,
  LiquidChromeKnot,
  LightCardFloatingControls,
} from "@/components/LightCardChrome";

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
    <section id="contact" className="py-16 md:py-24 lg:py-32 bg-[#0a0a0a]">
      <div className="container-custom px-4 md:px-6">
        <div
          ref={ref}
          className="relative overflow-hidden rounded-[1.75rem] md:rounded-[2.25rem] bg-[#e8e8e6] shadow-[0_24px_80px_rgba(0,0,0,0.45)]"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(48px)",
            filter: visible ? "blur(0px)" : "blur(10px)",
            transition: "all 1s cubic-bezier(0.22, 1, 0.36, 1)",
          }}
        >
          <LiquidChromeKnot />
          <LightCardFloatingControls />

          <div className="relative z-10 grid grid-cols-1 gap-10 p-8 pb-14 pt-12 md:gap-12 md:p-12 md:pb-16 md:pt-14 lg:grid-cols-2 lg:items-center lg:p-14 lg:pb-20 lg:pt-16">
            <div className="max-w-xl lg:pr-4">
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
              >
                <div className="flex items-start gap-3 md:gap-4">
                  <ChromeHeart />
                  <h2 className="font-hero text-[1.65rem] font-bold leading-[1.15] tracking-tight text-[#111111] md:text-3xl lg:text-[2.35rem]">
                    Let&apos;s talk about your project!
                  </h2>
                </div>

                <p className="mt-4 font-body text-[15px] leading-relaxed text-[#444444] md:text-base">
                  Have something that needs exceptional 3D, motion, or creative tech? Reach out — I&apos;d love to hear what you&apos;re building.
                </p>

                <a
                  href="mailto:gadakhsandesh@gmail.com"
                  className="group mt-8 inline-flex items-center gap-2 rounded-full bg-[#A29BFE] px-7 py-3.5 font-hero text-[15px] font-semibold text-white shadow-sm transition-[transform,filter] duration-300 hover:brightness-[1.05] active:scale-[0.98] md:px-8 md:py-4 md:text-base"
                >
                  Contact Me
                  <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" strokeWidth={2.5} />
                </a>

                <div className="mt-8 flex flex-wrap items-center gap-x-4 gap-y-2 font-mono-custom text-[11px] uppercase tracking-[0.12em] text-[#555555]">
                  <a href="mailto:gadakhsandesh@gmail.com" className="hover:text-[#111111] transition-colors">
                    Email
                  </a>
                  <span className="text-[#999999]">·</span>
                  <a href="tel:+917447337272" className="hover:text-[#111111] transition-colors">
                    +91 74473 37272
                  </a>
                </div>
              </motion.div>
            </div>

            <LiquidChromeCluster />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
