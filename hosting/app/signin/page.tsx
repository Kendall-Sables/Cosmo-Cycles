'use client';

import { getAuth, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { app } from '../firebase';

export default function Login() {
  const auth = getAuth(app);

  const signInWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      await result.user.getIdToken(true);
    } catch (error) {
      console.error('Error signing in with Google:', error);
    }
  };

  return (
    // We remove min-h-screen because the Navbar already takes up space at the top
    <div className="flex items-center justify-center py-20 bg-gray-50">
      <div className="p-10 bg-white border border-gray-100 shadow-xl max-w-md w-full">
        <div className="text-center mb-8">
          <h2 className="text-xs font-bold tracking-[0.2em] text-emerald-800 uppercase mb-2">
            The Pelotón
          </h2>
          <h1 className="text-3xl font-black tracking-tighter text-slate-900 uppercase">
            COSMO <span className="font-light">SESSIONS</span>
          </h1>
          <p className="text-gray-500 text-sm mt-2">
            Sign in to access your garage and order history.
          </p>
        </div>

        <button
          onClick={signInWithGoogle}
          className="w-full flex items-center justify-center gap-3 bg-emerald-950 text-white px-4 py-4 font-bold uppercase text-xs tracking-widest hover:bg-emerald-800 transition-all shadow-lg active:scale-95"
        >
          {/* Optional: Add a Google Icon SVG here for a pro look */}
          Continue with Google
        </button>

        <p className="mt-8 text-[10px] text-center text-gray-400 uppercase tracking-widest leading-loose">
          By signing in, you agree to the <br /> 
          Cosmo Cycles Terms of Service
        </p>
      </div>
    </div>
  );
}
