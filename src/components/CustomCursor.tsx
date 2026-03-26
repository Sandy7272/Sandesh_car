import { useEffect, useRef, useState } from "react";

const BASE_LERP = 0.16;
const clamp = (v: number, min: number, max: number) => Math.min(max, Math.max(min, v));

const CustomCursor = () => {
  const [isMobile, setIsMobile] = useState(false);

  const cursorRef = useRef<HTMLDivElement>(null);
  const targetRef = useRef({ cx: 0, cy: 0 });
  const currentRef = useRef({ cx: 0, cy: 0 });
  const tRef = useRef(BASE_LERP);
  const hoverRef = useRef(false);
  const pressRef = useRef(false);
  const sizeRef = useRef(10);
  const syncedRef = useRef(false);

  const applyMode = () => {
    const el = cursorRef.current;
    if (!el) return;

    const hovering = hoverRef.current;
    const pressing = pressRef.current;
    const nextSize = pressing ? 40 : hovering ? 56 : 10;
    sizeRef.current = nextSize;

    el.style.width = `${nextSize}px`;
    el.style.height = `${nextSize}px`;
    el.classList.toggle("is-hover", hovering && !pressing);
    el.classList.toggle("is-press", pressing);
  };

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768 || "ontouchstart" in window);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    if (isMobile) return;

    let raf = 0;

    const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

    const tick = () => {
      if (!syncedRef.current) {
        raf = requestAnimationFrame(tick);
        return;
      }

      const { cx: tx, cy: ty } = targetRef.current;
      const cur = currentRef.current;
      // Adaptive smoothing (smoothed): avoids "jerk" from changing t too fast.
      const dx = tx - cur.cx;
      const dy = ty - cur.cy;
      const dist = Math.hypot(dx, dy);
      const targetT = clamp(BASE_LERP + dist / 1100, 0.14, 0.34);
      tRef.current = lerp(tRef.current, targetT, 0.10);
      const t = tRef.current;
      cur.cx = lerp(cur.cx, tx, t);
      cur.cy = lerp(cur.cy, ty, t);

      const el = cursorRef.current;
      const s = sizeRef.current;
      if (el) {
        const x = cur.cx - s / 2;
        const y = cur.cy - s / 2;
        el.style.transform = `translate3d(${x}px, ${y}px, 0)`;
      }

      raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [isMobile]);

  useEffect(() => {
    if (isMobile) return;

    let moveRaf = 0;
    let pendingX = 0;
    let pendingY = 0;

    const move = (e: MouseEvent) => {
      pendingX = e.clientX;
      pendingY = e.clientY;
      if (!moveRaf) {
        moveRaf = requestAnimationFrame(() => {
          targetRef.current.cx = pendingX;
          targetRef.current.cy = pendingY;
          moveRaf = 0;
        });
      }
      if (!syncedRef.current) {
        currentRef.current.cx = e.clientX;
        currentRef.current.cy = e.clientY;
        syncedRef.current = true;
        tRef.current = BASE_LERP;
        const el = cursorRef.current;
        applyMode();
        const s = sizeRef.current;
        if (el) {
          el.style.transform = `translate3d(${e.clientX - s / 2}px, ${e.clientY - s / 2}px, 0)`;
        }
      }
    };

    const onEnter = (e: MouseEvent) => {
      const target = e.target as Element;
      const next = !!target.closest("a, button, [data-cursor]");
      if (next !== hoverRef.current) {
        hoverRef.current = next;
        applyMode();
      }
    };
    const onLeave = (e: MouseEvent) => {
      const related = e.relatedTarget as Element | null;
      const next = !!related?.closest("a, button, [data-cursor]");
      if (next !== hoverRef.current) {
        hoverRef.current = next;
        applyMode();
      }
    };
    const onDown = () => {
      if (pressRef.current) return;
      pressRef.current = true;
      applyMode();
    };
    const onUp = () => {
      if (!pressRef.current) return;
      pressRef.current = false;
      applyMode();
    };

    window.addEventListener("mousemove", move, { passive: true });
    document.addEventListener("mouseover", onEnter);
    document.addEventListener("mouseout", onLeave);
    window.addEventListener("mousedown", onDown);
    window.addEventListener("mouseup", onUp);

    return () => {
      if (moveRaf) cancelAnimationFrame(moveRaf);
      window.removeEventListener("mousemove", move);
      document.removeEventListener("mouseover", onEnter);
      document.removeEventListener("mouseout", onLeave);
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("mouseup", onUp);
    };
  }, [isMobile]);

  if (isMobile) return null;

  return (
    <>
      <style>{`
        * { cursor: none !important; }
        .ccursor { transition: background-color 160ms ease, opacity 160ms ease; }
        .ccursor.is-hover { opacity: 1; }
        .ccursor.is-press { opacity: 0.95; }
        .ccursor .ccursor__label { opacity: 0; transform: translateY(2px); transition: opacity 160ms ease, transform 160ms ease; }
        .ccursor.is-hover .ccursor__label { opacity: 1; transform: translateY(0); }
      `}</style>
      <div
        ref={cursorRef}
        className="ccursor fixed left-0 top-0 pointer-events-none z-[200] mix-blend-difference flex items-center justify-center"
        style={{
          width: 10,
          height: 10,
          borderRadius: "50%",
          backgroundColor: "white",
          willChange: "transform",
        }}
      >
        <span className="ccursor__label text-[9px] font-mono-custom uppercase tracking-[0.15em]" style={{ color: "black" }}>
          View
        </span>
      </div>
    </>
  );
};

export default CustomCursor;
