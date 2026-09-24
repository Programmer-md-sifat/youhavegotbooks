import React, { useState, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { PageTransition } from '../Components/Common/PageTransition';
import { storesData, StoreItem } from '../Data/StoreData';
import { allBooksCatalog } from '../Data/BooksData';
import { useCartWishlist } from '../Context/CartWishlistContext';
import {
  Phone,
  Star,
  ChevronRight,
  SlidersHorizontal,
  LayoutGrid,
  List,
  Search,
  X,
  MapPin,
  Mail,
  BookOpen,
  CheckCircle2,
  Building,
  ArrowRight,
  ExternalLink,
  ShoppingBag,
} from 'lucide-react';

export const StorePage: React.FC = () => {
  const navigate = useNavigate();
  const { addToCart, setQuickViewBook } = useCartWishlist();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCountry, setSelectedCountry] = useState('ALL');
  const [sortBy, setSortBy] = useState<'recent' | 'rating' | 'name' | 'books'>('recent');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showFilterPanel, setShowFilterPanel] = useState(false);
  const [selectedStore, setSelectedStore] = useState<StoreItem | null>(null);

  // Available unique countries for filter pills
  const countries = useMemo(() => {
    const list = Array.from(new Set(storesData.map((s) => s.country)));
    return ['ALL', ...list];
  }, []);

  // Filter & Sort stores
  const filteredStores = useMemo(() => {
    let list = storesData.filter((store) => {
      const matchesSearch =
        store.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        store.address.toLowerCase().includes(searchQuery.toLowerCase()) ||
        store.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
        store.country.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesCountry = selectedCountry === 'ALL' || store.country === selectedCountry;

      return matchesSearch && matchesCountry;
    });

    if (sortBy === 'rating') {
      list = [...list].sort((a, b) => b.rating - a.rating || b.reviewsCount - a.reviewsCount);
    } else if (sortBy === 'name') {
      list = [...list].sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortBy === 'books') {
      list = [...list].sort((a, b) => b.totalBooks - a.totalBooks);
    }

    return list;
  }, [searchQuery, selectedCountry, sortBy]);

  // Featured books for selected store modal
  const storeBooks = useMemo(() => {
    if (!selectedStore) return [];
    // Select curated books for the store
    return allBooksCatalog.slice(0, 4);
  }, [selectedStore]);

  // Render stylized logo based on store type
  const renderStoreLogo = (store: StoreItem) => {
    switch (store.logoType) {
      case 'blue':
        return (
          <div
            className="w-14 h-14 rounded-2xl flex flex-col items-center justify-center text-white shadow-md transition-transform group-hover:scale-105"
            style={{ backgroundColor: store.logoBg }}
          >
            <div className="w-6 h-6 rounded-full border-2 border-white flex items-center justify-center">
              <div className="w-2.5 h-2.5 bg-white rounded-full" />
            </div>
            <span className="text-[7px] font-black tracking-tighter uppercase mt-0.5 opacity-90">
              LOREM IPSUM
            </span>
          </div>
        );
      case 'peach':
        return (
          <div
            className="w-14 h-14 rounded-2xl flex flex-col items-center justify-center text-white shadow-md transition-transform group-hover:scale-105"
            style={{ backgroundColor: store.logoBg }}
          >
            <div className="flex items-center gap-0.5">
              <span className="text-sm font-black italic tracking-tighter">g</span>
              <span className="text-xs font-bold">●</span>
            </div>
            <span className="text-[7px] font-black tracking-tighter uppercase mt-0.5 opacity-90">
              LOREM IPSUM
            </span>
          </div>
        );
      case 'pink':
        return (
          <div
            className="w-14 h-14 rounded-2xl flex flex-col items-center justify-center text-white shadow-md transition-transform group-hover:scale-105"
            style={{ backgroundColor: store.logoBg }}
          >
            <div className="w-5 h-5 flex items-center justify-center">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-5 h-5">
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
              </svg>
            </div>
            <span className="text-[6px] font-black tracking-tighter uppercase mt-0.5 opacity-90">
              HEART BOOK
            </span>
          </div>
        );
      case 'purple':
        return (
          <div
            className="w-14 h-14 rounded-2xl flex flex-col items-center justify-center text-white shadow-md transition-transform group-hover:scale-105"
            style={{ backgroundColor: store.logoBg }}
          >
            <Building className="w-5 h-5 stroke-[2.5]" />
            <span className="text-[7px] font-black tracking-tighter uppercase mt-0.5 opacity-90">
              VAULT PRESS
            </span>
          </div>
        );
      case 'emerald':
        return (
          <div
            className="w-14 h-14 rounded-2xl flex flex-col items-center justify-center text-white shadow-md transition-transform group-hover:scale-105"
            style={{ backgroundColor: store.logoBg }}
          >
            <BookOpen className="w-5 h-5 stroke-[2.5]" />
            <span className="text-[7px] font-black tracking-tighter uppercase mt-0.5 opacity-90">
              EMERALD
            </span>
          </div>
        );
      default:
        return (
          <div
            className="w-14 h-14 rounded-2xl flex flex-col items-center justify-center text-white shadow-md transition-transform group-hover:scale-105"
            style={{ backgroundColor: store.logoBg }}
          >
            <Star className="w-5 h-5 fill-current" />
            <span className="text-[7px] font-black tracking-tighter uppercase mt-0.5 opacity-90">
              SOLARIS
            </span>
          </div>
        );
    }
  };

  return (
    <PageTransition>
      <div className="w-full bg-[#FAF9F6] min-h-screen pb-20">
        
        {/* 1. Header Banner & Breadcrumb (Matches Uploaded Screenshot) */}
        <div className="w-full bg-[#F3F4F6]/80 border-b border-gray-200/70 py-10 sm:py-14">
          <div className="max-w-[1440px] mx-auto px-6 sm:px-8 lg:px-12 xl:px-16 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <h1 className="text-3xl sm:text-4xl lg:text-[42px] font-black text-[#111827] tracking-tight">
              Store List
            </h1>

            {/* Breadcrumbs */}
            <div className="flex items-center gap-2 text-xs uppercase font-bold tracking-wider">
              <Link to="/" className="text-gray-400 hover:text-gray-600 transition-colors">
                HOME
              </Link>
              <span className="text-gray-300">→</span>
              <span className="text-[#FF4E3E] font-extrabold">STORE LIST</span>
            </div>
          </div>
        </div>

        {/* 2. Main Body Container */}
        <div className="max-w-[1440px] mx-auto px-6 sm:px-8 lg:px-12 xl:px-16 pt-8 sm:pt-10">
          
          {/* Top Filter & Toolbar Card (Matches Screenshot) */}
          <div className="bg-white rounded-2xl sm:rounded-3xl border border-gray-100 shadow-[0_2px_14px_rgba(0,0,0,0.03)] p-4 sm:px-6 mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
            
            {/* Left: Total Stores Count */}
            <div className="text-sm font-semibold text-gray-500">
              Total stores showing: <span className="font-extrabold text-[#111827]">{filteredStores.length}</span>
            </div>

            {/* Right Controls: Filter Button, Sort Dropdown, Grid/List Toggles */}
            <div className="flex flex-wrap items-center gap-3 sm:gap-4">
              
              {/* Red/Orange Filter Pill Button */}
              <button
                type="button"
                onClick={() => setShowFilterPanel(!showFilterPanel)}
                className="bg-[#FF4E3E] hover:bg-[#E03A2B] active:scale-95 text-white px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider flex items-center gap-2 shadow-sm transition-all cursor-pointer"
              >
                <SlidersHorizontal className="w-3.5 h-3.5" />
                <span>Filter</span>
              </button>

              {/* Sort By Dropdown */}
              <div className="relative flex items-center">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  aria-label="Sort stores"
                  className="bg-transparent text-xs font-semibold text-gray-700 pl-3 pr-8 py-2 border border-gray-200 rounded-full hover:border-gray-300 focus:outline-none focus:ring-1 focus:ring-[#FF4E3E] cursor-pointer appearance-none"
                >
                  <option value="recent">Sort by: Most Recent</option>
                  <option value="rating">Sort by: Highest Rated</option>
                  <option value="name">Sort by: Alphabetical (A-Z)</option>
                  <option value="books">Sort by: Catalog Size</option>
                </select>
                <div className="pointer-events-none absolute right-3 text-gray-400">
                  <ChevronRight className="w-3.5 h-3.5 rotate-90" />
                </div>
              </div>

              {/* View Mode Toggle Icons */}
              <div className="flex items-center gap-1 bg-gray-50 border border-gray-200 rounded-full p-1">
                <button
                  type="button"
                  onClick={() => setViewMode('grid')}
                  aria-label="Grid view"
                  className={`p-1.5 rounded-full transition-colors ${
                    viewMode === 'grid'
                      ? 'bg-white text-[#FF4E3E] shadow-xs'
                      : 'text-gray-400 hover:text-gray-600'
                  }`}
                >
                  <LayoutGrid className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => setViewMode('list')}
                  aria-label="List view"
                  className={`p-1.5 rounded-full transition-colors ${
                    viewMode === 'list'
                      ? 'bg-white text-[#FF4E3E] shadow-xs'
                      : 'text-gray-400 hover:text-gray-600'
                  }`}
                >
                  <List className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* 3. Collapsible Filter Panel (When Filter button is clicked) */}
          {showFilterPanel && (
            <div className="bg-white rounded-3xl border border-gray-100 shadow-md p-6 mb-8 animate-in fade-in slide-in-from-top-3 duration-200">
              <div className="flex items-center justify-between pb-4 border-b border-gray-100 mb-5">
                <h3 className="text-sm font-bold text-[#111827] uppercase tracking-wider flex items-center gap-2">
                  <SlidersHorizontal className="w-4 h-4 text-[#FF4E3E]" />
                  <span>Filter Store Directory</span>
                </h3>
                <button
                  onClick={() => setShowFilterPanel(false)}
                  className="text-gray-400 hover:text-gray-600 p-1 rounded-full hover:bg-gray-100"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Search query input */}
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">
                    Search Store / City
                  </label>
                  <div className="relative">
                    <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="e.g. Barone, Gregstore, Malaysia..."
                      className="w-full pl-10 pr-4 py-2.5 text-xs bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-[#FF4E3E] focus:bg-white transition-colors"
                    />
                    {searchQuery && (
                      <button
                        onClick={() => setSearchQuery('')}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                </div>

                {/* Country Filter Pills */}
                <div className="md:col-span-2">
                  <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">
                    Filter by Country
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {countries.map((country) => (
                      <button
                        key={country}
                        onClick={() => setSelectedCountry(country)}
                        className={`px-4 py-2 rounded-full text-xs font-bold transition-all cursor-pointer ${
                          selectedCountry === country
                            ? 'bg-[#FF4E3E] text-white shadow-sm'
                            : 'bg-gray-50 text-gray-600 hover:bg-gray-100 border border-gray-200'
                        }`}
                      >
                        {country}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* 4. Store Cards Grid (3 Columns matching uploaded screenshot) */}
          {viewMode === 'grid' ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {filteredStores.map((store) => (
                <div
                  key={store.id}
                  className="bg-[#F7F8F9] hover:bg-[#F2F4F7] rounded-3xl border border-gray-200/70 p-7 flex flex-col justify-between shadow-[0_2px_12px_rgba(0,0,0,0.02)] hover:shadow-lg transition-all duration-300 group relative cursor-pointer"
                  onClick={() => setSelectedStore(store)}
                >
                  {/* Card Content Top */}
                  <div>
                    {/* Store Title */}
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <h2 className="text-xl sm:text-[22px] font-black text-[#111827] tracking-tight group-hover:text-[#FF4E3E] transition-colors">
                        {store.name}
                      </h2>
                    </div>

                    {/* Star Rating */}
                    <div className="flex items-center gap-1 mb-3">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-3.5 h-3.5 ${
                            i < store.rating
                              ? 'fill-[#F59E0B] text-[#F59E0B]'
                              : 'fill-none text-gray-300 stroke-[1.5]'
                          }`}
                        />
                      ))}
                    </div>

                    {/* Store Address */}
                    <p className="text-xs sm:text-sm text-gray-600 font-normal leading-relaxed mb-4 line-clamp-2">
                      {store.address}
                    </p>

                    {/* Store Phone */}
                    <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-700 font-medium">
                      <Phone className="w-3.5 h-3.5 text-gray-500" />
                      <span>{store.phone}</span>
                    </div>
                  </div>

                  {/* Card Footer: Red/Orange Arrow Button & Store Logo Badge */}
                  <div className="flex items-center justify-between pt-6 mt-6 border-t border-gray-200/50">
                    {/* Red Circular Arrow Action Button */}
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedStore(store);
                      }}
                      className="w-10 h-10 rounded-full bg-[#FF4E3E] hover:bg-[#E03A2B] text-white flex items-center justify-center shadow-md shadow-[#FF4E3E]/20 hover:scale-110 active:scale-95 transition-all cursor-pointer"
                      aria-label={`View ${store.name} details`}
                    >
                      <ChevronRight className="w-4 h-4 stroke-[3]" />
                    </button>

                    {/* Floating Stylized Store Logo */}
                    {renderStoreLogo(store)}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            /* List View */
            <div className="space-y-4">
              {filteredStores.map((store) => (
                <div
                  key={store.id}
                  className="bg-[#F7F8F9] hover:bg-[#F2F4F7] rounded-3xl border border-gray-200/70 p-6 sm:p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 shadow-sm hover:shadow-md transition-all cursor-pointer group"
                  onClick={() => setSelectedStore(store)}
                >
                  <div className="flex items-start sm:items-center gap-5">
                    {renderStoreLogo(store)}
                    <div>
                      <h2 className="text-lg sm:text-xl font-extrabold text-[#111827] group-hover:text-[#FF4E3E] transition-colors">
                        {store.name}
                      </h2>
                      <div className="flex items-center gap-1 my-1">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-3.5 h-3.5 ${
                              i < store.rating
                                ? 'fill-[#F59E0B] text-[#F59E0B]'
                                : 'fill-none text-gray-300 stroke-[1.5]'
                            }`}
                          />
                        ))}
                        <span className="text-xs text-gray-400 font-semibold ml-2">
                          ({store.reviewsCount} reviews)
                        </span>
                      </div>
                      <p className="text-xs sm:text-sm text-gray-600 mt-1 max-w-xl">
                        {store.address}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 self-end sm:self-center">
                    <div className="text-right hidden md:block">
                      <span className="text-xs text-gray-500 font-medium block">{store.phone}</span>
                      <span className="text-[11px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full inline-block mt-1">
                        {store.totalBooks} Available Books
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedStore(store);
                      }}
                      className="w-10 h-10 rounded-full bg-[#FF4E3E] hover:bg-[#E03A2B] text-white flex items-center justify-center shadow-md active:scale-95 transition-all"
                    >
                      <ChevronRight className="w-4 h-4 stroke-[3]" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Empty State */}
          {filteredStores.length === 0 && (
            <div className="bg-white rounded-3xl border border-gray-100 p-12 text-center my-8">
              <div className="w-16 h-16 bg-orange-50 text-[#FF4E3E] rounded-full flex items-center justify-center mx-auto mb-4">
                <Building className="w-8 h-8" />
              </div>
              <h3 className="text-lg font-bold text-[#111827]">No stores found</h3>
              <p className="text-xs text-gray-500 mt-1 max-w-md mx-auto">
                No stores match your search query &quot;{searchQuery}&quot;. Try adjusting your filters.
              </p>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCountry('ALL');
                }}
                className="mt-5 px-6 py-2.5 rounded-full bg-[#FF4E3E] text-white text-xs font-bold uppercase tracking-wider"
              >
                Reset All Filters
              </button>
            </div>
          )}

          {/* Bottom Callout Banner for New Store Partners */}
          <div className="mt-16 bg-gradient-to-r from-[#1C222E] to-[#28303F] rounded-3xl p-8 sm:p-12 text-white flex flex-col md:flex-row items-center justify-between gap-8 shadow-xl relative overflow-hidden">
            <div className="relative z-10 max-w-xl">
              <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#FF4E3E] bg-[#FF4E3E]/15 px-3 py-1 rounded-full border border-[#FF4E3E]/30">
                Partner With Us
              </span>
              <h3 className="text-2xl sm:text-3xl font-black tracking-tight mt-3">
                Own an Independent Bookstore or Publishing Press?
              </h3>
              <p className="text-xs sm:text-sm text-gray-300 mt-2 leading-relaxed">
                Connect your inventory to 500,000+ readers across the globe. Benefit from verified collector spotlights, integrated worldwide shipping, and premium placement.
              </p>
            </div>

            <div className="relative z-10 flex-shrink-0">
              <button
                onClick={() => navigate('/contact')}
                className="px-8 py-3.5 rounded-full bg-[#FF4E3E] hover:bg-[#E03A2B] text-white text-xs sm:text-sm font-black uppercase tracking-wider shadow-lg shadow-[#FF4E3E]/40 hover:scale-105 active:scale-95 transition-all flex items-center gap-2 cursor-pointer"
              >
                <span>Register Store</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* 5. Interactive Store Profile Modal */}
        {selectedStore && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
            <div className="bg-white rounded-3xl max-w-3xl w-full shadow-2xl border border-gray-100 overflow-hidden relative animate-in zoom-in-95 duration-200 max-h-[90vh] flex flex-col">
              
              {/* Modal Header Banner */}
              <div className="relative h-44 sm:h-52 w-full overflow-hidden bg-slate-900">
                <img
                  src={selectedStore.bannerImage}
                  alt={selectedStore.name}
                  className="w-full h-full object-cover opacity-60"
                />
                <button
                  onClick={() => setSelectedStore(null)}
                  className="absolute top-4 right-4 w-9 h-9 rounded-full bg-black/60 hover:bg-black text-white flex items-center justify-center backdrop-blur-md transition-colors z-20 cursor-pointer"
                  aria-label="Close modal"
                >
                  <X className="w-5 h-5" />
                </button>

                {/* Floating Store Brand in Header */}
                <div className="absolute bottom-4 left-6 flex items-end gap-4">
                  {renderStoreLogo(selectedStore)}
                  <div className="text-white pb-1">
                    <div className="flex items-center gap-2">
                      <h2 className="text-2xl font-black">{selectedStore.name}</h2>
                      {selectedStore.verified && (
                        <CheckCircle2 className="w-5 h-5 text-emerald-400 fill-emerald-400 text-slate-900" />
                      )}
                    </div>
                    <p className="text-xs text-gray-300 flex items-center gap-1 mt-0.5">
                      <MapPin className="w-3.5 h-3.5 text-[#FF4E3E]" />
                      <span>{selectedStore.city}, {selectedStore.country}</span>
                    </p>
                  </div>
                </div>
              </div>

              {/* Modal Body */}
              <div className="p-6 sm:p-8 overflow-y-auto flex-1 space-y-6">
                {/* Info Pills */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div className="bg-gray-50 p-3 rounded-2xl border border-gray-100">
                    <span className="text-[10px] uppercase font-bold text-gray-400 block">Rating</span>
                    <div className="flex items-center gap-1.5 mt-0.5">
                      <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                      <span className="text-sm font-extrabold text-[#111827]">{selectedStore.rating}.0</span>
                      <span className="text-xs text-gray-500">({selectedStore.reviewsCount} reviews)</span>
                    </div>
                  </div>

                  <div className="bg-gray-50 p-3 rounded-2xl border border-gray-100">
                    <span className="text-[10px] uppercase font-bold text-gray-400 block">Inventory</span>
                    <div className="flex items-center gap-1.5 mt-0.5">
                      <BookOpen className="w-4 h-4 text-[#FF4E3E]" />
                      <span className="text-sm font-extrabold text-[#111827]">{selectedStore.totalBooks}+ Books</span>
                    </div>
                  </div>

                  <div className="bg-gray-50 p-3 rounded-2xl border border-gray-100">
                    <span className="text-[10px] uppercase font-bold text-gray-400 block">Contact Phone</span>
                    <div className="flex items-center gap-1.5 mt-0.5">
                      <Phone className="w-4 h-4 text-emerald-600" />
                      <span className="text-xs font-bold text-gray-800">{selectedStore.phone}</span>
                    </div>
                  </div>
                </div>

                {/* Description & Address */}
                <div>
                  <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">
                    About This Store
                  </h4>
                  <p className="text-sm text-gray-700 leading-relaxed">
                    {selectedStore.description}
                  </p>
                  <div className="mt-3 flex items-start gap-2 text-xs text-gray-600 bg-orange-50/50 p-3 rounded-xl border border-orange-100">
                    <MapPin className="w-4 h-4 text-[#FF4E3E] flex-shrink-0 mt-0.5" />
                    <span>{selectedStore.address}</span>
                  </div>
                </div>

                {/* Featured Books from this store */}
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider">
                      Featured Titles from {selectedStore.name}
                    </h4>
                    <Link
                      to="/books"
                      onClick={() => setSelectedStore(null)}
                      className="text-xs font-bold text-[#FF4E3E] hover:underline flex items-center gap-1"
                    >
                      <span>View All Titles</span>
                      <ExternalLink className="w-3 h-3" />
                    </Link>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {storeBooks.map((book) => (
                      <div
                        key={book.id}
                        className="bg-gray-50 rounded-2xl p-2.5 border border-gray-100 flex flex-col justify-between group/book"
                      >
                        <div>
                          <div className="aspect-[3/4] w-full rounded-xl overflow-hidden bg-gray-200 mb-2 relative">
                            <img
                              src={book.coverImage}
                              alt={book.title}
                              className="w-full h-full object-cover group-hover/book:scale-105 transition-transform"
                            />
                            <button
                              type="button"
                              onClick={() => {
                                setSelectedStore(null);
                                setQuickViewBook(book);
                              }}
                              className="absolute inset-0 bg-black/40 opacity-0 group-hover/book:opacity-100 flex items-center justify-center text-white text-[10px] font-bold uppercase transition-opacity"
                            >
                              Quick View
                            </button>
                          </div>
                          <h5 className="text-xs font-bold text-gray-900 truncate">{book.title}</h5>
                          <p className="text-[10px] text-gray-500 truncate">{book.author}</p>
                        </div>
                        <div className="mt-2 flex items-center justify-between pt-2 border-t border-gray-200/50">
                          <span className="text-xs font-black text-[#FF4E3E]">${book.price.toFixed(2)}</span>
                          <button
                            type="button"
                            onClick={() => addToCart(book)}
                            className="p-1 rounded-lg bg-white hover:bg-[#FF4E3E] hover:text-white text-gray-700 shadow-xs transition-colors"
                            title="Add to cart"
                          >
                            <ShoppingBag className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Modal Footer */}
              <div className="p-4 sm:px-8 bg-gray-50 border-t border-gray-100 flex items-center justify-between">
                <span className="text-xs text-gray-500">
                  Verified Bookseller since {selectedStore.joinedDate}
                </span>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setSelectedStore(null)}
                    className="px-5 py-2 rounded-full border border-gray-300 text-xs font-bold text-gray-700 hover:bg-gray-100"
                  >
                    Close
                  </button>
                  <button
                    onClick={() => {
                      setSelectedStore(null);
                      navigate('/books');
                    }}
                    className="px-6 py-2 rounded-full bg-[#FF4E3E] hover:bg-[#E03A2B] text-white text-xs font-bold uppercase tracking-wider shadow-sm"
                  >
                    Shop Store
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

      </div>
    </PageTransition>
  );
};
