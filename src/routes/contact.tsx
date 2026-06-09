import { createFileRoute } from "@tanstack/react-router";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { ArrowRight, Check, Plus, Minus } from "lucide-react";
import { VideoBackground } from "@/components/VideoBackground";
import { MagneticButton } from "@/components/MagneticButton";
import { SectionLabel } from "@/components/SectionLabel";
import { SplitText } from "@/components/SplitText";
import { VIDEOS } from "@/lib/media";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "VIP Concierge — Dapoxplain Housing Services" },
      { name: "description", content: "Request a private tour or speak with a DHS principal concierge." },
      { property: "og:title", content: "Contact — DHS" },
      { property: "og:description", content: "Reach our private concierge." },
    ],
  }),
  component: ContactPage,
});

const STEPS = ["Identity", "Interest", "Schedule", "Confirm"] as const;

function ContactPage() {
  const [step, setStep] = useState(0);
  const [form, setForm] = useState({ name: "", email: "", phone: "", interest: "Mansion", budget: "$10M–$30M", location: "", date: "", notes: "" });
  const [done, setDone] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const e: Record<string, string> = {};
    if (step === 0) {
      if (form.name.trim().length < 2) e.name = "Please share your full name";
      if (!/^[^@]+@[^@]+\.[^@]+$/.test(form.email)) e.email = "A valid email, please";
      if (form.phone && form.phone.length < 6) e.phone = "Phone seems short";
    }
    if (step === 1 && !form.location.trim()) e.location = "Where shall we look?";
    if (step === 2 && !form.date) e.date = "Pick a preferred date";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const next = () => { if (validate()) setStep((s) => Math.min(s + 1, STEPS.length - 1)); };
  const submit = () => { if (validate()) setDone(true); };

  return (
    <>
      <section className="relative flex min-h-[60vh] items-center overflow-hidden pt-40">
        <VideoBackground src={VIDEOS.pool} overlay="fade" />
        <div className="relative mx-auto max-w-7xl px-6">
          <SectionLabel>VIP Concierge</SectionLabel>
          <h1 className="font-display text-6xl font-light leading-[0.95] text-white md:text-8xl">
            <SplitText text="A private" />
            <br />
            <SplitText text="introduction." delay={0.3} className="italic text-ice glow-text" />
          </h1>
        </div>
      </section>

      <section className="relative bg-slate-950 py-24">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(30,58,138,0.3),transparent_60%)]" />
        <div className="relative mx-auto grid max-w-7xl gap-16 px-6 lg:grid-cols-[1.2fr_1fr]">
          <div className="glass-panel rounded-3xl p-8 md:p-12">
            {!done ? (
              <>
                <div className="mb-10 flex items-center gap-3">
                  {STEPS.map((s, i) => (
                    <div key={s} className="flex flex-1 items-center gap-3">
                      <div className={`grid h-9 w-9 flex-none place-items-center rounded-full border text-xs transition-all ${i <= step ? "border-electric bg-electric/20 text-white shadow-[0_0_20px_rgba(59,130,246,0.5)]" : "border-ice/20 text-ice/40"}`}>
                        {i < step ? <Check size={14} /> : i + 1}
                      </div>
                      <div className="hidden text-[10px] uppercase tracking-[0.25em] text-ice/70 md:block">{s}</div>
                      {i < STEPS.length - 1 && <div className="h-px flex-1 bg-ice/15" />}
                    </div>
                  ))}
                </div>

                <AnimatePresence mode="wait">
                  <motion.div key={step} initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }} transition={{ duration: 0.4 }} className="space-y-5">
                    {step === 0 && (
                      <>
                        <Field label="Full Name" value={form.name} onChange={(v) => setForm({ ...form, name: v })} error={errors.name} />
                        <Field label="Email" type="email" value={form.email} onChange={(v) => setForm({ ...form, email: v })} error={errors.email} />
                        <Field label="Phone (optional)" value={form.phone} onChange={(v) => setForm({ ...form, phone: v })} error={errors.phone} />
                      </>
                    )}
                    {step === 1 && (
                      <>
                        <Select label="Residence Type" value={form.interest} options={["Mansion", "Penthouse", "Villa", "Chalet", "Off-market"]} onChange={(v) => setForm({ ...form, interest: v })} />
                        <Select label="Budget" value={form.budget} options={["<$10M", "$10M–$30M", "$30M–$60M", "$60M+"]} onChange={(v) => setForm({ ...form, budget: v })} />
                        <Field label="Preferred Location" value={form.location} onChange={(v) => setForm({ ...form, location: v })} error={errors.location} placeholder="e.g. Manhattan, Côte d'Azur" />
                      </>
                    )}
                    {step === 2 && (
                      <>
                        <Field label="Preferred Date" type="date" value={form.date} onChange={(v) => setForm({ ...form, date: v })} error={errors.date} />
                        <Field label="Notes for the concierge" value={form.notes} onChange={(v) => setForm({ ...form, notes: v })} placeholder="Tell us about your ideal residence" multiline />
                      </>
                    )}
                    {step === 3 && (
                      <div className="space-y-3 text-sm text-slate-300">
                        <Review label="Name" v={form.name} />
                        <Review label="Email" v={form.email} />
                        <Review label="Type" v={form.interest} />
                        <Review label="Budget" v={form.budget} />
                        <Review label="Location" v={form.location} />
                        <Review label="Date" v={form.date} />
                        {form.notes && <Review label="Notes" v={form.notes} />}
                      </div>
                    )}
                  </motion.div>
                </AnimatePresence>

                <div className="mt-10 flex items-center justify-between">
                  <button onClick={() => setStep((s) => Math.max(s - 1, 0))} disabled={step === 0} className="text-xs uppercase tracking-[0.3em] text-ice/60 disabled:opacity-30 hover:text-white">Back</button>
                  {step < STEPS.length - 1 ? (
                    <MagneticButton onClick={next} cursorLabel="Next"><span className="flex items-center gap-2">Continue <ArrowRight size={14} /></span></MagneticButton>
                  ) : (
                    <MagneticButton onClick={submit} cursorLabel="Send"><span className="flex items-center gap-2">Send Request <Check size={14} /></span></MagneticButton>
                  )}
                </div>
              </>
            ) : (
              <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="py-16 text-center">
                <div className="mx-auto mb-6 grid h-20 w-20 place-items-center rounded-full bg-gradient-to-br from-royal to-electric shadow-[0_0_60px_rgba(59,130,246,0.6)]">
                  <Check size={32} className="text-white" />
                </div>
                <h3 className="font-display text-4xl text-white">Request received.</h3>
                <p className="mx-auto mt-4 max-w-md text-sm text-slate-300">A principal concierge will reach you within 12 hours. Welcome to DHS, {form.name.split(" ")[0]}.</p>
              </motion.div>
            )}
          </div>

          <div className="space-y-6">
            <div className="glass-panel rounded-2xl p-8">
              <div className="text-xs uppercase tracking-[0.3em] text-ice/70">Direct Concierge</div>
              <div className="mt-3 font-display text-2xl text-white">concierge@dhs.world</div>
              <div className="mt-1 text-sm text-slate-400">+1 (212) 555 — 0188</div>
            </div>
            <div className="glass-panel rounded-2xl p-8">
              <div className="text-xs uppercase tracking-[0.3em] text-ice/70">Ateliers</div>
              <div className="mt-4 space-y-2 text-sm text-slate-300">
                <div>New York · Monaco · Dubai · Hong Kong</div>
              </div>
            </div>
            <FAQ />
          </div>
        </div>
      </section>
    </>
  );
}

