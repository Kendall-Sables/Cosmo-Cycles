'use client';

import { useState, useEffect } from 'react';
import { collection, getDocs, getFirestore } from 'firebase/firestore';
import { app } from '../firebase';
import Link from 'next/link';
import AeroAssistant from '../components/AeroAssistant';

export default function ShopPage() {
  const [allBikes, setAllBikes] = useState<any[]>([]);
  const [filteredBikes, setFilteredBikes] = useState<any[]>([]);
  
  const [levelFilter, setLevelFilter] = useState('all');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [brandFilter, setBrandFilter] = useState('all');
  const [sortOrder, setSortOrder] = useState('none');
  
  const [loading, setLoading] = useState(true);
  const db = getFirestore(app);

  useEffect(() => {
    const fetchBikes = async () => {
      const querySnapshot = await getDocs(collection(db, 'products'));
      const bikesData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setAllBikes(bikesData);
      setFilteredBikes(bikesData);
      setLoading(false);
    };
    fetchBikes();
  }, [db]);

  useEffect(() => {
    let result = [...allBikes];
    if (levelFilter !== 'all') result = result.filter(b => b.level === levelFilter);
    if (categoryFilter !== 'all') result = result.filter(b => b.category === categoryFilter);
    if (brandFilter !== 'all') result = result.filter(b => b.brand === brandFilter);

    if (sortOrder === 'high-to-low') result.sort((a, b) => b.price - a.price);
    else if (sortOrder === 'low-to-high') result.sort((a, b) => a.price - b.price);
    else if (sortOrder === 'a-z') result.sort((a, b) => a.name.localeCompare(b.name));

    setFilteredBikes(result);
  }, [levelFilter, categoryFilter, brandFilter, sortOrder, allBikes]);

  if (loading) return <div className="p-20 text-center font-black uppercase tracking-[0.4em] text-[10px] animate-pulse">Syncing Universal Fleet...</div>;

  return (
    <div className="bg-white min-h-screen">
      
      {/* 1. UPDATED HERO SECTION (Matches Category Style) */}
      <div 
        className="relative h-[50vh] bg-slate-900 overflow-hidden bg-cover bg-center flex flex-col justify-center"
        style={{ 
          backgroundImage: `linear-gradient(to right, rgba(15, 23, 42, 0.85) 20%, rgba(15, 23, 42, 0.1)), url('https://res.cloudinary.com/dzbriyw1o/image/upload/v1772399718/All-Bikes_qpvtxo.avif')` 
        }}
      >
        <div className="relative z-10 px-10 max-w-7xl mx-auto w-full">
          <p className="text-emerald-400 text-[10px] font-black tracking-[0.5em] uppercase mb-4 animate-in fade-in slide-in-from-bottom-4 duration-700">
            Global Collection // 2026
          </p>
          <h1 className="text-white text-8xl font-black uppercase tracking-tighter leading-none animate-in fade-in slide-in-from-bottom-6 duration-1000">
            THE FLEET<span className="text-emerald-500">.</span>
          </h1>
          <p className="text-slate-300 text-[11px] font-bold tracking-[0.3em] uppercase mt-6 max-w-md leading-relaxed opacity-80">
            The complete archive of high-performance machines engineered for the South African terrain.
          </p>
        </div>
      </div>

      {/* 2. MAIN CONTENT AREA */}
      <div className="max-w-7xl mx-auto px-6 py-20 flex flex-col md:flex-row gap-12">
        
        {/* SIDEBAR FILTERS (Updated Select Styles) */}
        <aside className="w-full md:w-64 flex-shrink-0 space-y-10">
          <div>
            <h3 className="text-[10px] font-black uppercase tracking-widest mb-6 border-b border-slate-100 pb-2 text-slate-900">Filter By</h3>
            
            {/* Category */}
            <div className="mb-6">
              <label className="text-[9px] font-bold text-slate-400 uppercase tracking-widest block mb-2">Discipline</label>
              <select onChange={(e) => setCategoryFilter(e.target.value)} className="w-full text-xs font-bold uppercase border-slate-200 py-3 px-2 focus:ring-1 focus:ring-emerald-500 outline-none">
                <option value="all">All Types</option>
                <option value="road">Road</option>
                <option value="mountain">Mountain</option>
                <option value="gravel">Gravel</option>
              </select>
            </div>

            {/* Brand */}
            <div className="mb-6">
              <label className="text-[9px] font-bold text-slate-400 uppercase tracking-widest block mb-2">Brand</label>
              <select onChange={(e) => setBrandFilter(e.target.value)} className="w-full text-xs font-bold uppercase border-slate-200 py-3 px-2 focus:ring-1 focus:ring-emerald-500 outline-none">
                <option value="all">All Brands</option>
                <option value="Specialized">Specialized</option>
                <option value="Trek">Trek</option>
                <option value="Canyon">Canyon</option>
                <option value="Scott">Scott</option>
                <option value="Giant">Giant</option>
                <option value="Cervélo">Cervélo</option>
                <option value="Santa Cruz">Santa Cruz</option>
                <option value="Cannondale">Cannondale</option>
              </select>
            </div>

            {/* Level */}
            <div className="mb-6">
              <label className="text-[9px] font-bold text-slate-400 uppercase tracking-widest block mb-2">Experience</label>
              <select onChange={(e) => setLevelFilter(e.target.value)} className="w-full text-xs font-bold uppercase border-slate-200 py-3 px-2 focus:ring-1 focus:ring-emerald-500 outline-none">
                <option value="all">All Levels</option>
                <option value="beginner">Beginner</option>
                <option value="intermediate">Intermediate</option>
                <option value="advanced">Advanced</option>
              </select>
            </div>
          </div>

          <div>
            <h3 className="text-[10px] font-black uppercase tracking-widest mb-6 border-b border-slate-100 pb-2 text-slate-900">Sort</h3>
            <select onChange={(e) => setSortOrder(e.target.value)} className="w-full text-xs font-bold uppercase border-slate-200 py-3 px-2 focus:ring-1 focus:ring-emerald-500 outline-none">
              <option value="none">Default</option>
              <option value="low-to-high">Price: Low-High</option>
              <option value="high-to-low">Price: High-Low</option>
            </select>
          </div>
        </aside>

        {/* PRODUCT GRID (Updated to Match Category Grid) */}
        <main className="flex-1">
          <div className="flex justify-between items-center mb-10 border-b border-slate-50 pb-4">
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">
              {filteredBikes.length} Universal Models Found
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
            {filteredBikes.map((bike) => (
              <div key={bike.id} className="group flex flex-col justify-between">
                <div>
                  <div className="aspect-square bg-slate-50 mb-6 flex items-center justify-center p-8 overflow-hidden transition-colors group-hover:bg-slate-100/50">
                    <img 
                      src={bike.image} 
                      className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-700 ease-in-out" 
                      alt={bike.name} 
                    />
                  </div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="w-2 h-2 bg-emerald-500 rounded-full"></span>
                    <p className="text-[9px] font-bold tracking-[0.3em] text-slate-400 uppercase">{bike.level} // {bike.category}</p>
                  </div>
                  <h3 className="text-lg font-black uppercase text-slate-900 leading-tight mb-1 group-hover:text-emerald-600 transition-colors">
                    {bike.name}
                  </h3>
                  <p className="text-slate-900 font-black text-sm mb-6">
                    R {Number(bike.price || 0).toLocaleString()}
                  </p>
                </div>
                
                <Link 
                  href={`/shop/id/${bike.id}`} 
                  className="w-full text-center border-2 border-slate-900 py-4 text-[10px] font-black uppercase tracking-[0.2em] hover:bg-slate-900 hover:text-white transition-all duration-300"
                >
                  View Machine
                </Link>
              </div>
            ))}
          </div>
        </main>
      </div>
      <AeroAssistant products={allBikes} />
    </div>
  );
}