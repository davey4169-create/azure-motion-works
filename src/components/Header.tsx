import { Link, useRouterState } from "@tanstack/react-router";
import { motion, useMotionValueEvent, useScroll } from "framer-motion";
import { useState } from "react";
import { Menu, X } from "lucide-react";

const NAV = [
  { to: "/", label: "Home" },
  { to: "/properties", label: "Properties" },
  { to: "/services", label: "Services" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
] as const;

export function Header() {
  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const path = useRouterState({ select: (s) => s.location.pathname });

  useMotionValueEvent(scrollY, "change", (y) => {
    const prev = scrollY.getPrevious() ?? 0;
    setHidden(y > prev && y > 200);
    setScrolled(y > 40);
  });

  return (
    <motion.header
      initial={{ y: 0 }}
      animate={{ y: hidden ? -120 : 0 }}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed inset-x-0 top-0 z-50 border-b transition-all duration-500 ${
        scrolled ? "border-electric/20 bg-slate-950/70 backdrop-blur-xl py-3" : "border-transparent bg-transparent py-6"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6">
        <Link to="/" data-cursor="Home" className="group flex items-center gap-3">
          <div className="relative h-9 w-9 overflow-hidden rounded-full border border-ice/40 bg-gradient-to-br from-royal to-electric">
            <span className="absolute inset-0 flex items-center justify-center font-display text-sm font-semibold text-white">D</span>
          </div>
          <div className="leading-none">
            <div className="font-display text-lg font-medium tracking-wide text-white">Dapoxplain</div>
            <div className="text-[10px] uppercase tracking-[0.35em] text-ice/70">Housing Services</div>
          </div>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {NAV.map((n) => {
            const active = n.to === "/" ? path === "/" : path.startsWith(n.to);
            return (
              <Link key={n.to} to={n.to} data-cursor={n.label} className="group relative text-sm uppercase tracking-[0.2em] text-slate-300 transition-colors hover:text-white">
                {n.label}
                <span className={`absolute -bottom-2 left-0 h-px w-full origin-left scale-x-0 bg-gradient-to-r from-electric to-ice transition-transform duration-500 group-hover:scale-x-100 ${active ? "scale-x-100" : ""}`} />
              </Link>
            );
          })}
        </nav>

        <Link to="/contact" data-cursor="Book" className="hidden rounded-full border border-electric/50 px-5 py-2 text-xs uppercase tracking-[0.25em] text-white transition-all hover:border-electric hover:bg-electric/10 hover:shadow-[0_0_30px_-5px_rgba(59,130,246,0.6)] md:inline-flex">
          Private Tour
        </Link>

        <button onClick={() => setOpen(!open)} className="md:hidden text-white" aria-label="Menu">
          {open ? <X /> : <Menu />}
        </button>
      </div>

      {open && (
        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="md:hidden border-t border-electric/20 bg-slate-950/95 backdrop-blur-xl">
          <div className="flex flex-col gap-1 p-6">
            {NAV.map((n) => (
              <Link key={n.to} to={n.to} onClick={() => setOpen(false)} className="py-3 text-sm uppercase tracking-[0.2em] text-slate-300 hover:text-white">
                {n.label}
              </Link>
            ))}
          </div>
        </motion.div>
      )}
    </motion.header>
  );
}
