'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';

type NavItem = {
  label: string;
  href?: string;
  children?: { label: string; href: string }[];
};

const NAV_ITEMS: NavItem[] = [
  { label: 'Home', href: '/' },
  { label: 'About Us', href: '/about' },
  {
    label: 'Residential',
    children: [
      { label: 'Rent', href: '/properties/residential/listing/rent' },
      { label: 'Sale', href: '/properties/residential/listing/sale' },
    ],
  },
  {
    label: 'Commercial',
    children: [
      { label: 'Rent', href: '/properties/commercial/listing/rent' },
      { label: 'Sale', href: '/properties/commercial/listing/sale' },
    ],
  },
  {
    label: 'Land',
    children: [
      { label: 'Rent', href: '/properties/land/listing/rent' },
      { label: 'Sale', href: '/properties/land/listing/sale' },
    ],
  },
  { label: 'Want to List', href: '/want-to-list' },
  { label: 'Contact Us', href: '/contact' },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileSubmenu, setMobileSubmenu] = useState<string | null>(null);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  const pathname = usePathname();

  // Close menu on route change
  useEffect(() => {
    setMobileOpen(false);
    setMobileSubmenu(null);
  }, [pathname]);

  // Lock background scroll
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : 'auto';
  }, [mobileOpen]);

  return (
    <header className="sticky top-0 z-50 backdrop-blur-xl bg-[#F4EFE9]/80 border-b border-[#E8E2DA]">

      <div className="max-w-7xl mx-auto px-6 md:px-12 py-4 flex items-center justify-between">

        {/* LOGO */}
        <Link href="/" className="flex items-center">
          <Image
            src="/logo_final.png"
            alt="Cliffton Properties"
            width={140}
            height={40}
            style={{ width: 'auto', height: '30px' }}
            priority
          />
        </Link>

        {/* DESKTOP NAV */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium">

          {NAV_ITEMS.map((item) => (
            <div
              key={item.label}
              className="relative"
              onMouseEnter={() => setOpenDropdown(item.label)}
              onMouseLeave={() => setOpenDropdown(null)}
            >
              {item.href ? (
                <Link
                  href={item.href}
                  className="text-[#1F1F1F] hover:text-[#6B6B6B] transition"
                >
                  {item.label}
                </Link>
              ) : (
                <button className="text-[#1F1F1F] hover:text-[#6B6B6B] transition">
                  {item.label}
                </button>
              )}

              {/* DROPDOWN */}
              {item.children && (
                <div
                  className={`
                    absolute left-0 top-full mt-3
                    w-48 rounded-2xl
                    bg-white border border-[#E8E2DA]
                    shadow-lg
                    transition-all duration-300
                    ${openDropdown === item.label
                      ? 'opacity-100 visible translate-y-0'
                      : 'opacity-0 invisible translate-y-2'}
                  `}
                >
                  {item.children.map((child) => (
                    <Link
                      key={child.href}
                      href={child.href}
                      className="block px-5 py-3 text-sm text-[#6B6B6B] hover:bg-[#F4EFE9] hover:text-[#1F1F1F] transition"
                    >
                      {child.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}

        </nav>

        {/* CTA */}
        <div className="hidden md:block">
          <Link
            href="/want-to-list"
            className="bg-black text-white px-5 py-2 rounded-xl text-sm hover:opacity-90 transition"
          >
            List Property
          </Link>
        </div>

        {/* MOBILE TOGGLE */}
        <button
          aria-label="Toggle menu"
          aria-expanded={mobileOpen}
          className="md:hidden text-2xl"
          onClick={() => {
            setMobileOpen(!mobileOpen);
            setMobileSubmenu(null);
          }}
        >
          {mobileOpen ? '✕' : '☰'}
        </button>

      </div>

      {/* OVERLAY */}
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-black/30 z-40 md:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* MOBILE MENU */}
      <div
        className={`
          md:hidden border-t border-[#E8E2DA] bg-[#F4EFE9]
          overflow-hidden transition-all duration-300
          ${mobileOpen ? 'max-h-[600px] opacity-100' : 'max-h-0 opacity-0'}
        `}
      >
        <nav className="px-6 py-5 space-y-3">

          {NAV_ITEMS.map((item) => (
            <div key={item.label}>

              {item.children ? (
                <>
                  <button
                    className="w-full flex justify-between py-2 font-medium text-[#1F1F1F]"
                    onClick={() =>
                      setMobileSubmenu(prev =>
                        prev === item.label ? null : item.label
                      )
                    }
                  >
                    {item.label}
                    <span>
                      {mobileSubmenu === item.label ? '−' : '+'}
                    </span>
                  </button>

                  {mobileSubmenu === item.label && (
                    <div className="pl-4 space-y-2">
                      {item.children.map((child) => (
                        <Link
                          key={child.href}
                          href={child.href}
                          className="block text-sm text-[#6B6B6B] hover:text-[#1F1F1F]"
                          onClick={() => {
                            setMobileOpen(false);
                            setMobileSubmenu(null);
                          }}
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </>
              ) : (
                <Link
                  href={item.href!}
                  className="block py-2 font-medium text-[#1F1F1F]"
                  onClick={() => {
                    setMobileOpen(false);
                    setMobileSubmenu(null);
                  }}
                >
                  {item.label}
                </Link>
              )}

            </div>
          ))}

          {/* MOBILE CTA */}
          <div className="pt-4">
            <Link
              href="/want-to-list"
              className="block w-full text-center bg-black text-white py-3 rounded-xl text-sm"
              onClick={() => setMobileOpen(false)}
            >
              List Property
            </Link>
          </div>

        </nav>
      </div>

    </header>
  );
}