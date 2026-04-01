'use client';

import { useState, useEffect } from 'react';

import HeroSection from './home/HeroSection';
import SearchSection from './home/SearchSection';
import CategorySection from './home/CategorySection';
import TrustSection from './home/TrustSection';
import ListCTASection from './home/ListCTASection';
import FeaturedSection from './home/FeaturedSection';
import BrowseByLocalitySection from './home/LocalitySection';
import PropertyTypeSection from './home/PropertyTypeSection';

import { FullPropertyDetails } from '@/types/property';

export default function HomePage() {
  const [listingType, setListingType] = useState<'rent' | 'sale'>('rent');
  const [properties, setProperties] = useState<FullPropertyDetails[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const res = await fetch('/api/allproperties');
        const data = await res.json();

        setProperties(data.properties || []);
      } catch (err) {
        console.error('Failed to fetch properties', err);
      } finally {
        setLoading(false);
      }
    };

    fetchProperties();
  }, []);

  return (
    <main className="bg-[#faf7f3]">
      <HeroSection/>

      <SearchSection
        listingType={listingType}
        setListingType={setListingType}
      />

      <FeaturedSection properties={properties} />

      {/* <BrowseByLocalitySection properties={properties}/>
      <PropertyTypeSection /> */}

      <CategorySection listingType={listingType} />

      <TrustSection /> 
      <ListCTASection />
    </main>
  );
}