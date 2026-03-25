import { useEffect, useRef, useState } from "react";

const stats = [
  { target: 50, suffix: "+", label: "Projects Delivered" },
  { target: 4, suffix: "+", label: "Years Experience" },
  { target: 70, suffix: "%", label: "Pipeline Automation" },
  { target: 3, suffix: "×", label: "Best Employee Award" },
];

const durations = [2000, 1200, 1800, 1000];

const StatsBar = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [started, setStarted] = useState(false);
  const [values, setValues] = useState(stats.map(() => 0));
  const [done, setDone] = useState(stats.map(() => false));

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started) {
          setStarted(true);
          if (reducedMotion) {
            setValues(stats.map((s) => s.target));
            setDone(stats.map(() => true));
            return;
          }
          stats.forEach((stat, i) => {
            const delay = i * 150;
            const duration = durations[i];
            setTimeout(() => {
              const start = performance.now();
              const animate = (now: number) => {
                const progress = Math.min((now - start) / duration, 1);
                const eased = 1 - Math.pow(1 - progress, 3);
                const current = Math.round(eased * stat.target);
                setValues((prev) => {
                  const next = [...prev];
                  next[i] = current;
                  return next;
                });
                if (progress < 1) {
                  requestAnimationFrame(animate);
                } else {
                  setDone((prev) => {
                    const next = [...prev];
                    next[i] = true;
                    return next;
                  });
                }
              };
              requestAnimationFrame(animate);
            }, delay);
          });
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [started]);

  return (
    <section ref={sectionRef} className="bg-primary">
      <div className="container-custom grid grid-cols-2 md:grid-cols-4">
        {stats.map((stat, i) => (
          <div
            key={i}
            className={`py-12 md:py-16 text-center ${i > 0 ? "border-l border-primary-foreground/[0.12]" : ""}`}
          >
            <p
              className="font-display italic text-primary-foreground leading-none mb-2"
              style={{ fontSize: "clamp(3rem, 5vw, 5rem)" }}
            >
              {values[i]}
              {done[i] ? stat.suffix : ""}
            </p>
            <p className="font-mono-custom uppercase text-[10px] tracking-[0.15em] text-primary-foreground/60">
              {stat.label}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default StatsBar;
