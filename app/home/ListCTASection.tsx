'use client';

import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export default function ListCTASection() {
  return (
    <section className="bg-[#6f4e37]">
      <div className="mx-auto max-w-7xl px-6 py-24 text-center text-white">
        <h2 className="text-3xl font-bold sm:text-4xl">
          Own a Property? Let’s List It.
        </h2>

        <p className="mx-auto mt-4 max-w-xl text-white/90">
          Reach serious buyers and tenants faster.
        </p>

        <div className="mt-8 flex justify-center">
          <Link
            href="/want-to-list"
            className="inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3 font-bold text-[#6f4e37] hover:bg-[#ede3d5]"
          >
            List Your Property
            <ArrowRight className="h-5 w-5" />
          </Link>
        </div>
      </div>
    </section>
  );
}
