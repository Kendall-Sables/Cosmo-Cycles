'use client';
import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { 
  getFirestore, 
  collection, 
  query, 
  where, 
  getDocs, 
  orderBy 
} from 'firebase/firestore';
import { app } from '../firebase';
import Link from 'next/link';

export default function OrderHistory() {
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const db = getFirestore(app);

  useEffect(() => {
    async function fetchOrders() {
      if (!user) return;
      try {
        const q = query(
          collection(db, 'orders'),
          where('userEmail', '==', user.email)
          // Note: If this crashes, remove the orderBy line below until you click the Firebase Index link in your console
          , orderBy('orderedAt', 'desc') 
        );
        const querySnapshot = await getDocs(q);
        const ordersData = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setOrders(ordersData);
      } catch (error) {
        console.error("Error fetching history:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchOrders();
  }, [user, db]);

  if (loading) return <div className="pt-40 text-center font-black animate-pulse text-slate-300 uppercase tracking-widest">Accessing Archives...</div>;

  return (
    <div className="bg-white min-h-screen pt-32 pb-40 px-10 md:px-20">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-6xl font-black uppercase tracking-tighter text-slate-900 mb-16">
          Acquisitions<span className="text-emerald-600">.</span>
        </h1>

        {orders.length === 0 ? (
          <div className="border border-slate-100 p-20 text-center">
            <p className="text-slate-400 uppercase tracking-widest text-[10px] mb-8 font-bold">Your manifest is empty.</p>
            <Link href="/shop" className="bg-emerald-950 text-white px-10 py-4 text-[10px] font-black uppercase tracking-widest">
              Browse the Fleet
            </Link>
          </div>
        ) : (
          <div className="space-y-12">
            {orders.map((order) => (
              <div key={order.id} className="border-l-4 border-emerald-500 bg-slate-50/50 p-10 relative">
                <div className="flex justify-between items-start mb-10">
                  <div>
                    <p className="text-[9px] font-black text-slate-400 uppercase tracking-[0.3em] mb-2">Transaction ID</p>
                    <p className="text-xs font-mono font-bold text-slate-600 uppercase">{order.id}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-[9px] font-black text-slate-400 uppercase tracking-[0.3em] mb-2">Status</p>
                    <span className="bg-slate-900 text-white text-[9px] font-black px-4 py-1.5 uppercase tracking-widest">
                      {order.status || 'Processing'}
                    </span>
                  </div>
                </div>

                <div className="space-y-6 mb-10">
                  {order.items?.map((item: any, idx: number) => (
                    <div key={idx} className="flex justify-between items-center">
                      <div className="flex items-center gap-6">
                        <div className="w-16 h-16 bg-white border border-slate-100 p-2 flex items-center justify-center">
                          <img src={item.image} className="w-full h-full object-contain" alt="" />
                        </div>
                        <div>
                          <p className="text-sm font-black uppercase tracking-tight text-slate-900">{item.name}</p>
                          <p className="text-[9px] text-slate-400 font-bold uppercase tracking-widest">Qty: {item.quantity} | Size: {item.size}</p>
                        </div>
                      </div>
                      <p className="text-sm font-black text-slate-900">R{Number(item.price).toLocaleString()}</p>
                    </div>
                  ))}
                </div>

                <div className="pt-8 border-t border-slate-200 flex justify-between items-end">
                  <p className="text-[10px] text-slate-400 uppercase font-black tracking-widest">
                    Log Date: {order.orderedAt?.toDate().toLocaleDateString()}
                  </p>
                  <div className="text-right">
                    <p className="text-[9px] text-slate-400 uppercase font-black tracking-widest mb-1">Total Investment</p>
                    <p className="text-3xl font-black text-slate-900 leading-none">R{order.totalAmount?.toLocaleString()}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}