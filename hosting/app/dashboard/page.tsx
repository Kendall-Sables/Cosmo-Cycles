'use client';
import { useState, useEffect } from 'react';
import { getFirestore, collection, getDocs, updateDoc, doc, query, orderBy } from 'firebase/firestore';
import { app } from '../firebase';
import { AdminProtected } from '../components/AdminProtected';

export default function AdminDashboard() {
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const db = getFirestore(app);

  useEffect(() => {
    const fetchAllOrders = async () => {
      try {
        // Querying all orders, newest first
        const q = query(collection(db, 'orders'), orderBy('orderedAt', 'desc'));
        const snap = await getDocs(q);
        const data = snap.docs.map(d => ({ id: d.id, ...d.data() }));
        setOrders(data);
      } catch (err) {
        console.error("Error fetching orders:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchAllOrders();
  }, [db]);

  const updateStatus = async (orderId: string, newStatus: string) => {
    try {
      await updateDoc(doc(db, 'orders', orderId), { status: newStatus });
      setOrders(orders.map(o => o.id === orderId ? { ...o, status: newStatus } : o));
    } catch (err) {
      alert("Failed to update status.");
    }
  };

  const totalRevenue = orders.reduce((sum, order) => sum + (order.totalAmount || 0), 0);

  return (
    <AdminProtected>
      <div className="bg-slate-50 min-h-screen pt-32 pb-20 px-6 md:px-20">
        <div className="max-w-7xl mx-auto">
          
          {/* TOP BAR / STATS */}
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
            <div>
              <h1 className="text-6xl font-black uppercase tracking-tighter text-slate-900 leading-none">
                Command<span className="text-emerald-600">.</span>
              </h1>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.4em] mt-4">
                Operations & Global Order Manifest
              </p>
            </div>
            
            <div className="bg-white border border-slate-200 p-8 min-w-[320px] shadow-sm">
              <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">Lifetime Revenue</p>
              <p className="text-4xl font-black text-slate-900">R {totalRevenue.toLocaleString()}</p>
              <div className="w-full bg-slate-100 h-1 mt-4">
                <div className="bg-emerald-500 h-1 w-2/3"></div>
              </div>
            </div>
          </div>

          {/* ORDER MANIFEST TABLE */}
          <div className="bg-white border border-slate-200 shadow-sm overflow-hidden">
            <div className="grid grid-cols-12 bg-slate-900 text-white p-6 text-[10px] font-black uppercase tracking-widest">
              <div className="col-span-4">Customer Detail</div>
              <div className="col-span-3">Inventory Log</div>
              <div className="col-span-2">Value</div>
              <div className="col-span-3 text-right">Status Control</div>
            </div>

            <div className="divide-y divide-slate-100">
              {orders.map((order) => (
                <div key={order.id} className="grid grid-cols-12 p-8 items-center hover:bg-slate-50 transition-colors group">
                  <div className="col-span-4">
                    <p className="text-[11px] font-black text-slate-900 uppercase">{order.userEmail}</p>
                    <p className="text-[9px] font-mono text-slate-400 mt-1 uppercase tracking-tighter">REF: {order.id}</p>
                  </div>

                  <div className="col-span-3">
                    <p className="text-[11px] font-bold text-slate-600 uppercase tracking-tight">
                      {order.items?.length || 0} Machine(s)
                    </p>
                    <p className="text-[9px] text-slate-400 uppercase font-black tracking-tighter mt-1">
                      {order.orderedAt?.toDate().toLocaleDateString('en-ZA')}
                    </p>
                  </div>

                  <div className="col-span-2">
                    <p className="text-sm font-black text-slate-900">R {Number(order.totalAmount || 0).toLocaleString()}</p>
                  </div>

                  <div className="col-span-3 text-right">
                    <select 
                      value={order.status || 'Pending'}
                      onChange={(e) => updateStatus(order.id, e.target.value)}
                      className={`
                        text-[10px] font-black uppercase tracking-widest px-4 py-2 outline-none border-none cursor-pointer
                        ${order.status === 'Complete' ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-100 text-slate-900'}
                      `}
                    >
                      <option value="Pending">Pending</option>
                      <option value="Processing">Processing</option>
                      <option value="Shipped">Shipped</option>
                      <option value="Complete">Complete</option>
                      <option value="Cancelled">Cancelled</option>
                    </select>
                  </div>
                </div>
              ))}

              {orders.length === 0 && (
                <div className="p-32 text-center">
                  <p className="text-slate-300 uppercase text-[10px] font-black tracking-[0.5em]">No Data in Manifest</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </AdminProtected>
  );
}