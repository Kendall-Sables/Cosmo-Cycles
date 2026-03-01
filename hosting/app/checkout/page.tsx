'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { collection, addDoc, getFirestore } from 'firebase/firestore';
import { app } from '../firebase';
import Link from 'next/link';

export default function CheckoutPage() {
  const { user } = useAuth();
  const [paymentType, setPaymentType] = useState('Card');
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);
  const [items, setItems] = useState<any[]>([]);
  const db = getFirestore(app);

  // Load the manifest from localStorage (Guest Cart)
  useEffect(() => {
    const savedCart = localStorage.getItem('guestCart');
    if (savedCart) {
      setItems(JSON.parse(savedCart));
    }
  }, []);

  const subtotal = items.reduce((acc, item) => acc + (item.bikePrice || 0), 0);

  const handleCompleteOrder = async () => {
    if (!user || items.length === 0) return;
    setIsProcessing(true);

    try {
      // Create the Permanent Order in Firebase
      await addDoc(collection(db, 'orders'), {
        userEmail: user.email,
        userName: user.displayName || 'Guest Pilot',
        items: items,
        totalAmount: subtotal,
        paymentType: paymentType,
        status: 'Complete', // Per brief requirements
        orderedAt: new Date()
      });

      // Clear the local guest cart
      localStorage.removeItem('guestCart');
      
      // Trigger the success UI instead of an alert
      setOrderComplete(true);
    } catch (e) {
      console.error("Deployment Error:", e);
    } finally {
      setIsProcessing(false);
    }
  };

  // 1. GATEKEEPER: If not logged in, show the sleek Login Prompt
  if (!user) {
    return (
      <div className="min-h-screen bg-white pt-40 flex flex-col items-center px-10">
        <div className="max-w-xl w-full border-[1px] border-black p-16 text-center shadow-[20px_20px_0px_0px_rgba(0,0,0,0.05)]">
          <h2 className="text-5xl font-black uppercase tracking-tighter mb-6 leading-none">Authentication<br/>Required<span className="text-emerald-500">.</span></h2>
          <p className="text-[10px] uppercase tracking-[0.3em] font-bold text-slate-400 mb-12 leading-relaxed">
            Guest access restricted for final deployment. Please verify your pilot identity.
          </p>
          <Link href="/signin" className="bg-black text-white px-12 py-6 text-[11px] font-black uppercase tracking-[0.3em] inline-block hover:bg-emerald-600 transition-all duration-500">
            Log In to Continue
          </Link>
        </div>
      </div>
    );
  }

  // 2. SUCCESS STATE: High-end confirmation (No Alerts)
  if (orderComplete) {
    return (
      <div className="min-h-screen bg-white pt-40 flex flex-col items-center px-10">
        <div className="max-w-2xl w-full border-[1px] border-black p-20 text-center animate-in fade-in zoom-in duration-700">
          <div className="w-16 h-16 bg-emerald-500 rounded-full mx-auto mb-10 flex items-center justify-center text-white">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" className="w-8 h-8">
              <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
            </svg>
          </div>
          <h2 className="text-6xl font-black uppercase tracking-tighter mb-4 leading-none text-slate-900">Deployed<span className="text-emerald-500">.</span></h2>
          <p className="text-[11px] uppercase tracking-[0.4em] font-black text-slate-400 mb-12">Manifest Secured & Processing</p>
          <div className="border-t border-slate-100 pt-8 mb-12 flex justify-between text-[10px] font-bold uppercase tracking-widest text-slate-500">
            <span>Auth Pilot: {user.email}</span>
            <span>Ref: {Math.random().toString(36).toUpperCase().substring(7)}</span>
          </div>
          <Link href="/shop" className="text-[11px] font-black underline uppercase tracking-[0.3em] hover:text-emerald-600 transition-colors">
            Return to Fleet
          </Link>
        </div>
      </div>
    );
  }

  // 3. MAIN CHECKOUT UI
  return (
    <div className="bg-white min-h-screen pt-32 px-10 pb-20">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-20">
        
        {/* LEFT: PAYMENT SELECTION */}
        <div className="lg:col-span-7">
          <h1 className="text-7xl font-black uppercase tracking-tighter mb-16 leading-[0.8]">
            Checkout<span className="text-emerald-500">/</span>
          </h1>
          
          <div className="space-y-12">
            <div>
              <p className="text-[11px] font-black uppercase tracking-[0.3em] text-emerald-600 mb-6">01 // Payment Protocol</p>
              <div className="grid grid-cols-1 gap-4">
                {['Credit Card', 'PayPal', 'Cash on Delivery'].map((type) => (
                  <button 
                    key={type}
                    onClick={() => setPaymentType(type)}
                    className={`group flex justify-between items-center p-8 border-[1px] transition-all duration-500 ${paymentType === type ? 'border-black bg-black text-white' : 'border-slate-100 hover:border-slate-300 text-slate-900'}`}
                  >
                    <span className="text-xs font-black uppercase tracking-widest">{type}</span>
                    <div className={`w-4 h-4 rounded-full border-2 ${paymentType === type ? 'border-emerald-500 bg-emerald-500' : 'border-slate-200'}`}></div>
                  </button>
                ))}
              </div>
            </div>

            <div className="p-8 bg-slate-50 border border-slate-100">
              <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 leading-relaxed">
                By confirming, you authorize the deployment of the selected machines to your registered profile address.
              </p>
            </div>
          </div>
        </div>

        {/* RIGHT: ORDER SUMMARY */}
        <div className="lg:col-span-5">
          <div className="border-[1px] border-black p-12 sticky top-40">
            <p className="text-[11px] font-black uppercase tracking-[0.3em] mb-10 text-slate-400">02 // Order Manifest</p>
            
            <div className="space-y-4 mb-10 max-h-[300px] overflow-y-auto pr-4">
              {items.map((item, idx) => (
                <div key={idx} className="flex justify-between items-center border-b border-slate-100 pb-4">
                  <div className="flex items-center gap-4">
                    <span className="text-[9px] font-black text-slate-300">0{idx + 1}</span>
                    <span className="text-[10px] font-black uppercase">{item.bikeName}</span>
                  </div>
                  <span className="text-[10px] font-bold">R {item.bikePrice?.toLocaleString()}</span>
                </div>
              ))}
            </div>

            <div className="space-y-6 pt-6">
              <div className="flex justify-between items-end">
                <span className="text-[11px] font-black uppercase tracking-widest">Total Amount</span>
                <span className="text-4xl font-black tracking-tighter leading-none">R {subtotal.toLocaleString()}</span>
              </div>
              
              <button 
                onClick={handleCompleteOrder}
                disabled={isProcessing || items.length === 0}
                className="w-full py-8 bg-black text-white text-[11px] font-black uppercase tracking-[0.4em] hover:bg-emerald-600 transition-all duration-500 disabled:opacity-30 disabled:hover:bg-black"
              >
                {isProcessing ? 'Verifying Protocol...' : 'Confirm & Deploy'}
              </button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}