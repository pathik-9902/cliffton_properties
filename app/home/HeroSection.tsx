'use client';

import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import PropertySearchModal from '@/components/property/ProopertySearchModal';

const CAROUSEL_SLIDES = [
  {
    image: '/home/bg_img1.jpeg',
    title: 'Discover Properties That\nMatch Your Ambition',
    description: 'Buy or rent verified residential, commercial, and land properties with confidence.',
  },
  {
    image: '/home/bg_img2.jpeg',
    title: 'Experience Unmatched\nLuxury Living',
    description: 'Find your dream home in the most exclusive and desirable neighborhoods.',
  },
  {
    image: '/home/bg_img3.jpeg',
    title: 'Invest in the Future\nWith Prime Real Estate',
    description: 'Explore commercial and residential properties with high return on investment potential.',
  },
  {
    image: '/home/bg_img4.jpeg',
    title: 'Your Perfect Space\nAwaits You',
    description: 'Let us help you find the ideal architectural masterpiece that suits your lifestyle.',
  },
  {
    image: '/home/bg_img5.jpeg',
    title: 'Modern Living Spaces',
    description: 'Explore thoughtfully designed homes built for comfort and elegance.',
  },
  {
    image: '/home/bg_img6.jpeg',
    title: 'Smart Investment Choices',
    description: 'Secure your future with properties that deliver consistent value.',
  },
  {
    image: '/home/bg_img7.jpeg',
    title: 'Premium Locations',
    description: 'Live in prime areas with access to top amenities and infrastructure.',
  },
  {
    image: '/home/bg_img8.jpeg',
    title: 'Tailored For Your Lifestyle',
    description: 'Find spaces that perfectly align with your personal and professional needs.',
  },
  {
    image: '/home/bg_img9.jpeg',
    title: 'Built For Generations',
    description: 'Invest in properties designed with long-term quality and durability.',
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