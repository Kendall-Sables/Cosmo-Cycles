import './globals.css';
import { Inter } from 'next/font/google';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar'; // This imports your new Cosmo Navbar

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Cosmo Cycles | Precision Engineering',
  description: 'High-performance cycling for the modern athlete.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-white antialiased`}>
        <AuthProvider>
          {/* The Navbar lives here so it stays consistent on every page */}
          <Navbar />
          
          <main>
            {children}
          </main>

          {/* You can create a Footer.tsx in /components later and drop it here */}
          <footer className="bg-emerald-950 text-white py-12 px-6">
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
              <div>
                <h3 className="font-black tracking-tighter text-xl mb-4">COSMO CYCLES</h3>
                <p className="text-emerald-200 text-sm">Established 2026. Cape Town, SA.</p>
              </div>
              <div className="text-sm space-y-2">
                <p className="font-bold text-emerald-400">THE FLEET</p>
                <p>Road</p>
                <p>Gravel</p>
                <p>Electric</p>
              </div>
              <div className="text-sm">
                <p className="font-bold text-emerald-400 mb-2">NEWSLETTER</p>
                <input 
                  type="email" 
                  placeholder="Join the Pelotón" 
                  className="bg-emerald-900 border border-emerald-800 p-2 w-full rounded"
                />
              </div>
            </div>
          </footer>
        </AuthProvider>
      </body>
    </html>
  );
}