'use client';
import { useState, useEffect } from 'react';
import { getFirestore, collection, getDocs, query, orderBy } from 'firebase/firestore';
import { app } from '../firebase';
import { AdminProtected } from '../components/AdminProtected';
import { useAuth } from '../context/AuthContext';

// We will create these files next
import Inventory from '../components/admin/Inventory';
import Orders from '../components/admin/Orders';
import Intelligence from '../components/admin/Intelligence';

export default function AdminDashboard() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('Overview');
  
  // Central Data State
  const [products, setProducts] = useState<any[]>([]);
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  
  const db = getFirestore(app);

  // Fetch all data once on load
  useEffect(() => {
    const fetchData = async () => {
      try {
        const pSnap = await getDocs(collection(db, 'products'));
        const oSnap = await getDocs(query(collection(db, 'orders'), orderBy('orderedAt', 'desc')));
        
        setProducts(pSnap.docs.map(d => ({ id: d.id, ...d.data() })));
        setOrders(oSnap.docs.map(d => ({ id: d.id, ...d.data() })));
      } catch (err) {
        console.error("Data fetch error:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [db]);

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <p className="text-[10px] font-black uppercase tracking-[0.5em] animate-pulse">Syncing Command Center...</p>
    </div>
  );

  return (
    <AdminProtected>
      <div className="flex min-h-screen bg-white">
        
        {/* --- LEFT SIDEBAR NAVIGATION --- */}
        <aside className="w-[300px] border-r border-slate-100 p-10 flex flex-col fixed h-full bg-white z-20">
          <div className="mb-16">
            <p className="text-[11px] font-black text-emerald-500 uppercase tracking-[0.5em] mb-1">Cosmo Admin</p>
            <div className="mt-6 p-4 bg-slate-50 border border-slate-100 rounded-sm">
              <p className="text-[10px] font-black uppercase text-slate-900 leading-none">System Root</p>
              <p className="text-[8px] font-bold text-slate-400 mt-2 uppercase truncate">{user?.email}</p>
            </div>
          </div>
          
          <nav className="space-y-2 flex-1">
            {['Overview', 'Inventory', 'Orders', 'Intelligence'].map((tab) => (
              <button 
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`w-full flex items-center px-4 py-4 text-[10px] font-black uppercase tracking-[0.2em] transition-all border-l-2 ${
                  activeTab === tab 
                    ? 'bg-slate-900 text-white border-emerald-500 ml-2' 
                    : 'text-slate-400 border-transparent hover:text-slate-900 hover:bg-slate-50'
                }`}
              >
                {tab === 'Orders' ? 'Order Manifest' : tab}
              </button>
            ))}
          </nav>

          <div className="pt-8 border-t border-slate-100">
            <button onClick={() => window.location.href = '/shop'} className="text-[9px] font-black uppercase tracking-widest text-slate-400 hover:text-emerald-500 transition-colors">
              Exit to Shop
            </button>
          </div>
        </aside>

        {/* --- MAIN CONTENT AREA --- */}
        <main className="flex-1 ml-[300px] p-20 bg-white min-h-screen">
          
          {/* 1. OVERVIEW (Quick Stats) */}
          {activeTab === 'Overview' && (
            <div className="animate-in fade-in duration-700">
              <h2 className="text-6xl font-black uppercase tracking-tighter mb-12 text-slate-900 leading-none">
                System<br/>Overview<span className="text-emerald-500">.</span>
              </h2>
              <div className="grid grid-cols-3 gap-8">
                <div className="border border-slate-100 p-10 shadow-sm">
                  <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-2">Fleet Total</p>
                  <p className="text-5xl font-black text-slate-900">{products.length}</p>
                </div>
                <div className="border border-slate-100 p-10 shadow-sm">
                  <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-2">Order Count</p>
                  <p className="text-5xl font-black text-slate-900">{orders.length}</p>
                </div>
                <div className="bg-slate-900 p-10 shadow-lg">
                  <p className="text-[9px] font-black text-emerald-400 uppercase tracking-widest mb-2">Total Revenue</p>
                  <p className="text-5xl font-black text-white">R {orders.reduce((a, b) => a + (b.totalAmount || 0), 0).toLocaleString()}</p>
                </div>
              </div>
            </div>
          )}

          {/* 2. INVENTORY TAB */}
          {activeTab === 'Inventory' && (
            <Inventory products={products} setProducts={setProducts} />
          )}

          {/* 3. ORDERS TAB */}
          {activeTab === 'Orders' && (
            <Orders orders={orders} setOrders={setOrders} />
          )}

          {/* 4. INTELLIGENCE TAB */}
          {activeTab === 'Intelligence' && (
            <Intelligence orders={orders} products={products} />
          )}

        </main>
      </div>
    </AdminProtected>
  );
}