const skills = ["3D Design", "Gaussian Splatting", "Motion Graphics", "AR / VR", "NeRF", "Unreal Engine", "Video to 3D", "Interactive Viewer"];
const industries = ["Real Estate", "Automotive", "Fashion", "Events", "Gaming", "EdTech", "E-commerce", "SaaS"];

const MarqueeRow = ({
  items,
  duration,
  reverse,
  outlined,
}: {
  items: string[];
  duration: string;
  reverse?: boolean;
  outlined?: boolean;
}) => {
  const content = items.map((item, i) => (
    <span key={i} className="inline-flex items-center gap-4 shrink-0">
      <span
        className={`uppercase tracking-[0.15em] ${
          outlined
            ? i % 2 === 0
              ? "text-transparent"
              : "text-muted-foreground"
            : i % 2 === 0
            ? "text-muted-foreground"
            : "text-transparent"
        }`}
        style={{
          fontSize: "clamp(0.75rem, 1.5vw, 1rem)",
          fontFamily: "var(--font-mono)",
          ...(((outlined ? i % 2 === 0 : i % 2 !== 0))
            ? { WebkitTextStroke: "1px hsl(18 100% 50%)" }
            : {}),
        }}
      >
        {item}
      </span>
      <span className="text-primary" style={{ fontSize: "clamp(0.75rem, 1.5vw, 1rem)" }}>✦</span>
    </span>
  ));

  return (
    <div className="overflow-hidden py-3">
      <div
        className="whitespace-nowrap flex gap-4"
        style={{
          animation: `${reverse ? "marquee-reverse" : "marquee"} ${duration} linear infinite`,
        }}
      >
        {[0, 1, 2, 3].map((rep) => (
          <span key={rep} className="inline-flex gap-4 shrink-0">
            {content}
          </span>
        ))}
      </div>
    </div>
  );
};

const Marquee = () => (
  <div className="border-y border-foreground/[0.07]">
    <MarqueeRow items={skills} duration="28s" />
    <MarqueeRow items={industries} duration="40s" reverse outlined />
  </div>
);

export default Marquee;
