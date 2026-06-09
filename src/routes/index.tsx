import { createFileRoute, Link } from "@tanstack/react-router";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { ArrowRight, ChevronDown, MapPin, Bed, Bath, Maximize } from "lucide-react";
import { VideoBackground } from "@/components/VideoBackground";
import { MagneticButton } from "@/components/MagneticButton";
import { TiltCard } from "@/components/TiltCard";
import { SectionLabel } from "@/components/SectionLabel";
import { SplitText } from "@/components/SplitText";
import { VIDEOS, PROPERTIES } from "@/lib/media";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Dapoxplain Housing Services — Bespoke Ultra-Luxury Estates" },
      { name: "description", content: "Cinematic, hand-curated residences across the world's most exceptional locations." },
      { property: "og:title", content: "Dapoxplain Housing Services" },
      { property: "og:description", content: "Bespoke ultra-luxury real estate, worldwide." },
    ],
  }),
  component: HomePage,
});

function HomePage() {
  return (
    <>
      <Hero />
      <Story />
      <Featured />
      <Stats />
    </>
  );
}

function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 250]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.15]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  // mouse parallax
  const [mp, setMp] = useState({ x: 0, y: 0 });
  useEffect(() => {
    const fn = (e: MouseEvent) => setMp({ x: (e.clientX / window.innerWidth - 0.5) * 30, y: (e.clientY / window.innerHeight - 0.5) * 30 });
    window.addEventListener("mousemove", fn);
    return () => window.removeEventListener("mousemove", fn);
  }, []);

  return (
    <section ref={ref} className="relative flex min-h-screen items-center justify-center overflow-hidden">
      <motion.div style={{ scale, y }} className="absolute inset-0">
        <VideoBackground src={VIDEOS.hero} overlay="fade" />
      </motion.div>
      <motion.div style={{ opacity, y }} className="relative z-10 mx-auto max-w-6xl px-6 pt-24 text-center">
        <motion.div animate={{ x: mp.x * 0.3, y: mp.y * 0.3 }} transition={{ type: "spring", stiffness: 50, damping: 20 }}>
          <div className="mb-6 inline-flex items-center gap-3 rounded-full border border-ice/30 bg-slate-950/40 px-5 py-2 text-[10px] uppercase tracking-[0.4em] text-ice backdrop-blur-md">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-electric" /> Curated Worldwide · Est. 2009
          </div>
          <h1 className="font-display text-[14vw] font-light leading-[0.9] tracking-[-0.04em] text-white md:text-[8.5rem]">
            <SplitText text="Residences" delay={0.2} className="block glow-text" />
            <SplitText text="of consequence." delay={0.5} className="block italic text-ice" />
          </h1>
          <motion.p initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.4, duration: 1 }} className="mx-auto mt-8 max-w-xl text-base leading-relaxed text-slate-300">
            Dapoxplain Housing Services curates the world's most extraordinary private homes — for clients who recognize that the rarest assets are never publicly listed.
          </motion.p>
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.7, duration: 1 }} className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <Link to="/properties"><MagneticButton cursorLabel="View"> <span className="flex items-center gap-2">Explore Portfolio <ArrowRight size={14} className="transition-transform duration-300 group-hover:translate-x-1" /></span></MagneticButton></Link>
            <Link to="/contact"><MagneticButton variant="ghost" cursorLabel="Book">Private Tour</MagneticButton></Link>
          </motion.div>
        </motion.div>
      </motion.div>

      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2.2 }} className="absolute bottom-10 left-1/2 z-10 -translate-x-1/2">
        <div className="flex flex-col items-center gap-3 text-[10px] uppercase tracking-[0.4em] text-ice/80">
          <span>Scroll to Explore</span>
          <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }} className="flex h-10 w-6 items-start justify-center rounded-full border border-ice/40 p-1.5">
            <motion.div animate={{ y: [0, 12, 0], opacity: [1, 0, 1] }} transition={{ duration: 2, repeat: Infinity }} className="h-1.5 w-1 rounded-full bg-electric" />
          </motion.div>
          <ChevronDown size={14} className="text-electric" />
        </div>
      </motion.div>
    </section>
  );
}

