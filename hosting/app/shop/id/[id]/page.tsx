'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { doc, getDoc, getDocs, collection, query, where, addDoc, getFirestore } from 'firebase/firestore';
import { app } from '../../../firebase';
import { useAuth } from '../../../context/AuthContext';
import Link from 'next/link';

export default function BikeDetailPage() {
  const { id } = useParams();
  const { user } = useAuth();
  const [bike, setBike] = useState<any>(null);
  const [recommendations, setRecommendations] = useState<any[]>([]);
  const [selectedSize, setSelectedSize] = useState('');
  const [showGuide, setShowGuide] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  
  // NEW: Notification state
  const [notification, setNotification] = useState<{show: boolean, message: string}>({ show: false, message: '' });

  const db = getFirestore(app);

  // Helper for Custom Toast
  const triggerToast = (msg: string) => {
    setNotification({ show: true, message: msg });
    setTimeout(() => setNotification({ show: false, message: '' }), 4000);
  };

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

  useEffect(() => {
    if (bike) {
      const fetchRecs = async () => {
        const q = query(
          collection(db, 'products'),
          where('category', '==', bike.category),
          where('level', '==', bike.level)
        );
        const snap = await getDocs(q);
        const others = snap.docs
          .map(doc => ({ id: doc.id, ...doc.data() }))
          .filter(b => b.id !== bike.id);
        setRecommendations(others.slice(0, 2));
      };
      fetchRecs();
    }
  }, [bike, db]);

  // Updated Garage Logic (No size required)
  const handleAddToGarage = async () => {
    if (!user) {
      triggerToast("Please login to access your Garage.");
      return;
    }

    setIsAdding(true);
    try {
      // 1. Check if this bike is ALREADY in this user's garage
      const garageRef = collection(db, 'garages');
      const q = query(
        garageRef, 
        where('userEmail', '==', user.email), 
        where('bikeId', '==', bike.id)
      );
      
      const querySnapshot = await getDocs(q);

      // 2. If it exists, don't add it again
      if (!querySnapshot.empty) {
        triggerToast(`${bike.name} is already in your garage.`);
        setIsAdding(false);
        return;
      }

      // 3. If it doesn't exist, proceed with adding
      await addDoc(collection(db, 'garages'), {
        userEmail: user.email,
        bikeId: bike.id,
        bikeName: bike.name,
        bikeImage: bike.image,
        bikePrice: bike.price,
        size: selectedSize || 'Not Specified',
        addedAt: new Date()
      });
      triggerToast(`${bike.name} secured in Garage.`);
    } catch (error) {
      console.error(error);
      triggerToast("Failed to save machine.");
    } finally {
      setIsAdding(false);
    }
  };

  // Updated Cart Logic (Size mandatory)
    const handleAddToCart = () => {
      if (!selectedSize) {
        triggerToast("Technical Requirement: Select Frame Size.");
        return;
      }

      const cartItem = {
        id: bike.id,      // match DB
        name: bike.name,  // match DB
        image: bike.image, // match DB
        price: bike.price, // match DB
        size: selectedSize,
        brand: bike.brand,
        quantity: 1
      };

      const existingCart = JSON.parse(localStorage.getItem('guestCart') || '[]');
      localStorage.setItem('guestCart', JSON.stringify([...existingCart, cartItem]));
      window.dispatchEvent(new Event('cartUpdated')); 
      triggerToast(`${bike.name} added to manifest.`);
  };

  if (!bike) return <div className="p-20 text-center uppercase tracking-widest text-xs">Calibrating...</div>;

  return (
    <div className="bg-white min-h-screen pt-24 relative overflow-x-hidden">
      
      {/* SIZE GUIDE MODAL */}
      {showGuide && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-6">
          <div className="bg-white max-w-md w-full p-10 shadow-2xl relative">
            <button onClick={() => setShowGuide(false)} className="absolute top-4 right-4 text-[10px] font-black uppercase tracking-widest">[ Close ]</button>
            <h2 className="text-3xl font-black uppercase tracking-tighter mb-6 text-slate-900">Sizing Chart <span className="text-emerald-500">.</span></h2>
            <table className="w-full text-[10px] uppercase tracking-widest font-bold">
              <thead className="border-b border-slate-100 text-slate-400">
                <tr><th className="py-4 text-left">Height (cm)</th><th className="py-4 text-right">Size</th></tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                <tr><td className="py-4">155 - 165</td><td className="py-4 text-right font-black text-emerald-600">XS</td></tr>
                <tr><td className="py-4">165 - 175</td><td className="py-4 text-right font-black text-emerald-600">S</td></tr>
                <tr><td className="py-4">175 - 183</td><td className="py-4 text-right font-black text-emerald-600">M</td></tr>
                <tr><td className="py-4">183 - 191</td><td className="py-4 text-right font-black text-emerald-600">L</td></tr>
                <tr><td className="py-4">191+</td><td className="py-4 text-right font-black text-emerald-600">XL</td></tr>
              </tbody>
            </table>
          </div>
        </div>
      )}

      <nav className="max-w-7xl mx-auto px-6 py-4 flex items-center space-x-2 text-[10px] font-bold uppercase tracking-widest text-slate-400">
        <Link href="/shop" className="hover:text-slate-900 transition">Fleet</Link>
        <span>/</span>
        <span className="text-slate-900">{bike.name}</span>
      </nav>

      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-16 pb-20">
        <div className="lg:col-span-8">
          <div className="aspect-video bg-slate-50 flex items-center justify-center p-12 border border-slate-100">
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

        <div className="lg:col-span-4 lg:sticky lg:top-32 h-fit">
          <p className="text-emerald-600 font-black uppercase tracking-[0.4em] text-[10px] mb-4">{bike.brand} // {bike.category}</p>
          <h1 className="text-6xl font-black uppercase tracking-tighter mb-4 text-slate-900 leading-[0.9]">{bike.name}</h1>
          <p className="text-3xl font-light text-slate-900 mb-8 italic">R {bike.price?.toLocaleString()}</p>
          
          <div className="border-t border-slate-200 pt-8">
            <p className="text-sm text-slate-500 leading-relaxed mb-8">{bike.longDescription || "Precision engineered for ultimate performance."}</p>

            <div className="mb-10">
              <div className="flex justify-between items-end mb-4">
                <p className="text-[10px] uppercase font-black tracking-widest">Frame Size</p>
                <button onClick={() => setShowGuide(true)} className="text-[9px] underline uppercase font-bold text-slate-400 hover:text-emerald-600 transition">Size Guide</button>
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

            {/* BUTTON GROUP */}
            <div className="space-y-4">
              <button 
                onClick={handleAddToCart}
                disabled={isAdding}
                className={`w-full py-6 text-[11px] font-black uppercase tracking-[0.3em] transition-all duration-300 shadow-xl ${
                  selectedSize 
                  ? 'bg-emerald-950 text-white hover:bg-black active:scale-[0.98]' 
                  : 'bg-slate-100 text-slate-400 cursor-not-allowed'
                }`}
              >
                {isAdding ? 'Processing...' : selectedSize ? 'Add to Cart' : 'Select Size to Continue'}
              </button>

              <button 
                onClick={handleAddToGarage}
                disabled={isAdding}
                className="w-full py-4 text-[10px] font-black uppercase tracking-[0.3em] border border-slate-900 text-slate-900 hover:bg-slate-900 hover:text-white transition-all"
              >
                {isAdding ? 'Saving...' : 'Save to Garage'}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* RECOMMENDED SECTION */}
      {recommendations.length > 0 && (
        <div className="max-w-7xl mx-auto px-6 mt-16 border-t border-slate-100 pt-20 pb-32">
          <h3 className="text-4xl font-black uppercase tracking-tighter mb-12 text-slate-900">
            Similar <span className="text-emerald-500">{bike.level}</span> <span className="text-emerald-500">{bike.category}</span> Bikes
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {recommendations.map((rec) => (
              <Link href={`/shop/id/${rec.id}`} key={rec.id} className="group flex gap-8 items-center bg-slate-50 p-8 border border-slate-100 hover:border-emerald-500 transition-colors">
                <div className="w-1/3 aspect-video overflow-hidden">
                  <img src={rec.image} className="w-full h-full object-contain group-hover:scale-110 transition duration-700" alt={rec.name} />
                </div>
                <div>
                  <p className="text-[9px] font-black text-emerald-600 uppercase tracking-widest mb-1">{rec.brand}</p>
                  <h4 className="text-xl font-black uppercase text-slate-900 leading-tight">{rec.name}</h4>
                  <p className="text-xs font-bold text-slate-400 mt-2 italic">R {rec.price?.toLocaleString()}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* CUSTOM TOAST NOTIFICATION */}
      {notification.show && (
        <div className="fixed bottom-10 right-10 z-[200] animate-bounce-in">
          <div className="bg-slate-900 text-white px-8 py-5 shadow-2xl border-l-4 border-emerald-500 flex items-center gap-4">
            <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
            <p className="text-[10px] font-black uppercase tracking-[0.2em]">{notification.message}</p>
          </div>
        </div>
      )}
    </div>
  );
}