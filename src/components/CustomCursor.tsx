import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const CustomCursor = () => {
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [hovering, setHovering] = useState(false);
  const [pressing, setPressing] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768 || "ontouchstart" in window);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    if (isMobile) return;

    const move = (e: MouseEvent) => setPos({ x: e.clientX, y: e.clientY });
    const onEnter = (e: MouseEvent) => {
      const target = e.target as Element;
      if (target.closest("a, button, [data-cursor]")) setHovering(true);
    };
    const onLeave = (e: MouseEvent) => {
      const related = e.relatedTarget as Element | null;
      if (!related?.closest("a, button, [data-cursor]")) setHovering(false);
    };
    const onDown = () => setPressing(true);
    const onUp = () => setPressing(false);

    window.addEventListener("mousemove", move);
    document.addEventListener("mouseover", onEnter);
    document.addEventListener("mouseout", onLeave);
    window.addEventListener("mousedown", onDown);
    window.addEventListener("mouseup", onUp);

    return () => {
      window.removeEventListener("mousemove", move);
      document.removeEventListener("mouseover", onEnter);
      document.removeEventListener("mouseout", onLeave);
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("mouseup", onUp);
    };
  }, [isMobile]);

  if (isMobile) return null;

  const size = pressing ? 40 : hovering ? 60 : 10;

  return (
    <>
      <style>{`* { cursor: none !important; }`}</style>
      <motion.div
        className="fixed pointer-events-none z-[200] mix-blend-difference flex items-center justify-center"
        animate={{
          x: pos.x - size / 2,
          y: pos.y - size / 2,
          width: size,
          height: size,
        }}
        transition={{ type: "spring", stiffness: 500, damping: 30 }}
        style={{ borderRadius: "50%", backgroundColor: "white" }}
      >
        {hovering && !pressing && (
          <span className="text-[9px] font-mono-custom uppercase tracking-[0.15em]" style={{ color: "black" }}>
            View
          </span>
        )}
      </motion.div>
    </>
  );
};

export default CustomCursor;
