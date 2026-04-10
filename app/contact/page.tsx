'use client';

import { useState } from 'react';
import { Mail, MapPin, Clock } from 'lucide-react';

export default function ContactPage() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess(false);

    const formData = new FormData(e.currentTarget);

    const res = await fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: formData.get('name'),
        email: formData.get('email'),
        message: formData.get('message'),
      }),
    });

    const json = await res.json();
    setLoading(false);

    if (!res.ok) {
      setError(json.error || 'Something went wrong');
      return;
    }

    setSuccess(true);
    e.currentTarget.reset();
  };

  return (
    <main className="bg-[#F4EFE9] min-h-screen text-[#1F1F1F]">
      <section className="max-w-6xl mx-auto px-6 py-20">

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">

          {/* LEFT */}
          <div className="space-y-8">

            <div>
              <p className="text-xs tracking-widest uppercase text-[#C9A24D] font-medium mb-3">
                Clifton Properties
              </p>

              <h1 className="text-4xl sm:text-5xl font-semibold leading-tight">
                Speak with a Property Advisor
              </h1>

              <p className="mt-6 text-[#6B6B6B] max-w-lg">
                Discreet, tailored guidance for buying, selling, or listing
                premium real estate.
              </p>
            </div>

            {/* CONTACT INFO */}
            <div className="space-y-4 text-sm">

              <InfoRow icon={<Mail size={16} />} text="query@clifftonproperties.com" />
              <InfoRow icon={<MapPin size={16} />} text="Surat, Gujarat" />
              <InfoRow icon={<Clock size={16} />} text="Mon – Sat, 10:00 AM – 7:00 PM" />

            </div>

            {/* TRUST BLOCK */}
            <div className="bg-[#C9A24D]/5 border border-[#C9A24D]/30 rounded-2xl p-5 text-sm text-[#1F1F1F]/80 shadow-sm flex items-start gap-4">
              <div className="mt-1 w-2 h-2 rounded-full bg-[#C9A24D] animate-pulse" />
              <div>
                <p className="font-medium text-[#1F1F1F] mb-1">Premium Advisory</p>
                <p>We typically respond to inquiries within <span className="font-semibold text-[#1F1F1F]">24 hours</span>.</p>
              </div>
            </div>

          </div>

          {/* RIGHT */}
          <div className="relative">

            {/* subtle gradient */}
            <div className="absolute inset-0 bg-gradient-to-tr from-[#C9A24D]/10 via-transparent to-transparent rounded-3xl pointer-events-none" />

            <div className="relative z-10 bg-white border border-[#E8E2DA] rounded-3xl p-8 sm:p-10 shadow-xl shadow-[#1F1F1F]/5">

              <form onSubmit={handleSubmit} className="space-y-6">

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <Field label="Full Name" name="name" required />
                  <Field label="Email Address" type="email" name="email" required />
                </div>

                {/* MESSAGE */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-[#1F1F1F]">
                    Message
                  </label>

                  <textarea
                    name="message"
                    required
                    rows={4}
                    placeholder="Tell us about your requirement…"
                    className="w-full rounded-2xl border border-[#E8E2DA] bg-[#F8F6F2] px-5 py-4 text-sm focus:outline-none focus:ring-2 focus:ring-[#C9A24D]/50 focus:border-[#C9A24D]/50 transition-all duration-300"
                  />
                </div>

                {/* CTA */}
                <button
                  disabled={loading}
                  className="w-full focus:outline-none bg-[#1F1F1F] text-white py-4 rounded-2xl text-sm font-bold uppercase tracking-wider transition-all duration-300 hover:-translate-y-1 hover:bg-[#C9A24D] hover:shadow-lg disabled:opacity-60 disabled:hover:translate-y-0"
                >
                  {loading ? 'Sending…' : 'Submit Enquiry'}
                </button>

                {/* FEEDBACK */}
                {success && (
                  <div className="bg-[#F4EFE9] border border-[#E8E2DA] text-[#22C55E] text-sm p-3 rounded-xl">
                    Thank you. Our team will contact you shortly.
                  </div>
                )}

                {error && (
                  <div className="bg-[#F4EFE9] border border-[#E8E2DA] text-red-500 text-sm p-3 rounded-xl">
                    {error}
                  </div>
                )}

              </form>

            </div>
          </div>

        </div>

      </section>
    </main>
  );
}

/* ---------------- FIELD ---------------- */

function Field({
  label,
  ...props
}: React.InputHTMLAttributes<HTMLInputElement> & { label: string }) {
  return (
    <div className="space-y-2">
      <label className="text-sm font-medium text-[#1F1F1F]">
        {label}
      </label>

      <input
        {...props}
        className="w-full rounded-2xl border border-[#E8E2DA] bg-[#F8F6F2] px-5 py-4 text-sm focus:outline-none focus:ring-2 focus:ring-[#C9A24D]/50 focus:border-[#C9A24D]/50 transition-all duration-300"
      />
    </div>
  );
}

/* ---------------- INFO ROW ---------------- */

function InfoRow({
  icon,
  text,
}: {
  icon: React.ReactNode;
  text: string;
}) {
  return (
    <div className="flex items-center gap-3 text-[#6B6B6B]">
      <span className="text-[#C9A24D]">{icon}</span>
      <span>{text}</span>
    </div>
  );
}