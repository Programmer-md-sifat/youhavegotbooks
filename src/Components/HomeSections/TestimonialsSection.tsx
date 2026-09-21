import React from 'react';
import { readersReviews } from '../../Data/HomeData';
import { Star, Quote } from 'lucide-react';

export const TestimonialsSection: React.FC = () => {
  return (
    <section className="py-16 bg-[#F7F6F2]">
      <div className="max-w-[1440px] mx-auto px-6 sm:px-8 lg:px-12 xl:px-16">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-bold uppercase tracking-widest text-[#F26522]">
            Reader Reflections
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0D141C] mt-1 tracking-tight">
            Words From Our Bibliophile Community
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {readersReviews.map((review) => (
            <div
              key={review.id}
              className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex flex-col justify-between relative"
            >
              <Quote className="w-8 h-8 text-[#F26522]/20 absolute top-6 right-6" />

              <div>
                <div className="flex items-center gap-1 text-[#F59E0B] mb-3">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${
                        i < review.rating ? 'fill-current stroke-none' : 'text-gray-200 fill-gray-200'
                      }`}
                    />
                  ))}
                </div>

                <p className="text-sm text-[#28303F] leading-relaxed italic mb-6">
                  &quot;{review.comment}&quot;
                </p>
              </div>

              <div className="flex items-center gap-3 pt-4 border-t border-gray-100">
                <img
                  src={review.avatar}
                  alt={review.name}
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div>
                  <h4 className="text-xs font-bold text-[#0D141C]">{review.name}</h4>
                  <p className="text-[11px] text-gray-500">{review.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
