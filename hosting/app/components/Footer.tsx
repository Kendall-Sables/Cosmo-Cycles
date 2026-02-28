export default function Footer() {
  return (
    <footer className="bg-emerald-950 text-white py-20 px-6 border-t border-emerald-900">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
        <div className="col-span-1 md:col-span-2">
          <h3 className="text-2xl font-black tracking-tighter mb-4 italic">COSMO CYCLES</h3>
          <p className="text-emerald-200/60 max-w-sm text-sm leading-loose">
            Engineering the finest racing machines in the quadrant. From the carbon layup to the final bolt, we define performance.
          </p>
        </div>
        <div>
          <h4 className="font-bold text-xs uppercase tracking-[0.2em] mb-6 text-emerald-400">The Fleet</h4>
          <ul className="text-sm space-y-4 text-emerald-100/80">
            <li className="hover:text-white cursor-pointer transition">Road Performance</li>
            <li className="hover:text-white cursor-pointer transition">Mountain Discovery</li>
            <li className="hover:text-white cursor-pointer transition">Electric Orbit</li>
          </ul>
        </div>
        <div>
          <h4 className="font-bold text-xs uppercase tracking-[0.2em] mb-6 text-emerald-400">Support</h4>
          <ul className="text-sm space-y-4 text-emerald-100/80">
            <li className="hover:text-white cursor-pointer transition">Technical Lab</li>
            <li className="hover:text-white cursor-pointer transition">Find a Dealer</li>
            <li className="hover:text-white cursor-pointer transition">Sizing Guide</li>
          </ul>
        </div>
      </div>
      <div className="max-w-7xl mx-auto mt-20 pt-8 border-t border-emerald-900 text-[10px] uppercase tracking-widest text-emerald-500/50">
        © 2026 Cosmo Cycles. All rights reserved. Precision engineered.
      </div>
    </footer>
  );
}