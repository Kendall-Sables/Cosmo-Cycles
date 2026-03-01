'use client';

import { getAuth, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore, collection, addDoc } from 'firebase/firestore';
import { app } from '../firebase';
import { useRouter } from 'next/navigation';

export default function Login() {
  const auth = getAuth(app);
  const db = getFirestore(app);
  const router = useRouter();

  const signInWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      // --- START CART MERGE LOGIC ---
      // This takes guest items and moves them to the user's permanent account
      const guestCart = JSON.parse(localStorage.getItem('guestCart') || '[]');

      if (guestCart.length > 0) {
        for (const item of guestCart) {
          await addDoc(collection(db, 'carts'), {
            ...item,
            userEmail: user.email,
            mergedAt: new Date()
          });
        }

        // Clear the browser memory and tell the Navbar to refresh the count
        localStorage.removeItem('guestCart');
        window.dispatchEvent(new Event('cartUpdated'));
      }
      // --- END CART MERGE LOGIC ---

      // Force token refresh for security
      await user.getIdToken(true);

      // REDIRECT TO HOME PAGE
      router.push('/'); 

    } catch (error) {
      console.error('Error signing in with Google:', error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 px-6">
      <div className="p-12 bg-white border border-slate-100 shadow-2xl max-w-md w-full rounded-sm">
        <div className="text-center mb-10">
          <h2 className="text-[10px] font-black tracking-[0.4em] text-emerald-600 uppercase mb-3">
            The Pelotón
          </h2>
          <h1 className="text-4xl font-black tracking-tighter text-slate-900 uppercase leading-none">
            COSMO <span className="font-thin text-slate-400">SESSIONS</span>
          </h1>
          <p className="text-slate-400 text-xs mt-4 uppercase tracking-widest font-bold">
            Access your secure garage
          </p>
        </div>

        <button
          onClick={signInWithGoogle}
          className="w-full flex items-center justify-center gap-4 bg-slate-900 text-white px-6 py-5 font-black uppercase text-[10px] tracking-[0.2em] hover:bg-emerald-600 transition-all active:scale-[0.98] shadow-lg"
        >
          <svg className="w-4 h-4" viewBox="0 0 24 24">
            <path
              fill="currentColor"
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
            />
            <path
              fill="currentColor"
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
            />
            <path
              fill="currentColor"
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"
            />
            <path
              fill="currentColor"
              d="M12 5.38c1.62 0 3.06.56 4.21 1.66l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
            />
          </svg>
          Continue with Google
        </button>

        <div className="mt-12 pt-8 border-t border-slate-50">
          <p className="text-[9px] text-center text-slate-400 uppercase tracking-[0.2em] leading-loose">
            By authenticating, you acknowledge the <br /> 
            <span className="text-slate-900 font-bold cursor-pointer hover:text-emerald-600">Cosmo Cycles Protocol</span>
          </p>
        </div>
      </div>
    </div>
  );
}
