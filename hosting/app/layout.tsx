import './globals.css';
import { Inter } from 'next/font/google';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

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
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}