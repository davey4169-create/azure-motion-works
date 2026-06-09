import { createFileRoute, Link } from "@tanstack/react-router";
import { AnimatePresence, LayoutGroup, motion } from "framer-motion";
import { useMemo, useState } from "react";
import { MapPin, Bed, Bath, Maximize, ArrowUpRight } from "lucide-react";
import { VideoBackground } from "@/components/VideoBackground";
import { TiltCard } from "@/components/TiltCard";
import { SectionLabel } from "@/components/SectionLabel";
import { SplitText } from "@/components/SplitText";
import { VIDEOS, PROPERTIES } from "@/lib/media";

export const Route = createFileRoute("/properties")({
  head: () => ({
    meta: [
      { title: "Portfolio — Dapoxplain Housing Services" },
      { name: "description", content: "Explore the DHS portfolio of ultra-luxury residences across the world's most desired addresses." },
      { property: "og:title", content: "Portfolio — DHS" },
      { property: "og:description", content: "Ultra-luxury residences, curated worldwide." },
    ],
  }),
  component: PropertiesPage,
});

const LOCATIONS = ["All", "California", "Colorado", "France", "New York", "Florida", "Switzerland"];
const TYPES = ["All", "Mansion", "Penthouse", "Villa", "Chalet"];
const RANGES = ["All", "<30M", "30–50M", "50M+"];

const priceVal = (s: string) => Number(s.replace(/[^0-9.]/g, ""));

function inRange(p: string, r: string) {
  if (r === "All") return true;
  const v = priceVal(p) / 1_000_000;
  if (r === "<30M") return v < 30;
  if (r === "30–50M") return v >= 30 && v <= 50;
  return v > 50;
}

