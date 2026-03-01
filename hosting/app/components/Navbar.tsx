'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { getAuth, signOut } from 'firebase/auth';
import { collection, query, where, onSnapshot, getFirestore } from 'firebase/firestore';
import { app } from '../firebase';
import Link from 'next/link';

export default function Navbar() {
  const { user } = useAuth();
  const auth = getAuth(app);
  const db = getFirestore(app);
  
  const [cartCount, setCartCount] = useState(0);

    useEffect(() => {
    let unsubscribe: () => void;

    // Helper: Guest Calculation
    const updateGuestCount = () => {
      const guestCart = JSON.parse(localStorage.getItem('guestCart') || '[]');
      const total = guestCart.reduce((acc: number, item: any) => acc + (item.quantity || 1), 0);
      setCartCount(total);
    };

    if (user) {
      // LOGGED IN: Sum quantities from Firestore docs
      const q = query(collection(db, 'carts'), where('userEmail', '==', user.email));
      unsubscribe = onSnapshot(q, (snapshot) => {
        const total = snapshot.docs.reduce((acc, doc) => acc + (doc.data().quantity || 1), 0);
        setCartCount(total);
      });
    } else {
      // GUEST: Watch LocalStorage
      updateGuestCount();
      window.addEventListener('cartUpdated', updateGuestCount);
      window.addEventListener('storage', updateGuestCount);
    }

    return () => {
      if (unsubscribe) unsubscribe();
      window.removeEventListener('cartUpdated', updateGuestCount);
      window.removeEventListener('storage', updateGuestCount);
    };
  }, [user, db]);

  const handleLogout = async () => {
    try { await signOut(auth); } catch (error) { console.error(error); }
  };

  return (
    <nav className="bg-white/90 backdrop-blur-md border-b border-black sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex justify-between h-20 items-center">
          
          {/* Logo */}
          <Link href="/" className="flex-shrink-0">
            <h1 className="text-2xl font-black tracking-tighter text-black uppercase">
              Cosmo <span className="text-emerald-500">Cycles</span>
            </h1>
          </Link>
          
          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-8 text-[10px] font-black tracking-[0.3em] text-slate-400">
            <Link href="/shop" className="hover:text-black transition uppercase">Fleet</Link>
            <Link href="/shop/category/road" className="hover:text-black transition uppercase">Road</Link>
            <Link href="/shop/category/mountain" className="hover:text-black transition uppercase">MTB</Link>
            <Link href="/shop/category/gravel" className="hover:text-black transition uppercase">Gravel</Link>
            <Link href="/heritage" className="hover:text-black transition uppercase">Heritage</Link>
          </div>
          
          {/* Action Zone */}
          <div className="flex items-center gap-8">
            
            {/* CART - Always Visible */}
            <Link href="/cart" className="relative p-2 text-black hover:text-emerald-600 transition group">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
              </svg>
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-black text-white text-[8px] font-black w-4 h-4 rounded-full flex items-center justify-center animate-in zoom-in border border-white">
                  {cartCount}
                </span>
              )}
            </Link>

            {user ? (
              <>
                <Link 
                  href="/garage" 
                  className="text-[10px] font-black tracking-[0.2em] text-black hover:text-emerald-600 transition flex items-center gap-2"
                >
                  <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full"></div>
                  GARAGE
                </Link>

                <div className="hidden lg:flex flex-col items-end border-l border-slate-100 pl-6">
                  <span className="text-[7px] font-black text-emerald-600 uppercase tracking-[0.3em]">Verified Pilot</span>
                  <span className="text-[10px] font-black uppercase tracking-tight text-black">
                    {user.displayName || user.email?.split('@')[0]}
                  </span>
                </div>

                <button
                  onClick={handleLogout}
                  className="text-[10px] font-black text-slate-300 hover:text-red-600 transition tracking-widest uppercase"
                >
                  Logout
                </button>
              </>
            ) : (
              <Link
                href="/signin"
                className="bg-black text-white px-8 py-3 text-[10px] font-black tracking-[0.2em] hover:bg-emerald-600 transition"
              >
                LOGIN
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}