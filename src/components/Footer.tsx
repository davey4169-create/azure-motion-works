import { Link } from "@tanstack/react-router";
import { Instagram, Linkedin, Twitter, Mail } from "lucide-react";

export function Footer() {
  return (
    <footer className="relative border-t border-electric/15 bg-slate-950">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-electric to-transparent" />
      <div className="mx-auto grid max-w-7xl gap-12 px-6 py-20 md:grid-cols-4">
        <div className="md:col-span-2">
          <div className="font-display text-3xl text-white">Dapoxplain<span className="text-electric">.</span></div>
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-slate-400">
            A bespoke real estate atelier curating the world's most extraordinary residences for an exceptional clientele.
          </p>
          <div className="mt-6 flex gap-3">
            {[Instagram, Linkedin, Twitter, Mail].map((Icon, i) => (
              <a key={i} href="#" data-cursor="Follow" className="grid h-10 w-10 place-items-center rounded-full border border-ice/20 text-ice transition-all hover:border-electric hover:bg-electric/10 hover:text-white hover:shadow-[0_0_20px_rgba(59,130,246,0.4)]">
                <Icon size={16} />
              </a>
            ))}
          </div>
        </div>
        <div>
          <div className="mb-4 text-xs uppercase tracking-[0.3em] text-ice/70">Explore</div>
          <ul className="space-y-3 text-sm text-slate-300">
            <li><Link to="/properties" className="hover:text-electric">Portfolio</Link></li>
            <li><Link to="/services" className="hover:text-electric">Services</Link></li>
            <li><Link to="/about" className="hover:text-electric">Atelier</Link></li>
            <li><Link to="/contact" className="hover:text-electric">VIP Concierge</Link></li>
          </ul>
        </div>
        <div>
          <div className="mb-4 text-xs uppercase tracking-[0.3em] text-ice/70">Ateliers</div>
          <ul className="space-y-3 text-sm text-slate-300">
            <li>New York · 432 Park Ave</li>
            <li>Monaco · Carré d'Or</li>
            <li>Dubai · Burj Plaza 88</li>
            <li>Hong Kong · The Peak</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-electric/10">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-6 py-6 text-xs uppercase tracking-[0.25em] text-slate-500 md:flex-row">
          <div>© 2026 Dapoxplain Housing Services</div>
          <div>Crafted with discretion · Worldwide</div>
        </div>
      </div>
    </footer>
  );
}
