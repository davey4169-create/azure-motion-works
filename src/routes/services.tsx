import { createFileRoute } from "@tanstack/react-router";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Building2, Briefcase, Compass, Glasses } from "lucide-react";
import { VideoBackground } from "@/components/VideoBackground";
import { SectionLabel } from "@/components/SectionLabel";
import { SplitText } from "@/components/SplitText";
import { VIDEOS } from "@/lib/media";

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: "Services — Dapoxplain Housing Services" },
      { name: "description", content: "Luxury brokerage, asset management, architectural consultation, and VR walkthroughs by DHS." },
      { property: "og:title", content: "Services — DHS" },
      { property: "og:description", content: "Bespoke real estate services." },
    ],
  }),
  component: ServicesPage,
});

const SERVICES = [
  { icon: Briefcase, title: "Luxury Brokerage", num: "01", video: VIDEOS.exterior, body: "Private representation of buyers and sellers in the world's most exclusive markets. Discretion-first negotiation, off-market access, and a curated principal network spanning four continents." },
  { icon: Compass, title: "Asset Management", num: "02", video: VIDEOS.city, body: "End-to-end stewardship of trophy assets — performance reporting, tax-aware restructuring, family-office liaison, and the operational discipline of a private wealth desk." },
  { icon: Building2, title: "Architectural Consultation", num: "03", video: VIDEOS.interior, body: "Pritzker-tier architects on retainer. From ground-up commissions to interior reformation, we orchestrate visionaries, engineers and craftsmen into a single accountable team." },
  { icon: Glasses, title: "Virtual Reality Walkthroughs", num: "04", video: VIDEOS.drone, body: "Photoreal VR tours delivered to your suite. Walk a Riviera villa in Tokyo, audition five penthouses in an afternoon, and decide with conviction before a single flight." },
];

function ServicesPage() {
  return (
    <>
      <section className="relative flex min-h-[80vh] items-center overflow-hidden pt-40">
        <VideoBackground src={VIDEOS.living} overlay="fade" />
        <div className="relative mx-auto max-w-7xl px-6">
          <SectionLabel>Services</SectionLabel>
          <h1 className="font-display text-6xl font-light leading-[0.95] text-white md:text-8xl">
            <SplitText text="Four practices," />
            <br />
            <SplitText text="one standard." delay={0.3} className="italic text-ice glow-text" />
          </h1>
          <p className="mt-6 max-w-xl text-sm leading-relaxed text-slate-300">A vertically integrated atelier — brokerage, capital, design, and immersive technology — under one quiet roof.</p>
        </div>
      </section>

      {SERVICES.map((s, i) => (
        <Step key={s.num} {...s} reverse={i % 2 === 1} index={i} />
      ))}
    </>
  );
}

function Step({ icon: Icon, title, num, video, body, reverse, index }: { icon: typeof Briefcase; title: string; num: string; video: string; body: string; reverse: boolean; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [80, -80]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1.1, 1, 1.1]);

  return (
    <section ref={ref} className="relative min-h-[140vh] bg-slate-950 py-20">
      <div className={`mx-auto grid max-w-7xl gap-12 px-6 md:grid-cols-2 ${reverse ? "md:[&>*:first-child]:order-2" : ""}`}>
        <div className="md:sticky md:top-32 md:h-fit md:py-32">
          <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.8 }}>
            <div className="mb-6 flex items-center gap-4 text-xs uppercase tracking-[0.3em] text-ice/70">
              <span className="font-display text-5xl font-light text-electric glow-text">{num}</span>
              <span className="h-px w-16 bg-electric/40" />
            </div>
            <div className="mb-6 inline-flex h-14 w-14 items-center justify-center rounded-full border border-electric/40 bg-electric/10">
              <Icon className="text-ice" size={22} />
            </div>
            <h2 className="font-display text-5xl font-light leading-[1.05] text-white md:text-6xl">{title}</h2>
            <p className="mt-6 max-w-md text-sm leading-relaxed text-slate-300">{body}</p>
            <div className="mt-8 flex flex-wrap gap-2">
              {["Discretion", "Speed", "Network", "Conviction"].map((t) => (
                <span key={t} className="rounded-full border border-ice/20 px-4 py-1.5 text-[10px] uppercase tracking-[0.25em] text-ice/70">{t}</span>
              ))}
            </div>
          </motion.div>
        </div>
        <div className="relative">
          <motion.div style={{ y, scale }} className="relative aspect-[3/4] overflow-hidden rounded-3xl border border-electric/20 shadow-[0_40px_120px_-30px_rgba(59,130,246,0.4)]">
            <video autoPlay muted loop playsInline src={video} className="absolute inset-0 h-full w-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-slate-950/20" />
            <div className="absolute left-6 top-6 rounded-full border border-ice/40 bg-slate-950/60 px-4 py-1.5 text-[10px] uppercase tracking-[0.3em] text-ice backdrop-blur-md">
              Practice {String(index + 1).padStart(2, "0")}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
