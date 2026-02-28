'use client';

import { useState, useEffect } from 'react';
import { collection, getDocs, getFirestore } from 'firebase/firestore';
import { app } from '../firebase'; // Ensure your firebase config is exported from here

export default function ShopPage() {
  const [bikes, setBikes] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const db = getFirestore(app);

  useEffect(() => {
    const fetchBikes = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'products'));
        const bikeList = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setBikes(bikeList);
      } catch (error) {
        console.error("Error fetching bikes: ", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBikes();
  }, [db]);

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-emerald-950"></div>
    </div>
  );

  return (
    <div className="bg-white min-h-screen">
      {/* Shop Header */}
      <div className="py-20 bg-slate-50 border-b border-slate-100 px-6">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-xs font-bold tracking-[0.3em] text-emerald-800 uppercase mb-4">The Fleet</h1>
          <h2 className="text-5xl font-black text-slate-900 uppercase tracking-tighter">Precision Machines</h2>
        </div>
      </div>

      {/* Product Grid */}
      <div className="max-w-7xl mx-auto px-6 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {bikes.map((bike) => (
            <div key={bike.id} className="group cursor-pointer">
              <div className="aspect-[4/5] bg-slate-100 overflow-hidden mb-6 relative">
                <img 
                  src={bike.image || 'https://via.placeholder.com/800'} 
                  alt={bike.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                {bike.featured && (
                  <span className="absolute top-4 left-4 bg-emerald-950 text-white text-[10px] font-bold px-3 py-1 uppercase tracking-widest">
                    Featured
                  </span>
                )}
              </div>
              <p className="text-[10px] font-bold text-emerald-700 uppercase tracking-widest mb-2">{bike.category}</p>
              <h3 className="text-xl font-black text-slate-900 uppercase tracking-tight mb-2">{bike.name}</h3>
              <p className="text-slate-500 text-sm mb-4 line-clamp-2">{bike.description}</p>
              <p className="text-lg font-bold text-slate-900">R {bike.price?.toLocaleString()}</p>
              <button className="mt-6 w-full border border-slate-900 py-4 text-xs font-bold uppercase tracking-widest hover:bg-slate-900 hover:text-white transition">
                View Details
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}