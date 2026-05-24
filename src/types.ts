export interface BirthdayProfile {
  name: string;
  birthdayDate: string; // e.g. "2026-09-20" or any custom date
  tagline: string;
  mainImage: string;
  themeColor: "rockstar-pink" | "retro-purple" | "cyber-cyan" | "sweet-peach" | "sunny-yellow";
  soundtrack: string;
  artistName: string;
  musicType: "synthesized" | "ambient" | "cheerful";
}

export interface MemoryItem {
  id: string;
  title: string;
  date: string;
  description: string;
  image: string;
  category: "Party" | "Travel" | "Milestones" | "Friends" | "Festival" | "Birthday";
  tag: string;
}

export interface WishItem {
  id: string;
  sender: string;
  vibe: string;
  relationship: string;
  message: string;
  emoji: string;
  likes: number;
  timestamp: string;
}

export interface GiftItem {
  id: string;
  title: string;
  description: string;
  unveiled: boolean;
  sticker: string;
  colorClass: string;
}
