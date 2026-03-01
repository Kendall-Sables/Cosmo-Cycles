'use client';
import { useState } from 'react';
import { getFirestore, doc, updateDoc } from 'firebase/firestore';
import { app } from '../../firebase';

export default function Orders({ orders, setOrders }: { orders: any[], setOrders: any }) {
  const [filter, setFilter] = useState('All');
  const [search, setSearch] = useState('');
  const db = getFirestore(app);

  const updateStatus = async (id: string, newStatus: string) => {
    await updateDoc(doc(db, 'orders', id), { status: newStatus });
    setOrders(orders.map(o => o.id === id ? { ...o, status: newStatus } : o));
  };

  const filteredOrders = orders.filter(o => {
    const matchesStatus = filter === 'All' || o.status === filter;
    const matchesSearch = o.userEmail?.toLowerCase().includes(search.toLowerCase()) || o.id.includes(search);
    return matchesStatus && matchesSearch;
  });

  return (
    <div className="animate-in fade-in duration-500">
      <h2 className="text-6xl font-black uppercase tracking-tighter text-slate-900 mb-12 leading-none">Manifest<span className="text-emerald-500">.</span></h2>
      
      <div className="flex gap-4 mb-8">
        <input 
          placeholder="SEARCH BY EMAIL OR REF..." 
          className="flex-1 bg-slate-50 border-none p-4 text-[10px] font-black uppercase tracking-widest outline-none focus:ring-1 focus:ring-emerald-500"
          onChange={(e) => setSearch(e.target.value)}
        />
        <select 
          className="bg-slate-900 text-white text-[10px] font-black uppercase tracking-widest px-6 outline-none"
          onChange={(e) => setFilter(e.target.value)}
        >
          <option value="All">All Statuses</option>
          <option value="Pending">Pending</option>
          <option value="Shipped">Shipped</option>
          <option value="Complete">Complete</option>
        </select>
      </div>

      <div className="bg-white border border-slate-100 divide-y divide-slate-100">
        {filteredOrders.map(o => (
          <div key={o.id} className="p-8 flex justify-between items-center hover:bg-slate-50 transition-colors">
            <div>
              <p className="text-[11px] font-black text-slate-900 uppercase">{o.userEmail}</p>
              <p className="text-[9px] font-mono text-slate-400 mt-1 uppercase">ID: {o.id}</p>
            </div>
            <div className="flex items-center gap-12">
              <p className="text-sm font-black text-slate-900">R {o.totalAmount?.toLocaleString()}</p>
              <select 
                value={o.status || 'Pending'} 
                onChange={(e) => updateStatus(o.id, e.target.value)}
                className="text-[9px] font-black uppercase tracking-widest bg-slate-100 border-none px-4 py-2 outline-none"
              >
                <option value="Pending">Pending</option>
                <option value="Shipped">Shipped</option>
                <option value="Complete">Complete</option>
                <option value="Cancelled">Cancelled</option>
              </select>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}