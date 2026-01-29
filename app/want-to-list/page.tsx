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
    <main className="bg-[#faf7f3] min-h-screen">
      <section className="mx-auto max-w-3xl px-6 py-20">
        {/* HEADER */}
        <div className="mb-10 text-center">
          <h1 className="text-4xl font-extrabold text-[#1f1f1f]">
            List Your Property
          </h1>
          <p className="mt-4 text-gray-600">
            Share your property details and our team will get in touch with you
            shortly.
          </p>
        </div>

        {/* FORM */}
        <form
          action="mailto:info@yourdomain.com"
          method="POST"
          encType="text/plain"
          className="rounded-2xl bg-white p-8 shadow-lg border border-[#eee5db]"
        >
          <div className="grid gap-6 sm:grid-cols-2">
            {/* NAME */}
            <Field
              label="Full Name"
              name="name"
              type="text"
              placeholder="John Doe"
              icon={<User />}
              required
            />

            {/* EMAIL */}
            <Field
              label="Email Address"
              name="email"
              type="email"
              placeholder="john@example.com"
              icon={<Mail />}
              required
            />

            {/* PHONE */}
            <Field
              label="Phone Number"
              name="phone"
              type="tel"
              placeholder="+91 98765 43210"
              icon={<Phone />}
              required
            />

            {/* PROPERTY TYPE */}
            <Field
              label="Property Type"
              name="property_type"
              type="text"
              placeholder="Residential / Commercial / Land"
              icon={<Home />}
              required
            />

            {/* LOCATION */}
            <Field
              label="Property Location"
              name="location"
              type="text"
              placeholder="Area, City"
              icon={<MapPin />}
              required
            />

            {/* PRICE */}
            <Field
              label="Expected Price / Rent"
              name="price"
              type="text"
              placeholder="₹50 Lakh / ₹30,000"
              icon={<Home />}
            />
          </div>

          {/* DESCRIPTION */}
          <div className="mt-6">
            <label className="mb-2 block text-sm font-semibold text-gray-700">
              Property Details
            </label>
            <div className="relative">
              <span className="absolute left-3 top-3 text-gray-400">
                <FileText className="h-4 w-4" />
              </span>
              <textarea
                name="details"
                rows={4}
                placeholder="Describe your property, size, rooms, amenities, possession, etc."
                className="w-full rounded-xl border border-[#e6ddcf] pl-10 pr-4 py-3 text-sm focus:border-[#6f4e37] focus:outline-none focus:ring-2 focus:ring-[#6f4e37]/20"
                required
              />
            </div>
          </div>

          {/* SUBMIT */}
          <div className="mt-8 flex justify-center">
            <button
              type="submit"
              className="group flex items-center gap-2 rounded-xl bg-[#6f4e37] px-8 py-3 font-bold text-white transition-all duration-300 hover:bg-[#5a3f2d]"
            >
              Submit Listing
              <Send className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </button>
          </div>

          {/* NOTE */}
          <p className="mt-6 text-center text-xs text-gray-500">
            By submitting this form, you agree to be contacted regarding your
            property listing.
          </p>
        </form>
      </section>
    </main>
  );
}

/* ================= FIELD COMPONENT ================= */

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
    <div>
      <label className="mb-2 block text-sm font-semibold text-gray-700">
        {label}
      </label>
      <div className="relative">
        <span className="absolute left-3 top-3 text-gray-400">
          {icon}
        </span>
        <input
          type={type}
          name={name}
          placeholder={placeholder}
          required={required}
          className="w-full rounded-xl border border-[#e6ddcf] pl-10 pr-4 py-3 text-sm focus:border-[#6f4e37] focus:outline-none focus:ring-2 focus:ring-[#6f4e37]/20"
        />
      </div>
    </div>
  );
}
