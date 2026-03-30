'use client';

import { useState } from 'react';

import HeroSection from './home/HeroSection';
import SearchSection from './home/SearchSection';
import CategorySection from './home/CategorySection';
import TrustSection from './home/TrustSection';
import ListCTASection from './home/ListCTASection';
import FeaturedPropertiesSection from './home/FeaturedSection';
import BrowseByLocalitySection from './home/LocalitySection';
import PropertyTypeSection from './home/PropertyTypeSection';

export default function HomePage() {
  const [listingType, setListingType] = useState<'rent' | 'sale'>('rent');

  return (
    <main className="bg-[#faf7f3]">
      <HeroSection listingType={listingType} />
      <SearchSection
        listingType={listingType}
        setListingType={setListingType}
      />
      <FeaturedPropertiesSection properties={[]} />
      <BrowseByLocalitySection />
      <PropertyTypeSection />
      <CategorySection listingType={listingType} />
      <TrustSection />
      <ListCTASection />
    </main>
  );
}