import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';

export interface TopCategoryItem {
  id: string;
  name: string;
  bookCount: string;
  bgColor: string;
  shadowColor: string;
  slug: string;
}

export const topBookCategoriesData: TopCategoryItem[] = [
  {
    id: 'top-cat-1',
    name: 'Fiction',
    bookCount: '1,250 books',
    bgColor: '#FF5700',
    shadowColor: 'rgba(255, 87, 0, 0.28)',
    slug: 'fiction',
  },
  {
    id: 'top-cat-2',
    name: 'Non-Fiction',
    bookCount: '890 books',
    bgColor: '#0BB07B',
    shadowColor: 'rgba(11, 176, 123, 0.28)',
    slug: 'non-fiction',
  },
  {
    id: 'top-cat-3',
    name: 'Mystery',
    bookCount: '654 books',
    bgColor: '#7B42F6',
    shadowColor: 'rgba(123, 66, 246, 0.28)',
    slug: 'mystery',
  },
  {
    id: 'top-cat-4',
    name: 'Romance',
    bookCount: '723 books',
    bgColor: '#E11D48',
    shadowColor: 'rgba(225, 29, 72, 0.28)',
    slug: 'romance',
  },
  {
    id: 'top-cat-5',
    name: 'Sci-Fi',
    bookCount: '432 books',
    bgColor: '#0088D1',
    shadowColor: 'rgba(0, 136, 209, 0.28)',
    slug: 'sci-fi',
  },
  {
    id: 'top-cat-6',
    name: 'Biography',
    bookCount: '387 books',
    bgColor: '#414E62',
    shadowColor: 'rgba(65, 78, 98, 0.28)',
    slug: 'biography',
  },
  {
    id: 'top-cat-7',
    name: 'Business',
    bookCount: '540 books',
    bgColor: '#008C7A',
    shadowColor: 'rgba(0, 140, 122, 0.28)',
    slug: 'business',
  },
  {
    id: 'top-cat-8',
    name: 'Children',
    bookCount: '615 books',
    bgColor: '#7E57C2',
    shadowColor: 'rgba(126, 87, 194, 0.28)',
    slug: 'children',
  },
  {
    id: 'top-cat-9',
    name: 'Cooking',
    bookCount: '480 books',
    bgColor: '#F59E0B',
    shadowColor: 'rgba(245, 158, 11, 0.28)',
    slug: 'cooking',
  },
  {
    id: 'top-cat-10',
    name: 'History',
    bookCount: '520 books',
    bgColor: '#D97706',
    shadowColor: 'rgba(217, 119, 6, 0.28)',
    slug: 'history',
  },
];

export const TopBookCategoriesSection: React.FC = () => {
  const navigate = useNavigate();

  return (
    <section className="py-12 sm:py-16 bg-[#FAF9F6] border-t border-gray-100" id="top-book-categories-section">
      <div className="max-w-[1440px] mx-auto px-6 sm:px-8 lg:px-12 xl:px-16">
        
        {/* Rounded Card Container matching the uploaded design */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 lg:p-10 border border-gray-100/80 shadow-[0_4px_30px_rgba(0,0,0,0.04)]">
          
          {/* Header Row */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 sm:mb-9">
            <h2
              id="top-categories-heading"
              className="text-2xl sm:text-3xl font-extrabold text-[#1C222E] tracking-tight"
            >
              Top Book Categories
            </h2>

            <Link
              to="/books"
              className="inline-flex items-center justify-center gap-1.5 px-6 py-2.5 rounded-full bg-[#F26522] hover:bg-[#d85416] text-white font-semibold text-xs sm:text-sm tracking-wide transition-all shadow-sm hover:shadow-md active:scale-95 self-start sm:self-auto"
            >
              <span>View All Categories</span>
              <ChevronRight className="w-4 h-4 stroke-[2.5]" />
            </Link>
          </div>

          {/* 10 Categories Grid: 2 Rows of 5 Columns on Desktop */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-5 lg:gap-6">
            {topBookCategoriesData.map((category) => (
              <div
                key={category.id}
                onClick={() => navigate(`/books?genre=${encodeURIComponent(category.name)}`)}
                className="group relative flex flex-col items-center justify-center h-32 sm:h-36 rounded-2xl sm:rounded-[20px] p-4 text-center cursor-pointer overflow-hidden transition-all duration-300 hover:-translate-y-1.5 active:scale-95 shadow-sm hover:shadow-xl"
                style={{
                  backgroundColor: category.bgColor,
                  boxShadow: `0 10px 25px -5px ${category.shadowColor}`,
                }}
              >
                {/* Subtle translucent circular background element in the bottom right corner */}
                <div className="absolute -bottom-5 -right-5 w-20 sm:w-24 h-20 sm:h-24 rounded-full bg-white/15 pointer-events-none transition-transform duration-300 group-hover:scale-110" />

                {/* Category Name */}
                <span className="relative z-10 text-lg sm:text-xl font-bold text-white tracking-tight drop-shadow-sm">
                  {category.name}
                </span>

                {/* Book Count */}
                <span className="relative z-10 text-xs sm:text-sm font-medium text-white/90 mt-1 tracking-normal">
                  {category.bookCount}
                </span>
              </div>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
};
