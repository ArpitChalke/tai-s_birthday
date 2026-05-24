import { BirthdayProfile, MemoryItem, WishItem, GiftItem } from "./types";

const ASSET_IMAGES = ((import.meta as any).glob('./assets/images/*', { eager: true, query: '?url', import: 'default' })) as Record<string, string>;
const normalizeAssetReference = (p: string) =>
  p
    .replace(/^\//, "")
    .replace(/^src\//, "")
    .replace(/^assets\//, "")
    .replace(/^images\//, "")
    .toLowerCase();

const getAsset = (p: string) => {
  if (!p) return p;
  const normalized = normalizeAssetReference(p);
  const key = Object.keys(ASSET_IMAGES).find((k) => {
    const fileName = k.split("/").pop()?.toLowerCase() ?? "";
    const fileNameWithoutExt = fileName.replace(/\.[^.]+$/, "");
    return fileName === normalized || fileNameWithoutExt === normalized;
  });
  return key ? ASSET_IMAGES[key] : p;
};

export const DEFAULT_PROFILE: BirthdayProfile = {
  name: "Tai",
  birthdayDate: "2026-05-24",
  tagline: "THE BEST BIG SISTER & FOREVER PARTNER IN CRIME! LOVE YOU SO MUCH! 💖👩‍❤️‍👩",
  mainImage: getAsset("/images/img-45"),
  themeColor: "rockstar-pink",
  soundtrack: "Rockstar Birthday Chime",
  artistName: "Synthesizer Orchestra",
  musicType: "synthesized"
};

export const DEFAULT_MEMORIES: MemoryItem[] = [
  {
    id: "mem-1",
    title: "Laxmi पूजन 2020",
    date: "Year 2020",
    description: "A warm family prayer ceremony full of flowers, incense, and gratitude for every blessing.",
    image: getAsset("/images/img-1"),
    category: "Festival",
    tag: "Traditional"
  },
  {
    id: "mem-2",
    title: "Ganpati 2022",
    date: "Monsoon 2022",
    description: "A colorful monsoon procession with drum beats, sweets, and the whole neighborhood chanting together.",
    image: getAsset("/images/img-2"),
    category: "Festival",
    tag: "Festive"
  },
  {
    id: "mem-3",
    title: "Laxmi Pujan 2022",
    date: "Year 2022",
    description: "A serene evening of prayers, diyas, and heartfelt wishes for prosperity and joy.",
    image: getAsset("/images/img-3"),
    category: "Festival",
    tag: "Blessed"
  },
  {
    id: "mem-4",
    title: "Hanuman Jayanti 2022",
    date: "Year 2022",
    description: "Temple rituals with family, sweets, and the infectious energy of devotional celebrations.",
    image: getAsset("/images/img-4"),
    category: "Festival",
    tag: "Joyful"
  },
  {
    id: "mem-5",
    title: "Birthday Celebration 2025",
    date: "24 May 2025",
    description: "A surprise birthday bash with cake, confetti, and the most unforgettable happy moments.",
    image: getAsset("/images/img-5"),
    category: "Birthday",
    tag: "Birthday"
  },
  {
    id: "mem-6",
    title: "Birthday celebration 2023",
    date: "Year 2025",
    description: "Late night laughter, heartfelt wishes, and a cozy birthday gathering with close friends.",
    image: getAsset("/images/img-6"),
    category: "Birthday",
    tag: "Birthday"
  },
  {
    id: "mem-7",
    title: "Ganpati 2024",
    date: "Year 2024",
    description: "A grand Ganpati celebration under the rain-washed sky with music, flowers, and joy.",
    image: getAsset("/images/img-7"),
    category: "Festival",
    tag: "Monsoon"
  },
  {
    id: "mem-8",
    title: "New and similar Hari cut",
    date: "Year 2026",
    description: "A cute style moment with a fresh haircut and the happiest, simplest smile.",
    image: getAsset("/images/img-8"),
    category: "Milestones",
    tag: "Adorable"
  },
  {
    id: "mem-9",
    title: "Birthday Celebration 2024",
    date: "Year 2024",
    description: "A heartfelt birthday memory filled with cake, candles, and family love.",
    image: getAsset("/images/img-9"),
    category: "Birthday",
    tag: "Birthday"
  },
  {
    id: "mem-10",
    title: "Certificate of Merit",
    date: "Year 2023",
    description: "A heartfelt birthday memory filled with cake, candles, and family love.",
    image: getAsset("/images/img-10"),
    category: "Milestones",
    tag: "Milestone"
  }
];

export const DEFAULT_WISHES: WishItem[] = [
  {
    id: "wish-1",
    sender: "Chloe (BFF)",
    relationship: "Best Friend",
    vibe: "Rockstar Charge",
    message: "HAPPY BIRTHDAY TO THE ABSOLUTE ROCK STAR! May your bass guidelines always be heavy, your cups never run dry, and your messy hair stay perfectly iconic. Let us take over the world this year! 🤘🔥",
    emoji: "🎸",
    likes: 38,
    timestamp: "Just now"
  },
  {
    id: "wish-2",
    sender: "Tyler & Sophy",
    relationship: "Cousins",
    vibe: "Funny Nostalgia Roast",
    message: "HBD from the team! Remember when you tried to stagedive off the living room leather sofa and completely missed the pile of pillows? We do. You are finally older and 'wiser', but hopefully you never stop being silly!",
    emoji: "🍕",
    likes: 27,
    timestamp: "2 hours ago"
  },
  {
    id: "wish-3",
    sender: "Nate (Tech Lead)",
    relationship: "Colleague",
    vibe: "Warm Wishes",
    message: "Happiest of birthdays! Honored to work with someone so relentlessly creative and positive. Wishing you smooth compiling, perfectly green test guidelines, zero compile issues, and massive cups of coffee!",
    emoji: "☕",
    likes: 15,
    timestamp: "4 hours ago"
  }
];

export const DEFAULT_GIFTS: GiftItem[] = [
  {
    id: "gift-1",
    title: "A Bouque Of Love",
    description: "It's a sunflower bouque for my flower who shines brighter than sun.",
    sticker: "🎫",
    colorClass: "from-pink-500 via-purple-600 to-indigo-700",
    unveiled: false
  },
  {
    id: "gift-2",
    title: "Infinite High-Fives",
    description: "Good for one epic high-five on demand anytime you feel awesome!",
    sticker: "🖐️",
    colorClass: "from-cyan-400 via-blue-500 to-indigo-600",
    unveiled: false
  },
  {
    id: "gift-3",
    title: "Midnight SSSS Ticket",
    description: "A SUPER fun SECRET SHARING SISTERLY SESSION",
    sticker: "🍕",
    colorClass: "from-amber-400 via-red-500 to-pink-500",
    unveiled: false
  },
  {
    id: "gift-4",
    title: "Coding Flow Elixir",
    description: "Bypasses standard creative blockages. Instantly grants +100% flow state, zero stackoverflow searches, and beautiful code designs.",
    sticker: "🧪",
    colorClass: "from-emerald-400 via-teal-500 to-cyan-600",
    unveiled: false
  }
];

export const CONGRATS_EMOJIS = ["🎂", "🎈", "🎉", "🔥", "🎸", "🍰", "🍻", "🍩", "🎁", "💖", "🌟", "✨"];
export const RELATIONSHIP_PRESETS = ["Best Friend", "Cousin", "Sibling", "Parent", "Colleague", "Significant Other", "Internet Friend"];
export const VIBE_PRESETS = [
  { label: "🎸 Rockstar Hype", id: "rockstar" },
  { label: "✨ Emotional & Cozy", id: "cozy" },
  { label: "🍕 Hilarious Roast", id: "funny" },
  { label: "🧙‍♂️ Mystical/Epic", id: "poetic" }
];
