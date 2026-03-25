const experiences = [
  {
    period: "2023 — Now",
    company: "MetaShop AI",
    role: "Product Builder & Creative Operations Lead",
    badge: "Equity Holder",
    points: [
      "Built company's first 3D viewer product (React + Three.js)",
      "Video-to-3D pipeline: Gaussian Splatting & NeRF, 50+ enterprise projects",
      "Reduced manual operations 70% via automation",
      "Clients: L&T Realty, Kesari Weddings, Ultraviolette, Tata, IBW 2025",
    ],
  },
  {
    period: "2021 — 2023",
    company: "Byju's",
    role: "Motion Graphics Artist & 3D Specialist",
    badge: "Best Employee 3×",
    points: [
      "Created 3D & motion content for millions of students",
      "Built reusable animation system, +40% team efficiency across 100+ modules",
    ],
  },
  {
    period: "2020 — 2021",
    company: "Global Studio",
    role: "Freelance 3D & VFX Specialist",
    badge: "Freelance",
    points: [
      "3D assets, VFX & motion graphics for gaming and commercial clients",
      "100% on-time delivery record",
    ],
  },
];

const Experience = () => (
  <section className="section-padding">
    <div className="container-custom">
      <h2 className="section-heading text-foreground mb-16">Experience</h2>
      <div className="space-y-0">
        {experiences.map((exp, i) => (
          <div
            key={i}
            className="group border-t border-foreground/[0.06] hover:border-primary py-10 transition-smooth"
          >
            <div className="grid grid-cols-1 md:grid-cols-[120px_1fr_auto] gap-4 md:gap-8">
              <span className="font-mono-custom text-[12px] text-muted-foreground">{exp.period}</span>
              <div>
                <h3 className="font-body font-medium text-[22px] text-foreground">{exp.company}</h3>
                <p className="font-body text-[13px] text-muted-foreground mt-1">{exp.role}</p>
                <div className="mt-4 space-y-1.5">
                  {exp.points.map((point, j) => (
                    <p key={j} className="font-body text-[13px] text-muted-foreground">
                      <span className="text-primary mr-2">—</span>{point}
                    </p>
                  ))}
                </div>
              </div>
              <span className="pill self-start">{exp.badge}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default Experience;
