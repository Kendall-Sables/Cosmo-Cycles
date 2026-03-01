'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { doc, getDoc, getFirestore } from 'firebase/firestore';
import { app } from '../../../firebase';
import Link from 'next/link';

export default function BikeDetailPage() {
  const { id } = useParams();
  const [bike, setBike] = useState<any>(null);
  const [selectedSize, setSelectedSize] = useState('');
  const [showGuide, setShowGuide] = useState(false); // Pop-up State
  const db = getFirestore(app);

  useEffect(() => {
    if (id) {
      const fetchBike = async () => {
        const docRef = doc(db, 'products', id as string);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) setBike({ id: docSnap.id, ...docSnap.data() });
      };
      fetchBike();
    }
  }, [id, db]);

  if (!bike) return <div className="p-20 text-center uppercase tracking-widest text-xs">Calibrating...</div>;

  return (
    <div className="bg-white min-h-screen pt-24 relative">
      
      {/* --- SIZE GUIDE MODAL --- */}
      {showGuide && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-6">
          <div className="bg-white max-w-md w-full p-10 shadow-2xl relative">
            <button 
              onClick={() => setShowGuide(false)}
              className="absolute top-4 right-4 text-xs font-black uppercase tracking-widest"
            >
              Close
            </button>
            <h2 className="text-3xl font-black uppercase tracking-tighter mb-6 text-slate-900">Size Guide <span className="text-emerald-500">.</span></h2>
            <table className="w-full text-[10px] uppercase tracking-widest font-bold">
              <thead className="border-b border-slate-100 text-slate-400">
                <tr>
                  <th className="py-4 text-left">Height (cm)</th>
                  <th className="py-4 text-right">Recommended Size</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                <tr><td className="py-4">155 - 165</td><td className="py-4 text-right">XS</td></tr>
                <tr><td className="py-4">165 - 175</td><td className="py-4 text-right">S</td></tr>
                <tr><td className="py-4">175 - 183</td><td className="py-4 text-right">M</td></tr>
                <tr><td className="py-4">183 - 191</td><td className="py-4 text-right">L</td></tr>
                <tr><td className="py-4">191+</td><td className="py-4 text-right">XL</td></tr>
              </tbody>
            </table>
            <p className="mt-8 text-[9px] text-slate-400 leading-relaxed italic">
              * Note: These are general guidelines. For a precise fit, visit us for a professional bio-mechanical setup.
            </p>
          </div>
        </div>
      )}

      {/* --- MAIN PAGE CONTENT --- */}
      <nav className="max-w-7xl mx-auto px-6 py-4 flex items-center space-x-2 text-[10px] font-bold uppercase tracking-widest text-slate-400">
        <Link href="/shop" className="hover:text-slate-900 transition">Fleet</Link>
        <span>/</span>
        <Link href={`/shop/category/${bike.category}`} className="hover:text-slate-900 transition">{bike.category}</Link>
        <span>/</span>
        <span className="text-slate-900">{bike.name}</span>
      </nav>

      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-16 pb-32">
        
        {/* LEFT: IMAGE */}
        <div className="lg:col-span-8">
          <div className="aspect-video bg-slate-50 flex items-center justify-center p-12 overflow-hidden border border-slate-100">
            <img src={bike.image} className="w-full h-full object-contain" alt={bike.name} />
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
            {['Level', 'Category', 'Material', 'Drivetrain'].map((label) => (
              <div key={label} className="bg-slate-50 p-6 border border-slate-100">
                <p className="text-[8px] font-black uppercase text-slate-400 mb-1">{label}</p>
                <p className="text-xs font-bold uppercase text-slate-900">{bike[label.toLowerCase()] || 'Premium'}</p>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT: INFO PANEL */}
        <div className="lg:col-span-4 lg:sticky lg:top-32 h-fit">
          <p className="text-emerald-600 font-black uppercase tracking-[0.4em] text-[10px] mb-4">
            {bike.brand} // {bike.category}
          </p>
          <h1 className="text-6xl font-black uppercase tracking-tighter mb-4 text-slate-900 leading-[0.9]">
            {bike.name}
          </h1>
          <p className="text-3xl font-light text-slate-900 mb-8">R {bike.price?.toLocaleString()}</p>
          
          <div className="border-t border-slate-200 pt-8">
            <p className="text-sm text-slate-500 leading-relaxed mb-8">{bike.longDescription}</p>

            {/* DYNAMIC SIZE SELECTOR */}
            <div className="mb-10">
              <div className="flex justify-between items-end mb-4">
                <p className="text-[10px] uppercase font-black tracking-widest">Frame Size</p>
                <button 
                  onClick={() => setShowGuide(true)}
                  className="text-[9px] underline uppercase font-bold text-slate-400 hover:text-emerald-600 transition"
                >
                  Size Guide
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                {bike.sizes?.map((size: string) => (
                  <button 
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`min-w-[50px] px-4 py-4 border text-[10px] font-black transition-all ${selectedSize === size ? 'bg-slate-900 text-white border-slate-900' : 'bg-white text-slate-900 border-slate-200 hover:border-slate-400'}`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            <button 
              className={`w-full py-6 text-[11px] font-black uppercase tracking-[0.3em] transition-all duration-300 shadow-xl ${
                selectedSize 
                ? 'bg-emerald-950 text-white hover:bg-black active:scale-[0.98]' 
                : 'bg-slate-100 text-slate-400 cursor-not-allowed'
              }`}
            >
              {selectedSize ? 'Add to Garage' : 'Select Size to Continue'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}