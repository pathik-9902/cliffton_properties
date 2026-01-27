import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="border-t border-border bg-background mt-20">
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-12 grid md:grid-cols-4 gap-8 text-sm">
        {/* Brand */}
        <div>
          <h3 className="font-semibold text-lg">Cliffton Properties</h3>
          <p className="mt-3 text-muted">
            Premium real estate advisory for residential, commercial,
            industrial, and land assets.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="font-medium mb-3">Company</h4>
          <ul className="space-y-2 text-muted">
            <li><Link href="/about-us">About Us</Link></li>
            <li><Link href="/want-to-list">Want to List</Link></li>
            <li><Link href="/contact-us">Contact</Link></li>
          </ul>
        </div>

        {/* Property */}
        <div>
          <h4 className="font-medium mb-3">Properties</h4>
          <ul className="space-y-2 text-muted">
            <li><Link href="/residential/sale">Residential</Link></li>
            <li><Link href="/commercial/sale">Commercial</Link></li>
            <li><Link href="/industrial/sale">Industrial</Link></li>
            <li><Link href="/land/sale">Land</Link></li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h4 className="font-medium mb-3">Contact</h4>
          <p className="text-muted">
            Email: info.clifftonproperties@gmail.com <br />
            Phone: +91 XXXXX XXXXX
          </p>
        </div>
      </div>

      <div className="border-t border-border text-center py-4 text-xs text-muted">
        © {new Date().getFullYear()} Cliffton Properties. All rights reserved.
      </div>
    </footer>
  );
}
