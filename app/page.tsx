'use client';

import HeroSection from './home/HeroSection';
import SearchSection from './home/SearchSection';
import CategorySection from './home/CategorySection';
import TrustSection from './home/TrustSection';
import ListCTASection from './home/ListCTASection';
import FeaturedSection from './home/FeaturedSection';
import BrowseByLocalitySection from './home/LocalitySection';
import PropertyTypeSection from './home/PropertyTypeSection';

export default function HomePage() {

  return (
    <main className="bg-[#faf7f3]">
      <HeroSection />

      <SearchSection />

      {/* <FeaturedSection properties={properties} /> */}

      {/* <BrowseByLocalitySection properties={properties}/>
      <PropertyTypeSection /> */}

      <CategorySection />

      <TrustSection />
      <ListCTASection />
    </main>
  );
}