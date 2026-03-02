'use client';
import Link from 'next/link';
import { ArrowRight, Zap, Award, Target } from 'lucide-react';

export default function HeritagePage() {
  const milestones = [
    { year: '2002', title: 'The Genesis', desc: 'The first Cosmo prototype is engineered in a Cape Town garage, focusing on radical frame geometry.' },
    { year: '2008', title: 'Carbon Breakthrough', desc: 'We moved away from alloy to full-monocoque carbon fiber construction, shedding 40% total weight.' },
    { year: '2015', title: 'Pro-Circuit Victory', desc: 'Cosmo machines claimed their first international podium, validating our "Speed First" philosophy.' },
    { year: '2021', title: 'The Aero-Revolution', desc: 'Introduction of fully integrated cable routing and proprietary cockpit systems.' },
    { year: '2026', title: 'The Digital Fleet', desc: 'Launching the direct-to-pilot digital platform to bring elite performance to every corner of the globe.' },
  ];

  return (
    <div className="bg-white min-h-screen">
      
      {/* 1. CINEMATIC HERO */}
      <section className="relative h-[85vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src="https://res.cloudinary.com/dzbriyw1o/image/upload/v1772428005/heritage-banner-background_eavelj.jpg" 
            className="w-full h-full object-cover grayscale brightness-[0.3]"
            alt="Heritage Road Cycling"
          />
        </div>
        
        <div className="relative z-10 text-center px-6">
          <p className="text-emerald-400 font-black uppercase tracking-[0.6em] text-[10px] mb-6">Established MMII // Cape Town</p>
          <h1 className="text-7xl md:text-[10rem] font-black text-white uppercase tracking-tighter leading-[0.8] mb-8">
            BORN IN <br /> <span className="text-transparent" style={{ WebkitTextStroke: '2px white' }}>THE WIND</span>
          </h1>
          <div className="w-24 h-1 bg-emerald-500 mx-auto"></div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-6 py-32">
        
        {/* 2. PHILOSOPHY GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-24 items-center mb-48">
          <div className="relative">
            <img 
              src="https://res.cloudinary.com/dzbriyw1o/image/upload/v1772428107/heritage-picture_nhbuvq.webp" 
              className="rounded-3xl shadow-2xl relative z-10"
              alt="Carbon Detail"
            />
            <div className="absolute -top-10 -left-10 w-40 h-40 bg-emerald-100/50 rounded-full -z-0"></div>
          </div>
          <div>
            <h2 className="text-xs font-black text-emerald-600 uppercase tracking-widest mb-6">Our Manifesto</h2>
            <h3 className="text-5xl font-black text-slate-900 uppercase tracking-tighter mb-8 leading-none">
              Engineering <br /> Kinetic Art.
            </h3>
            <p className="text-slate-500 text-lg leading-relaxed mb-10 italic border-l-4 border-emerald-500 pl-6">
              "We don't build bicycles. We engineer high-velocity kinetic sculptures for those who refuse to stand still."
            </p>
            <div className="grid grid-cols-1 gap-8">
              {[
                { icon: <Zap size={18}/>, title: 'AERODYNAMICS', text: 'Tested against crosswinds for peak stability.' },
                { icon: <Award size={18}/>, title: 'INTEGRITY', text: 'Hand-placed high-modulus carbon layers.' },
                { icon: <Target size={18}/>, title: 'PURE INTENT', text: 'Zero gimmicks. Only pure speed.' },
              ].map((item, i) => (
                <div key={i} className="flex gap-4 items-start">
                  <div className="text-emerald-600 mt-1">{item.icon}</div>
                  <div>
                    <h4 className="text-xs font-black uppercase tracking-widest text-slate-900">{item.title}</h4>
                    <p className="text-[11px] text-slate-500 uppercase font-bold mt-1 tracking-tight">{item.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 3. ZIG-ZAG VERTICAL TIMELINE - NOW IN EMERALD */}
        <div className="mb-48">
          <div className="text-center mb-32">
            <h2 className="text-xs font-black text-emerald-600 uppercase tracking-[0.4em] mb-4">Evolutionary Path</h2>
            <h3 className="text-6xl font-black text-slate-900 uppercase tracking-tighter">The Milestones</h3>
          </div>

          <div className="relative space-y-32">
            <div className="absolute left-1/2 top-0 bottom-0 w-px bg-slate-200 hidden md:block"></div>

            {milestones.map((m, idx) => (
              <div 
                key={idx} 
                className={`flex flex-col md:flex-row items-center gap-8 md:gap-0 ${idx % 2 !== 0 ? 'md:flex-row-reverse' : ''}`}
              >
                {/* Content Side */}
                <div className={`flex-1 w-full text-center ${idx % 2 === 0 ? 'md:text-right md:pr-20' : 'md:text-left md:pl-20'}`}>
                  {/* Updated Year Color to Emerald */}
                  <span className="text-7xl md:text-8xl font-black text-emerald-500/50 block mb-2 leading-none">
                    {m.year}
                  </span>
                  <h4 className="text-2xl md:text-3xl font-black uppercase text-slate-900 mb-4 tracking-tighter">
                    {m.title}
                  </h4>
                  <p className={`text-sm text-slate-500 leading-relaxed font-medium max-w-sm ${idx % 2 === 0 ? 'md:ml-auto' : 'md:mr-auto'}`}>
                    {m.desc}
                  </p>
                </div>

                {/* Center Node */}
                <div className="relative flex items-center justify-center">
                  <div className="w-5 h-5 rounded-full bg-emerald-500 z-10 border-4 border-white shadow-[0_0_15px_rgba(16,185,129,0.3)]"></div>
                </div>

                <div className="flex-1 hidden md:block"></div>
              </div>
            ))}
          </div>
        </div>

        {/* 4. PREMIUM CTA SECTION */}
        <div className="bg-emerald-950 rounded-[3rem] p-16 md:p-32 text-center relative overflow-hidden shadow-2xl">
          <div className="relative z-10">
            <h2 className="text-white text-5xl md:text-7xl font-black uppercase tracking-tighter mb-8 leading-[0.9]">
              Own the <br /> <span className="text-emerald-400">Next Chapter.</span>
            </h2>
            <p className="text-emerald-100/60 text-[10px] uppercase font-bold tracking-[0.4em] mb-12 max-w-xl mx-auto">
              Our legacy is built one ride at a time.
            </p>
            <Link 
              href="/shop" 
              className="bg-white text-emerald-950 px-14 py-6 rounded-full text-[10px] font-black uppercase tracking-[0.3em] hover:bg-emerald-400 hover:text-white transition-all inline-flex items-center gap-3 group"
            >
              Acquire a Machine <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
          <div className="absolute -bottom-20 -right-20 opacity-5 text-[300px] font-black text-white leading-none pointer-events-none">
            26
          </div>
        </div>

      </div>
    </div>
  );
}