function PropertiesPage() {
  const [loc, setLoc] = useState("All");
  const [type, setType] = useState("All");
  const [range, setRange] = useState("All");

  const list = useMemo(
    () => PROPERTIES.filter(
      (p) => (loc === "All" || p.location.includes(loc)) && (type === "All" || p.type === type) && inRange(p.price, range),
    ),
    [loc, type, range],
  );

  return (
    <>
      <section className="relative flex min-h-[70vh] items-end overflow-hidden pb-20 pt-40">
        <VideoBackground src={VIDEOS.exterior} overlay="fade" />
        <div className="relative mx-auto max-w-7xl px-6">
          <SectionLabel>Portfolio</SectionLabel>
          <h1 className="font-display text-6xl font-light leading-[0.95] text-white md:text-8xl">
            <SplitText text="The collection," />
            <br />
            <SplitText text="unlisted." delay={0.3} className="italic text-ice glow-text" />
          </h1>
          <p className="mt-6 max-w-xl text-sm leading-relaxed text-slate-300">A living archive of residences our principals quietly trust us to represent.</p>
        </div>
      </section>

      <section className="relative bg-slate-950 py-20">
        <div className="mx-auto max-w-7xl px-6">
          <FilterRow label="Location" options={LOCATIONS} value={loc} onChange={setLoc} />
          <FilterRow label="Type" options={TYPES} value={type} onChange={setType} />
          <FilterRow label="Price" options={RANGES} value={range} onChange={setRange} />

          <LayoutGroup>
            <motion.div layout className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              <AnimatePresence mode="popLayout">
                {list.map((p) => (
                  <motion.div
                    key={p.id}
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <TiltCard className="h-full">
                      <div data-cursor="View" className="group relative overflow-hidden rounded-2xl border border-electric/15 bg-slate-900/40 transition-all group-hover:border-electric/60 group-hover:shadow-[0_30px_80px_-30px_rgba(59,130,246,0.6)]">
                        <div className="relative aspect-[4/5] overflow-hidden">
                          <video autoPlay muted loop playsInline src={p.video} className="absolute inset-0 h-full w-full object-cover transition-transform duration-1000 group-hover:scale-110" />
                          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
                          <div className="absolute left-4 top-4 rounded-full border border-ice/30 bg-slate-950/60 px-3 py-1 text-[10px] uppercase tracking-[0.3em] text-ice backdrop-blur-md">{p.type}</div>
                          <div className="absolute inset-x-0 bottom-0 p-6">
                            <div className="text-xs uppercase tracking-[0.3em] text-ice/80"><MapPin size={12} className="mr-1 inline" />{p.location}</div>
                            <div className="mt-2 font-display text-2xl text-white">{p.name}</div>
                            <div className="mt-1 font-display text-xl text-electric">{p.price}</div>
                            <div className="mt-3 flex gap-4 text-[10px] uppercase tracking-[0.2em] text-ice/80">
                              <span className="flex items-center gap-1"><Bed size={12} />{p.beds}</span>
                              <span className="flex items-center gap-1"><Bath size={12} />{p.baths}</span>
                              <span className="flex items-center gap-1"><Maximize size={12} />{p.sqft} ft²</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </TiltCard>
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          </LayoutGroup>

          {list.length === 0 && (
            <div className="mt-20 text-center text-sm uppercase tracking-[0.3em] text-ice/60">No residences match this curation.</div>
          )}
        </div>
      </section>

      <MapSection />
    </>
  );
}

function FilterRow({ label, options, value, onChange }: { label: string; options: readonly string[]; value: string; onChange: (v: string) => void }) {
  return (
    <div className="mb-6 flex flex-wrap items-center gap-3">
      <span className="w-20 text-[10px] uppercase tracking-[0.3em] text-ice/60">{label}</span>
      <div className="flex flex-wrap gap-2">
        {options.map((o) => (
          <button
            key={o}
            onClick={() => onChange(o)}
            data-cursor="Filter"
            className={`rounded-full border px-4 py-1.5 text-[11px] uppercase tracking-[0.25em] transition-all ${
              value === o ? "border-electric bg-electric/15 text-white shadow-[0_0_25px_-5px_rgba(59,130,246,0.7)]" : "border-ice/20 text-slate-400 hover:border-ice/60 hover:text-white"
            }`}
          >
            {o}
          </button>
        ))}
      </div>
    </div>
  );
}

function MapSection() {
  const hotspots = [
    { id: "ny", x: 28, y: 38, name: "Manhattan", price: "$74M" },
    { id: "ca", x: 12, y: 46, name: "Malibu", price: "$48M" },
    { id: "co", x: 20, y: 42, name: "Aspen", price: "$33M" },
    { id: "fl", x: 30, y: 52, name: "Palm Beach", price: "$26M" },
    { id: "fr", x: 52, y: 38, name: "Côte d'Azur", price: "€59M" },
    { id: "ch", x: 53, y: 36, name: "Zermatt", price: "CHF 41M" },
  ];
  const [active, setActive] = useState<string | null>(null);
  return (
    <section className="relative overflow-hidden bg-slate-950 py-32">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(30,58,138,0.25),transparent_60%)]" />
      <div className="relative mx-auto max-w-7xl px-6">
        <div className="mb-12 text-center">
          <SectionLabel><span className="mx-auto">Global Atlas</span></SectionLabel>
          <h2 className="font-display text-5xl font-light text-white md:text-6xl">Always somewhere <span className="italic text-ice">extraordinary.</span></h2>
        </div>

        <div className="relative aspect-[16/9] overflow-hidden rounded-3xl border border-electric/20 bg-gradient-to-br from-royal/40 via-slate-950 to-midnight">
          <div className="absolute inset-0 opacity-30" style={{ backgroundImage: "radial-gradient(circle at 1px 1px, rgba(96,165,250,0.4) 1px, transparent 0)", backgroundSize: "32px 32px" }} />
          <svg viewBox="0 0 100 60" className="absolute inset-0 h-full w-full opacity-20">
            <path d="M5,30 Q15,18 25,28 T45,32 Q55,22 65,28 T85,30 Q90,32 95,28" stroke="#60A5FA" strokeWidth="0.3" fill="none" />
            <path d="M10,40 Q30,48 50,40 T90,42" stroke="#3B82F6" strokeWidth="0.3" fill="none" />
          </svg>
          {hotspots.map((h) => (
            <button
              key={h.id}
              onMouseEnter={() => setActive(h.id)}
              onMouseLeave={() => setActive(null)}
              data-cursor={h.name}
              style={{ left: `${h.x}%`, top: `${h.y}%` }}
              className="absolute -translate-x-1/2 -translate-y-1/2"
            >
              <span className="relative flex h-4 w-4">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-electric opacity-75" />
                <span className="relative inline-flex h-4 w-4 rounded-full bg-electric shadow-[0_0_20px_rgba(59,130,246,0.9)]" />
              </span>
              <AnimatePresence>
                {active === h.id && (
                  <motion.div initial={{ opacity: 0, y: 10, scale: 0.9 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 10, scale: 0.9 }} className="absolute -top-20 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-xl border border-electric/40 bg-slate-950/90 px-4 py-3 backdrop-blur-md">
                    <div className="text-xs uppercase tracking-[0.3em] text-ice/80">{h.name}</div>
                    <div className="font-display text-lg text-white">{h.price}</div>
                  </motion.div>
                )}
              </AnimatePresence>
            </button>
          ))}
        </div>

        <div className="mt-10 text-center">
          <Link to="/contact" data-cursor="Inquire" className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.3em] text-ice hover:text-white">
            Request the off-market dossier <ArrowUpRight size={14} />
          </Link>
        </div>
      </div>
    </section>
  );
}
