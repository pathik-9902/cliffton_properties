import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="mt-20 bg-[#F4EFE9] border-t border-[#E8E2DA] text-[#1F1F1F]">

      {/* TOP */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">

        {/* BRAND */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold tracking-tight">
            Cliffton Properties
          </h3>

          <p className="text-sm text-[#6B6B6B] leading-relaxed">
            Premium real estate advisory for residential, commercial,
            industrial, and land assets.
          </p>
        </div>

        {/* COMPANY */}
        <div>
          <h4 className="text-sm font-semibold mb-4">
            Company
          </h4>

          <ul className="space-y-3 text-sm text-[#6B6B6B]">
            <li>
              <Link
                href="/about-us"
                className="hover:text-[#1F1F1F] transition"
              >
                About Us
              </Link>
            </li>
            <li>
              <Link
                href="/want-to-list"
                className="hover:text-[#1F1F1F] transition"
              >
                Want to List
              </Link>
            </li>
            <li>
              <Link
                href="/contact-us"
                className="hover:text-[#1F1F1F] transition"
              >
                Contact
              </Link>
            </li>
          </ul>
        </div>

        {/* PROPERTIES */}
        <div>
          <h4 className="text-sm font-semibold mb-4">
            Properties
          </h4>

          <ul className="space-y-3 text-sm text-[#6B6B6B]">
            <li>
              <Link href="/residential/sale" className="hover:text-[#1F1F1F] transition">
                Residential
              </Link>
            </li>
            <li>
              <Link href="/commercial/sale" className="hover:text-[#1F1F1F] transition">
                Commercial
              </Link>
            </li>
            <li>
              <Link href="/industrial/sale" className="hover:text-[#1F1F1F] transition">
                Industrial
              </Link>
            </li>
            <li>
              <Link href="/land/sale" className="hover:text-[#1F1F1F] transition">
                Land
              </Link>
            </li>
          </ul>
        </div>

        {/* CONTACT */}
        <div>
          <h4 className="text-sm font-semibold mb-4">
            Contact
          </h4>

          <div className="text-sm text-[#6B6B6B] space-y-3">
            <p>
              info.clifftonproperties@gmail.com
            </p>
            <p>
              +91 XXXXX XXXXX
            </p>
          </div>
        </div>
      </div>

      {/* BOTTOM */}
      <div className="border-t border-[#E8E2DA]">
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#6B6B6B]">

          <p>
            © {new Date().getFullYear()} Cliffton Properties. All rights reserved.
          </p>

          <div className="flex items-center gap-6">
            <Link href="#" className="hover:text-[#1F1F1F] transition">
              Privacy
            </Link>
            <Link href="#" className="hover:text-[#1F1F1F] transition">
              Terms
            </Link>
          </div>

        </div>
      </div>

    </footer>
  );
}