const TAGS = [
  "3D Design",
  "Gaussian Splatting",
  "Motion Graphics",
  "WebXR",
  "NeRF",
  "Creative Tech",
  "Real-Time 3D",
  "Product Viewer",
  "Unreal Engine",
  "Video to 3D",
  "AR / VR",
];

const Marquee = () => {
  const line = TAGS.map((t) => t.toUpperCase()).join("  ·  ") + "  ·  ";

  return (
    <div className="overflow-hidden border-y border-white/[0.06] bg-[#090909] py-4 md:py-5">
      <div
        className="marquee-infinite-track flex w-max"
        style={{ "--marquee-duration": "35s" } as React.CSSProperties}
      >
        {[0, 1].map((i) => (
          <span
            key={i}
            className="inline-flex shrink-0 items-center px-4 font-mono-custom text-[10px] uppercase tracking-[0.22em] text-white/25 whitespace-nowrap"
            aria-hidden={i === 1}
          >
            {line}
          </span>
        ))}
      </div>
    </div>
  );
};

export default Marquee;
