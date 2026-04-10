'use client';

import { ShieldCheck, Users, TrendingUp } from 'lucide-react';

type ItemType = {
  icon: React.ReactNode;
  title: string;
  text: string;
};

export default function TrustSection() {
  const items: ItemType[] = [
    {
      icon: <ShieldCheck />,
      title: 'Verified Listings',
      text: 'Every property is reviewed for accuracy.',
    },
    {
      icon: <Users />,
      title: 'Customer Focused',
      text: 'Built for buyers, renters, and investors.',
    },
    {
      icon: <TrendingUp />,
      title: 'Market Intelligence',
      text: 'Smart pricing powered by real data.',
    },
  ];

  return (
    <section className="bg-white">
      <div className="mx-auto max-w-7xl px-6 py-24">
        
        <h2 className="text-center text-3xl font-bold text-[#1f1f1f]">
          Why Choose Us
        </h2>

        <div className="mt-14 grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item) => (
            <Item key={item.title} {...item} />
          ))}
        </div>
      </div>
    </section>
  );
}

function Item({ icon, title, text }: ItemType) {
  return (
    <div className="text-center group transition-all duration-300 hover:-translate-y-2">
      
      <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-[#C9A24D]/10 text-[#C9A24D] group-hover:bg-[#C9A24D] group-hover:text-white transition-all duration-500 shadow-sm group-hover:shadow-md">
        {icon}
      </div>

      <h3 className="text-xl font-bold text-[#1f1f1f]">
        {title}
      </h3>

      <p className="mt-3 text-sm text-gray-500 leading-relaxed max-w-xs mx-auto">
        {text}
      </p>
    </div>
  );
}