/** Neon lime band, black condensed caps, /// separators — infinite horizontal scroll */
const TAGS = [
  "3D Design",
  "Gaussian Splatting",
  "Motion Graphics",
  "WebXR",
  "NeRF",
  "Creative Technologist",
  "Real-Time 3D",
  "Product Viewer",
  "Unreal Engine",
  "Video to 3D",
  "Interactive Experiences",
  "AR / VR",
];

const Marquee = () => {
  const line = TAGS.map((t) => t.toUpperCase()).join(" /// ") + " /// ";

  return (
    <div className="overflow-hidden bg-[#ff6b6b] py-2.5 md:py-3.5">
      <div
        className="marquee-infinite-track flex w-max"
        style={{ "--marquee-duration": "38s" } as React.CSSProperties}
      >
        <span
          className="inline-flex shrink-0 items-center px-3 font-hero text-[11px] font-extrabold uppercase tracking-[0.14em] text-[#0a0a0a] sm:text-xs md:text-[13px] md:tracking-[0.18em] whitespace-nowrap"
          style={{ fontStretch: "expanded" }}
        >
          {line}
        </span>
        <span
          className="inline-flex shrink-0 items-center px-3 font-hero text-[11px] font-extrabold uppercase tracking-[0.14em] text-[#0a0a0a] sm:text-xs md:text-[13px] md:tracking-[0.18em] whitespace-nowrap"
          aria-hidden
          style={{ fontStretch: "expanded" }}
        >
          {line}
        </span>
      </div>
    </div>
  );
};

export default Marquee;
