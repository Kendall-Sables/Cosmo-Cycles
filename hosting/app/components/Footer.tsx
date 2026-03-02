import Link from 'next/link';
import { Mail, Instagram, Twitter, Facebook, ArrowRight } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-emerald-950 text-white pt-24 pb-12 px-6 border-t border-emerald-900 relative overflow-hidden">
      {/* Subtle Background Accent */}
      <div className="absolute -bottom-10 -right-10 text-[18vw] font-black text-emerald-900/10 select-none leading-none uppercase italic pointer-events-none">
        Cosmo
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-12">
          
          {/* 1. Brand & Socials */}
          <div className="lg:col-span-4">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-emerald-500 rounded-sm flex items-center justify-center rotate-3 shadow-lg">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-emerald-950"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg>
              </div>
              <h3 className="text-3xl font-black tracking-tighter italic uppercase">COSMO<span className="text-emerald-500">CYCLES</span></h3>
            </div>
            <p className="text-emerald-200/50 max-w-sm text-sm leading-relaxed mb-8 font-medium">
              Precision engineered performance for the modern cyclist. From the professional circuit to the local climb, we provide the machines that define the ride.
            </p>
            
            <div className="flex gap-4">
              {[Instagram, Twitter, Facebook].map((Icon, i) => (
                <div key={i} className="w-10 h-10 border border-emerald-800 rounded-full flex items-center justify-center hover:bg-emerald-500 hover:text-emerald-950 transition-all cursor-pointer group">
                  <Icon size={18} className="text-emerald-500 group-hover:text-emerald-950" />
                </div>
              ))}
            </div>
          </div>

          {/* 2. Fleet Nav */}
          <div className="lg:col-span-2">
            <h4 className="font-black text-[10px] uppercase tracking-[0.3em] mb-8 text-emerald-400 border-l-2 border-emerald-500 pl-3">The Fleet</h4>
            <ul className="text-xs space-y-5 text-emerald-100/60 font-bold uppercase tracking-wider">
              <li className="hover:text-emerald-400 transition-colors cursor-pointer"><Link href="/shop">The Fleet</Link></li>
              <li className="hover:text-emerald-400 transition-colors cursor-pointer"><Link href="/shop">Road Racing</Link></li>
              <li className="hover:text-emerald-400 transition-colors cursor-pointer"><Link href="/shop">Mountain Performance</Link></li>
              <li className="hover:text-emerald-400 transition-colors cursor-pointer"><Link href="/shop">All-Road Gravel</Link></li>
            </ul>
          </div>

          {/* 3. Company Nav */}
          <div className="lg:col-span-2">
            <h4 className="font-black text-[10px] uppercase tracking-[0.3em] mb-8 text-emerald-400 border-l-2 border-emerald-500 pl-3">Company</h4>
            <ul className="text-xs space-y-5 text-emerald-100/60 font-bold uppercase tracking-wider">
              <li className="hover:text-emerald-400 transition-colors cursor-pointer"><Link href="/heritage">Our Heritage</Link></li>
              <li className="hover:text-emerald-400 transition-colors cursor-pointer">Shipping & Returns</li>
              <li className="hover:text-emerald-400 transition-colors cursor-pointer">Contact Support</li>
              <li className="hover:text-emerald-400 transition-colors cursor-pointer">Privacy Policy</li>
            </ul>
          </div>

          {/* 4. Newsletter Input - CLEAN VIBE */}
          <div className="lg:col-span-4 bg-white/5 p-8 rounded-2xl border border-white/10">
            <h4 className="font-black text-[10px] uppercase tracking-[0.3em] mb-4 text-white flex items-center gap-2">
              <Mail size={14} className="text-emerald-500" />
              Join the Newsletter
            </h4>
            <p className="text-[11px] text-emerald-100/40 mb-6 font-medium leading-relaxed">
              Get early access to limited edition frame drops, technical guides, and community events. No spam, just performance.
            </p>
            <div className="flex flex-col gap-3">
              <input 
                type="email" 
                placeholder="Enter your email address" 
                className="bg-emerald-950 border border-emerald-800 px-5 py-4 text-xs font-bold text-emerald-100 focus:outline-none focus:border-emerald-500 w-full transition rounded-xl placeholder:text-emerald-800"
              />
              <button className="bg-emerald-500 text-emerald-950 text-[10px] font-black uppercase py-4 rounded-xl hover:bg-white transition-all active:scale-[0.98] flex items-center justify-center gap-2">
                Subscribe <ArrowRight size={14} />
              </button>
            </div>
          </div>
        </div>

        {/* 5. Real-World Service Bar */}
        <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8 py-10 border-y border-emerald-900/30">
          {[
            { label: "Master Mechanics", desc: "50-Point Pre-Delivery Inspection" },
            { label: "Global Logistics", desc: "Insured White-Glove Shipping" },
            { label: "Lifetime Support", desc: "Unlimited Technical Consultation" }
          ].map((item, i) => (
            <div key={i} className="flex items-center gap-4">
               <div className="w-10 h-10 flex items-center justify-center border border-emerald-800 text-emerald-500 text-[10px] font-black rounded-lg">0{i+1}</div>
               <div>
                 <p className="text-[10px] font-black uppercase tracking-widest text-white">{item.label}</p>
                 <p className="text-[9px] font-bold uppercase tracking-widest text-emerald-500/50 italic">{item.desc}</p>
               </div>
            </div>
          ))}
        </div>

        {/* Footer Bottom */}
        <div className="mt-12 flex flex-col md:flex-row justify-between items-center gap-4 text-[9px] font-bold uppercase tracking-[0.4em] text-emerald-500/20">
          <p>© 2026 Cosmo Cycles // INF4027W Mini - Porject</p>
          <div className="flex gap-6 items-center">
            <span className="hover:text-emerald-400 transition-colors cursor-pointer">Sitemap</span>
            <span className="hover:text-emerald-400 transition-colors cursor-pointer">Cookie Settings</span>
            <span className="text-emerald-500/40 italic">Cape Town, ZA</span>
          </div>
        </div>
      </div>
    </footer>
  );
}