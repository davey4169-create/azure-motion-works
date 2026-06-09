import { motion } from "framer-motion";

export function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      className="mb-6 flex items-center gap-3 text-xs uppercase tracking-[0.4em] text-ice/80"
    >
      <span className="h-px w-10 bg-gradient-to-r from-transparent to-electric" />
      {children}
    </motion.div>
  );
}
