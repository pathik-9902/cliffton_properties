'use client';

import HeroSection from './home/HeroSection';
import SearchSection from './home/SearchSection';
import CategorySection from './home/CategorySection';
import TrustSection from './home/TrustSection';
import ListCTASection from './home/ListCTASection';


export default function HomePage() {

  return (
    <main className="bg-[#faf7f3]">
      <HeroSection />

      <SearchSection />
      <CategorySection />

      <TrustSection />
      <ListCTASection />
    </main>
  );
}