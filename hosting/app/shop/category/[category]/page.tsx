'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { collection, getDocs, getFirestore, query, where } from 'firebase/firestore';
import { app } from '../../../firebase';
import Link from 'next/link';

export default function CategoryPage() {
  const { category } = useParams(); // e.g., 'road'
  const [bikes, setBikes] = useState<any[]>([]);
  const [filteredBikes, setFilteredBikes] = useState<any[]>([]);
  
  const [levelFilter, setLevelFilter] = useState('all');
  const [brandFilter, setBrandFilter] = useState('all');
  const [sortOrder, setSortOrder] = useState('none');
  const [loading, setLoading] = useState(true);
  
  const db = getFirestore(app);

  useEffect(() => {
    const fetchBikes = async () => {
      // We only fetch bikes matching THIS category
      const q = query(collection(db, 'products'), where('category', '==', category));
      const querySnapshot = await getDocs(q);
      const bikesData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setBikes(bikesData);
      setFilteredBikes(bikesData);
      setLoading(false);
    };
    if (category) fetchBikes();
  }, [category, db]);

  // Filtering Logic (excluding category since it's locked)
  useEffect(() => {
    let result = [...bikes];
    if (levelFilter !== 'all') result = result.filter(b => b.level === levelFilter);
    if (brandFilter !== 'all') result = result.filter(b => b.brand === brandFilter);

    if (sortOrder === 'high-to-low') result.sort((a, b) => b.price - a.price);
    else if (sortOrder === 'low-to-high') result.sort((a, b) => a.price - b.price);
    setFilteredBikes(result);
  }, [levelFilter, brandFilter, sortOrder, bikes]);

  if (loading) return <div className="p-20 text-center uppercase tracking-widest text-[10px]">Filtering {category} Fleet...</div>;

  return (
    <div className="bg-white min-h-screen">
      {/* 1. HERO SECTION */}
      <div className="relative h-[30vh] bg-slate-900 overflow-hidden">
        <div className="absolute inset-0 flex flex-col justify-center px-10 max-w-7xl mx-auto z-10">
          <h1 className="text-white text-7xl font-black uppercase tracking-tighter">
            {category}<span className="text-emerald-500">.</span>
          </h1>
          <p className="text-emerald-400 text-[10px] font-bold tracking-[0.4em] uppercase">Discipline Specific Performance</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-20 flex flex-col md:flex-row gap-12">
        {/* SIDEBAR */}
        <aside className="w-full md:w-64 flex-shrink-0 space-y-10">
           {/* Note: We remove the Category filter here because we are already in that category */}
           <h3 className="text-[10px] font-black uppercase tracking-widest mb-6 border-b pb-2">Refine {category}</h3>
           
           <div>
              <label className="text-[9px] font-bold text-slate-400 uppercase tracking-widest block mb-2">Brand</label>
              <select onChange={(e) => setBrandFilter(e.target.value)} className="w-full text-xs font-bold uppercase border-slate-200 py-2">
                <option value="all">All Brands</option>
                <option value="Specialized">Specialized</option>
                <option value="Trek">Trek</option>
                <option value="Canyon">Canyon</option>
                <option value="Scott">Scott</option>
                <option value="Giant">Giant</option>
                <option value="Cervélo">Cervélo</option>
                <option value="Santa Cruz">Santa Cruz</option>
              </select>
            </div>

            <div>
              <label className="text-[9px] font-bold text-slate-400 uppercase tracking-widest block mb-2">Experience</label>
              <select onChange={(e) => setLevelFilter(e.target.value)} className="w-full text-xs font-bold uppercase border-slate-200 py-2">
                <option value="all">All Levels</option>
                <option value="Beginner">Beginner</option>
                <option value="Intermediate">Intermediate</option>
                <option value="Advanced">Advanced</option>
              </select>
          </div>
          
          <div>
            <h3 className="text-[10px] font-black uppercase tracking-widest mb-6 border-b pb-2">Sort</h3>
            <select onChange={(e) => setSortOrder(e.target.value)} className="w-full text-xs font-bold uppercase border-slate-200 py-2">
              <option value="none">Default</option>
              <option value="low-to-high">Price: Low-High</option>
              <option value="high-to-low">Price: High-Low</option>
              <option value="a-z">Name: A-Z</option>
              <option value="z-a">Name: Z-A</option>
            </select>
          </div>
        </aside>

        {/* GRID */}
        <main className="flex-1">
          {/* 1. ADD THIS SECTION: The Counter */}
          <div className="flex justify-between items-center mb-10 border-b border-slate-100 pb-4">
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">
              {filteredBikes.length} {category} Models Found
            </p>
          </div>

          {/* 2. KEEP THIS SECTION: Your Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
            {filteredBikes.map((bike) => (
              <div key={bike.id} className="group flex flex-col justify-between">
                <div>
                  <div className="aspect-video bg-slate-50 mb-6 flex items-center justify-center p-6">
                    <img src={bike.image} className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500" alt={bike.name} />
                  </div>
                  <p className="text-[9px] font-bold tracking-[0.3em] text-emerald-600 uppercase">{bike.category}</p>
                  <p className="text-[9px] font-bold tracking-[0.3em] text-slate-400 uppercase mb-2">{bike.level}</p>
                  <h3 className="text-lg font-black uppercase text-slate-900 leading-tight mb-1">{bike.name}</h3>
                  <p className="text-slate-500 font-bold text-sm mb-6">R {bike.price?.toLocaleString()}</p>
                </div>
                <Link href={`/shop/id/${bike.id}`} className="w-full text-center border border-slate-900 py-3 text-[10px] font-bold uppercase tracking-widest hover:bg-slate-900 hover:text-white transition">
                  View Machine
                </Link>
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}