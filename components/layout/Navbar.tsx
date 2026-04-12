'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { Menu, X } from 'lucide-react';

// ---------------- TYPES ----------------
type NavItem = {
  label: string;
  href?: string;
  children?: { label: string; href: string }[];
};

const NAV_ITEMS: NavItem[] = [
  { label: 'Home', href: '/' },
  { label: 'About Us', href: '/about' },
  { label: 'Residential', href: '/properties/residential' },
  { label: 'Commercial', href: '/properties/commercial' },
  { label: 'Land', href: '/properties/land' },
  { label: 'Contact Us', href: '/contact' },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [mobileOpen]);

  return (
    <header className="sticky top-0 z-[100] bg-white border-b border-[#E8E2DA]/50 transition-all duration-300 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 py-4 flex items-center justify-between relative z-[101]">

        {/* LOGO */}
        <Link href="/" className="flex items-center group">
          <Image
            src="/logo_final.png"
            alt="Cliffton Properties"
            width={160}
            height={46}
            className="h-8 w-auto sm:h-9 transition-transform duration-300 group-hover:scale-105"
            priority
          />
        </Link>

        {/* DESKTOP NAV */}
        <nav className="hidden lg:flex items-center gap-10">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.label}
              href={item.href!}
              className={`text-[13px] uppercase tracking-widest font-semibold transition-colors
                ${pathname === item.href 
                  ? 'text-[#C9A24D]' 
                  : 'text-[#1F1F1F] hover:text-[#C9A24D]'
                }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* CTA */}
        <div className="hidden lg:block">
          <Link
            href="/want-to-list"
            className="bg-[#1F1F1F] text-white px-7 py-3 rounded-2xl text-xs uppercase tracking-widest font-bold hover:bg-[#C9A24D] transition-all duration-300 shadow-sm"
          >
            List Property
          </Link>
        </div>

        {/* MOBILE TOGGLE */}
        <button
          aria-label="Toggle menu"
          aria-expanded={mobileOpen}
          className="lg:hidden p-2 text-[#1F1F1F] hover:text-[#C9A24D] transition-colors"
          onClick={() => setMobileOpen((prev) => !prev)}
        >
          {mobileOpen ? <X size={26} /> : <Menu size={26} />}
        </button>
      </div>

      {/* MOBILE MENU OVERLAY - SOLID & FORCED TOP ZONE */}
      <div
        className={`fixed inset-0 top-0 left-0 w-full h-[100dvh] bg-white z-[100] lg:hidden transition-transform duration-500 ease-in-out
          ${mobileOpen ? 'translate-y-0' : '-translate-y-full'}`}
      >
        <div className="flex flex-col h-full pt-32 px-8 pb-12 relative z-[101] overflow-y-auto">
          <nav className="flex flex-col gap-6">
            {NAV_ITEMS.map((item, idx) => (
              <Link
                key={item.label}
                href={item.href!}
                className={`text-4xl font-bold transition-all duration-500 transform
                  ${mobileOpen ? 'translate-x-0 opacity-100' : '-translate-x-8 opacity-0'}`}
                style={{ transitionDelay: `${mobileOpen ? idx * 50 : 0}ms` }}
                onClick={() => setMobileOpen(false)}
              >
                <span className={pathname === item.href ? 'text-[#C9A24D]' : 'text-[#1F1F1F]'}>
                  {item.label}
                </span>
              </Link>
            ))}
          </nav>

          <div className={`mt-auto pt-10 transition-all duration-700 delay-300 transform
            ${mobileOpen ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'}`}>
            <Link
              href="/want-to-list"
              className="block w-full text-center bg-[#C9A24D] text-white py-5 rounded-3xl font-bold uppercase tracking-widest text-sm shadow-xl active:scale-95 transition-all"
              onClick={() => setMobileOpen(false)}
            >
              List Property
            </Link>
            
            <p className="text-center mt-8 text-[#6B6B6B] text-[10px] uppercase tracking-[0.3em] font-bold opacity-40">
              © 2024 Cliffton Properties
            </p>
          </div>
        </div>
      </div>
    </header>
  );
}