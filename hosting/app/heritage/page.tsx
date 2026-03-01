'use client';
import Link from 'next/link';

export default function HeritagePage() {
  const milestones = [
    { year: '2002', title: 'The Genesis', desc: 'The first Cosmo prototype is engineered in a Cape Town garage, focusing on radical frame geometry.' },
    { year: '2008', title: 'Carbon Breakthrough', desc: 'We moved away from alloy to full-monocoque carbon fiber construction, shedding 40% total weight.' },
    { year: '2015', title: 'Pro-Circuit Victory', desc: 'Cosmo machines claimed their first international podium, validating our "Speed First" philosophy.' },
    { year: '2021', title: 'The Aero-Revolution', desc: 'Introduction of fully integrated cable routing and proprietary cockpit systems.' },
    { year: '2026', title: 'The Digital Fleet', desc: 'Launching the direct-to-pilot digital platform to bring elite performance to every corner of the globe.' },
  ];

  return (
    <div className="bg-white min-h-screen pt-32 pb-40 px-10 md:px-20">
      <div className="max-w-6xl mx-auto">
        
        {/* HERO SECTION */}
        <div className="mb-32">
          <p className="text-emerald-600 font-black uppercase tracking-[0.5em] text-[10px] mb-4">Our Legacy // Est. 2002</p>
          <h1 className="text-8xl font-black uppercase tracking-tighter text-slate-900 leading-[0.8] mb-8">
            Precision<br />Inheritance<span className="text-emerald-600">.</span>
          </h1>
          <p className="text-slate-500 text-lg max-w-2xl leading-relaxed italic">
            "We don't build bicycles. We engineer high-velocity kinetic sculptures for those who refuse to stand still."
          </p>
        </div>

        {/* NEW SECTION: TECHNICAL PHILOSOPHY */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-40">
            <div className="space-y-4">
                <h4 className="text-emerald-600 font-black text-[10px] uppercase tracking-widest">[ 01. Aerodynamics ]</h4>
                <p className="text-xs font-bold text-slate-900 uppercase leading-relaxed">Every tube profile is tested against crosswinds to ensure stability at peak velocity.</p>
            </div>
            <div className="space-y-4">
                <h4 className="text-emerald-600 font-black text-[10px] uppercase tracking-widest">[ 02. Integrity ]</h4>
                <p className="text-xs font-bold text-slate-900 uppercase leading-relaxed">High-modulus carbon layers are hand-placed to balance vertical compliance with lateral stiffness.</p>
            </div>
            <div className="space-y-4">
                <h4 className="text-emerald-600 font-black text-[10px] uppercase tracking-widest">[ 03. Pure Intent ]</h4>
                <p className="text-xs font-bold text-slate-900 uppercase leading-relaxed">No unnecessary features. No gimmicks. Only what makes the machine faster.</p>
            </div>
        </div>

        {/* TIMELINE GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-16 mb-40">
          {milestones.map((m, idx) => (
            <div key={idx} className="border-t border-slate-100 pt-10 group">
              <span className="text-4xl font-black text-slate-200 group-hover:text-emerald-500 transition-colors duration-500">
                {m.year}
              </span>
              <h3 className="text-xl font-black uppercase tracking-tight text-slate-900 mt-4 mb-4">
                {m.title}
              </h3>
              <p className="text-[11px] font-bold uppercase tracking-widest text-slate-400 leading-loose">
                {m.desc}
              </p>
            </div>
          ))}
        </div>

        {/* UPDATED CLOSING STATMENT: Matching your Emerald Green */}
        <div className="bg-emerald-950 p-20 text-center relative overflow-hidden rounded-sm">
          <div className="relative z-10">
            <h2 className="text-white text-4xl font-black uppercase tracking-tighter mb-8">Ready to start your chapter?</h2>
            <Link href="/shop" className="bg-white text-emerald-950 px-12 py-5 text-[11px] font-black uppercase tracking-[0.3em] hover:bg-emerald-500 hover:text-white transition-all inline-block">
              Acquire a Cosmo Machine
            </Link>
          </div>
          
          {/* Subtle Background Watermark */}
          <div className="absolute top-0 right-0 opacity-10 text-[250px] font-black text-white leading-none translate-x-1/4 -translate-y-1/4 pointer-events-none">
            C
          </div>
        </div>

      </div>
    </div>
  );
}