export interface HeroSlide {
  id: string;
  badge: string;
  titlePrefix: string;
  titleHighlight: string;
  description: string;
  price: number;
  originalPrice: number;
  discountPercentage: number;
  curatorNote: string;
  primaryBook: {
    title: string;
    author: string;
    badgeText: string;
    coverUrl: string;
    genre: string;
  };
  secondaryBook: {
    title: string;
    author: string;
    coverUrl: string;
    genre: string;
  };
  rating: number;
  ratingCount: string;
  readerAvatars: string[];
}

export interface CategoryItem {
  id: string;
  name: string;
  itemCount: number;
  iconName: string;
  slug: string;
  color: string;
}

export interface BookItem {
  id: string;
  title: string;
  author: string;
  coverImage: string;
  price: number;
  originalPrice?: number;
  priceRange?: string;
  rating: number;
  reviewsCount: number;
  badge?: string;
  genre: string;
  synopsis: string;
  format: ('Hardcover' | 'Paperback' | 'E-Book' | 'Audiobook' | 'E-book' | 'Hardcopy')[];
  inStock: boolean;
  pages: number;
  publishYear: number;
}

export interface ReviewItem {
  id: string;
  name: string;
  role: string;
  avatar: string;
  rating: number;
  date: string;
  comment: string;
  bookMentioned: string;
}

export const heroSlidesData: HeroSlide[] = [
  {
    id: 'slide-1',
    badge: "2026 EDITORS' CHOICE & BESTSELLERS",
    titlePrefix: 'Discover Stories That',
    titleHighlight: 'Ignite Your Mind',
    description:
      'Explore handpicked literary masterpieces, epic sci-fi sagas, and transformative non-fiction. Curated by expert bibliophiles with express worldwide delivery.',
    price: 24.55,
    originalPrice: 45.50,
    discountPercentage: 46,
    curatorNote: 'An intoxicating journey across uncharted imagination.',
    primaryBook: {
      title: 'CHRONICLES OF DARKNESS',
      author: 'K. W. PADLEY',
      badgeText: '#1 BEST SELLER',
      coverUrl: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=700&q=80',
      genre: 'Epic Dark Fantasy',
    },
    secondaryBook: {
      title: 'PIRANESI',
      author: 'SUSANNA CLARKE',
      coverUrl: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&w=700&q=80',
      genre: 'Magical Realism & Architecture',
    },
    rating: 4.9,
    ratingCount: '18,400+ verified readers worldwide',
    readerAvatars: [
      'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80',
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&q=80',
      'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=120&q=80',
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=120&q=80',
    ],
  },
  {
    id: 'slide-2',
    badge: 'NEW YORK TIMES CRITICS PICK',
    titlePrefix: 'Timeless Classics With',
    titleHighlight: 'A Modern Spark',
    description:
      'Immerse in award-winning prose from luminous contemporary voices, philosophical inquiries, and rare collector slipcase editions crafted for generations.',
    price: 28.00,
    originalPrice: 42.00,
    discountPercentage: 33,
    curatorNote: 'A poetic tour de force that redefines modern worldbuilding.',
    primaryBook: {
      title: 'THE ATLAS COMPLEX',
      author: 'OLIVIE BLAKE',
      badgeText: 'AWARD WINNER',
      coverUrl: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=700&q=80',
      genre: 'Dark Academia & Sci-Fi',
    },
    secondaryBook: {
      title: 'KARA NO SHOJO',
      author: 'MASTERS OF MYSTERY',
      coverUrl: 'https://images.unsplash.com/photo-1476275466078-4007374efbbe?auto=format&fit=crop&w=700&q=80',
      genre: 'Detective Fiction',
    },
    rating: 4.95,
    ratingCount: '12,900+ verified readers worldwide',
    readerAvatars: [
      'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=120&q=80',
      'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=120&q=80',
      'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=120&q=80',
      'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=120&q=80',
    ],
  },
  {
    id: 'slide-3',
    badge: 'LIMITED COLLECTOR EDITIONS',
    titlePrefix: 'Bound In Gold For',
    titleHighlight: 'True Bibliophiles',
    description:
      'Archival-grade paper, foil stamped ribbons, and signed author tip-ins. Every volume is a sanctuary of sensory contemplation.',
    price: 38.50,
    originalPrice: 65.00,
    discountPercentage: 40,
    curatorNote: 'Physical craftsmanship as breathtaking as the literary world inside.',
    primaryBook: {
      title: 'A DAWN OF FEATHERS',
      author: 'ELIZABETH VANE',
      badgeText: 'SIGNED COPY',
      coverUrl: 'https://images.unsplash.com/photo-1521123845560-14093637aa7d?auto=format&fit=crop&w=700&q=80',
      genre: 'Gothic Romance & Lore',
    },
    secondaryBook: {
      title: 'ECHOES OF ETERNITY',
      author: 'A. R. SULLIVAN',
      coverUrl: 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&w=700&q=80',
      genre: 'Philosophical Speculation',
    },
    rating: 5.0,
    ratingCount: '9,850+ collectors worldwide',
    readerAvatars: [
      'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=120&q=80',
      'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80',
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&q=80',
      'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=120&q=80',
    ],
  },
];

