import { createFileRoute } from "@tanstack/react-router";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Instagram, Linkedin, Twitter } from "lucide-react";
import { VideoBackground } from "@/components/VideoBackground";
import { TiltCard } from "@/components/TiltCard";
import { SectionLabel } from "@/components/SectionLabel";
import { SplitText } from "@/components/SplitText";
import { VIDEOS, TEAM } from "@/lib/media";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About & Vision — Dapoxplain Housing Services" },
      { name: "description", content: "The atelier, the lineage and the executive board behind DHS." },
      { property: "og:title", content: "About — DHS" },
      { property: "og:description", content: "An atelier built on discretion." },
    ],
  }),
  component: AboutPage,
});

const TIMELINE = [
  { y: "2009", t: "Founded in Monte-Carlo", d: "A boutique advisory of three founders quietly representing Riviera estates." },
  { y: "2013", t: "Manhattan Atelier opens", d: "Cross-Atlantic mandate begins; first $50M off-market in Tribeca." },
  { y: "2017", t: "Architecture practice formed", d: "In-house Pritzker collaborators institutionalize the design arm." },
  { y: "2021", t: "Asset Strategy launches", d: "A formal capital desk for principals managing trophy portfolios." },
  { y: "2024", t: "VR Concierge", d: "Photoreal walkthroughs delivered to private suites worldwide." },
  { y: "2026", t: "$2.5B+ solved", d: "850+ residences placed across 42 countries. The quiet decade continues." },
];

function AboutPage() {
  return (
    <>
      <section className="relative flex min-h-[80vh] items-center overflow-hidden pt-40">
        <VideoBackground src={VIDEOS.night} overlay="fade" />
        <div className="relative mx-auto max-w-7xl px-6">
          <SectionLabel>Atelier</SectionLabel>
          <h1 className="font-display text-6xl font-light leading-[0.95] text-white md:text-8xl">
            <SplitText text="A practice built" />
            <br />
            <SplitText text="on silence." delay={0.3} className="italic text-ice glow-text" />
          </h1>
          <p className="mt-6 max-w-xl text-sm leading-relaxed text-slate-300">DHS exists to make extraordinary architecture available to the few who deserve it — and to do so with the dignity our clientele expects.</p>
        </div>
      </section>

      <Timeline />
      <Team />
    </>
  );
}

function Timeline() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const pathLength = useTransform(scrollYProgress, [0.1, 0.9], [0, 1]);

  return (
    <section ref={ref} className="relative bg-slate-950 py-32">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(30,58,138,0.25),transparent_60%)]" />
      <div className="relative mx-auto max-w-5xl px-6">
        <div className="mb-20 text-center">
          <SectionLabel><span className="mx-auto">Lineage</span></SectionLabel>
          <h2 className="font-display text-5xl font-light text-white md:text-6xl">A quiet <span className="italic text-ice">decade.</span></h2>
        </div>
        <div className="relative">
          <svg className="absolute left-1/2 top-0 hidden h-full -translate-x-1/2 md:block" width="2" viewBox="0 0 2 1000" preserveAspectRatio="none">
            <line x1="1" y1="0" x2="1" y2="1000" stroke="rgba(96,165,250,0.15)" strokeWidth="1" />
            <motion.line x1="1" y1="0" x2="1" y2="1000" stroke="#3B82F6" strokeWidth="2" style={{ pathLength }} strokeLinecap="round" />
          </svg>
          <div className="space-y-16">
            {TIMELINE.map((e, i) => (
              <motion.div
                key={e.y}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.7 }}
                className={`relative grid items-center gap-6 md:grid-cols-2 ${i % 2 ? "md:[&>*:first-child]:order-2" : ""}`}
              >
                <div className={`${i % 2 ? "md:text-left" : "md:text-right"}`}>
                  <div className="font-display text-5xl font-light text-electric glow-text">{e.y}</div>
                  <div className="mt-2 font-display text-2xl text-white">{e.t}</div>
                  <div className="mt-2 text-sm leading-relaxed text-slate-400">{e.d}</div>
                </div>
                <div className="absolute left-1/2 hidden h-4 w-4 -translate-x-1/2 rounded-full border-2 border-electric bg-slate-950 shadow-[0_0_25px_rgba(59,130,246,0.8)] md:block" />
                <div />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Team() {
  return (
    <section className="relative overflow-hidden bg-slate-950 py-32">
      <VideoBackground src={VIDEOS.city} overlay="dark" />
      <div className="relative mx-auto max-w-7xl px-6">
        <div className="mb-16 text-center">
          <SectionLabel><span className="mx-auto">Executive Board</span></SectionLabel>
          <h2 className="font-display text-5xl font-light text-white md:text-6xl">The custodians.</h2>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {TEAM.map((m, i) => (
            <motion.div key={m.name} initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-50px" }} transition={{ duration: 0.7, delay: i * 0.1 }}>
              <TiltCard>
                <div className="group relative overflow-hidden rounded-2xl border border-electric/15 bg-gradient-to-br from-slate-900/80 to-slate-950/80 p-8 backdrop-blur-md transition-all group-hover:border-electric/60 group-hover:shadow-[0_30px_80px_-30px_rgba(59,130,246,0.6)]">
                  <div className="relative mx-auto mb-6 grid h-32 w-32 place-items-center rounded-full bg-gradient-to-br from-royal to-electric font-display text-4xl text-white shadow-[0_0_40px_rgba(59,130,246,0.5)]">
                    {m.initials}
                    <div className="absolute inset-0 rounded-full ring-1 ring-ice/40" />
                  </div>
                  <div className="text-center">
                    <div className="font-display text-2xl text-white">{m.name}</div>
                    <div className="mt-1 text-[11px] uppercase tracking-[0.25em] text-ice/80">{m.role}</div>
                  </div>
                  <div className="mt-6 flex justify-center gap-2">
                    {[Instagram, Linkedin, Twitter].map((Icon, j) => (
                      <a key={j} href="#" data-cursor="Profile" className="grid h-9 w-9 place-items-center rounded-full border border-ice/20 text-ice transition-all hover:border-electric hover:bg-electric/10 hover:text-white hover:shadow-[0_0_15px_rgba(59,130,246,0.5)]">
                        <Icon size={14} />
                      </a>
                    ))}
                  </div>
                </div>
              </TiltCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
