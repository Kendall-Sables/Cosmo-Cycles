import './globals.css';
import { Inter } from 'next/font/google';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Cosmo Cycles | Elite Performance Fleet',
  description: 'Precision engineered bicycles for the modern cyclist. AI-powered matching and professional fleet management.',
  // This section tells the browser to use your new Green C logo
  icons: {
    icon: '/favicon.png',      // Standard tab icon
    shortcut: '/favicon.png',  // Shortcut icon
    apple: '/favicon.png',    // Icon for mobile bookmarks
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.className} bg-white antialiased text-slate-900`}>
        <AuthProvider>
          {/* Consistent Navbar across all pages */}
          <Navbar />
          
          {/* Main content area - min-h-screen ensures footer stays at bottom on short pages */}
          <main className="min-h-screen">
            {children}
          </main>

          {/* Consistent Footer across all pages */}
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}