export const categoriesData: CategoryItem[] = [
  { id: 'cat-1', name: 'Sci-Fi & Cyberpunk', itemCount: 1420, iconName: 'Compass', slug: 'sci-fi', color: 'from-orange-500/10 to-amber-500/10' },
  { id: 'cat-2', name: 'Epic Dark Fantasy', itemCount: 980, iconName: 'Flame', slug: 'fantasy', color: 'from-purple-500/10 to-indigo-500/10' },
  { id: 'cat-3', name: 'Literary Masterpieces', itemCount: 2150, iconName: 'BookOpen', slug: 'literary', color: 'from-emerald-500/10 to-teal-500/10' },
  { id: 'cat-4', name: 'Philosophy & Mind', itemCount: 680, iconName: 'Brain', slug: 'philosophy', color: 'from-blue-500/10 to-cyan-500/10' },
  { id: 'cat-5', name: 'Psychological Thriller', itemCount: 1120, iconName: 'Eye', slug: 'thriller', color: 'from-rose-500/10 to-red-500/10' },
  { id: 'cat-6', name: 'Art & Architecture', itemCount: 540, iconName: 'Sparkles', slug: 'art', color: 'from-amber-500/10 to-yellow-500/10' },
  { id: 'cat-7', name: 'Historical Chronicles', itemCount: 870, iconName: 'Clock', slug: 'history', color: 'from-stone-500/10 to-neutral-500/10' },
  { id: 'cat-8', name: 'Poetry & Lore', itemCount: 410, iconName: 'Feather', slug: 'poetry', color: 'from-pink-500/10 to-rose-500/10' },
];

