'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { collection, query, where, getDocs, getFirestore } from 'firebase/firestore';
import { app } from '../../firebase';
import Link from 'next/link';

export default function CategoryPage() {
  const { category } = useParams();
  const [bikes, setBikes] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const db = getFirestore(app);

  useEffect(() => {
    const fetchCategoryBikes = async () => {
      try {
        const q = query(collection(db, 'products'), where('category', '==', category));
        const querySnapshot = await getDocs(q);
        const fetchedBikes = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setBikes(fetchedBikes);
      } catch (error) {
        console.error("Error fetching category:", error);
      } finally {
        setLoading(false);
      }
    };

    if (category) fetchCategoryBikes();
  }, [category, db]);

  if (loading) return <div className="p-20 text-center uppercase tracking-widest text-xs">Scanning {category} Horizon...</div>;

  return (
    <div className="bg-white min-h-screen pt-32 px-10">
      <h1 className="text-8xl font-black uppercase tracking-tighter mb-20 text-slate-900">
        {category} <span className="text-emerald-500">.</span>
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
        {bikes.map((bike) => (
          <Link href={`/shop/${bike.id}`} key={bike.id} className="group">
            <div className="aspect-[4/5] bg-slate-100 mb-6 overflow-hidden">
              <img src={bike.image} alt={bike.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
            </div>
            <p className="text-[10px] font-bold tracking-widest text-slate-400 uppercase mb-2">{bike.level}</p>
            <h3 className="text-xl font-bold uppercase text-slate-900">{bike.name}</h3>
            <p className="text-slate-500 font-medium">R {bike.price?.toLocaleString()}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}