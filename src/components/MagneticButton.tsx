import { motion, useMotionValue, useSpring } from "framer-motion";
import { useRef, type ReactNode, type MouseEvent } from "react";
import { cn } from "@/lib/utils";

interface Props {
  children: ReactNode;
  onClick?: () => void;
  variant?: "primary" | "ghost";
  className?: string;
  cursorLabel?: string;
  as?: "button" | "a";
  href?: string;
}

export function MagneticButton({ children, onClick, variant = "primary", className, cursorLabel = "Explore", as = "button", href }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 200, damping: 15 });
  const sy = useSpring(y, { stiffness: 200, damping: 15 });

  const handleMove = (e: MouseEvent<HTMLDivElement>) => {
    const r = ref.current?.getBoundingClientRect();
    if (!r) return;
    const mx = e.clientX - (r.left + r.width / 2);
    const my = e.clientY - (r.top + r.height / 2);
    x.set(mx * 0.35);
    y.set(my * 0.35);
  };
  const reset = () => { x.set(0); y.set(0); };

  const styles = variant === "primary"
    ? "bg-gradient-to-r from-royal via-electric to-royal text-white shadow-[0_10px_40px_-10px_rgba(59,130,246,0.7)] hover:shadow-[0_15px_60px_-10px_rgba(59,130,246,0.9)]"
    : "border border-ice/40 text-ice hover:border-electric hover:text-white";

  const Inner = (
    <motion.div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={reset}
      style={{ x: sx, y: sy }}
      data-cursor={cursorLabel}
      className={cn(
        "group relative inline-flex cursor-none items-center justify-center gap-2 overflow-hidden rounded-full px-8 py-3.5 text-sm font-medium uppercase tracking-[0.2em] transition-colors",
        styles,
        className,
      )}
      onClick={onClick}
    >
      <span className="relative z-10">{children}</span>
      {variant === "primary" && (
        <span className="absolute inset-0 -z-0 bg-[radial-gradient(circle_at_var(--x,50%)_50%,rgba(255,255,255,0.25),transparent_60%)] opacity-0 transition-opacity group-hover:opacity-100" />
      )}
    </motion.div>
  );

  if (as === "a") return <a href={href}>{Inner}</a>;
  return Inner;
}
