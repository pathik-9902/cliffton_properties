'use client';

import Link from 'next/link';
import { useState } from 'react';

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

  return (
    <header className="border-b border-[#E5D9CC] bg-[#F4E9DD] sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-4 flex items-center justify-between">

        {/* Logo */}
        <Link href="/" className="text-xl font-semibold">
          Cliffton Properties
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex gap-8 text-sm font-medium">
          {NAV_ITEMS.map((item) => (
            <div key={item.label} className="relative group">

              {item.href ? (
                <Link
                  href={item.href}
                  className="hover:text-[#6B6B6B] transition"
                >
                  {item.label}
                </Link>
              ) : (
                <button
                  className="hover:text-[#6B6B6B] transition"
                  aria-haspopup="menu"
                >
                  {item.label}
                </button>
              )}

              {/* Dropdown */}
              {item.children && (
                <div
                  className="
                    invisible opacity-0 translate-y-2
                    group-hover:visible group-hover:opacity-100 group-hover:translate-y-0
                    transition-all duration-200
                    absolute left-0 top-full
                    w-44 rounded-xl
                    border border-[#E5D9CC]
                    bg-white shadow-lg
                  "
                >
                  {item.children.map((child) => (
                    <Link
                      key={child.href}
                      href={child.href}
                      className="block px-4 py-3 text-sm hover:bg-[#F4E9DD]"
                    >
                      {child.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>

        {/* Mobile Toggle */}
        <button
          className="md:hidden text-2xl"
          onClick={() => {
            setMobileOpen(!mobileOpen);
            setMobileSubmenu(null);
          }}
          aria-label="Toggle Menu"
        >
          ☰
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden border-t border-[#E5D9CC] bg-[#F4E9DD] max-h-[80vh] overflow-y-auto">
          <nav className="px-6 py-4 space-y-2">

            {NAV_ITEMS.map((item) => (
              <div key={item.label}>

                {item.children ? (
                  <>
                    <button
                      className="w-full flex justify-between py-2 font-medium"
                      onClick={() =>
                        setMobileSubmenu(prev =>
                          prev === item.label ? null : item.label
                        )
                      }
                      aria-expanded={mobileSubmenu === item.label}
                    >
                      {item.label}
                      <span>
                        {mobileSubmenu === item.label ? '−' : '+'}
                      </span>
                    </button>

                    {mobileSubmenu === item.label && (
                      <div className="pl-4">
                        {item.children.map((child) => (
                          <Link
                            key={child.href}
                            href={child.href}
                            className="block py-2 text-sm text-[#6B6B6B]"
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
                    className="block py-2 font-medium"
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

          </nav>
        </div>
      )}
    </header>
  );
}