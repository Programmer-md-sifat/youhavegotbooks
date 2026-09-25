import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';

export interface CategoryItemData {
  id: string;
  title: string;
  genreParam: string;
  image: string;
  subcategories: {
    name: string;
    path: string;
  }[];
}

export const topBookCategoriesData: CategoryItemData[] = [
  {
    id: 'cat-biographies',
    title: 'Biographies & Memoirs',
    genreParam: 'Biographies & Memoirs',
    image: '/images/books/eat-a-peach.jpg',
    subcategories: [
      { name: 'Historical Biographies', path: '/books?genre=Biographies%20%26%20Memoirs' },
      { name: 'Leaders & Notable', path: '/books?genre=Biographies%20%26%20Memoirs' },
      { name: 'Modern Biographies', path: '/books?genre=Biographies%20%26%20Memoirs' },
      { name: 'Sports Biographies', path: '/books?genre=Biographies%20%26%20Memoirs' },
      { name: 'United States Biographies', path: '/books?genre=Biographies%20%26%20Memoirs' },
    ],
  },
  {
    id: 'cat-childrens',
    title: "Children's Books",
    genreParam: "Children's",
    image: '/images/books/a-place-called-perfect.jpg',
    subcategories: [
      { name: 'Action & Adventure', path: "/books?genre=Children's" },
      { name: "Children's Animal Books", path: "/books?genre=Children's" },
      { name: "Children's Humor", path: "/books?genre=Children's" },
      { name: 'Sci-Fi & Fantasy Books', path: "/books?genre=Children's" },
      { name: "Classic Children's Books", path: "/books?genre=Children's" },
    ],
  },
  {
    id: 'cat-literature',
    title: 'Literature & Fiction',
    genreParam: 'Literature & Fiction',
    image: '/images/books/certain-hunger.jpg',
    subcategories: [
      { name: 'Classic Books', path: '/books?genre=Literature%20%26%20Fiction' },
      { name: 'Contemporary Literature', path: '/books?genre=Literature%20%26%20Fiction' },
      { name: 'Foreign Language Fiction', path: '/books?genre=Literature%20%26%20Fiction' },
      { name: 'Genre Fiction', path: '/books?genre=Literature%20%26%20Fiction' },
      { name: 'History & Criticism', path: '/books?genre=Literature%20%26%20Fiction' },
    ],
  },
  {
    id: 'cat-mystery-thriller',
    title: 'Mystery, Thriller',
    genreParam: 'Mystery & Thriller',
    image: '/images/books/ring-shout.jpg',
    subcategories: [
      { name: 'Crime Books', path: '/books?genre=Mystery%20%26%20Thriller' },
      { name: 'Detective Books', path: '/books?genre=Mystery%20%26%20Thriller' },
      { name: 'Mystery Books', path: '/books?genre=Mystery%20%26%20Thriller' },
      { name: 'Suspense Books', path: '/books?genre=Mystery%20%26%20Thriller' },
      { name: 'Thrillers', path: '/books?genre=Mystery%20%26%20Thriller' },
    ],
  },
  {
    id: 'cat-religion-spirituality',
    title: 'Religion & Spirituality',
    genreParam: 'Religion & Spirituality',
    image: '/images/books/the-illness-lesson.jpg',
    subcategories: [
      { name: 'Astrology Books', path: '/books?genre=Religion%20%26%20Spirituality' },
      { name: 'Christian Books & Bibles', path: '/books?genre=Religion%20%26%20Spirituality' },
      { name: 'History of Religion Books', path: '/books?genre=Religion%20%26%20Spirituality' },
      { name: 'Inspirational Books', path: '/books?genre=Religion%20%26%20Spirituality' },
      { name: 'New Age Books', path: '/books?genre=Religion%20%26%20Spirituality' },
    ],
  },
  {
    id: 'cat-romance',
    title: 'Romance',
    genreParam: 'Romance',
    image: '/images/books/felix.jpg',
    subcategories: [
      { name: 'Contemporary Romance', path: '/books?genre=Romance' },
      { name: 'Romantic Fantasy', path: '/books?genre=Romance' },
      { name: 'Romantic Historical', path: '/books?genre=Romance' },
      { name: 'Romantic Mystery', path: '/books?genre=Romance' },
      { name: 'Romantic Sci-Fi', path: '/books?genre=Romance' },
    ],
  },
  {
    id: 'cat-fiction-fantasy',
    title: 'Fiction & Fantasy',
    genreParam: 'Sci-Fi & Fantasy',
    image: '/images/books/dune.jpg',
    subcategories: [
      { name: 'Action & Adventure', path: '/books?genre=Sci-Fi%20%26%20Fantasy' },
      { name: 'Coming of Age Sci-Fi Books', path: '/books?genre=Sci-Fi%20%26%20Fantasy' },
      { name: 'Historical Sci-Fi', path: '/books?genre=Sci-Fi%20%26%20Fantasy' },
      { name: 'Sci-Fi Horror Books', path: '/books?genre=Sci-Fi%20%26%20Fantasy' },
      { name: 'Sci-Fi Humor Books', path: '/books?genre=Sci-Fi%20%26%20Fantasy' },
    ],
  },
  {
    id: 'cat-history',
    title: 'History',
    genreParam: 'History',
    image: '/images/books/a-light-so-lovely.jpg',
    subcategories: [
      { name: 'Military History', path: '/books?genre=History' },
      { name: 'Modern History', path: '/books?genre=History' },
      { name: 'Religious History Books', path: '/books?genre=History' },
      { name: 'United States History', path: '/books?genre=History' },
      { name: 'World History Books', path: '/books?genre=History' },
    ],
  },
  {
    id: 'cat-teen-young-adult',
    title: 'Teen & Young Adult',
    genreParam: 'Young Adult',
    image: '/images/books/clap-when-you-land.jpg',
    subcategories: [
      { name: 'Teen Fantasy Books', path: '/books?genre=Young%20Adult' },
      { name: 'Teen Hobbies', path: '/books?genre=Young%20Adult' },
      { name: 'Teen Horror Books', path: '/books?genre=Young%20Adult' },
      { name: 'Teen Romance', path: '/books?genre=Young%20Adult' },
      { name: 'Teen Sci-Fi Books', path: '/books?genre=Young%20Adult' },
    ],
  },
];

