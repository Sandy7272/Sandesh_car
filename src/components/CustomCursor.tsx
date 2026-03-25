import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const CustomCursor = () => {
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [hovering, setHovering] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768 || "ontouchstart" in window);
    checkMobile();
    window.addEventListener("resize", checkMobile);

    const move = (e: MouseEvent) => setPos({ x: e.clientX, y: e.clientY });
    window.addEventListener("mousemove", move);

    const addHover = () => {
      document.querySelectorAll("a, button, .group").forEach((el) => {
        el.addEventListener("mouseenter", () => setHovering(true));
        el.addEventListener("mouseleave", () => setHovering(false));
      });
    };
    addHover();
    const observer = new MutationObserver(addHover);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("resize", checkMobile);
      observer.disconnect();
    };
  }, []);

  if (isMobile) return null;

  return (
    <>
      <style>{`* { cursor: none !important; }`}</style>
      <motion.div
        className="fixed pointer-events-none z-[200] mix-blend-difference flex items-center justify-center"
        animate={{
          x: pos.x - (hovering ? 30 : 5),
          y: pos.y - (hovering ? 30 : 5),
          width: hovering ? 60 : 10,
          height: hovering ? 60 : 10,
        }}
        transition={{ type: "spring", stiffness: 500, damping: 30 }}
        style={{
          borderRadius: "50%",
          backgroundColor: "white",
        }}
      >
        {hovering && (
          <span className="text-[9px] font-mono-custom uppercase tracking-[0.15em]" style={{ color: "black" }}>
            View
          </span>
        )}
      </motion.div>
    </>
  );
};

export default CustomCursor;
