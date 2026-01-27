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
    label: 'Industrial',
    children: [
      { label: 'Rent', href: '/properties/industrial/listing/rent' },
      { label: 'Sale', href: '/properties/industrial/listing/sale' },
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
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileSubmenu, setMobileSubmenu] = useState<string | null>(null);

  return (
    <header className="border-b border-[#E5D9CC] bg-[#F4E9DD]">
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-4 flex items-center justify-between">
        <Link href="/" className="text-xl font-semibold">
          Cliffton Properties
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex gap-8 text-sm font-medium">
          {NAV_ITEMS.map((item) => (
            <div
              key={item.label}
              className="relative"
              onMouseEnter={() => setOpenMenu(item.label)}
              onMouseLeave={() => setOpenMenu(null)}
            >
              {item.href ? (
                <Link href={item.href} className="hover:text-[#6B6B6B]">
                  {item.label}
                </Link>
              ) : (
                <button className="hover:text-[#6B6B6B]">
                  {item.label}
                </button>
              )}

              {/* Desktop Dropdown — FIXED */}
              {item.children && openMenu === item.label && (
                <div
                  className="
                    absolute left-0 top-full
                    w-44
                    rounded-xl
                    border border-[#E5D9CC]
                    bg-white
                    shadow-lg
                    z-50
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
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          ☰
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden border-t border-[#E5D9CC] bg-[#F4E9DD]">
          <nav className="px-6 py-4 space-y-2">
            {NAV_ITEMS.map((item) => (
              <div key={item.label}>
                {item.children ? (
                  <>
                    <button
                      onClick={() =>
                        setMobileSubmenu(
                          mobileSubmenu === item.label ? null : item.label
                        )
                      }
                      className="w-full flex justify-between py-2 font-medium"
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
                            onClick={() => setMobileOpen(false)}
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
                    onClick={() => setMobileOpen(false)}
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
