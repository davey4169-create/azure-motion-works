import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

export function Preloader() {
  const [done, setDone] = useState(false);
  const [pct, setPct] = useState(0);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (sessionStorage.getItem("dhs-pre")) { setDone(true); return; }
    let p = 0;
    const id = setInterval(() => {
      p += Math.random() * 9 + 4;
      if (p >= 100) {
        p = 100;
        setPct(100);
        clearInterval(id);
        setTimeout(() => { sessionStorage.setItem("dhs-pre", "1"); setDone(true); }, 650);
      } else setPct(Math.floor(p));
    }, 110);
    return () => clearInterval(id);
  }, []);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, y: "-100%" }}
          transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
          className="fixed inset-0 z-[9998] flex flex-col items-center justify-center bg-slate-950"
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(30,58,138,0.4),transparent_70%)]" />
          <div className="relative flex h-32 items-center justify-center overflow-hidden">
            <AnimatePresence mode="wait">
              {pct < 100 ? (
                <motion.div
                  key="dhs"
                  initial={{ y: 60, opacity: 0, rotateX: -90 }}
                  animate={{ y: 0, opacity: 1, rotateX: 0 }}
                  exit={{ y: -60, opacity: 0, rotateX: 90 }}
                  transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                  style={{ transformPerspective: 800 }}
                  className="font-display text-7xl font-light tracking-[0.3em] text-white md:text-8xl glow-text"
                >
                  DHS
                </motion.div>
              ) : (
                <motion.div
                  key="full"
                  initial={{ y: 60, opacity: 0, rotateX: -90 }}
                  animate={{ y: 0, opacity: 1, rotateX: 0 }}
                  transition={{ duration: 0.7 }}
                  style={{ transformPerspective: 800 }}
                  className="text-center"
                >
                  <div className="font-display text-3xl font-light tracking-[0.2em] text-white md:text-5xl">Dapoxplain</div>
                  <div className="mt-1 text-[10px] uppercase tracking-[0.5em] text-ice md:text-xs">Housing Services</div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          <div className="relative mt-12 w-72 max-w-[70vw]">
            <div className="h-px w-full bg-electric/15" />
            <motion.div animate={{ width: `${pct}%` }} transition={{ ease: "easeOut" }} className="absolute left-0 top-0 h-px bg-gradient-to-r from-royal via-electric to-ice shadow-[0_0_10px_rgba(59,130,246,0.8)]" />
            <div className="mt-3 flex justify-between text-[10px] uppercase tracking-[0.3em] text-ice/70">
              <span>Curating</span>
              <span>{pct}%</span>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
