'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function CartPage() {
  const [items, setItems] = useState<any[]>([]);
  const { push } = useRouter();

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('guestCart') || '[]');
    setItems(saved);
  }, []);

  const syncCart = (updatedItems: any[]) => {
    setItems(updatedItems);
    localStorage.setItem('guestCart', JSON.stringify(updatedItems));
    window.dispatchEvent(new Event('cartUpdated')); 
  };

  const removeItem = (idx: number) => {
    const updated = items.filter((_, i) => i !== idx);
    syncCart(updated);
  };

  const updateQty = (idx: number, delta: number) => {
    const updated = items.map((item, i) => {
      if (i !== idx) return item;
      const newQty = Math.max(1, (item.quantity || 1) + delta);
      return { ...item, quantity: newQty };
    });
    syncCart(updated);
  };

  // FIX 1: Robust calculation using 'price'
  const total = items.reduce((acc, i) => acc + (Number(i.price) || 0) * (Number(i.quantity) || 1), 0);

  return (
    <div className="bg-white min-h-screen pt-32 pb-40 px-10 md:px-20">
      <div className="max-w-7xl mx-auto">
        
        <div className="border-b border-slate-100 pb-10 mb-16">
          <h1 className="text-6xl font-black uppercase tracking-tighter text-slate-900">
            Shopping Cart<span className="text-emerald-600">.</span>
          </h1>
        </div>

        {items.length === 0 ? (
          <div className="py-40 text-center border border-slate-100 rounded-sm">
            <p className="text-slate-400 uppercase tracking-widest text-xs mb-8">Your cart is currently empty.</p>
            <Link href="/shop" className="bg-emerald-900 text-white px-10 py-4 text-[11px] font-bold uppercase tracking-widest">
              Browse the Fleet
            </Link>
          </div>
        ) : (
          <div className="flex flex-col lg:grid lg:grid-cols-12 gap-16">

            <div className="lg:col-span-8">
              {items.map((item, idx) => (
                <div key={idx} className="grid grid-cols-12 items-center py-10 border-b border-slate-50 group">
                  <div className="col-span-7 flex items-center gap-10">
                    <div className="w-28 h-28 bg-slate-50 p-4 rounded-sm flex items-center justify-center">
                      {/* FIX 2: Use item.image instead of bikeImage */}
                      <img src={item.image} alt={item.name} className="w-full h-full object-contain" />
                    </div>
                    <div>
                      <h3 className="text-xl font-black uppercase tracking-tight text-slate-900 leading-tight">
                        {/* FIX 3: Use item.name instead of bikeName */}
                        {item.name}
                      </h3>
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">
                        {item.brand} | Size: {item.size}
                      </p>
                      <button onClick={() => removeItem(idx)} className="text-[10px] text-red-600 mt-6 block uppercase font-bold">
                        [ Remove ]
                      </button>
                    </div>
                  </div>

                  <div className="col-span-3 flex justify-center">
                    <div className="flex items-center border border-slate-200">
                      <button onClick={() => updateQty(idx, -1)} className="p-2">−</button>
                      <span className="px-4 font-black">{item.quantity || 1}</span>
                      <button onClick={() => updateQty(idx, 1)} className="p-2">+</button>
                    </div>
                  </div>

                  <div className="col-span-2 text-right">
                    <p className="text-lg font-black text-slate-900">
                      {/* FIX 4: Use item.price instead of bikePrice */}
                      R{((Number(item.price) || 0) * (Number(item.quantity) || 1)).toLocaleString()}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="lg:col-span-4 sticky top-32 h-fit">
               <div className="border p-10">
                  <p className="text-[10px] uppercase font-bold text-slate-400">Total Amount</p>
                  <p className="text-5xl font-black text-slate-900">R{total.toLocaleString()}</p>
                  <button onClick={() => push('/checkout')} className="w-full mt-8 bg-emerald-950 text-white py-6 uppercase font-black tracking-widest">
                    Proceed to Checkout
                  </button>
               </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}