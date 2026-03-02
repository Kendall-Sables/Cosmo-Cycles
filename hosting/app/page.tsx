'use client';

import { useAuth } from './context/AuthContext';
import Link from 'next/link';
import { getAuth, signOut } from 'firebase/auth';
import { app } from './firebase';
import { Bike, Sparkles, Shield, Truck, ArrowRight } from 'lucide-react';

export default function LandingPage() {
  const { user } = useAuth();
  const auth = getAuth(app);

  const handleSignOut = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const brands = [
    "Specialized", "Trek", "Canyon", "Scott", "Giant", 
    "Cervélo", "Santa Cruz", "Cannondale", "S-Works", "Pinarello"
  ];

  return (
    <div className="bg-white min-h-screen">
      {/* 1. Hero Section */}
      <section className="relative h-[90vh] flex items-center justify-center bg-emerald-950 overflow-hidden">
        <div className="absolute inset-0 opacity-40">
          <img 
            src="https://images.unsplash.com/photo-1485965120184-e220f721d03e?q=80&w=2000" 
            className="w-full h-full object-cover"
            alt="Performance Cycling"
          />
        </div>

        <div className="relative z-10 text-center px-4">
          <span className="text-emerald-400 font-bold tracking-[0.4em] uppercase text-[10px] mb-6 block animate-pulse">
            Precision Engineered Performance
          </span>
          <h1 className="text-6xl md:text-9xl font-black text-white uppercase tracking-tighter leading-none mb-8">
            LEAD THE <br /> <span className="text-transparent" style={{ WebkitTextStroke: '2px white' }}>PELOTÓN</span>
          </h1>
          <div className="flex flex-col md:flex-row gap-4 justify-center">
            <Link 
              href="/shop" 
              className="bg-white text-emerald-950 px-12 py-5 font-black uppercase text-[10px] tracking-widest hover:bg-emerald-400 transition-all shadow-xl rounded-sm"
            >
              Explore The Fleet
            </Link>
          </div>
        </div>
      </section>

      {/* 2. Moving Brand Marquee (The Belt) */}
      <div className="bg-white border-b border-slate-100 py-10 overflow-hidden whitespace-nowrap relative">
        <div className="flex animate-marquee gap-20">
          {[...brands, ...brands].map((brand, i) => (
            <span key={i} className="text-slate-300 font-black italic text-2xl uppercase tracking-tighter">
              {brand}
            </span>
          ))}
        </div>
        
        {/* CSS for the Marquee animation */}
        <style jsx>{`
          @keyframes marquee {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
          .animate-marquee {
            display: inline-flex;
            animation: marquee 40s linear infinite;
          }
        `}</style>
      </div>

      {/* 3. Category Selection */}
      <section className="py-24 px-6 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-4">
            <div>
                <h2 className="text-xs font-black text-emerald-600 uppercase tracking-[0.3em] mb-2">The Collection</h2>
                <h3 className="text-4xl font-black text-slate-900 uppercase tracking-tighter">Choose Your Discipline</h3>
            </div>
            <Link href="/shop" className="text-xs font-bold uppercase tracking-widest flex items-center gap-2 hover:text-emerald-600 transition-colors">
                View All Machines <ArrowRight size={14}/>
            </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
                { title: 'Road', img: 'https://res.cloudinary.com/dzbriyw1o/image/upload/v1772426987/road-home_qwkazp.jpg' },
                { title: 'Mountain', img: 'https://res.cloudinary.com/dzbriyw1o/image/upload/v1772426988/mountain-home_v843ez.jpg' },
                { title: 'Gravel', img: 'https://res.cloudinary.com/dzbriyw1o/image/upload/v1772426986/gravel-home_glhmjh.jpg' },
            ].map((cat) => (
                <Link key={cat.title} href="/shop" className="group relative h-96 overflow-hidden rounded-2xl">
                    <img src={cat.img} className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt={cat.title} />
                    <div className="absolute inset-0 bg-gradient-to-t from-emerald-950/90 via-transparent to-transparent" />
                    <div className="absolute bottom-8 left-8">
                        <h4 className="text-3xl font-black text-white uppercase tracking-tighter">{cat.title}</h4>
                        <p className="text-emerald-400 text-[10px] font-bold uppercase tracking-widest">Performance Tuned</p>
                    </div>
                </Link>
            ))}
        </div>
      </section>

      {/* 4. Cosmo Services (Updated Icons & Theme) */}
      <section className="bg-emerald-50 py-24 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
                { icon: <Sparkles size={24} />, title: 'Smart Search', desc: 'Our concierge helps you find the perfect frame size and spec for your riding goals.' },
                { icon: <Shield size={24} />, title: 'Premium Warranty', desc: 'Every bike in the Cosmo collection undergoes a 50-point professional mechanical inspection.' },
                { icon: <Truck size={24} />, title: 'White Glove Delivery', desc: 'Fully assembled, performance-ready machines delivered straight to your door.' },
            ].map((feat, i) => (
                <div key={i} className="flex flex-col items-center text-center space-y-4">
                    <div className="text-emerald-600">{feat.icon}</div>
                    <h5 className="text-lg font-black uppercase tracking-tighter text-slate-900">{feat.title}</h5>
                    <p className="text-slate-500 text-sm leading-relaxed max-w-xs">{feat.desc}</p>
                </div>
            ))}
        </div>
      </section>

      {/* 5. The Cosmo Experience Section (Performance Focus) */}
      <section className="py-24 px-6 max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-20 items-center">
        <div>
          <h2 className="text-xs font-bold text-emerald-800 uppercase tracking-widest mb-4 italic">The Future of Fitting</h2>
          <h3 className="text-5xl font-black text-slate-900 uppercase tracking-tighter mb-6 leading-[0.95]">
            Consult Your <br /> Digital Concierge
          </h3>
          <p className="text-slate-600 leading-relaxed mb-8 text-lg">
            Finding the right bike shouldn't be a guessing game. Use the Cosmo Assistant to upload photos of bikes you like or describe your riding terrain. We analyze our fleet to find the specific machine that matches your performance requirements. 
            <span className="block mt-4 font-bold text-slate-900">
              Ready to see the lineup? Head over to our Fleet page to start your discovery.
            </span>
          </p>

          {/* NEW: Action Button to Shop */}
          <Link 
            href="/shop" 
            className="inline-flex items-center gap-3 bg-emerald-600 text-white px-8 py-4 rounded-full font-black uppercase text-[10px] tracking-widest hover:bg-emerald-700 hover:shadow-lg transition-all mb-12 group"
          >
            Enter the Fleet <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </Link>

          <div className="flex gap-10 border-t border-slate-100 pt-8">
            <div>
              <p className="text-3xl font-black text-emerald-950 uppercase tracking-tighter">Elite</p>
              <p className="text-[10px] text-slate-400 uppercase font-black tracking-widest">Component Specs</p>
            </div>
            <div>
              <p className="text-3xl font-black text-emerald-950 uppercase tracking-tighter">Curated</p>
              <p className="text-[10px] text-slate-400 uppercase font-black tracking-widest">Racing Fleet</p>
            </div>
          </div>
        </div>
        
        <div className="relative">
          <div className="relative bg-slate-100 aspect-square overflow-hidden rounded-[2rem] shadow-2xl">
            <img 
                src="https://res.cloudinary.com/dzbriyw1o/image/upload/v1772427607/home-page-bottom-pciture_undufa.jpg" 
                className="w-full h-full object-cover"
                alt="Pro Bike Setup"
            />
          </div>
        </div>
      </section>
    </div>
  );
}