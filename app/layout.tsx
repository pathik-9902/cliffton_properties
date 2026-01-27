import Footer from '@/components/layout/Footer';
import Navbar from '@/components/layout/Navbar';
import './globals.css';

export const metadata = {
  title: 'Cliffton Group | Premium Real Estate',
  description:
    'Residential, Commercial, Industrial and Land properties for Rent and Sale',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-[#F4E9DD] text-[#0F0F0F] antialiased">
        <Navbar />

        <main className="max-w-7xl mx-auto px-6 md:px-12 py-12">
          {children}
        </main>

        <Footer/>
      </body>
    </html>
  );
}
