'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { collection, addDoc, getFirestore } from 'firebase/firestore';
import { app } from '../firebase';
import Link from 'next/link';

export default function CheckoutPage() {
  const { user } = useAuth();
  const [paymentType, setPaymentType] = useState('Credit Card');
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);
  const [items, setItems] = useState<any[]>([]);
  const db = getFirestore(app);

  useEffect(() => {
    const savedCart = localStorage.getItem('guestCart');
    if (savedCart) {
      setItems(JSON.parse(savedCart));
    }
  }, []);

  const total = items.reduce((acc, i) => acc + (Number(i.price) || 0) * (Number(i.quantity) || 1), 0);

  const handleCompleteOrder = async () => {
    if (!user || items.length === 0) return;
    setIsProcessing(true);

    try {
      await addDoc(collection(db, 'orders'), {
        userEmail: user.email,
        items: items,
        totalAmount: total,
        paymentType: paymentType,
        status: 'Complete', 
        orderedAt: new Date()
      });

      localStorage.removeItem('guestCart');
      window.dispatchEvent(new Event('cartUpdated'));
      setOrderComplete(true);
    } catch (e) {
      console.error(e);
    } finally {
      setIsProcessing(false);
    }
  };

  // 1. MATCHING LOGIN GATE
  if (!user) {
    return (
      <div className="min-h-screen bg-white pt-40 flex flex-col items-center px-10">
        <div className="max-w-xl w-full border border-slate-100 p-16 text-center bg-white shadow-sm">
          <div className="w-12 h-12 bg-emerald-50 rounded-full flex items-center justify-center mx-auto mb-8">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-emerald-700">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
            </svg>
          </div>
          <h2 className="text-4xl font-black uppercase tracking-tighter mb-4 text-slate-900">Pilot Identity Required</h2>
          <p className="text-[11px] uppercase tracking-[0.2em] font-bold text-slate-400 mb-10 leading-relaxed">
            To finalize your fleet acquisition, please sign in to your secure Cosmo account.
          </p>
          <Link href="/signin" className="bg-emerald-950 text-white px-12 py-5 text-[11px] font-black uppercase tracking-[0.3em] inline-block hover:bg-emerald-800 transition-all">
            Secure Sign In
          </Link>
        </div>
      </div>
    );
  }

  // 2. MATCHING SUCCESS STATE
  if (orderComplete) {
    return (
      <div className="min-h-screen bg-white pt-40 flex flex-col items-center px-10 text-center">
        <div className="w-20 h-20 bg-emerald-600 rounded-full flex items-center justify-center mb-10 animate-in zoom-in duration-500">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" className="w-10 h-10 text-white">
            <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
          </svg>
        </div>
        <h2 className="text-7xl font-black uppercase tracking-tighter leading-none mb-4 text-slate-900">Success<span className="text-emerald-500">.</span></h2>
        <p className="text-[11px] uppercase tracking-[0.4em] font-black text-slate-400 mb-12">Your order has been logged and is being prepared.</p>
        <Link href="/shop" className="text-[11px] font-black underline uppercase tracking-[0.3em] text-emerald-900 hover:text-emerald-600 transition-colors">
          Return to The Fleet
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-white min-h-screen pt-32 px-10 md:px-20 pb-20">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16">
        
        {/* LEFT: PAYMENT STEPS */}
        <div className="lg:col-span-7">
          <h1 className="text-6xl font-black uppercase tracking-tighter mb-12 text-slate-900">Checkout<span className="text-emerald-600">.</span></h1>
          
          <div className="space-y-16">
            <div>
              <p className="text-[11px] font-black uppercase tracking-[0.3em] text-emerald-700 mb-8">01 // Payment Protocol</p>
              <div className="grid grid-cols-1 gap-4">
                {['Credit Card', 'PayPal', 'EFT / Bank Transfer'].map((type) => (
                  <button 
                    key={type}
                    onClick={() => setPaymentType(type)}
                    className={`flex justify-between items-center p-8 border rounded-sm transition-all duration-300 ${paymentType === type ? 'border-emerald-900 bg-emerald-50/30' : 'border-slate-100 hover:border-slate-200 text-slate-400'}`}
                  >
                    <span className={`text-[11px] font-black uppercase tracking-widest ${paymentType === type ? 'text-emerald-900' : 'text-slate-500'}`}>{type}</span>
                    <div className={`w-4 h-4 rounded-full border-2 ${paymentType === type ? 'border-emerald-600 bg-emerald-600' : 'border-slate-200'}`}></div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT: ORDER SUMMARY (MATCHES CART STYLE) */}
        <div className="lg:col-span-5">
          <div className="border border-slate-100 p-10 bg-white sticky top-32">
            <h2 className="text-[12px] font-black uppercase tracking-[0.4em] mb-10 text-slate-900">Final Review</h2>
            
            <div className="space-y-4 mb-10 border-b border-slate-50 pb-8">
              {items.map((item, idx) => (
            <div key={idx} className="flex justify-between text-[10px] font-bold uppercase tracking-widest text-slate-500">
                {/* Changed bikeName to name */}
                <span>{item.quantity}x {item.name}</span> 
                <span className="text-slate-900 font-black">
                {/* Added Number() safety to price */}
                R{((Number(item.price) || 0) * (Number(item.quantity) || 1)).toLocaleString()}
                </span>
            </div>
            ))}
            </div>

            <div className="space-y-6">
              <div className="flex justify-between items-end">
                <span className="text-[11px] font-black uppercase tracking-widest text-slate-400">Total Payable</span>
                <span className="text-5xl font-black tracking-tighter leading-none text-slate-900">R{total.toLocaleString()}</span>
              </div>
              
              <button 
                onClick={handleCompleteOrder}
                disabled={isProcessing || items.length === 0}
                className="w-full py-7 bg-emerald-950 text-white text-[11px] font-black uppercase tracking-[0.4em] hover:bg-emerald-800 transition-all duration-500 shadow-lg shadow-emerald-900/10"
              >
                {isProcessing ? 'Processing Transaction...' : 'Confirm Order'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}