function Story() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y1 = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -200]);
  const opacity = useTransform(scrollYProgress, [0.1, 0.4, 0.7, 0.9], [0, 1, 1, 0]);

  return (
    <section ref={ref} className="relative min-h-[150vh] overflow-hidden bg-slate-950">
      <motion.div style={{ y: y1 }} className="absolute inset-0 h-[120vh]">
        <VideoBackground src={VIDEOS.interior} overlay="dark" />
      </motion.div>
      <div className="sticky top-0 flex h-screen items-center">
        <motion.div style={{ y: y2, opacity }} className="mx-auto max-w-5xl px-6">
          <SectionLabel>The Atelier</SectionLabel>
          <h2 className="font-display text-5xl font-light leading-[1.05] tracking-tight text-white md:text-7xl">
            We do not sell homes. <br />
            <span className="italic text-ice">We compose lives</span> around architecture <br />
            that the world will remember.
          </h2>
          <div className="mt-10 grid gap-8 text-sm leading-relaxed text-slate-300 md:grid-cols-2">
            <p>Every residence in our portfolio is met in person, vetted by our architects, and presented only to a hand-picked circle of principals. The result is a quiet, decisive market — moving silently, far above the noise.</p>
            <p>From a glass pavilion in Aspen to a Riviera villa with a private vineyard, DHS is the discreet bridge between exceptional places and the people who belong in them.</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function Featured() {
  const [active, setActive] = useState<string | null>(null);
  const items = PROPERTIES.slice(0, 6);

  return (
    <section className="relative overflow-hidden bg-slate-950 py-32">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(30,58,138,0.3),transparent_50%)]" />
      <div className="relative mx-auto max-w-7xl px-6">
        <div className="mb-16 flex flex-wrap items-end justify-between gap-6">
          <div>
            <SectionLabel>Featured Residences</SectionLabel>
            <h2 className="font-display text-5xl font-light text-white md:text-6xl">A private <span className="italic text-ice">selection.</span></h2>
          </div>
          <Link to="/properties"><MagneticButton variant="ghost" cursorLabel="View">View Full Portfolio</MagneticButton></Link>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {items.map((p, i) => (
            <motion.div
              key={p.id}
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.8, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
            >
              <TiltCard className="h-full">
                <motion.div
                  layout
                  onClick={() => setActive(active === p.id ? null : p.id)}
                  data-cursor="View Video"
                  className="relative cursor-none overflow-hidden rounded-2xl border border-electric/15 bg-slate-900/40 transition-all duration-500 group-hover:border-electric/60 group-hover:shadow-[0_30px_80px_-30px_rgba(59,130,246,0.6)]"
                >
                  <div className="relative aspect-[4/5] overflow-hidden">
                    <video autoPlay muted loop playsInline src={p.video} className="absolute inset-0 h-full w-full object-cover transition-transform duration-1000 group-hover:scale-110" />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-transparent" />
                    <div className="absolute left-4 top-4 rounded-full border border-ice/30 bg-slate-950/60 px-3 py-1 text-[10px] uppercase tracking-[0.3em] text-ice backdrop-blur-md">{p.type}</div>
                    <div className="absolute inset-x-0 bottom-0 p-6">
                      <div className="text-xs uppercase tracking-[0.3em] text-ice/80"><MapPin size={12} className="mr-1 inline" />{p.location}</div>
                      <div className="mt-2 font-display text-2xl text-white">{p.name}</div>
                      <div className="mt-1 font-display text-xl text-electric">{p.price}</div>

                      {active === p.id && (
                        <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} className="mt-4 space-y-3 overflow-hidden">
                          <p className="text-xs leading-relaxed text-slate-300">{p.blurb}</p>
                          <div className="flex gap-4 text-[10px] uppercase tracking-[0.2em] text-ice/80">
                            <span className="flex items-center gap-1"><Bed size={12} />{p.beds}</span>
                            <span className="flex items-center gap-1"><Bath size={12} />{p.baths}</span>
                            <span className="flex items-center gap-1"><Maximize size={12} />{p.sqft} ft²</span>
                          </div>
                          <Link to="/contact" className="mt-2 inline-flex items-center gap-2 rounded-full bg-electric px-4 py-2 text-[10px] uppercase tracking-[0.25em] text-white hover:bg-ice">
                            Schedule Private Tour <ArrowRight size={12} />
                          </Link>
                        </motion.div>
                      )}
                    </div>
                  </div>
                </motion.div>
              </TiltCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Counter({ to, suffix = "", prefix = "" }: { to: number; suffix?: string; prefix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!inView) return;
    const start = performance.now();
    const dur = 1800;
    const tick = (t: number) => {
      const p = Math.min((t - start) / dur, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setN(to * eased);
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [inView, to]);
  const display = to >= 100 ? Math.floor(n).toLocaleString() : n.toFixed(1);
  return <span ref={ref}>{prefix}{display}{suffix}</span>;
}

function Stats() {
  const stats = [
    { v: 2.5, suffix: "B+", prefix: "$", label: "Solved Listings" },
    { v: 850, suffix: "+", prefix: "", label: "Curated Residences" },
    { v: 99.8, suffix: "%", prefix: "", label: "Client Satisfaction" },
    { v: 42, suffix: "", prefix: "", label: "Countries Served" },
  ];
  return (
    <section className="relative overflow-hidden bg-slate-950 py-32">
      <VideoBackground src={VIDEOS.drone} overlay="dark" />
      <div className="relative mx-auto max-w-7xl px-6">
        <div className="mb-16 text-center">
          <SectionLabel><span className="mx-auto">A Quiet Track Record</span></SectionLabel>
          <h2 className="font-display text-5xl font-light text-white md:text-6xl">Measured in <span className="italic text-ice">trust.</span></h2>
        </div>
        <div className="grid gap-8 md:grid-cols-4">
          {stats.map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.8, delay: i * 0.1 }}
              className="relative rounded-2xl border border-electric/15 bg-slate-950/50 p-8 text-center backdrop-blur-md"
            >
              <div className="absolute inset-0 -z-10 gradient-radial opacity-60" />
              <div className="font-display text-6xl font-light text-white glow-text">
                <Counter to={s.v} suffix={s.suffix} prefix={s.prefix} />
              </div>
              <div className="mt-3 text-xs uppercase tracking-[0.3em] text-ice/80">{s.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
