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
          
          {/* Logo - All Caps, Bold, Spaced */}
          <Link href="/" className="flex-shrink-0">
            <h1 className="text-2xl font-black tracking-tighter text-emerald-950">
              COSMO <span className="font-light">CYCLES</span>
            </h1>
          </Link>
          
          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-8 text-xs font-bold tracking-widest text-gray-600">
            <Link href="/shop" className="hover:text-emerald-700 transition">THE FLEET</Link>
            <Link href="#tech" className="hover:text-emerald-700 transition">TECHNOLOGY</Link>
            <Link href="#heritage" className="hover:text-emerald-700 transition">HERITAGE</Link>
          </div>
          
          {/* Auth Section */}
          <div className="flex items-center gap-6">
            {user ? (
              <>
                <span className="hidden lg:block text-xs text-gray-400">{user.email}</span>
                <button
                  onClick={handleLogout}
                  className="text-xs font-bold border border-emerald-900 px-5 py-2 hover:bg-emerald-900 hover:text-white transition"
                >
                  SIGN OUT
                </button>
              </>
            ) : (
              <Link
                href="/signin"
                className="bg-emerald-950 text-white px-6 py-2 text-xs font-bold hover:bg-emerald-800 transition"
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