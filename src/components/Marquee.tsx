const items = "3D Design ✦ Gaussian Splatting ✦ Motion Graphics ✦ AR / VR ✦ NeRF ✦ Unreal Engine ✦ Video to 3D ✦ Interactive Viewer ✦ ";

const Marquee = () => (
  <div className="border-y border-foreground/[0.07] overflow-hidden py-4">
    <div className="animate-marquee whitespace-nowrap flex">
      {[0, 1].map((i) => (
        <span
          key={i}
          className="font-mono-custom uppercase text-muted-foreground tracking-[0.15em] shrink-0"
          style={{ fontSize: "clamp(0.75rem, 1.5vw, 1rem)" }}
        >
          {items.repeat(4)}
        </span>
      ))}
    </div>
  </div>
);

export default Marquee;
