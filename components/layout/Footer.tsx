'use client';

import Link from 'next/link';
import { Mail, Phone, MapPin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="mt-20 bg-gradient-to-b from-[#F4EFE9] to-[#EFE7DD] border-t border-[#E8E2DA] text-[#1F1F1F]">

      {/* TOP */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">

        {/* BRAND */}
        <div className="space-y-5">
          <h3 className="text-xl font-semibold tracking-tight">
            Cliffton Properties
          </h3>

          <p className="text-sm text-[#6B6B6B] leading-relaxed max-w-xs">
            Premium real estate advisory specializing in residential,
            commercial, industrial, and land investments.
          </p>

          {/* SOCIAL */}
          <div className="flex gap-4 pt-2">
            {['Facebook', 'Instagram', 'LinkedIn'].map((item) => (
              <div
                key={item}
                className="w-9 h-9 flex items-center justify-center rounded-full bg-white border border-[#E8E2DA] hover:bg-black hover:text-white transition cursor-pointer text-xs font-medium"
              >
                {item[0]}
              </div>
            ))}
          </div>
        </div>

        {/* COMPANY */}
        <div>
          <h4 className="text-sm font-semibold mb-5 tracking-wide uppercase text-[#4B4B4B]">
            Company
          </h4>

          <ul className="space-y-3 text-sm text-[#6B6B6B]">
            {[
              { label: 'About Us', href: '/about-us' },
              { label: 'List Property', href: '/want-to-list' },
              { label: 'Contact', href: '/contact-us' },
            ].map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="hover:text-[#1F1F1F] transition relative group"
                >
                  {item.label}
                  <span className="absolute left-0 -bottom-0.5 h-[1px] w-0 bg-black transition-all group-hover:w-full" />
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* PROPERTIES */}
        <div>
          <h4 className="text-sm font-semibold mb-5 tracking-wide uppercase text-[#4B4B4B]">
            Properties
          </h4>

          <ul className="space-y-3 text-sm text-[#6B6B6B]">
            {[
              { label: 'Residential', href: '/residential/sale' },
              { label: 'Commercial', href: '/commercial/sale' },
              { label: 'Industrial', href: '/industrial/sale' },
              { label: 'Land', href: '/land/sale' },
            ].map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="hover:text-[#1F1F1F] transition relative group"
                >
                  {item.label}
                  <span className="absolute left-0 -bottom-0.5 h-[1px] w-0 bg-black transition-all group-hover:w-full" />
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* CONTACT */}
        <div>
          <h4 className="text-sm font-semibold mb-5 tracking-wide uppercase text-[#4B4B4B]">
            Contact
          </h4>

          <div className="text-sm text-[#6B6B6B] space-y-4">

            <div className="flex items-start gap-3">
              <Mail className="w-4 h-4 mt-1 text-[#6B6B6B]" />
              <span>info.clifftonproperties@gmail.com</span>
            </div>

            <div className="flex items-start gap-3">
              <Phone className="w-4 h-4 mt-1 text-[#6B6B6B]" />
              <span>+91 XXXXX XXXXX</span>
            </div>

            <div className="flex items-start gap-3">
              <MapPin className="w-4 h-4 mt-1 text-[#6B6B6B]" />
              <span>Surat, Gujarat, India</span>
            </div>

          </div>
        </div>
      </div>

      {/* DIVIDER */}
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="h-px bg-gradient-to-r from-transparent via-[#E8E2DA] to-transparent" />
      </div>

      {/* BOTTOM */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#6B6B6B]">

        <p>
          © {new Date().getFullYear()} Cliffton Properties. All rights reserved.
        </p>

        <div className="flex items-center gap-6">
          <Link href="#" className="hover:text-[#1F1F1F] transition">
            Privacy Policy
          </Link>
          <Link href="#" className="hover:text-[#1F1F1F] transition">
            Terms & Conditions
          </Link>
        </div>

      </div>
    </footer>
  );
}