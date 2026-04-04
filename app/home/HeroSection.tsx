'use client';

import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import PropertySearchModal from '@/components/property/ProopertySearchModal';

const CAROUSEL_SLIDES = [
  {
    image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=2075&auto=format&fit=crop',
    title: 'Discover Properties That\nMatch Your Ambition',
    description: 'Buy or rent verified residential, commercial, and land properties with confidence.',
  },
  {
    image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=2070&auto=format&fit=crop',
    title: 'Experience Unmatched\nLuxury Living',
    description: 'Find your dream home in the most exclusive and desirable neighborhoods.',
  },
  {
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2070&auto=format&fit=crop',
    title: 'Invest in the Future\nWith Prime Real Estate',
    description: 'Explore commercial and residential properties with high return on investment potential.',
  },
  {
    image: 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?q=80&w=2070&auto=format&fit=crop',
    title: 'Your Perfect Space\nAwaits You',
    description: 'Let us help you find the ideal architectural masterpiece that suits your lifestyle.',
  },
];

export default function HeroSection(): React.ReactNode {
  const [open, setOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const router = useRouter();

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => 
        (prevIndex + 1) % CAROUSEL_SLIDES.length
      );
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const handleSearch = (data: {
    type: string;
    category: string;
    city: string;
    area?: string;
  }) => {
    const { type, category, city, area } = data;

    let url = `/properties/${type}/listing/${category}?city=${city}`;

    if (area) {
      url += `&area=${area}`;
    }

    router.push(url);
  };

  return (
    <section className="relative overflow-hidden min-h-[600px] sm:min-h-[700px] flex items-center">
      {/* Background Images Carousel */}
      {CAROUSEL_SLIDES.map((slide, index) => (
        <div
          key={slide.image}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            index === currentImageIndex ? 'opacity-100' : 'opacity-0'
          }`}
          style={{
            backgroundImage: `url('${slide.image}')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
      ))}

      {/* Overlays for better text readability and styling */}
      <div className="absolute inset-0 bg-black/40 sm:bg-transparent sm:bg-gradient-to-r sm:from-black/80 sm:to-black/20" />
      <div className="absolute inset-0 bg-gradient-to-br from-[#6f4e37]/40 via-[#8b6f4e]/30 to-transparent mix-blend-multiply" />

      <div className="relative mx-auto w-full max-w-7xl px-6 py-28 text-white z-10 flex flex-col justify-center">
        <div className="relative min-h-[180px] sm:min-h-[220px] md:min-h-[240px] w-full flex items-center">
          {CAROUSEL_SLIDES.map((slide, index) => (
            <div 
              key={`text-${index}`}
              className={`absolute inset-0 transition-all duration-1000 ease-in-out flex flex-col justify-center ${
                index === currentImageIndex ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'
              }`}
            >
              <h1 className="max-w-3xl text-4xl font-extrabold leading-tight sm:text-5xl lg:text-6xl drop-shadow-md whitespace-pre-line">
                {slide.title}
              </h1>

              <p className="mt-4 sm:mt-6 max-w-2xl text-base sm:text-lg md:text-xl text-white/90 drop-shadow-md">
                {slide.description}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-15 sm:mt-10 flex flex-wrap gap-4 relative z-20">
          <button
            onClick={() => setOpen(true)}
            className="inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3 font-bold text-[#6f4e37] hover:bg-[#ede3d5]"
          >
            Browse Properties
            <ArrowRight className="h-5 w-5" />
          </button>

          <Link
            href="/want-to-list"
            className="inline-flex items-center gap-2 rounded-xl border border-white/40 px-6 py-3 font-bold text-white hover:bg-white/10"
          >
            List Your Property
          </Link>
        </div>
      </div>

      <PropertySearchModal
        open={open}
        onClose={() => setOpen(false)}
        onSearch={handleSearch}
      />
    </section>
  );
}