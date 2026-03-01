'use client';

import { useAuth } from '../context/AuthContext';
import { getAuth, signOut } from 'firebase/auth';
import { app } from '../firebase';
import Link from 'next/link';

export default function Navbar() {
  const { user } = useAuth();
  const auth = getAuth(app);

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
          
          {/* Navigation Links - Updated with new Paths */}
          <div className="hidden md:flex items-center space-x-8 text-[10px] font-bold tracking-[0.2em] text-gray-600">
            <Link href="/shop" className="hover:text-emerald-700 transition uppercase">The Fleet</Link>
            
            {/* Discipline Links using your new /category/ path */}
            <Link href="/shop/category/road" className="hover:text-emerald-700 transition uppercase">Road</Link>
            <Link href="/shop/category/mountain" className="hover:text-emerald-700 transition uppercase">MTB</Link>
            <Link href="/shop/category/gravel" className="hover:text-emerald-700 transition uppercase">Gravel</Link>
            
            <Link href="/heritage" className="hover:text-emerald-700 transition uppercase">Heritage</Link>
          </div>
          
          {/* Auth & Garage Section */}
          <div className="flex items-center gap-6">
            {user ? (
              <>
                {/* My Garage Link - Shows only when logged in */}
                <Link 
                  href="/garage" 
                  className="text-[10px] font-bold tracking-widest text-emerald-800 hover:text-emerald-600 transition flex items-center gap-2"
                >
                  <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span>
                  MY GARAGE
                </Link>

                <button
                  onClick={handleLogout}
                  className="text-[10px] font-bold border border-emerald-900 px-5 py-2 hover:bg-emerald-900 hover:text-white transition tracking-widest"
                >
                  SIGN OUT
                </button>
              </>
            ) : (
              <Link
                href="/signin"
                className="bg-emerald-950 text-white px-6 py-2 text-[10px] font-bold tracking-widest hover:bg-emerald-800 transition"
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