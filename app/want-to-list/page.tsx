'use client';

import {
  User,
  Mail,
  Phone,
  Home,
  MapPin,
  FileText,
  Send,
} from 'lucide-react';

export default function WantToListPage() {
  return (
    <main className="bg-[#F4EFE9] min-h-screen text-[#1F1F1F]">
      <section className="mx-auto max-w-3xl px-6 py-20">

        {/* HEADER */}
        <div className="mb-12 text-center">
          <h1 className="text-4xl sm:text-5xl font-semibold tracking-tight">
            List Your Property
          </h1>

          <p className="mt-4 text-[#6B6B6B] text-sm sm:text-base max-w-xl mx-auto">
            Share your property details and our team will connect with you to
            get your listing live quickly.
          </p>
        </div>

        {/* FORM CARD */}
        <div className="relative">
          {/* subtle gradient */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#D8CBBE]/40 to-transparent rounded-3xl pointer-events-none" />

          <form
            action="mailto:info@yourdomain.com"
            method="POST"
            encType="text/plain"
            className="relative z-10 rounded-3xl bg-white border border-[#E8E2DA] p-8 sm:p-10 shadow-sm space-y-8"
          >

            {/* GRID */}
            <div className="grid gap-6 sm:grid-cols-2">

              <Field
                label="Full Name"
                name="name"
                type="text"
                placeholder="John Doe"
                icon={<User size={16} />}
                required
              />

              <Field
                label="Email Address"
                name="email"
                type="email"
                placeholder="john@example.com"
                icon={<Mail size={16} />}
                required
              />

              <Field
                label="Phone Number"
                name="phone"
                type="tel"
                placeholder="+91 98765 43210"
                icon={<Phone size={16} />}
                required
              />

              <Field
                label="Property Type"
                name="property_type"
                type="text"
                placeholder="Residential / Commercial / Land"
                icon={<Home size={16} />}
                required
              />

              <Field
                label="Property Location"
                name="location"
                type="text"
                placeholder="Area, City"
                icon={<MapPin size={16} />}
                required
              />

              <Field
                label="Expected Price / Rent"
                name="price"
                type="text"
                placeholder="₹50 Lakh / ₹30,000"
                icon={<Home size={16} />}
              />
            </div>

            {/* DESCRIPTION */}
            <div>
              <label className="mb-2 block text-sm font-medium text-[#1F1F1F]">
                Property Details
              </label>

              <div className="relative">
                <span className="absolute left-3 top-3 text-[#6B6B6B]">
                  <FileText size={16} />
                </span>

                <textarea
                  name="details"
                  rows={4}
                  placeholder="Describe your property, size, rooms, amenities, possession, etc."
                  className="w-full rounded-xl border border-[#E8E2DA] bg-[#F4EFE9] pl-10 pr-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#C9A24D]/30 transition"
                  required
                />
              </div>
            </div>

            {/* CTA */}
            <div className="pt-4 flex flex-col sm:flex-row gap-4 items-center justify-between">

              {/* trust note */}
              <p className="text-xs text-[#6B6B6B]">
                We usually respond within 24 hours.
              </p>

              <button
                type="submit"
                className="group flex items-center gap-2 rounded-2xl bg-black px-8 py-3 text-sm font-medium text-white transition-all duration-300 hover:opacity-90 hover:scale-[1.02]"
              >
                Submit Listing
                <Send className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </button>
            </div>

            {/* FOOTNOTE */}
            <p className="text-center text-xs text-[#6B6B6B]">
              By submitting, you agree to be contacted regarding your property.
            </p>

          </form>
        </div>
      </section>
    </main>
  );
}

/* ================= FIELD ================= */

function Field({
  label,
  name,
  type,
  placeholder,
  icon,
  required = false,
}: {
  label: string;
  name: string;
  type: string;
  placeholder: string;
  icon: React.ReactNode;
  required?: boolean;
}) {
  return (
    <div className="space-y-2">
      <label className="text-sm font-medium text-[#1F1F1F]">
        {label}
      </label>

      <div className="relative">
        <span className="absolute left-3 top-3 text-[#6B6B6B]">
          {icon}
        </span>

        <input
          type={type}
          name={name}
          placeholder={placeholder}
          required={required}
          className="w-full rounded-xl border border-[#E8E2DA] bg-[#F4EFE9] pl-10 pr-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#C9A24D]/30 transition"
        />
      </div>
    </div>
  );
}