function Field({ label, value, onChange, error, type = "text", placeholder, multiline }: { label: string; value: string; onChange: (v: string) => void; error?: string; type?: string; placeholder?: string; multiline?: boolean }) {
  const [focus, setFocus] = useState(false);
  const Tag = (multiline ? "textarea" : "input") as "input";
  return (
    <div>
      <label className="mb-2 block text-[10px] uppercase tracking-[0.3em] text-ice/70">{label}</label>
      <div className={`relative rounded-xl border bg-slate-950/40 transition-all ${focus ? "border-electric shadow-[0_0_30px_-5px_rgba(59,130,246,0.7)]" : error ? "border-destructive/60" : "border-ice/20"}`}>
        <Tag
          type={type}
          value={value}
          placeholder={placeholder}
          onChange={(e) => onChange((e.target as HTMLInputElement).value)}
          onFocus={() => setFocus(true)}
          onBlur={() => setFocus(false)}
          rows={multiline ? 4 : undefined}
          className="w-full bg-transparent px-4 py-3.5 text-sm text-white placeholder:text-slate-500 focus:outline-none"
        />
      </div>
      <AnimatePresence>
        {error && <motion.div initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="mt-1.5 text-[11px] text-destructive">{error}</motion.div>}
      </AnimatePresence>
    </div>
  );
}

function Select({ label, value, options, onChange }: { label: string; value: string; options: string[]; onChange: (v: string) => void }) {
  return (
    <div>
      <label className="mb-2 block text-[10px] uppercase tracking-[0.3em] text-ice/70">{label}</label>
      <div className="flex flex-wrap gap-2">
        {options.map((o) => (
          <button key={o} type="button" onClick={() => onChange(o)} data-cursor="Pick" className={`rounded-full border px-4 py-2 text-xs uppercase tracking-[0.2em] transition-all ${value === o ? "border-electric bg-electric/15 text-white shadow-[0_0_20px_-5px_rgba(59,130,246,0.7)]" : "border-ice/20 text-slate-400 hover:border-ice/60 hover:text-white"}`}>
            {o}
          </button>
        ))}
      </div>
    </div>
  );
}

function Review({ label, v }: { label: string; v: string }) {
  return (
    <div className="flex justify-between gap-4 border-b border-ice/10 pb-2">
      <span className="text-[10px] uppercase tracking-[0.3em] text-ice/60">{label}</span>
      <span className="text-right text-white">{v || "—"}</span>
    </div>
  );
}

const FAQS = [
  { q: "Is my inquiry confidential?", a: "Absolutely. Every request is handled under NDA-level discretion by a single named principal." },
  { q: "Can I tour off-market homes?", a: "Yes — that is, in fact, most of our portfolio. We arrange private viewings worldwide, often within 48 hours." },
  { q: "Do you represent sellers?", a: "Selectively. We accept a limited number of seller mandates per year to preserve the exclusivity of our buyer network." },
  { q: "What is the typical engagement?", a: "Engagements begin with a complimentary 60-minute conversation to determine fit, followed by a bespoke retainer." },
];

function FAQ() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <div className="glass-panel rounded-2xl p-8">
      <div className="mb-4 text-xs uppercase tracking-[0.3em] text-ice/70">Frequently Asked</div>
      <div className="space-y-2">
        {FAQS.map((f, i) => (
          <div key={i} className="border-b border-ice/10 last:border-0">
            <button onClick={() => setOpen(open === i ? null : i)} data-cursor={open === i ? "Close" : "Open"} className="flex w-full items-center justify-between py-4 text-left text-sm text-white">
              <span>{f.q}</span>
              {open === i ? <Minus size={14} className="text-electric" /> : <Plus size={14} className="text-ice" />}
            </button>
            <AnimatePresence>
              {open === i && (
                <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }} className="overflow-hidden">
                  <p className="pb-4 text-sm leading-relaxed text-slate-400">{f.a}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </div>
  );
}
