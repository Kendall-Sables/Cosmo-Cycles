'use client';
import { useState } from 'react';
import { getFirestore, collection, addDoc, deleteDoc, doc } from 'firebase/firestore';
import { app } from '../../firebase';

interface InventoryProps {
  products: any[];
  setProducts: (products: any[]) => void;
}

export default function Inventory({ products, setProducts }: InventoryProps) {
  const [isAdding, setIsAdding] = useState(false);
  const [newProduct, setNewProduct] = useState({
    name: '', price: 0, category: 'road', level: 'Beginner', brand: '', 
    material: '', weight: '', sizes: '', description: '', longDescription: '', image: '', tags: ''
  });
  
  const db = getFirestore(app);

  const handleAddProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    const productData = {
      ...newProduct,
      price: Number(newProduct.price),
      sizes: newProduct.sizes.split(',').map(s => s.trim().toUpperCase()),
      tags: newProduct.tags.split(',').map(t => t.trim()),
    };

    try {
      const docRef = await addDoc(collection(db, 'products'), productData);
      setProducts([...products, { id: docRef.id, ...productData }]);
      setIsAdding(false);
      setNewProduct({ name: '', price: 0, category: 'road', level: 'Beginner', brand: '', material: '', weight: '', sizes: '', description: '', longDescription: '', image: '', tags: '' });
    } catch (err) {
      alert("Database uplink failed.");
    }
  };

  const deleteProduct = async (id: string) => {
    if (confirm("Decommission this machine? This cannot be undone.")) {
      await deleteDoc(doc(db, 'products', id));
      setProducts(products.filter(p => p.id !== id));
    }
  };

  return (
    <div className="animate-in fade-in duration-500">
      <div className="flex justify-between items-end mb-12">
        <div>
          <h2 className="text-6xl font-black uppercase tracking-tighter text-slate-900 leading-none">Inventory<span className="text-emerald-500">.</span></h2>
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.4em] mt-4">Fleet Management & Archive</p>
        </div>
        <button 
          onClick={() => setIsAdding(!isAdding)}
          className="bg-slate-900 text-white px-8 py-4 text-[10px] font-black uppercase tracking-[0.2em] hover:bg-emerald-600 transition-all"
        >
          {isAdding ? 'Close Manifest' : '+ Add New Machine'}
        </button>
      </div>

      {isAdding && (
        <form onSubmit={handleAddProduct} className="bg-slate-50 p-10 mb-12 border border-slate-200 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2">
            <label className="text-[9px] font-black uppercase text-slate-400 block mb-2">Machine Name</label>
            <input required type="text" className="w-full p-4 border border-slate-200 outline-none focus:border-emerald-500" value={newProduct.name} onChange={e => setNewProduct({...newProduct, name: e.target.value})} />
          </div>
          <div>
            <label className="text-[9px] font-black uppercase text-slate-400 block mb-2">Price (ZAR)</label>
            <input required type="number" className="w-full p-4 border border-slate-200 outline-none focus:border-emerald-500" value={newProduct.price} onChange={e => setNewProduct({...newProduct, price: Number(e.target.value)})} />
          </div>
          {/* Add other fields here as needed following this pattern */}
          <div className="md:col-span-3">
            <label className="text-[9px] font-black uppercase text-slate-400 block mb-2">Technical Description</label>
            <textarea required rows={3} className="w-full p-4 border border-slate-200 outline-none" value={newProduct.longDescription} onChange={e => setNewProduct({...newProduct, longDescription: e.target.value})} />
          </div>
          <button type="submit" className="w-full mt-4 md:col-span-3 bg-emerald-500 text-white py-5 font-black uppercase tracking-[0.4em] text-[10px] hover:bg-slate-900 transition-all">
            Sync to Fleet
          </button>
        </form>
      )}

      <div className="space-y-4">
        {products.map(p => (
          <div key={p.id} className="bg-white border border-slate-100 p-6 flex justify-between items-center group hover:border-emerald-200 transition-all">
            <div className="flex items-center gap-8">
              <div className="w-20 h-14 bg-slate-50 p-2 flex items-center justify-center">
                <img src={p.image} className="max-w-full max-h-full object-contain" alt="" />
              </div>
              <div>
                <h4 className="text-sm font-black uppercase text-slate-900">{p.name}</h4>
                <p className="text-[9px] text-slate-400 font-bold uppercase tracking-widest">R {p.price?.toLocaleString()}</p>
              </div>
            </div>
            <button onClick={() => deleteProduct(p.id)} className="text-[9px] font-black text-red-300 hover:text-red-600 uppercase tracking-widest transition-colors">Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
}