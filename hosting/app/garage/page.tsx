'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { collection, query, where, getDocs, getFirestore, deleteDoc, doc } from 'firebase/firestore';
import { app } from '../firebase';
import Link from 'next/link';

export default function GaragePage() {
  const { user } = useAuth();
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const db = getFirestore(app);

  useEffect(() => {
    if (user) {
      const fetchGarage = async () => {
        const q = query(collection(db, 'garages'), where('userEmail', '==', user.email));
        const snap = await getDocs(q);
        setItems(snap.docs.map(doc => ({ id: doc.id, ...doc.data() })));
        setLoading(false);
      };
      fetchGarage();
    }
  }, [user, db]);

  const removeMachine = async (id: string) => {
    try {
      await deleteDoc(doc(db, 'garages', id));
      setItems(items.filter(item => item.id !== id));
    } catch (error) {
      console.error("Error removing:", error);
    }
  };

  if (loading) return <div className="p-20 text-center uppercase tracking-widest text-xs">Accessing Secure Vault...</div>;

  return (
    <div className="bg-white min-h-screen pt-32 px-6">
      <div className="max-w-7xl mx-auto">
        {/* HEADER */}
        <header className="mb-20 border-b border-slate-100 pb-10 flex justify-between items-end">
          <div>
            <p className="text-emerald-600 font-black uppercase tracking-[0.4em] text-[10px] mb-2">Authenticated Pilot</p>
            <h1 className="text-7xl font-black uppercase tracking-tighter text-slate-900 leading-[0.8]">
              Your Garage<span className="text-emerald-500">.</span>
            </h1>
          </div>
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">
            {items.length} Machines Secured
          </p>
        </header>

        {items.length === 0 ? (
          <div className="py-20 text-center border-2 border-dashed border-slate-100">
            <p className="text-slate-400 uppercase tracking-widest text-xs mb-8 font-bold">No machines currently in your garage.</p>
            <Link href="/shop" className="bg-slate-900 text-white px-10 py-4 text-[10px] font-black uppercase tracking-widest hover:bg-emerald-600 transition">
              Explore the Fleet
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6">
            {items.map((item) => (
              <div key={item.id} className="group flex flex-col md:flex-row items-center gap-10 bg-slate-50 p-8 border border-slate-100 hover:border-emerald-500 transition-all duration-500">
                {/* BIKE IMAGE */}
                <div className="w-full md:w-1/4 aspect-video overflow-hidden bg-white p-4">
                  <img src={item.bikeImage} className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-700" alt={item.bikeName} />
                </div>
                
                {/* BIKE INFO */}
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="w-2 h-2 bg-emerald-500 rounded-full"></span>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Size: {item.size}</p>
                  </div>
                  <h3 className="text-4xl font-black uppercase text-slate-900 leading-none mb-2">{item.bikeName}</h3>
                  <p className="text-xl font-light text-slate-400 italic">R {item.bikePrice?.toLocaleString()}</p>
                </div>

                {/* ACTIONS */}
                <div className="flex flex-col gap-4 w-full md:w-auto">
                  <Link href={`/shop/id/${item.bikeId}`} className="text-center bg-white border border-slate-900 px-8 py-3 text-[10px] font-black uppercase tracking-widest hover:bg-slate-900 hover:text-white transition">
                    View Specs
                  </Link>
                  <button 
                    onClick={() => removeMachine(item.id)}
                    className="text-[9px] font-black uppercase tracking-widest text-red-400 hover:text-red-600 transition text-center"
                  >
                    Remove From Garage
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}