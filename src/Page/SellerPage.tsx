import React, { useState } from 'react';
import { PageTransition } from '../Components/Common/PageTransition';
import { BookLogoSvg } from '../Components/Common/SvgIcons';
import { Building2, Award, Sparkles, CheckCircle2, Send } from 'lucide-react';

export const SellerPage: React.FC = () => {
  const [submitted, setSubmitted] = useState(false);

  return (
    <PageTransition>
      <div className="max-w-[1440px] mx-auto px-6 sm:px-8 lg:px-12 xl:px-16 py-14">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FFF7ED] text-[#F26522] text-xs font-bold uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Publishers & Authors Portal</span>
          </div>
          <h1 className="text-4xl font-extrabold text-[#1C222E] tracking-tight">
            Partner with LunarBooks
          </h1>
          <p className="text-sm text-gray-500 mt-3 leading-relaxed">
            Distribute your physical first editions, limited slipcases, and translated manuscripts
            to our global network of passionate collectors and book clubs.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm text-center">
            <div className="w-12 h-12 bg-[#FFF7ED] text-[#F26522] rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Building2 className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-[#1C222E]">Global Reach</h3>
            <p className="text-xs text-gray-500 mt-2 leading-relaxed">
              Direct access to bibliophiles across 120+ countries who prize premium binding and craftsmanship.
            </p>
          </div>

          <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm text-center">
            <div className="w-12 h-12 bg-[#FFF7ED] text-[#F26522] rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Award className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-[#1C222E]">Curated Prominence</h3>
            <p className="text-xs text-gray-500 mt-2 leading-relaxed">
              Every book receives bespoke editorial photography, curated staff reviews, and front-page spotlighting.
            </p>
          </div>

          <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm text-center">
            <div className="w-12 h-12 bg-[#FFF7ED] text-[#F26522] rounded-2xl flex items-center justify-center mx-auto mb-4">
              <BookLogoSvg className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-[#1C222E]">Fair Royalty Splits</h3>
            <p className="text-xs text-gray-500 mt-2 leading-relaxed">
              Transparent consignment terms that celebrate creative labor and independent printing presses.
            </p>
          </div>
        </div>

        {/* Seller Application Form */}
        <div className="bg-white rounded-3xl border border-gray-100 p-8 sm:p-12 max-w-2xl mx-auto shadow-sm">
          <h2 className="text-xl font-bold text-[#1C222E] mb-2">Submit Catalog For Review</h2>
          <p className="text-xs text-gray-500 mb-6">
            Tell us about your press, upcoming publications, and edition specifications.
          </p>

          {submitted ? (
            <div className="bg-emerald-50 text-emerald-800 p-6 rounded-2xl text-center">
              <CheckCircle2 className="w-8 h-8 text-emerald-600 mx-auto mb-2" />
              <h3 className="text-sm font-bold">Submission Received</h3>
              <p className="text-xs text-emerald-600 mt-1">
                Our literary acquisition team will examine your catalog and respond within 3 business days.
              </p>
            </div>
          ) : (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                setSubmitted(true);
              }}
              className="space-y-4"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-600 mb-1">Press / Author Name</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Obscura Press"
                    className="w-full px-4 py-2.5 text-xs border border-gray-200 rounded-xl focus:outline-none focus:border-[#F26522]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-600 mb-1">Contact Email</label>
                  <input
                    type="email"
                    required
                    placeholder="editor@press.com"
                    className="w-full px-4 py-2.5 text-xs border border-gray-200 rounded-xl focus:outline-none focus:border-[#F26522]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-600 mb-1">Primary Literary Genres</label>
                <input
                  type="text"
                  placeholder="e.g. Speculative Sci-Fi, Dark Academia, Fine Art Editions"
                  className="w-full px-4 py-2.5 text-xs border border-gray-200 rounded-xl focus:outline-none focus:border-[#F26522]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-600 mb-1">Catalog Portfolio or Website Link</label>
                <input
                  type="url"
                  placeholder="https://"
                  className="w-full px-4 py-2.5 text-xs border border-gray-200 rounded-xl focus:outline-none focus:border-[#F26522]"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 bg-[#F26522] hover:bg-[#E05312] text-white text-xs font-bold uppercase rounded-full shadow-md transition-colors flex items-center justify-center gap-2 cursor-pointer"
              >
                <Send className="w-4 h-4" />
                <span>Submit Seller Application</span>
              </button>
            </form>
          )}
        </div>
      </div>
    </PageTransition>
  );
};
