import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowRight, BookOpen, Star, Sparkles, CheckCircle2 } from 'lucide-react';

export interface AuthorItem {
  id: string;
  name: string;
  role: string;
  avatar: string;
  booksCount: number;
  rating: number;
  bestsellerTitle: string;
}

export const featuredAuthorsData: AuthorItem[] = [
  {
    id: 'auth-1',
    name: 'Susanna Clarke',
    role: 'Magical Realism & Fantasy',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=400&q=80',
    booksCount: 8,
    rating: 4.9,
    bestsellerTitle: 'Piranesi',
  },
  {
    id: 'auth-2',
    name: 'K. W. Padley',
    role: 'Dark Fantasy & Epics',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
    booksCount: 14,
    rating: 4.8,
    bestsellerTitle: 'Chronicles of Darkness',
  },
  {
    id: 'auth-3',
    name: 'Sarah J. Maas',
    role: 'Romantic Fantasy',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
    booksCount: 16,
    rating: 5.0,
    bestsellerTitle: 'House of Sky and Breath',
  },
  {
    id: 'auth-4',
    name: 'Robert T. Kiyosaki',
    role: 'Personal Finance & Growth',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80',
    booksCount: 26,
    rating: 4.9,
    bestsellerTitle: 'Rich Dad Poor Dad',
  },
  {
    id: 'auth-5',
    name: 'Eleanor Sterling',
    role: 'Dark Academia & Mystery',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80',
    booksCount: 7,
    rating: 4.9,
    bestsellerTitle: 'The Silent Citadel',
  },
  {
    id: 'auth-6',
    name: 'Dr. Evelyn Rousseau',
    role: 'Philosophy & Essays',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=400&q=80',
    booksCount: 9,
    rating: 5.0,
    bestsellerTitle: 'The Philosophy of Solitude',
  },
];

export const FeaturedAuthorsSection: React.FC = () => {
  const navigate = useNavigate();

  return (
    <section className="py-14 sm:py-16 bg-[#FAF9F6] border-t border-gray-100" id="featured-authors-section">
      <div className="max-w-[1440px] mx-auto px-6 sm:px-8 lg:px-12 xl:px-16">
        
        {/* Header Row */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8 sm:mb-10">
          <div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#1C222E] tracking-tight">
              Featured Authors
            </h2>
            <p className="text-xs sm:text-sm text-gray-500 mt-1">
              Meet the brilliant minds and bestselling authors shaping modern literature.
            </p>
          </div>

          <Link
            to="/books"
            className="inline-flex items-center justify-center gap-1.5 px-6 py-2.5 rounded-full bg-[#F26522] hover:bg-[#d85416] text-white font-bold text-xs uppercase tracking-wider transition-all shadow-sm hover:shadow-md active:scale-95 self-start sm:self-auto"
          >
            <span>EXPLORE ALL</span>
            <ArrowRight className="w-3.5 h-3.5 stroke-[2.5]" />
          </Link>
        </div>

        {/* 6-Author Responsive Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-5">
          {featuredAuthorsData.map((author) => (
            <div
              key={author.id}
              onClick={() => navigate(`/books?search=${encodeURIComponent(author.name)}`)}
              className="group flex flex-col items-center justify-between bg-white rounded-3xl p-4 sm:p-5 border border-gray-100 hover:border-orange-200/90 shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 cursor-pointer text-center"
            >
              <div className="flex flex-col items-center w-full">
                {/* Avatar with Ring & Verified Badge */}
                <div className="relative mb-3.5">
                  <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full overflow-hidden p-1 bg-gradient-to-tr from-orange-200 via-gray-100 to-orange-400 group-hover:from-[#F26522] group-hover:to-orange-300 transition-colors duration-300 shadow-sm">
                    <img
                      src={author.avatar}
                      alt={author.name}
                      className="w-full h-full object-cover rounded-full group-hover:scale-105 transition-transform duration-300"
                      loading="lazy"
                    />
                  </div>

                  {/* Verified Icon */}
                  <div className="absolute bottom-0 right-0 p-1 bg-white rounded-full shadow-md text-[#F26522]">
                    <CheckCircle2 className="w-3.5 h-3.5 fill-[#F26522] text-white" />
                  </div>
                </div>

                {/* Name */}
                <h3 className="font-bold text-sm sm:text-base text-[#1C222E] group-hover:text-[#F26522] transition-colors leading-snug line-clamp-1">
                  {author.name}
                </h3>

                {/* Genre Specialty */}
                <p className="text-[11px] font-semibold text-[#F26522] mt-0.5 line-clamp-1">
                  {author.role}
                </p>

                {/* Meta details */}
                <div className="flex items-center gap-1 mt-2 text-[11px] text-gray-500">
                  <BookOpen className="w-3 h-3 text-gray-400" />
                  <span>{author.booksCount} Books</span>
                  <span className="text-gray-300">•</span>
                  <div className="flex items-center text-amber-500">
                    <Star className="w-3 h-3 fill-current stroke-none" />
                    <span className="font-semibold text-gray-600 ml-0.5">{author.rating}</span>
                  </div>
                </div>
              </div>

              {/* View Books Button */}
              <div className="w-full mt-4 pt-3 border-t border-gray-100">
                <button
                  type="button"
                  className="w-full py-1.5 px-3 rounded-full text-xs font-bold text-gray-700 bg-gray-50 group-hover:bg-[#F26522] group-hover:text-white transition-all duration-200 shadow-none group-hover:shadow-sm"
                >
                  View Books
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
