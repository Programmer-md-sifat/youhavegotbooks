import React from 'react';
import { PageTransition } from '../Components/Common/PageTransition';
import { HeroSection } from '../Components/HomeSections/HeroSection';
import { BestSellingBooks } from '../Components/HomeSections/BestSellingBooks';
import { PopularTrendingSection } from '../Components/HomeSections/PopularTrendingSection';
import { NewArrivalsSection } from '../Components/HomeSections/NewArrivalsSection';
import { TopBookCategoriesSection } from '../Components/HomeSections/TopBookCategoriesSection';
import { FeaturedAuthorsSection } from '../Components/HomeSections/FeaturedAuthorsSection';
import { OurFavouriteReadsSection } from '../Components/HomeSections/OurFavouriteReadsSection';

export const HomePage: React.FC = () => {
  return (
    <PageTransition>
      <main className="w-full">
        <HeroSection />
        <BestSellingBooks />
        <PopularTrendingSection />
        <NewArrivalsSection />
        <TopBookCategoriesSection />
        <FeaturedAuthorsSection />
        <OurFavouriteReadsSection />
      </main>
    </PageTransition>
  );
};
