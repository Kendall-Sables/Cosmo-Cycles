'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function CartPage() {
  const { user } = useAuth();
  const { push } = useRouter();
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // GUEST CART LOGIC: Read from LocalStorage if not logged in
  useEffect(() => {
    const savedCart = localStorage.getItem('guestCart');
    if (savedCart) {
      setItems(JSON.parse(savedCart));
    }
    setLoading(false);
  }, []);

  const removeItem = (index: number) => {
    const newItems = [...items];
    newItems.splice(index, 1);
    setItems(newItems);
    localStorage.setItem('guestCart', JSON.stringify(newItems));
  };

  const subtotal = items.reduce((acc, item) => acc + (item.bikePrice || 0), 0);

  if (loading) return <div className="p-20 text-[10px] font-black uppercase tracking-[0.5em]">Initializing...</div>;

  return (
    <div className="bg-white min-h-screen pt-32 px-10 pb-20 font-sans">
      <div className="max-w-[1600px] mx-auto">
        
        {/* ULTRA-MINIMAL HEADER */}
        <div className="flex justify-between items-baseline border-b-[1px] border-black pb-4 mb-12">
          <h1 className="text-8xl font-black uppercase tracking-tighter leading-none">
            Cart<span className="text-emerald-500 text-4xl">/</span>
          </h1>
          <span className="text-[11px] font-bold uppercase tracking-[0.3em] text-slate-400">
            {items.length} units in manifest
          </span>
        </div>

        {items.length === 0 ? (
          <div className="py-40 border-t border-slate-100">
            <p className="text-sm uppercase tracking-widest text-slate-400">Your manifest is currently void.</p>
            <Link href="/shop" className="mt-8 inline-block text-[11px] font-black underline uppercase tracking-[0.2em]">Browse Fleet</Link>
          </div>
        ) : (
          <div className="grid grid-cols-12 gap-16">
            
            {/* TABLE-STYLE LIST */}
            <div className="col-span-8">
              <div className="grid grid-cols-12 text-[10px] uppercase font-black tracking-widest text-slate-400 mb-6 border-b border-slate-100 pb-2">
                <div className="col-span-6">Machine Details</div>
                <div className="col-span-2 text-center">Size</div>
                <div className="col-span-2 text-right">Price</div>
                <div className="col-span-2 text-right">Action</div>
              </div>

              {items.map((item, idx) => (
                <div key={idx} className="grid grid-cols-12 items-center py-10 border-b border-slate-100 group">
                  <div className="col-span-6 flex gap-8 items-center">
                    <div className="w-24 h-24 bg-slate-50 p-2 grayscale group-hover:grayscale-0 transition-all duration-700">
                      <img src={item.bikeImage} alt="" className="w-full h-full object-contain" />
                    </div>
                    <div>
                      <h3 className="text-xl font-black uppercase tracking-tight">{item.bikeName}</h3>
                      <p className="text-[9px] text-slate-400 mt-1 uppercase font-bold tracking-widest">{item.brand}</p>
                    </div>
                  </div>
                  <div className="col-span-2 text-center text-xs font-black">{item.size}</div>
                  <div className="col-span-2 text-right text-xs font-bold tracking-tighter">R {item.bikePrice?.toLocaleString()}</div>
                  <div className="col-span-2 text-right">
                    <button onClick={() => removeItem(idx)} className="text-[10px] font-black uppercase tracking-widest text-red-400 hover:text-black transition-colors">
                      [ Remove ]
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* STARK SUMMARY PANEL */}
            <div className="col-span-4 h-fit sticky top-40 border-[1px] border-black p-10">
              <h4 className="text-[11px] font-black uppercase tracking-[0.3em] mb-12">Summary</h4>
              
              <div className="space-y-6 mb-12">
                <div className="flex justify-between items-end border-b border-slate-100 pb-4">
                  <span className="text-[10px] font-bold uppercase text-slate-400">Subtotal</span>
                  <span className="text-lg font-bold tracking-tighter">R {subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-end border-b border-slate-100 pb-4">
                  <span className="text-[10px] font-bold uppercase text-slate-400">VAT (15%)</span>
                  <span className="text-lg font-bold tracking-tighter">Included</span>
                </div>
                <div className="flex justify-between items-end pt-4">
                  <span className="text-[11px] font-black uppercase tracking-widest">Grand Total</span>
                  <span className="text-4xl font-black tracking-tighter leading-none">R {subtotal.toLocaleString()}</span>
                </div>
              </div>

              <button 
                onClick={() => push('/checkout')}
                className="w-full py-6 bg-black text-white text-[11px] font-black uppercase tracking-[0.3em] hover:bg-emerald-600 transition-all duration-500"
              >
                Proceed to Checkout
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}