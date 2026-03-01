'use client';
import { useState } from 'react';
import { getFirestore, collection, addDoc, deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { app } from '../../firebase';

interface InventoryProps {
  products: any[];
  setProducts: (products: any[]) => void;
}

export default function Inventory({ products, setProducts }: InventoryProps) {
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  
  const initialFormState = {
    name: '', price: 0, category: 'road', level: 'beginner', brand: '', 
    material: '', weight: '', sizes: 'XS, S, M, L, XL', description: '', 
    longDescription: '', image: '', tags: ''
  };

  const [formData, setFormData] = useState(initialFormState);
  const db = getFirestore(app);

  const startEdit = (product: any) => {
    setEditingId(product.id);
    setIsAdding(true);
    setFormData({
      ...product,
      sizes: Array.isArray(product.sizes) ? product.sizes.join(', ') : product.sizes,
      tags: Array.isArray(product.tags) ? product.tags.join(', ') : product.tags,
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    const processedData = {
      ...formData,
      price: Number(formData.price),
      sizes: typeof formData.sizes === 'string' ? formData.sizes.split(',').map(s => s.trim().toUpperCase()) : formData.sizes,
      tags: typeof formData.tags === 'string' ? formData.tags.split(',').map(t => t.trim()) : formData.tags,
    };

    try {
      if (editingId) {
        await updateDoc(doc(db, 'products', editingId), processedData);
        setProducts(products.map(p => p.id === editingId ? { id: editingId, ...processedData } : p));
      } else {
        const docRef = await addDoc(collection(db, 'products'), processedData);
        setProducts([...products, { id: docRef.id, ...processedData }]);
      }
      setIsAdding(false);
      setEditingId(null);
      setFormData(initialFormState);
    } catch (err) {
      alert("Database synchronization failed.");
    }
  };

  return (
    <div className="animate-in fade-in duration-500">
      <div className="flex justify-between items-end mb-12">
        <div>
          <h2 className="text-6xl font-black uppercase tracking-tighter text-slate-900 leading-none">
            {editingId ? 'Edit' : 'Inventory'}<span className="text-emerald-500">.</span>
          </h2>
        </div>
        <button onClick={() => { setIsAdding(!isAdding); setEditingId(null); setFormData(initialFormState); }} className="bg-slate-900 text-white px-8 py-4 text-[10px] font-black uppercase tracking-[0.2em]">
          {isAdding ? 'Cancel' : '+ New Machine'}
        </button>
      </div>

      {isAdding && (
        <form onSubmit={handleSave} className="bg-slate-50 p-10 mb-12 border border-slate-200 grid grid-cols-1 md:grid-cols-3 gap-6 animate-in slide-in-from-top-4">
          
          {/* BASIC INFO */}
          <div className="md:col-span-2">
            <label className="text-[9px] font-black uppercase text-slate-400 block mb-1">Machine Name</label>
            <input required type="text" className="w-full p-4 border border-slate-200 outline-none focus:border-emerald-500" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} />
          </div>
          <div>
            <label className="text-[9px] font-black uppercase text-slate-400 block mb-1">Price (ZAR)</label>
            <input required type="number" className="w-full p-4 border border-slate-200 outline-none focus:border-emerald-500" value={formData.price} onChange={e => setFormData({...formData, price: Number(e.target.value)})} />
          </div>

          {/* TECHNICAL SPECS */}
          <div>
            <label className="text-[9px] font-black uppercase text-slate-400 block mb-1">Brand</label>
            <input required type="text" className="w-full p-4 border border-slate-200 outline-none" placeholder="Specialized" value={formData.brand} onChange={e => setFormData({...formData, brand: e.target.value})} />
          </div>
          <div>
            <label className="text-[9px] font-black uppercase text-slate-400 block mb-1">Material</label>
            <input required type="text" className="w-full p-4 border border-slate-200 outline-none" placeholder="Aluminum" value={formData.material} onChange={e => setFormData({...formData, material: e.target.value})} />
          </div>
          <div>
            <label className="text-[9px] font-black uppercase text-slate-400 block mb-1">Weight</label>
            <input required type="text" className="w-full p-4 border border-slate-200 outline-none" placeholder="9.6kg" value={formData.weight} onChange={e => setFormData({...formData, weight: e.target.value})} />
          </div>

          {/* DROPDOWNS & SIZES */}
          <div>
            <label className="text-[9px] font-black uppercase text-slate-400 block mb-1">Category</label>
            <select className="w-full p-4 border border-slate-200 bg-white font-bold text-[10px] uppercase outline-none" value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})}>
              <option value="road">Road</option>
              <option value="mountain">Mountain</option>
              <option value="gravel">Gravel</option>
            </select>
          </div>
          <div>
            <label className="text-[9px] font-black uppercase text-slate-400 block mb-1">Experience Level</label>
            <select className="w-full p-4 border border-slate-200 bg-white font-bold text-[10px] uppercase outline-none" value={formData.level} onChange={e => setFormData({...formData, level: e.target.value})}>
              <option value="beginner">Beginner</option>
              <option value="intermediate">Intermediate</option>
              <option value="advanced">Advanced</option>
            </select>
          </div>
          <div>
            <label className="text-[9px] font-black uppercase text-slate-400 block mb-1">Sizes (Comma Separated)</label>
            <input required type="text" className="w-full p-4 border border-slate-200 outline-none" value={formData.sizes} onChange={e => setFormData({...formData, sizes: e.target.value})} />
          </div>

          {/* TEXT CONTENT */}
          <div className="md:col-span-3">
            <label className="text-[9px] font-black uppercase text-slate-400 block mb-1">Card Description (Short)</label>
            <input required type="text" className="w-full p-4 border border-slate-200 outline-none" value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} />
          </div>
          <div className="md:col-span-3">
            <label className="text-[9px] font-black uppercase text-slate-400 block mb-1">Engineering Report (Long Description)</label>
            <textarea required rows={4} className="w-full p-4 border border-slate-200 outline-none resize-none" value={formData.longDescription} onChange={e => setFormData({...formData, longDescription: e.target.value})} />
          </div>

          {/* ASSETS & TAGS */}
          <div className="md:col-span-2">
            <label className="text-[9px] font-black uppercase text-slate-400 block mb-1">Cloudinary URL</label>
            <input required type="text" className="w-full p-4 border border-slate-200 outline-none" value={formData.image} onChange={e => setFormData({...formData, image: e.target.value})} />
          </div>
          <div>
            <label className="text-[9px] font-black uppercase text-slate-400 block mb-1">Free-hand Tags</label>
            <input type="text" className="w-full p-4 border border-slate-200 outline-none" placeholder="Aero, Carbon, 2026" value={formData.tags} onChange={e => setFormData({...formData, tags: e.target.value})} />
          </div>

          <button type="submit" className="w-full mt-4 md:col-span-3 bg-emerald-500 text-white py-6 font-black uppercase tracking-[0.4em] text-[10px] hover:bg-slate-900 transition-all">
            {editingId ? 'Update System Records' : 'Initialize Machine in Fleet'}
          </button>
        </form>
      )}

      {/* --- PRODUCT LIST --- */}
      <div className="space-y-4">
        {products.map(p => (
          <div key={p.id} className="bg-white border border-slate-100 p-6 flex justify-between items-center group hover:border-emerald-200 transition-all">
            <div className="flex items-center gap-8">
              <div className="w-20 h-14 bg-slate-50 p-2 flex items-center justify-center">
                <img src={p.image} className="max-w-full max-h-full object-contain" alt="" />
              </div>
              <div>
                <h4 className="text-[11px] font-black uppercase text-slate-900 leading-none">{p.name}</h4>
                <div className="flex gap-4 mt-2">
                  <p className="text-[9px] text-emerald-500 font-black uppercase tracking-tighter">{p.brand}</p>
                  <p className="text-[9px] text-slate-400 font-bold uppercase tracking-widest">R {p.price?.toLocaleString()}</p>
                </div>
              </div>
            </div>
            <div className="flex gap-6">
              <button onClick={() => startEdit(p)} className="text-[9px] font-black text-slate-300 hover:text-slate-900 uppercase tracking-widest transition-colors">Edit</button>
              <button onClick={() => { if(confirm("Delete?")) deleteDoc(doc(db, 'products', p.id)); }} className="text-[9px] font-black text-red-200 hover:text-red-600 uppercase tracking-widest transition-colors">Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}