export const bestsellerBooksData: BookItem[] = [
  {
    id: 'book-1',
    title: 'Chronicles of Darkness',
    author: 'K. W. Padley',
    coverImage: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=700&q=80',
    price: 24.55,
    originalPrice: 45.50,
    rating: 4.9,
    reviewsCount: 3840,
    badge: '46% OFF',
    genre: 'Epic Fantasy',
    synopsis: 'When the twin suns eclipse behind the obsidian veil, an apprentice astronomer uncovers a forgotten incantation capable of shifting tectonic realms.',
    format: ['Hardcover', 'Paperback', 'E-Book'],
    inStock: true,
    pages: 542,
    publishYear: 2025,
  },
  {
    id: 'book-2',
    title: 'Piranesi: The Infinite Halls',
    author: 'Susanna Clarke',
    coverImage: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&w=700&q=80',
    price: 19.99,
    originalPrice: 32.00,
    rating: 4.85,
    reviewsCount: 4210,
    badge: 'STAFF PICK',
    genre: 'Magical Realism',
    synopsis: 'Piranesi lives in the House. Perhaps he always has. In his notebooks day after day, he makes a clear and careful record of its endless halls and tides.',
    format: ['Hardcover', 'Paperback', 'Audiobook'],
    inStock: true,
    pages: 272,
    publishYear: 2024,
  },
  {
    id: 'book-3',
    title: 'The Silent Citadel',
    author: 'Eleanor Sterling',
    coverImage: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=700&q=80',
    price: 26.50,
    originalPrice: 38.00,
    rating: 4.92,
    reviewsCount: 1950,
    badge: 'BESTSELLER',
    genre: 'Dark Academia',
    synopsis: 'Six secret scholars gather under the ancient clocktower of Saint Jude, only to discover their thesis is predicting their own vanished memories.',
    format: ['Hardcover', 'E-Book', 'Audiobook'],
    inStock: true,
    pages: 480,
    publishYear: 2025,
  },
  {
    id: 'book-4',
    title: 'Starlight Through Fractures',
    author: 'Marcus Vance',
    coverImage: 'https://images.unsplash.com/photo-1476275466078-4007374efbbe?auto=format&fit=crop&w=700&q=80',
    price: 22.00,
    originalPrice: 30.00,
    rating: 4.78,
    reviewsCount: 890,
    badge: 'NEW',
    genre: 'Sci-Fi Speculation',
    synopsis: 'Deep space explorers receive an analog transmission echoing from inside a dead neutron star, carrying audio logs in 19th-century Morse code.',
    format: ['Paperback', 'E-Book'],
    inStock: true,
    pages: 360,
    publishYear: 2026,
  },
  {
    id: 'book-5',
    title: 'The Philosophy of Solitude',
    author: 'Dr. Evelyn Rousseau',
    coverImage: 'https://images.unsplash.com/photo-1521123845560-14093637aa7d?auto=format&fit=crop&w=700&q=80',
    price: 31.20,
    originalPrice: 48.00,
    rating: 4.95,
    reviewsCount: 2480,
    badge: 'EDITOR CHOICE',
    genre: 'Philosophy & Mind',
    synopsis: 'A profound exploration of quiet spaces, artistic clarity, and mental tranquility in a hyper-connected noise-saturated global era.',
    format: ['Hardcover', 'Paperback', 'E-Book', 'Audiobook'],
    inStock: true,
    pages: 320,
    publishYear: 2025,
  },
  {
    id: 'book-6',
    title: 'Echoes of The North Sea',
    author: 'Astrid Lindholm',
    coverImage: 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&w=700&q=80',
    price: 21.50,
    originalPrice: 34.00,
    rating: 4.88,
    reviewsCount: 1620,
    badge: 'BESTSELLER',
    genre: 'Nordic Mystery',
    synopsis: 'A solitary lighthouse keeper off the rugged Norwegian fjords finds a cedar chest washed ashore containing unwritten diaries bound in sea silk.',
    format: ['Hardcover', 'Paperback'],
    inStock: true,
    pages: 410,
    publishYear: 2025,
  },
];

export const readersReviews: ReviewItem[] = [
  {
    id: 'rev-1',
    name: 'Julian Montgomery',
    role: 'Literature Professor, Oxford',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&q=80',
    rating: 5,
    date: 'March 14, 2026',
    comment:
      'LunarBooks has restored my love for collecting physical volumes. The packaging is heirloom-grade, the typography choices are sublime, and their shipping across the Atlantic was impeccably swift.',
    bookMentioned: 'Chronicles of Darkness',
  },
  {
    id: 'rev-2',
    name: 'Elena Rostova',
    role: 'Architectural Historian',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80',
    rating: 5,
    date: 'March 02, 2026',
    comment:
      'The curation here is unmatched. It feels like browsing the private library of an eccentric philosopher. The edition of Piranesi I received is the crowning jewel of my bookshelf.',
    bookMentioned: 'Piranesi: The Infinite Halls',
  },
  {
    id: 'rev-3',
    name: 'Harrison Kane',
    role: 'Award-winning Screenwriter',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=120&q=80',
    rating: 5,
    date: 'February 26, 2026',
    comment:
      'I turn to LunarBooks whenever I hit creative blocks. Every title recommendation sparks genuine wonder. Customer support is handled by actual bibliophiles who know literature inside out.',
    bookMentioned: 'The Silent Citadel',
  },
];

export const trustFeatures = [
  {
    title: 'Express Worldwide Delivery',
    description: 'Tracked carbon-neutral shipping to over 120 countries, safely packaged.',
    icon: 'Truck',
  },
  {
    title: '100% Genuine First Editions',
    description: 'Guaranteed authentic publisher printings, foil-stamped, and direct from houses.',
    icon: 'ShieldCheck',
  },
  {
    title: '30-Day Hassle-Free Returns',
    description: 'Love your reading experience or return within 30 days for a courteous refund.',
    icon: 'RotateCcw',
  },
  {
    title: '24/7 Bibliophile Concierge',
    description: 'Live recommendations and order assistance from certified book experts.',
    icon: 'Headphones',
  },
];
