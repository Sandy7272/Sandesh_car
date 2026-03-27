import { useRef, useState, useEffect, type ReactNode } from "react";
import { motion } from "framer-motion";

const EASE = [0.22, 1, 0.36, 1] as const;

type AnimatedSectionProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  direction?: "up" | "down" | "left" | "right";
  blur?: boolean;
  scale?: boolean;
  threshold?: number;
  once?: boolean;
};

export const AnimatedSection = ({
  children,
  className = "",
  delay = 0,
  direction = "up",
  blur = true,
  scale = false,
  threshold = 0.15,
  once = true,
}: AnimatedSectionProps) => {
  const directionMap = {
    up: { y: 60 },
    down: { y: -60 },
    left: { x: 60 },
    right: { x: -60 },
  };

  return (
    <motion.div
      initial={{
        opacity: 0,
        ...directionMap[direction],
        filter: blur ? "blur(12px)" : "blur(0px)",
        scale: scale ? 0.96 : 1,
      }}
      whileInView={{
        opacity: 1,
        x: 0,
        y: 0,
        filter: "blur(0px)",
        scale: 1,
      }}
      viewport={{ once, amount: threshold }}
      transition={{ duration: 0.9, delay, ease: EASE }}
      className={className}
      style={{ willChange: "transform, opacity, filter" }}
    >
      {children}
    </motion.div>
  );
};

type StaggerContainerProps = {
  children: ReactNode;
  className?: string;
  staggerDelay?: number;
  threshold?: number;
};

export const StaggerContainer = ({
  children,
  className = "",
  staggerDelay = 0.08,
  threshold = 0.1,
}: StaggerContainerProps) => (
  <motion.div
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true, amount: threshold }}
    variants={{
      hidden: {},
      visible: { transition: { staggerChildren: staggerDelay } },
    }}
    className={className}
  >
    {children}
  </motion.div>
);

export const StaggerItem = ({
  children,
  className = "",
  direction = "up",
}: {
  children: ReactNode;
  className?: string;
  direction?: "up" | "left" | "right";
}) => {
  const dirMap = { up: { y: 40 }, left: { x: 40 }, right: { x: -40 } };

  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, ...dirMap[direction], filter: "blur(8px)" },
        visible: {
          opacity: 1,
          x: 0,
          y: 0,
          filter: "blur(0px)",
          transition: { duration: 0.7, ease: EASE },
        },
      }}
      className={className}
      style={{ willChange: "transform, opacity" }}
    >
      {children}
    </motion.div>
  );
};

/* Parallax wrapper — shifts content based on scroll */
export const ParallaxSection = ({
  children,
  className = "",
  speed = 0.15,
}: {
  children: ReactNode;
  className?: string;
  speed?: number;
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;

    let raf = 0;
    const update = () => {
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight;
      const center = rect.top + rect.height / 2 - vh / 2;
      setOffset(center * speed);
      raf = requestAnimationFrame(update);
    };
    raf = requestAnimationFrame(update);
    return () => cancelAnimationFrame(raf);
  }, [speed]);

  return (
    <div ref={ref} className={className}>
      <div
        style={{
          transform: `translate3d(0, ${offset}px, 0)`,
          willChange: "transform",
        }}
      >
        {children}
      </div>
    </div>
  );
};

export default AnimatedSection;
