import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export function CustomCursor() {
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const sx = useSpring(x, { stiffness: 400, damping: 40, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 400, damping: 40, mass: 0.4 });
  const [hover, setHover] = useState<string | null>(null);

  useEffect(() => {
    const move = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      const el = e.target as HTMLElement;
      const tag = el?.closest("[data-cursor]") as HTMLElement | null;
      if (tag) setHover(tag.dataset.cursor || "link");
      else if (el?.closest("a,button,input,textarea,select,[role=button]")) setHover("link");
      else setHover(null);
    };
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, [x, y]);

  if (typeof window !== "undefined" && window.matchMedia("(pointer: coarse)").matches) return null;

  const expanded = hover !== null;
  const label = hover && hover !== "link" ? hover : null;

  return (
    <>
      <motion.div
        aria-hidden
        style={{ x: sx, y: sy }}
        className="pointer-events-none fixed left-0 top-0 z-[9999] hidden md:block"
      >
        <motion.div
          animate={{
            width: expanded ? (label ? 110 : 44) : 12,
            height: expanded ? (label ? 110 : 44) : 12,
            borderWidth: expanded ? 1 : 1,
          }}
          transition={{ type: "spring", stiffness: 300, damping: 25 }}
          className="flex -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-electric/70 bg-electric/10 backdrop-blur-md"
        >
          {label && (
            <span className="text-[10px] font-medium uppercase tracking-[0.2em] text-ice">{label}</span>
          )}
        </motion.div>
      </motion.div>
      <motion.div
        aria-hidden
        style={{ x, y }}
        className="pointer-events-none fixed left-0 top-0 z-[9999] hidden h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-electric md:block"
      />
    </>
  );
}
