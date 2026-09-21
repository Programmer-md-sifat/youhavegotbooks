import React, { useState } from 'react';
import { BookOpen, Users, ShoppingBag, Smile, ArrowRight, CheckCircle2 } from 'lucide-react';

interface StatItem {
  id: string;
  icon: React.ElementType;
  value: string;
  label: string;
  bgColor: string;
  textColor: string;
}

const statsData: StatItem[] = [
  {
    id: 'stat-1',
    icon: BookOpen,
    value: '15,254',
    label: 'TOTAL BOOKS',
    bgColor: 'bg-[#EDE7FE]',
    textColor: 'text-[#7C3AED]',
  },
  {
    id: 'stat-2',
    icon: Users,
    value: '1,287',
    label: 'AUTHORS',
    bgColor: 'bg-[#FEEAD7]',
    textColor: 'text-[#EA580C]',
  },
  {
    id: 'stat-3',
    icon: ShoppingBag,
    value: '7,589',
    label: 'BOOKS SOLD',
    bgColor: 'bg-[#FEF3C7]',
    textColor: 'text-[#D97706]',
  },
  {
    id: 'stat-4',
    icon: Smile,
    value: '97%',
    label: 'HAPPY CUSTOMER',
    bgColor: 'bg-[#FFEDD5]',
    textColor: 'text-[#F97316]',
  },
];

export const StatsAndPromoSection: React.FC = () => {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) return;
    setIsSubscribed(true);
    setEmail('');
  };

  return (
    <section className="py-12 sm:py-16 bg-[#FAF9F6] border-t border-gray-100" id="stats-promo-section">
      <div className="max-w-[1440px] mx-auto px-6 sm:px-8 lg:px-12 xl:px-16">
        
        {/* Row 1: 4 Metric Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8 sm:mb-10">
          {statsData.map((stat) => {
            const Icon = stat.icon;
            return (
              <div
                key={stat.id}
                className="bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-6 border border-gray-100 shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-md transition-all duration-300 flex items-center gap-3.5 sm:gap-4.5"
              >
                {/* Colored Icon Square with Soft Corners */}
                <div
                  className={`w-12 h-12 sm:w-14 sm:h-14 rounded-2xl flex items-center justify-center flex-shrink-0 ${stat.bgColor} ${stat.textColor}`}
                >
                  <Icon className="w-5 h-5 sm:w-6 sm:h-6 stroke-[2.2]" />
                </div>

                {/* Number & Label */}
                <div>
                  <div className="text-xl sm:text-2xl lg:text-[26px] font-black text-[#1C222E] tracking-tight leading-none">
                    {stat.value}
                  </div>
                  <div className="text-[10px] sm:text-xs font-bold text-gray-400 uppercase tracking-wider mt-1 sm:mt-1.5">
                    {stat.label}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Row 2: Discount Promo & Newsletter Banner matching the uploaded screenshot */}
        <div className="bg-white rounded-3xl p-3 sm:p-6 border border-gray-100/90 shadow-[0_4px_30px_rgba(0,0,0,0.03)]">
          <div className="relative bg-[#FFF8F0] rounded-2xl sm:rounded-3xl overflow-hidden py-12 sm:py-16 px-6 sm:px-12 text-center border border-[#FFE8D6]">
            
            {/* Soft Peach Decorative Geometric Shapes from Reference Image */}
            <div className="absolute -left-12 -bottom-12 w-56 sm:w-72 h-56 sm:h-72 bg-[#FFE3CA]/60 rounded-[2.5rem] rotate-45 pointer-events-none" />
            <div className="absolute -right-16 top-1/2 -translate-y-1/2 w-64 sm:w-80 h-64 sm:h-80 bg-[#FFE3CA]/60 rounded-full pointer-events-none" />

            {/* Banner Content */}
            <div className="relative z-10 max-w-2xl mx-auto">
              <h2 className="text-2xl sm:text-4xl lg:text-[42px] font-black text-[#1C222E] tracking-tight leading-tight">
                Get <span className="text-[#F26522]">10%</span> Off Your Order!
              </h2>

              <p className="text-xs sm:text-sm md:text-base text-gray-500 mt-2.5 sm:mt-3 font-medium">
                Enter your email and receive a 10% discount on your next order!
              </p>

              {/* Newsletter Form */}
              {isSubscribed ? (
                <div className="mt-6 sm:mt-8 p-4 bg-white/95 rounded-full shadow-md border border-emerald-200 inline-flex items-center gap-2 text-emerald-700 text-xs sm:text-sm font-bold">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Success! Check your email for coupon code: <strong>WELCOME10</strong></span>
                </div>
              ) : (
                <form
                  onSubmit={handleSubscribe}
                  className="mt-6 sm:mt-8 bg-white rounded-full p-1.5 sm:p-2 pl-5 sm:pl-6 shadow-md border border-orange-100/80 flex items-center justify-between max-w-lg mx-auto"
                >
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Your email address..."
                    required
                    className="w-full text-xs sm:text-sm md:text-base text-[#1C222E] placeholder-gray-400 bg-transparent focus:outline-none pr-2"
                  />

                  <button
                    type="submit"
                    className="bg-[#F26522] hover:bg-[#d85416] text-white px-5 sm:px-7 py-2.5 sm:py-3 rounded-full font-bold text-xs sm:text-sm uppercase tracking-wider transition-all shadow-sm hover:shadow-md flex items-center gap-1.5 flex-shrink-0 active:scale-95"
                  >
                    <span>SUBSCRIBE</span>
                    <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 stroke-[2.5]" />
                  </button>
                </form>
              )}
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
