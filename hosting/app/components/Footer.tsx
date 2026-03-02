import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-emerald-950 text-white pt-24 pb-12 px-6 border-t border-emerald-900 relative overflow-hidden">
      {/* Background Accent */}
      <div className="absolute -bottom-10 -right-10 text-[18vw] font-black text-emerald-900/10 select-none leading-none uppercase italic pointer-events-none">
        Cosmo
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-12">
          
          {/* 1. Brand & Socials */}
          <div className="lg:col-span-4">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-emerald-500 rounded-sm flex items-center justify-center rotate-3 shadow-[0_0_20px_rgba(16,185,129,0.3)]">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-emerald-950"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg>
              </div>
              <h3 className="text-3xl font-black tracking-tighter italic uppercase">COSMO<span className="text-emerald-500">CYCLES</span></h3>
            </div>
            <p className="text-emerald-200/50 max-w-sm text-sm leading-relaxed mb-8 font-medium">
              Sub-atomic precision carbon engineering. We don't just build bikes; we calibrate performance for the quadrant's elite pilots.
            </p>
            
            <div className="flex gap-4">
              <div className="w-10 h-10 border border-emerald-800 rounded-full flex items-center justify-center hover:bg-emerald-500 hover:text-emerald-950 transition-all cursor-pointer group">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-emerald-500 group-hover:text-emerald-950"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
              </div>
              <div className="w-10 h-10 border border-emerald-800 rounded-full flex items-center justify-center hover:bg-emerald-500 hover:text-emerald-950 transition-all cursor-pointer group">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-emerald-500 group-hover:text-emerald-950"><path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path></svg>
              </div>
              <div className="w-10 h-10 border border-emerald-800 rounded-full flex items-center justify-center hover:bg-emerald-500 hover:text-emerald-950 transition-all cursor-pointer group">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-emerald-500 group-hover:text-emerald-950"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
              </div>
            </div>
          </div>

          {/* 2. Fleet Nav */}
          <div className="lg:col-span-2">
            <h4 className="font-black text-[10px] uppercase tracking-[0.3em] mb-8 text-emerald-400 border-l-2 border-emerald-500 pl-3">The Fleet</h4>
            <ul className="text-xs space-y-5 text-emerald-100/60 font-bold uppercase tracking-wider">
              <li className="hover:text-emerald-400 transition-colors cursor-pointer">Road</li>
              <li className="hover:text-emerald-400 transition-colors cursor-pointer">Gravel</li>
              <li className="hover:text-emerald-400 transition-colors cursor-pointer">Mountain</li>
            </ul>
          </div>

          {/* 3. Legal Nav (REPLACED TERMINAL) */}
          <div className="lg:col-span-2">
            <h4 className="font-black text-[10px] uppercase tracking-[0.3em] mb-8 text-emerald-400 border-l-2 border-emerald-500 pl-3">Legal</h4>
            <ul className="text-xs space-y-5 text-emerald-100/60 font-bold uppercase tracking-wider">
              <li className="hover:text-emerald-400 transition-colors cursor-pointer">Privacy Policy</li>
              <li className="hover:text-emerald-400 transition-colors cursor-pointer">Terms & Conditions</li>
              <li className="hover:text-emerald-400 transition-colors cursor-pointer">Shipping Policy</li>
            </ul>
          </div>

          {/* 4. Telemetry Input */}
          <div className="lg:col-span-4 bg-emerald-900/20 p-8 border border-emerald-800/40 backdrop-blur-sm">
            <h4 className="font-black text-[10px] uppercase tracking-[0.3em] mb-4 text-emerald-400 flex items-center gap-2">
              <div className="w-1.5 h-1.5 bg-emerald-500 animate-ping rounded-full" />
              Telemetry Updates
            </h4>
            <p className="text-[11px] text-emerald-200/40 mb-6 font-medium leading-relaxed">
              Link your neural address for encrypted aero-data and launch sequence alerts.
            </p>
            <div className="flex gap-2">
              <input 
                type="text" 
                placeholder="PILOT_ID" 
                className="bg-emerald-950 border border-emerald-800 px-4 py-3 text-[10px] font-mono text-emerald-100 focus:outline-none focus:border-emerald-500 w-full transition uppercase tracking-widest"
              />
              <button className="bg-emerald-500 text-emerald-950 text-[10px] font-black uppercase px-6 py-3 hover:bg-white transition-all active:scale-95 shadow-[0_0_20px_rgba(16,185,129,0.2)]">
                Link
              </button>
            </div>
          </div>
        </div>

        {/* 5. The Technical Extras Bar */}
        <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8 py-8 border-y border-emerald-900/30">
          <div className="flex items-center gap-4">
             <div className="w-8 h-8 flex items-center justify-center border border-emerald-800 text-emerald-500/50 text-[10px] font-bold">01</div>
             <p className="text-[9px] font-black uppercase tracking-[0.2em] text-emerald-100/80 leading-tight">Lifetime Chassis<br/><span className="text-emerald-500/50 italic">Integrity Warranty</span></p>
          </div>
          <div className="flex items-center gap-4">
             <div className="w-8 h-8 flex items-center justify-center border border-emerald-800 text-emerald-500/50 text-[10px] font-bold">02</div>
             <p className="text-[9px] font-black uppercase tracking-[0.2em] text-emerald-100/80 leading-tight">Sub-8kg Target<br/><span className="text-emerald-500/50 italic">Standardized Mass</span></p>
          </div>
          <div className="flex items-center gap-4">
             <div className="w-2.5 h-2.5 bg-emerald-500 rounded-full shadow-[0_0_12px_rgba(16,185,129,0.6)]" />
             <p className="text-[9px] font-black uppercase tracking-[0.2em] text-emerald-400 leading-tight">System Status<br/><span className="text-emerald-500/50 italic">Last Sync: 2026</span></p>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="mt-12 flex flex-col md:flex-row justify-between items-center gap-4 text-[9px] font-bold uppercase tracking-[0.4em] text-emerald-500/20">
          <p>© 2026 Cosmo Cycles // INF4027W Mini-Project</p>
          <div className="flex gap-4 items-center">
            <span className="text-emerald-500/40">v3.4.0</span>
            <span className="w-12 h-[1px] bg-emerald-900" />
            <span className="text-emerald-500/40 italic">Orbiting: Cape Town</span>
          </div>
        </div>
      </div>
    </footer>
  );
}