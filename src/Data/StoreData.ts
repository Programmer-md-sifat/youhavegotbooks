export interface StoreItem {
  id: string;
  name: string;
  rating: number;
  reviewsCount: number;
  address: string;
  phone: string;
  email: string;
  logoBg: string;
  logoType: 'blue' | 'peach' | 'pink' | 'purple' | 'emerald' | 'amber';
  bannerImage: string;
  description: string;
  totalBooks: number;
  country: string;
  city: string;
  joinedDate: string;
  verified: boolean;
}

export const storesData: StoreItem[] = [
  {
    id: 'store-barone',
    name: 'Barone LLC.',
    rating: 4,
    reviewsCount: 128,
    address: '8502 Preston Rd. Inglewood, Maine 98380, Selangor, Malaysia',
    phone: '(406) 555-0120',
    email: 'contact@baronellc.com',
    logoBg: '#00A8E8',
    logoType: 'blue',
    bannerImage: 'https://images.unsplash.com/photo-1507842229451-79b1be897a27?auto=format&fit=crop&w=1200&q=80',
    description: 'Premier curator of rare academic volumes, scientific journals, and Southeast Asian historical manuscripts.',
    totalBooks: 1420,
    country: 'Malaysia',
    city: 'Selangor',
    joinedDate: '2023-01-15',
    verified: true,
  },
  {
    id: 'store-gregstore',
    name: 'Gregstore',
    rating: 5,
    reviewsCount: 254,
    address: '2715 Ash Dr. San Jose, South Dakota 83475, Free State, South Africa',
    phone: '(406) 555-0120',
    email: 'support@gregstore.co.za',
    logoBg: '#F4A261',
    logoType: 'peach',
    bannerImage: 'https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?auto=format&fit=crop&w=1200&q=80',
    description: 'Specializing in contemporary fiction, poetry chapbooks, and signed African literary collections.',
    totalBooks: 980,
    country: 'South Africa',
    city: 'Free State',
    joinedDate: '2022-08-20',
    verified: true,
  },
  {
    id: 'store-arlene',
    name: 'Arlene',
    rating: 5,
    reviewsCount: 310,
    address: '8502 Preston Rd. Inglewood, Maine 98380, Alaska, United States (US)',
    phone: '(406) 555-0120',
    email: 'orders@arlenebooks.com',
    logoBg: '#E6397B',
    logoType: 'pink',
    bannerImage: 'https://images.unsplash.com/photo-1457369804613-52c61a468e7d?auto=format&fit=crop&w=1200&q=80',
    description: 'Boutique antiquarian bookstore offering hand-bound leather hardcovers, first editions, and literary collectibles.',
    totalBooks: 2150,
    country: 'United States',
    city: 'Alaska',
    joinedDate: '2021-11-04',
    verified: true,
  },
  {
    id: 'store-blackwood',
    name: 'Blackwood & Co.',
    rating: 5,
    reviewsCount: 189,
    address: '4140 Parker Rd. Allentown, New Mexico 31134, London, United Kingdom',
    phone: '(406) 555-0144',
    email: 'hello@blackwoodbooks.co.uk',
    logoBg: '#8338EC',
    logoType: 'purple',
    bannerImage: 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&w=1200&q=80',
    description: 'Purveyor of rare gothic fiction, mystery thrillers, and vintage British classics.',
    totalBooks: 830,
    country: 'United Kingdom',
    city: 'London',
    joinedDate: '2023-04-12',
    verified: true,
  },
  {
    id: 'store-emerald-press',
    name: 'Emerald Press',
    rating: 4,
    reviewsCount: 94,
    address: '1901 Thornridge Cir. Shiloh, Hawaii 81063, Dublin, Ireland',
    phone: '(406) 555-0199',
    email: 'info@emeraldpress.ie',
    logoBg: '#2A9D8F',
    logoType: 'emerald',
    bannerImage: 'https://images.unsplash.com/photo-1495446815901-a7297e633e8d?auto=format&fit=crop&w=1200&q=80',
    description: 'Independent publishing press focusing on environmental humanities, nature poetry, and botanical art.',
    totalBooks: 620,
    country: 'Ireland',
    city: 'Dublin',
    joinedDate: '2023-09-01',
    verified: true,
  },
  {
    id: 'store-solaris-books',
    name: 'Solaris Vault',
    rating: 5,
    reviewsCount: 420,
    address: '3891 Ranchview Dr. Richardson, California 62639, Melbourne, Australia',
    phone: '(406) 555-0188',
    email: 'contact@solarisvault.com.au',
    logoBg: '#E76F51',
    logoType: 'amber',
    bannerImage: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?auto=format&fit=crop&w=1200&q=80',
    description: 'Leading speculative sci-fi and dystopian fiction distributor with signed limited edition hardcovers.',
    totalBooks: 1890,
    country: 'Australia',
    city: 'Melbourne',
    joinedDate: '2022-03-18',
    verified: true,
  },
];