export const TopBookCategoriesSection: React.FC = () => {
  return (
    <section className="py-14 sm:py-18 lg:py-20 bg-white" id="top-book-categories-section">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
        {/* Optional Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-10 pb-4 border-b border-gray-100">
          <div>
            <h2
              id="top-categories-heading"
              className="text-2xl sm:text-3xl font-extrabold text-[#111827] tracking-tight"
            >
              Top Book Categories
            </h2>
            <p className="text-sm text-gray-500 mt-1">Explore our most popular genres and curated reading lists</p>
          </div>

          <Link
            to="/books"
            className="inline-flex items-center justify-center gap-1.5 px-5 py-2.5 rounded-full bg-[#F26522] hover:bg-[#d85416] text-white font-semibold text-xs sm:text-sm tracking-wide transition-all shadow-sm hover:shadow-md active:scale-95 self-start sm:self-auto cursor-pointer"
          >
            <span>View All Categories</span>
            <ChevronRight className="w-4 h-4 stroke-[2.5]" />
          </Link>
        </div>

        {/* 3x3 Grid of Category Items Matching the Design Reference */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 lg:gap-x-10 xl:gap-x-14 gap-y-10 sm:gap-y-12 lg:gap-y-14">
          {topBookCategoriesData.map((cat) => (
            <div
              key={cat.id}
              className="flex flex-row items-start gap-5 sm:gap-6 group"
            >
              {/* Left Side: Book Cover with smooth rounded corners and tall aspect ratio */}
              <Link
                to={`/books?genre=${encodeURIComponent(cat.genreParam)}`}
                className="relative shrink-0 w-[135px] sm:w-[150px] lg:w-[160px] h-[200px] sm:h-[225px] lg:h-[240px] block overflow-hidden rounded-[20px] shadow-sm group-hover:shadow-md transition-all duration-300"
              >
                <img
                  src={cat.image}
                  alt={cat.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
              </Link>

              {/* Right Side: Category Name, 5 Subcategories & View More Link */}
              <div className="flex-1 min-w-0 flex flex-col pt-1">
                {/* Category Title */}
                <Link
                  to={`/books?genre=${encodeURIComponent(cat.genreParam)}`}
                  className="text-[17px] sm:text-[18px] lg:text-[19px] font-bold text-[#111827] group-hover:text-[#F26522] transition-colors leading-snug tracking-tight mb-3 block"
                >
                  {cat.title}
                </Link>

                {/* Subcategories List */}
                <ul className="space-y-1.5 sm:space-y-2 mb-3">
                  {cat.subcategories.map((sub, idx) => (
                    <li key={idx}>
                      <Link
                        to={sub.path}
                        className="text-[13.5px] sm:text-[14px] text-gray-500 hover:text-[#F26522] transition-colors inline-block truncate max-w-full font-normal leading-normal"
                      >
                        {sub.name}
                      </Link>
                    </li>
                  ))}
                </ul>

                {/* View More Link */}
                <Link
                  to={`/books?genre=${encodeURIComponent(cat.genreParam)}`}
                  className="inline-flex items-center gap-1.5 text-[13.5px] sm:text-[14px] font-bold text-[#111827] hover:text-[#F26522] transition-colors group/more cursor-pointer mt-1"
                >
                  <span>View More</span>
                  <ChevronRight className="w-3.5 h-3.5 text-[#F26522] stroke-[3] transition-transform group-hover/more:translate-x-0.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
