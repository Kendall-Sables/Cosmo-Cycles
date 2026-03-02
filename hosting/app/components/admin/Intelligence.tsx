'use client';

interface IntelligenceProps {
  orders: any[];
  products: any[];
}

export default function Intelligence({ orders, products }: IntelligenceProps) {
  
  // --- 1. FINANCIAL REPORTING LOGIC ---
  const totalRevenue = orders.reduce((sum, o) => sum + (o.totalAmount || 0), 0);
  
  // Calculate COGS (Cost of Goods Sold) by matching order items to product costPrice
  const totalCOGS = orders.reduce((sum, o) => {
    const product = products.find(p => p.id === o.productId);
    const cost = product?.costPrice || 0;
    return sum + cost;
  }, 0);
  
  const grossProfit = totalRevenue - totalCOGS;
  const profitMargin = totalRevenue > 0 ? (grossProfit / totalRevenue) * 100 : 0;

  // --- 2. PRODUCT REPORTING LOGIC (ENHANCED) ---
  const salesByCategory = orders.reduce((acc: any, o) => {
    const product = products.find(p => p.id === o.productId);
    // Use product category, or fallback to the category saved in the order
    const cat = product?.category || o.category || 'Legacy/Test';
    acc[cat] = (acc[cat] || 0) + 1;
    return acc;
  }, {});

  const salesByProduct = orders.reduce((acc: any, o) => {
    const product = products.find(p => p.id === o.productId);
    // Use product name, or fallback to the productName saved in the order
    const name = product?.name || o.productName || 'Manual Entry';
    acc[name] = (acc[name] || 0) + 1;
    return acc;
  }, {});

  const bestSeller = Object.entries(salesByProduct).sort((a: any, b: any) => b[1] - a[1])[0] as [string, number] | undefined;

  // --- 3. CUSTOMER REPORTING LOGIC ---
  const customerStats = orders.reduce((acc: any, o) => {
    const email = o.userEmail || 'Guest';
    if (!acc[email]) acc[email] = { total: 0, count: 0 };
    acc[email].total += (o.totalAmount || 0);
    acc[email].count += 1;
    return acc;
  }, {});

  const topCustomers = Object.entries(customerStats)
    .sort((a: any, b: any) => b[1].total - a[1].total)
    .slice(0, 3);

  return (
    <div className="space-y-16 animate-in fade-in duration-1000">
      
      {/* HEADER */}
      <div className="border-b border-slate-100 pb-8">
        <h2 className="text-5xl font-black uppercase tracking-tighter text-slate-900">
          Strategic<br/>Intelligence<span className="text-emerald-500">.</span>
        </h2>
        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.4em] mt-4">Automated Analytical Manifest</p>
      </div>

      {/* 1. FINANCIAL REPORT */}
      <section>
        <div className="flex items-center gap-4 mb-8">
          <span className="text-[10px] font-black text-white bg-slate-900 px-3 py-1">01</span>
          <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-900">Financial Performance</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-1 bg-slate-100 border border-slate-100">
          <div className="bg-white p-10">
            <p className="text-[9px] font-black text-slate-400 uppercase mb-2">Total Revenue</p>
            <p className="text-3xl font-black text-slate-900">R {totalRevenue.toLocaleString()}</p>
          </div>
          <div className="bg-white p-10">
            <p className="text-[9px] font-black text-slate-400 uppercase mb-2">Cost of Sales</p>
            <p className="text-3xl font-black text-slate-900">R {totalCOGS.toLocaleString()}</p>
          </div>
          <div className="bg-white p-10">
            <p className="text-[9px] font-black text-emerald-500 uppercase mb-2">Net Profit</p>
            <p className="text-3xl font-black text-emerald-600">R {grossProfit.toLocaleString()}</p>
          </div>
          <div className="bg-slate-900 p-10">
            <p className="text-[9px] font-black text-emerald-400 uppercase mb-2">Margin</p>
            <p className="text-3xl font-black text-white">{profitMargin.toFixed(1)}%</p>
          </div>
        </div>
      </section>

      {/* 2. PRODUCT REPORT */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-12">
        <div>
          <div className="flex items-center gap-4 mb-8">
            <span className="text-[10px] font-black text-white bg-slate-900 px-3 py-1">02</span>
            <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-900">Product Analysis</h3>
          </div>
          <div className="border border-slate-100 p-8 space-y-6">
            <div>
              <p className="text-[9px] font-black text-slate-400 uppercase mb-4">Top Performing Machine</p>
              {bestSeller ? (
                <div className="flex justify-between items-end">
                  <p className="text-xl font-black uppercase text-slate-900">{bestSeller[0]}</p>
                  <p className="text-[10px] font-black text-emerald-500">
                    {bestSeller[1]} {bestSeller[1] === 1 ? 'UNIT' : 'UNITS'} SOLD
                  </p>
                </div>
              ) : <p className="text-slate-300 italic">No sales data recorded.</p>}
            </div>
            <div className="pt-6 border-t border-slate-50">
              <p className="text-[9px] font-black text-slate-400 uppercase mb-4">Category Volume</p>
              {Object.entries(salesByCategory).map(([cat, count]: any) => (
                <div key={cat} className="flex justify-between py-2 border-b border-slate-50">
                  <span className="text-[10px] font-bold uppercase text-slate-600">{cat}</span>
                  <span className="text-[10px] font-black text-slate-900">{count}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 3. CUSTOMER REPORT */}
        <div>
          <div className="flex items-center gap-4 mb-8">
            <span className="text-[10px] font-black text-white bg-slate-900 px-3 py-1">03</span>
            <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-900">Customer Intelligence</h3>
          </div>
          <div className="bg-slate-50 p-8">
            <p className="text-[9px] font-black text-slate-400 uppercase mb-6">High-Value Pilots</p>
            <div className="space-y-4">
              {topCustomers.length > 0 ? topCustomers.map(([email, stats]: any) => (
                <div key={email} className="bg-white p-4 border border-slate-200 flex justify-between items-center">
                  <div>
                    <p className="text-[10px] font-black text-slate-900 uppercase truncate w-40">{email}</p>
                    <p className="text-[8px] font-bold text-slate-400 uppercase tracking-widest">{stats.count} Orders</p>
                  </div>
                  <p className="text-xs font-black text-emerald-600">R {stats.total.toLocaleString()}</p>
                </div>
              )) : <p className="text-slate-300 italic">Awaiting customer acquisition...</p>}
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}