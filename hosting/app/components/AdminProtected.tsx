'use client';
import { useAuth } from '../context/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

// 🚨 ADMIN IDENTIFIER
const ADMIN_EMAIL = "admin@cosmo.co.za"; 

export function AdminProtected({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [authorized, setAuthorized] = useState(false);

  useEffect(() => {
    if (!loading) {
      if (user && user.email === ADMIN_EMAIL) {
        setAuthorized(true);
      } else if (user) {
        // Logged in but NOT the admin? Send to Shop.
        router.push('/shop');
      } else {
        // Not logged in at all? Send to Sign In.
        router.push('/signin');
      }
    }
  }, [user, loading, router]);

  if (loading || !authorized) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-emerald-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-[10px] font-black uppercase tracking-[0.5em] text-slate-400">
            Verifying Admin Clearance...
          </p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}