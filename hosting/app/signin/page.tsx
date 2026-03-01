'use client';
import { useState } from 'react';
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { app } from '../firebase';
import { useRouter } from 'next/navigation';

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const auth = getAuth(app);
  const router = useRouter();

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    try {
      if (isLogin) {
        await signInWithEmailAndPassword(auth, email, password);
      } else {
        await createUserWithEmailAndPassword(auth, email, password);
      }
      router.push('/shop');
    } catch (err: any) {
      setError(err.message);
    }
  };

  const signInWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    await signInWithPopup(auth, provider);
    router.push('/shop');
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-6">
      <div className="max-w-md w-full border border-slate-100 p-12 shadow-sm">
        <h2 className="text-4xl font-black uppercase tracking-tighter mb-2 text-slate-900">
          {isLogin ? 'Access' : 'Enlist'}<span className="text-emerald-500">.</span>
        </h2>
        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.3em] mb-10">
          {isLogin ? 'Enter your credentials' : 'Create your pilot profile'}
        </p>

        <form onSubmit={handleAuth} className="space-y-6">
          <div>
            <label className="text-[9px] font-black uppercase tracking-widest text-slate-400 block mb-2">Email Address</label>
            <input 
              type="email" 
              className="w-full border-b border-slate-200 py-3 text-sm focus:border-emerald-500 outline-none transition-colors"
              onChange={(e) => setEmail(e.target.value)}
              required 
            />
          </div>
          <div>
            <label className="text-[9px] font-black uppercase tracking-widest text-slate-400 block mb-2">Security Key</label>
            <input 
              type="password" 
              className="w-full border-b border-slate-200 py-3 text-sm focus:border-emerald-500 outline-none transition-colors"
              onChange={(e) => setPassword(e.target.value)}
              required 
            />
          </div>

          {error && <p className="text-[10px] text-red-500 font-bold uppercase tracking-tight">{error}</p>}

          <button className="w-full bg-slate-900 text-white py-4 text-[10px] font-black uppercase tracking-[0.3em] hover:bg-emerald-800 transition-all">
            {isLogin ? 'Authorize' : 'Initialize Account'}
          </button>
        </form>

        <div className="mt-8 pt-8 border-t border-slate-50 flex flex-col gap-4">
          <button onClick={signInWithGoogle} className="w-full border border-slate-200 py-4 text-[10px] font-black uppercase tracking-[0.3em] flex items-center justify-center gap-2 hover:bg-slate-50 transition-all">
            Google Auth
          </button>
          
          <button onClick={() => setIsLogin(!isLogin)} className="text-[9px] font-black uppercase tracking-widest text-slate-400 hover:text-emerald-600">
            {isLogin ? "Need an account? Sign Up" : "Have an account? Sign In"}
          </button>
        </div>
      </div>
    </div>
  );
}
