"use client";
import React from 'react';

export default function ShopPage() {
  // We will replace this "mock" data with your Firebase data in the next step!
  const bikes = [
    { id: 1, name: "Cosmo Road-Star", price: 12000, category: "Road" },
    { id: 2, name: "Cosmo Mountain-X", price: 15500, category: "Mountain" },
    { id: 3, name: "Cosmo E-Glide", price: 22000, category: "Electric" },
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <header className="mb-12 text-center">
        <h1 className="text-5xl font-extrabold text-blue-900">Cosmo Cycles</h1>
        <p className="text-gray-600 mt-2">Premium rides for every galaxy.</p>
      </header>

      {/* Product Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {bikes.map((bike) => (
          <div key={bike.id} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition">
            <div className="w-full h-48 bg-gray-200 rounded-xl mb-4 flex items-center justify-center text-gray-400">
              Bike Image
            </div>
            <span className="text-xs font-bold text-blue-600 uppercase tracking-widest">{bike.category}</span>
            <h2 className="text-xl font-bold mt-1">{bike.name}</h2>
            <p className="text-2xl font-black text-gray-900 mt-4">R {bike.price.toLocaleString()}</p>
            <button className="w-full mt-6 bg-blue-600 text-white py-3 rounded-xl font-bold hover:bg-blue-700 transition">
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}