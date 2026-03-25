const stats = [
  { num: "50+", label: "Projects Delivered" },
  { num: "4+", label: "Years Experience" },
  { num: "70%", label: "Pipeline Automation" },
  { num: "3×", label: "Best Employee Award" },
];

const StatsBar = () => (
  <section className="bg-primary">
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
            {stat.num}
          </p>
          <p className="font-mono-custom uppercase text-[10px] tracking-[0.15em] text-primary-foreground/60">
            {stat.label}
          </p>
        </div>
      ))}
    </div>
  </section>
);

export default StatsBar;
