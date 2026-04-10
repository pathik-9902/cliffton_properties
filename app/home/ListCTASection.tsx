'use client';

import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export default function ListCTASection() {
  return (
    <section className="bg-gradient-to-r from-[#171717] to-[#262626] relative overflow-hidden">
      {/* Decorative background circle */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#C9A24D]/5 rounded-full blur-3xl pointer-events-none" />
      
      <div className="mx-auto max-w-7xl px-6 py-28 text-center text-white relative z-10">
        <h2 className="text-3xl font-extrabold sm:text-5xl tracking-tight">
          Own a Property? <span className="text-[#C9A24D]">Let’s List It.</span>
        </h2>

        <p className="mx-auto mt-6 max-w-2xl text-white/80 text-lg font-light leading-relaxed">
          Reach serious buyers and tenants faster with our premium advisory network.
        </p>

        <div className="mt-10 flex justify-center">
          <Link
            href="/want-to-list"
            className="inline-flex items-center gap-2 rounded-2xl bg-[#C9A24D] px-8 py-4 font-bold text-white shadow-xl hover:bg-white hover:text-[#1F1F1F] transition-all duration-300 hover:-translate-y-1"
          >
            List Your Property
            <ArrowRight className="h-5 w-5" />
          </Link>
        </div>
      </div>
    </section>
  );
}
