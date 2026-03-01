'use client';

import { useAuth } from './context/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import Link from 'next/link';
import { getAuth, signOut } from 'firebase/auth';
import { app } from './firebase';

export default function LandingPage() {
  const { user } = useAuth();
  const router = useRouter();
  const auth = getAuth(app);

  // --- REDIRECT LOGIC REMOVED ---
  // We removed the useEffect that was sending logged-in users to /dashboard.
  // Now, both guests and logged-in pilots can enjoy the landing page.

  const handleSignOut = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    <div className="bg-white">
      {/* Luxury Hero Section */}
      <section className="relative h-[90vh] flex items-center justify-center bg-emerald-950 overflow-hidden">
        {/* Background Image - High-res cycling shot */}
        <div className="absolute inset-0 opacity-40">
          <img 
            src="https://images.unsplash.com/photo-1485965120184-e220f721d03e?q=80&w=2000" 
            className="w-full h-full object-cover"
            alt="Performance Cycling"
          />
        </div>

        <div className="relative z-10 text-center px-4">
          <span className="text-emerald-400 font-bold tracking-[0.4em] uppercase text-xs mb-6 block">
            Engineered in the Void
          </span>
          <h1 className="text-6xl md:text-9xl font-black text-white uppercase tracking-tighter leading-none mb-8">
            LEAD THE <br /> <span className="text-transparent" style={{ WebkitTextStroke: '2px white' }}>PELOTÓN</span>
          </h1>
          <div className="flex flex-col md:flex-row gap-4 justify-center">
            <Link 
              href="/shop" 
              className="bg-white text-emerald-950 px-12 py-5 font-bold uppercase text-xs tracking-widest hover:bg-emerald-400 transition-all"
            >
              Explore The Fleet
            </Link>
            
            {/* Logic to show different button if logged in */}
            {user ? (
              <button 
                onClick={handleSignOut}
                className="border border-white text-white px-12 py-5 font-bold uppercase text-xs tracking-widest hover:bg-red-600/20 transition-all"
              >
                Sign Out
              </button>
            ) : (
              <Link 
                href="/signin" 
                className="border border-white text-white px-12 py-5 font-bold uppercase text-xs tracking-widest hover:bg-white/10 transition-all"
              >
                Join The Mission
              </Link>
            )}
          </div>
        </div>
      </section>

      {/* Technical Differentiation Section */}
      <section className="py-24 px-6 max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-20 items-center">
        <div>
          <h2 className="text-xs font-bold text-emerald-800 uppercase tracking-widest mb-4">Unrivaled Tech</h2>
          <h3 className="text-4xl font-black text-slate-900 uppercase tracking-tighter mb-6">
            NoSQL Real-time <br /> Inventory Tracking
          </h3>
          <p className="text-slate-500 leading-relaxed mb-8">
            Cosmo Cycles utilizes a high-performance Firebase backend to ensure your gear is 
            always in sync. From carbon frames to electronic shifting, every component is tracked.
          </p>
          <div className="grid grid-cols-2 gap-8 border-t border-slate-100 pt-8">
            <div>
              <p className="text-2xl font-black text-emerald-950">2026</p>
              <p className="text-xs text-slate-400 uppercase tracking-widest">Model Year</p>
            </div>
            <div>
              <p className="text-2xl font-black text-emerald-950">0.4ms</p>
              <p className="text-xs text-slate-400 uppercase tracking-widest">Latency</p>
            </div>
          </div>
        </div>
        <div className="bg-slate-100 aspect-square overflow-hidden">
          <img 
            src="https://images.unsplash.com/photo-1618762044398-ec1e7e048bbd?q=80&w=627&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
            alt="Bicycle Detail"
          />
        </div>
      </section>
    </div>
  );
}