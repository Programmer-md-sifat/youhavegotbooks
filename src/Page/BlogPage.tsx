import React from 'react';
import { PageTransition } from '../Components/Common/PageTransition';
import { Clock, User, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const articles = [
  {
    id: 'post-1',
    title: 'The Art of Slipcases: Why Physical Bindings Still Matter in a Digital Era',
    author: 'Clara Vance',
    readTime: '6 min read',
    date: 'March 18, 2026',
    category: 'Book Craft',
    image: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&w=700&q=80',
    summary:
      'Exploring the resurgence of hand-sewn binding, cloth-covered boards, and metallic foil in high-end private press publications.',
  },
  {
    id: 'post-2',
    title: 'Anatomy of A Mystery: Deconstructing Susanna Clarke’s Architectural Labyrinths',
    author: 'Julian Montgomery',
    readTime: '9 min read',
    date: 'March 10, 2026',
    category: 'Literary Critique',
    image: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=700&q=80',
    summary:
      'How Piranesi reimagines infinite halls, tides, and statues to construct one of the 21st century’s most profound meditations on innocence.',
  },
  {
    id: 'post-3',
    title: '10 Speculative Masterpieces That Will Ignite Your Imagination in 2026',
    author: 'Elena Rostova',
    readTime: '5 min read',
    date: 'February 28, 2026',
    category: 'Reading Guide',
    image: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=700&q=80',
    summary:
      'From cosmic chronicles to subterranean archives, our staff bibliophiles select the ten volumes redefining contemporary worldbuilding.',
  },
];

export const BlogPage: React.FC = () => {
  return (
    <PageTransition>
      <div className="max-w-[1440px] mx-auto px-6 sm:px-8 lg:px-12 xl:px-16 py-14">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs font-bold text-[#F26522] uppercase tracking-wider">
            The Lunar Gazette
          </span>
          <h1 className="text-4xl font-extrabold text-[#1C222E] tracking-tight mt-1">
            Essays, Craft & Curation
          </h1>
          <p className="text-sm text-gray-500 mt-3">
            In-depth perspectives from authors, typographers, and editors dedicated to the printed word.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {articles.map((article) => (
            <article
              key={article.id}
              className="bg-white rounded-3xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col group"
            >
              <div className="aspect-[16/10] overflow-hidden bg-gray-100">
                <img
                  src={article.image}
                  alt={article.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
              </div>

              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-3 text-[11px] text-gray-400 mb-2">
                    <span className="text-[#F26522] font-bold uppercase">{article.category}</span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {article.readTime}
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-[#1C222E] group-hover:text-[#F26522] transition-colors line-clamp-2 leading-snug">
                    {article.title}
                  </h3>

                  <p className="text-xs text-gray-500 mt-2.5 line-clamp-3 leading-relaxed">
                    {article.summary}
                  </p>
                </div>

                <div className="pt-5 mt-5 border-t border-gray-100 flex items-center justify-between">
                  <span className="text-[11px] font-medium text-gray-400">By {article.author}</span>
                  <Link
                    to="/books"
                    className="text-xs font-bold text-[#F26522] flex items-center gap-1 hover:underline"
                  >
                    <span>Read More</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </PageTransition>
  );
};
