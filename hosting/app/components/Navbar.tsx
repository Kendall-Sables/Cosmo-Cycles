'use client';

import { useState, useEffect } from 'react'; // Added useState and useEffect
import { useAuth } from '../context/AuthContext';
import { getAuth, signOut } from 'firebase/auth';
import { collection, query, where, onSnapshot, getFirestore } from 'firebase/firestore'; // Added Firestore imports
import { app } from '../firebase';
import Link from 'next/link';

export default function Navbar() {
  const { user } = useAuth();
  const auth = getAuth(app);
  const db = getFirestore(app);
  
  // State for the cart counter
  const [cartCount, setCartCount] = useState(0);

  // Listen for real-time cart updates
  useEffect(() => {
    if (user) {
      const q = query(collection(db, 'carts'), where('userEmail', '==', user.email));
      const unsubscribe = onSnapshot(q, (snapshot) => {
        setCartCount(snapshot.docs.length);
      });
      return () => unsubscribe();
    } else {
      setCartCount(0);
    }
  }, [user, db]);

  const handleLogout = async () => {
    try { await signOut(auth); } catch (error) { console.error(error); }
  };

  return (
    <nav className="bg-white/90 backdrop-blur-md border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex justify-between h-20 items-center">
          
          {/* Logo */}
          <Link href="/" className="flex-shrink-0">
            <h1 className="text-2xl font-black tracking-tighter text-emerald-950">
              COSMO <span className="font-light">CYCLES</span>
            </h1>
          </Link>
          
          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-8 text-[10px] font-bold tracking-[0.2em] text-gray-600">
            <Link href="/shop" className="hover:text-emerald-700 transition uppercase">The Fleet</Link>
            <Link href="/shop/category/road" className="hover:text-emerald-700 transition uppercase">Road</Link>
            <Link href="/shop/category/mountain" className="hover:text-emerald-700 transition uppercase">MTB</Link>
            <Link href="/shop/category/gravel" className="hover:text-emerald-700 transition uppercase">Gravel</Link>
            <Link href="/heritage" className="hover:text-emerald-700 transition uppercase">Heritage</Link>
          </div>
          
          {/* Auth & Cart & Garage Section */}
          <div className="flex items-center gap-6">
            {user ? (
              <>
                {/* CART ICON WITH BADGE */}
                <Link href="/cart" className="relative p-2 text-slate-900 hover:text-emerald-600 transition group">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
                  </svg>
                  {cartCount > 0 && (
                    <span className="absolute top-0 right-0 bg-emerald-600 text-white text-[7px] font-black w-4 h-4 rounded-full flex items-center justify-center animate-in zoom-in">
                      {cartCount}
                    </span>
                  )}
                </Link>

                {/* Garage Link */}
                <div className="border-l border-r border-slate-200 px-6 py-1.5">
                  <Link 
                    href="/garage" 
                    className="text-[10px] font-bold tracking-widest text-emerald-800 hover:text-emerald-600 transition flex items-center gap-2 group"
                  >
                    <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full group-hover:scale-150 transition-transform"></span>
                    GARAGE
                  </Link>
                </div>

                {/* Pilot Identity Badge */}
                <div className="hidden lg:flex flex-col items-end">
                  <span className="text-[7px] font-black text-emerald-600 uppercase tracking-[0.3em] mb-0.5">Verified Pilot</span>
                  <span className="text-[10px] font-bold uppercase tracking-tight text-slate-900">
                    {user.displayName || user.email?.split('@')[0]}
                  </span>
                </div>

                <button
                  onClick={handleLogout}
                  className="text-[10px] font-bold text-slate-400 hover:text-red-600 transition tracking-widest uppercase"
                >
                  Sign Out
                </button>
              </>
            ) : (
              <Link
                href="/signin"
                className="bg-emerald-950 text-white px-8 py-3 text-[10px] font-bold tracking-widest hover:bg-emerald-800 transition"
              >
                LOG IN
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}