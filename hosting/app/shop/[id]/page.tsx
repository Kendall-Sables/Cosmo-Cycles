'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { doc, getDoc, getFirestore } from 'firebase/firestore';
import { app } from '../../firebase';

export default function BikeDetailPage() {
  const { id } = useParams();
  const [bike, setBike] = useState<any>(null);
  const [selectedSize, setSelectedSize] = useState('');
  const db = getFirestore(app);

  useEffect(() => {
    if (id) {
      const fetchBike = async () => {
        const docRef = doc(db, 'products', id as string);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) setBike(docSnap.id ? { id: docSnap.id, ...docSnap.data() } : null);
      };
      fetchBike();
    }
  }, [id, db]);

  if (!bike) return <div className="p-20">Locating Machine...</div>;

  return (
    <div className="bg-white min-h-screen pt-40 px-6 max-w-7xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
        <img src={bike.image} className="w-full aspect-square object-cover bg-slate-50" alt={bike.name} />
        
        <div>
          <p className="text-emerald-600 font-bold uppercase tracking-[0.3em] text-[10px] mb-4">{bike.brand} // {bike.level}</p>
          <h1 className="text-6xl font-black uppercase tracking-tighter mb-6 text-slate-900">{bike.name}</h1>
          <p className="text-lg text-slate-600 mb-10 leading-relaxed">{bike.longDescription}</p>

          {/* SIZE SELECTOR */}
          <div className="mb-10">
            <p className="text-xs uppercase font-bold mb-4 tracking-widest">Select Frame Size</p>
            <div className="flex gap-4">
              {bike.sizes?.map((size: string) => (
                <button 
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`w-12 h-12 border text-xs font-bold transition-all ${selectedSize === size ? 'bg-slate-900 text-white border-slate-900' : 'bg-white text-slate-900 border-slate-200 hover:border-slate-400'}`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          <div className="border-t border-slate-100 pt-10 flex items-center justify-between">
            <span className="text-3xl font-black text-slate-900">R {bike.price?.toLocaleString()}</span>
            <button className="bg-emerald-950 text-white px-12 py-5 text-[10px] font-black uppercase tracking-widest hover:bg-black transition">
              Add to Garage
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}