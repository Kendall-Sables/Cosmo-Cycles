'use client';

interface IntelligenceProps {
  orders: any[];
  products: any[];
}

export default function Intelligence({ orders, products }: IntelligenceProps) {
  // Logic: Calculate Financial Metrics
  const totalRevenue = orders.reduce((sum, o) => sum + (o.totalAmount || 0), 0);
  const avgOrderValue = orders.length > 0 ? totalRevenue / orders.length : 0;
  
  // Logic: Calculate Inventory Metrics
  const totalStockValue = products.reduce((sum, p) => sum + (p.price || 0), 0);
  
  // Logic: Category Breakdown
  const categories = products.reduce((acc: any, p) => {
    acc[p.category] = (acc[p.category] || 0) + 1;
    return acc;
  }, {});

  return (
    <div className="animate-in fade-in duration-700">
      <h2 className="text-6xl font-black uppercase tracking-tighter text-slate-900 mb-12 leading-none">
        Intelligence<span className="text-emerald-500">.</span>
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        <div className="p-8 border border-slate-100 bg-white">
          <p className="text-[9px] font-black text-slate-400 uppercase tracking-[0.2em] mb-2">Gross Sales</p>
          <p className="text-3xl font-black text-slate-900">R {totalRevenue.toLocaleString()}</p>
        </div>
        <div className="p-8 border border-slate-100 bg-white">
          <p className="text-[9px] font-black text-slate-400 uppercase tracking-[0.2em] mb-2">Avg. Ticket</p>
          <p className="text-3xl font-black text-slate-900">R {Math.round(avgOrderValue).toLocaleString()}</p>
        </div>
        <div className="p-8 border border-slate-100 bg-white">
          <p className="text-[9px] font-black text-slate-400 uppercase tracking-[0.2em] mb-2">Fleet Worth</p>
          <p className="text-3xl font-black text-slate-900">R {totalStockValue.toLocaleString()}</p>
        </div>
        <div className="p-8 border border-slate-100 bg-white">
          <p className="text-[9px] font-black text-slate-400 uppercase tracking-[0.2em] mb-2">Active Orders</p>
          <p className="text-3xl font-black text-emerald-500">{orders.filter(o => o.status !== 'Complete').length}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Category Share */}
        <div className="p-10 bg-slate-900 text-white rounded-sm">
          <h3 className="text-[10px] font-black uppercase tracking-[0.3em] mb-8 text-emerald-400">Inventory Distribution</h3>
          <div className="space-y-6">
            {Object.entries(categories).map(([cat, count]: [string, any]) => {
              const percentage = (count / products.length) * 100;
              return (
                <div key={cat}>
                  <div className="flex justify-between text-[10px] font-black uppercase mb-2">
                    <span>{cat}</span>
                    <span>{count} Units</span>
                  </div>
                  <div className="w-full bg-slate-800 h-1">
                    <div 
                      className="bg-emerald-500 h-1 transition-all duration-1000" 
                      style={{ width: `${percentage}%` }}
                    ></div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Growth Insights */}
        <div className="p-10 border border-slate-100 flex flex-col justify-center">
          <h3 className="text-[10px] font-black uppercase tracking-[0.3em] mb-4 text-slate-400">Growth Protocol</h3>
          <p className="text-sm font-bold text-slate-600 leading-relaxed italic">
            "Based on the current manifest of {orders.length} transactions, the average machine is moving at R {Math.round(avgOrderValue).toLocaleString()}. Recommendation: Expand {Object.keys(categories)[0]} inventory to capture higher margin."
          </p>
        </div>
      </div>
    </div>
  );
}