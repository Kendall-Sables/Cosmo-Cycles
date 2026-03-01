'use client';

import { useState, useEffect } from 'react';
import { collection, getDocs, getFirestore } from 'firebase/firestore';
import { app } from '../firebase';
import Link from 'next/link';

export default function ShopPage() {
  const [allBikes, setAllBikes] = useState<any[]>([]);
  const [filteredBikes, setFilteredBikes] = useState<any[]>([]);
  
  // States for Filters
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

  if (loading) return <div className="p-20 text-center uppercase tracking-widest text-[10px]">Loading Fleet...</div>;

  return (
    <div className="bg-white min-h-screen">
      {/* 1. HERO SECTION */}
      <div className="relative h-[40vh] bg-slate-900 overflow-hidden">
        <img 
          src="https://images.unsplash.com/photo-1511994298241-608e28f14fde?auto=format&fit=crop&q=80&w=2000" 
          className="w-full h-full object-cover opacity-60" 
          alt="Fleet Hero"
        />
        <div className="absolute inset-0 flex flex-col justify-center px-10 max-w-7xl mx-auto">
          <h1 className="text-white text-7xl font-black uppercase tracking-tighter">THE FLEET<span className="text-emerald-500">.</span></h1>
          <p className="text-emerald-400 text-[10px] font-bold tracking-[0.4em] uppercase">Engineered for the South African Terrain</p>
        </div>
      </div>

      {/* 2. MAIN CONTENT AREA (Centered with mx-auto) */}
      <div className="max-w-7xl mx-auto px-6 py-20 flex flex-col md:flex-row gap-12">
        
        {/* SIDEBAR FILTERS */}
        <aside className="w-full md:w-64 flex-shrink-0 space-y-10">
          <div>
            <h3 className="text-[10px] font-black uppercase tracking-widest mb-6 border-b pb-2">Filter By</h3>
            
            {/* Category */}
            <div className="mb-6">
              <label className="text-[9px] font-bold text-slate-400 uppercase tracking-widest block mb-2">Discipline</label>
              <select onChange={(e) => setCategoryFilter(e.target.value)} className="w-full text-xs font-bold uppercase border-slate-200 py-2 focus:ring-emerald-500">
                <option value="all">All Types</option>
                <option value="road">Road</option>
                <option value="mountain">Mountain</option>
                <option value="gravel">Gravel</option>
              </select>
            </div>

            {/* Brand */}
            <div className="mb-6">
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

            {/* Level */}
            <div className="mb-6">
              <label className="text-[9px] font-bold text-slate-400 uppercase tracking-widest block mb-2">Experience</label>
              <select onChange={(e) => setLevelFilter(e.target.value)} className="w-full text-xs font-bold uppercase border-slate-200 py-2">
                <option value="all">All Levels</option>
                <option value="Beginner">Beginner</option>
                <option value="Intermediate">Intermediate</option>
                <option value="Advanced">Advanced</option>
              </select>
            </div>
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

        {/* PRODUCT GRID */}
        <main className="flex-1">
          <div className="flex justify-between items-center mb-10">
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{filteredBikes.length} Models Found</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
            {filteredBikes.map((bike) => (
              <div key={bike.id} className="group flex flex-col justify-between">
                <div>
                  <div className="aspect-video bg-slate-50 mb-6 overflow-hidden flex items-center justify-center p-6 transition-colors group-hover:bg-slate-100">
                    <img 
                      src={bike.image} 
                      className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500" 
                      alt={bike.name} 
                    />
                  </div>
                  <p className="text-[9px] font-bold tracking-[0.3em] text-emerald-600 uppercase">
                    {bike.category}
                  </p>
                  <p className="text-[9px] font-bold tracking-[0.3em] text-slate-400 uppercase mb-2">
                    {bike.level}
                  </p>
                  <h3 className="text-lg font-black uppercase text-slate-900 leading-tight mb-1">{bike.name}</h3>
                  <p className="text-slate-500 font-bold text-sm mb-6 uppercase">R {bike.price?.toLocaleString()}</p>
                </div>
                
                <Link 
                  href={`/shop/id/${bike.id}`} 
                  className="w-full text-center border border-slate-900 py-3 text-[10px] font-bold uppercase tracking-widest hover:bg-slate-900 hover:text-white transition"
                >
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