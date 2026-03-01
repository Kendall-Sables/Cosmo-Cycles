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
          <div className="flex items-center gap-8">
            {user ? (
              <>
                {/* Pilot Identity Badge */}
                <div className="hidden lg:flex flex-col items-end border-r border-slate-100 pr-6 mr-2">
                  <span className="text-[7px] font-black text-emerald-600 uppercase tracking-[0.3em] mb-0.5">Verified Pilot</span>
                  <span className="text-[10px] font-bold uppercase tracking-tight text-slate-900">
                    {user.displayName || user.email?.split('@')[0]}
                  </span>
                </div>

                {/* My Garage Link */}
                <Link 
                  href="/garage" 
                  className="text-[10px] font-bold tracking-widest text-emerald-800 hover:text-emerald-600 transition flex items-center gap-2 group"
                >
                  <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full group-hover:scale-150 transition-transform"></span>
                  GARAGE
                </Link>

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