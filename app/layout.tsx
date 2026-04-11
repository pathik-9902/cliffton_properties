import { Inter } from 'next/font/google';
import type { Metadata, Viewport } from 'next';
import Footer from '@/components/layout/Footer';
import Navbar from '@/components/layout/Navbar';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

export const metadata: Metadata = {
  title: 'Cliffton Properties',
  description:
    'Residential, Commercial, Industrial and Land properties for Rent and Sale in Surat.',
  icons: {
    icon: '/cliffton_logo.png',
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#F4EFE9',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${inter.variable} scroll-smooth`}
      data-scroll-behavior="smooth"
    >
      <body className="bg-[#F4EFE9] text-[#1F1F1F] font-sans antialiased">
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
