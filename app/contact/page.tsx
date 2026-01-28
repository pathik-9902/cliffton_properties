'use client';

import { useState } from 'react';

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
    <section className="max-w-6xl mx-auto px-6 py-20">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
        {/* LEFT */}
        <div>
          <p className="text-xs tracking-widest uppercase text-[#8b6f4e] font-bold mb-3">
            Clifton Group
          </p>

          <h1 className="text-4xl font-extrabold text-[#1f1f1f]">
            Speak with a Property Advisor
          </h1>

          <p className="mt-6 text-gray-600 max-w-lg">
            Discreet, tailored guidance for buying, selling, or listing
            premium real estate.
          </p>

          <div className="mt-10 space-y-3 text-sm text-gray-700">
            <p><strong>Email:</strong> query@clifftonproperties.com</p>
            <p><strong>Location:</strong> Surat, Gujarat</p>
            <p><strong>Hours:</strong> Mon – Sat, 10:00 AM – 7:00 PM</p>
          </div>
        </div>

        {/* RIGHT */}
        <div className="bg-white border border-[#eee5db] rounded-2xl p-8 shadow-sm">
          <form onSubmit={handleSubmit} className="space-y-6">
            <Field label="Full Name" name="name" required />
            <Field label="Email Address" name="email" type="email" required />

            <div>
              <label className="text-xs font-bold uppercase text-gray-500">
                Message
              </label>
              <textarea
                name="message"
                required
                rows={4}
                className="mt-2 w-full border border-[#e7dccf] p-3 rounded-lg focus:ring-2 focus:ring-[#c6a15b]"
                placeholder="Tell us about your requirement…"
              />
            </div>

            <button
              disabled={loading}
              className="w-full bg-[#6f4e37] text-white py-3 rounded-xl font-bold hover:bg-[#5a3f2c] transition disabled:opacity-60"
            >
              {loading ? 'Sending…' : 'Submit Enquiry'}
            </button>

            {success && (
              <p className="text-sm text-emerald-600 font-semibold">
                Thank you. Our team will contact you shortly.
              </p>
            )}

            {error && (
              <p className="text-sm text-rose-600 font-semibold">
                {error}
              </p>
            )}
          </form>
        </div>
      </div>
    </section>
  );
}

/* ------------------ FIELD COMPONENT ------------------ */

function Field({
  label,
  ...props
}: React.InputHTMLAttributes<HTMLInputElement> & { label: string }) {
  return (
    <div>
      <label className="text-xs font-bold uppercase text-gray-500">
        {label}
      </label>
      <input
        {...props}
        className="mt-2 w-full border border-[#e7dccf] p-3 rounded-lg focus:ring-2 focus:ring-[#c6a15b]"
      />
    </div>
  );
}
