import { BirthdayProfile, MemoryItem, WishItem, GiftItem } from "./types";

export const DEFAULT_PROFILE: BirthdayProfile = {
  name: "Anagha Tai",
  birthdayDate: "2026-05-24",
  tagline: "THE BEST BIG SISTER & FOREVER PARTNER IN CRIME! LOVE YOU SO MUCH! 💖👩‍❤️‍👩",
  mainImage: "/src/assets/images/anagha_tai_hero_1779532695495.png",
  themeColor: "rockstar-pink",
  soundtrack: "Rockstar Birthday Chime",
  artistName: "Synthesizer Orchestra",
  musicType: "synthesized"
};

export const DEFAULT_MEMORIES: MemoryItem[] = [
  {
    id: "mem-1",
    title: "First Rock Guitar Jam",
    date: "Summer 2021",
    description: "Picked up a guitar and completely rocked the neighborhood. No strings attached, just pure distortion!",
    image: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&q=80&w=450",
    category: "Milestones",
    tag: "🎸 ROCK ON"
  },
  {
    id: "mem-2",
    title: "Concert Under Stars",
    date: "July 24, 2023",
    description: "Dancing at the summer festival till 4 AM. Good music, crisp air, and the absolute best squad of humans.",
    image: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&q=80&w=450",
    category: "Party",
    tag: "✨ ENERGETIC"
  },
  {
    id: "mem-3",
    title: "Wild Coastal Roadtrip",
    date: "Spring 2024",
    description: "Unplanned detours, gas station gummies, custom road playlists, and watching a golden sunset over beach cliffs.",
    image: "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&q=80&w=450",
    category: "Travel",
    tag: "🚗 WANDERLUST"
  },
  {
    id: "mem-4",
    title: "The Rockstar Birthday Cake",
    date: "September 2024",
    description: "A custom double-layered dark chocolate fudge cake complete with mock miniature amplifiers and sparklers.",
    image: "https://images.unsplash.com/photo-1535141192574-5d4897c13636?auto=format&fit=crop&q=80&w=450",
    category: "Friends",
    tag: "🍰 DELISH"
  },
  {
    id: "mem-5",
    title: "Late Night Studio Session",
    date: "Winter 2025",
    description: "Recording high-energy drum loops in a high-voltage audio room. Laughs, voice-cracks, and endless cold soda cans.",
    image: "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?auto=format&fit=crop&q=80&w=450",
    category: "Milestones",
    tag: "🎙️ SYNTHS"
  },
  {
    id: "mem-6",
    title: "High-Altitude Base Camp",
    date: "Autumn 2025",
    description: "Breathing in pure mountain vibes. Reached the summit just in time to shout out wishes to the universe.",
    image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80&w=450",
    category: "Travel",
    tag: "🏔️ MOUNTAIN CHILL"
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
    title: "VIP Backstage Pass",
    description: "Admit One. Grants unlimited front-row access to all impromptu guitar and air-synth performances in the kitchen!",
    sticker: "🎫",
    colorClass: "from-pink-500 via-purple-600 to-indigo-700",
    unveiled: false
  },
  {
    id: "gift-2",
    title: "Infinite High-Fives",
    description: "Good for one epic high-five on demand anytime you feel awesome, complete with simulated background crowd cheering!",
    sticker: "🖐️",
    colorClass: "from-cyan-400 via-blue-500 to-indigo-600",
    unveiled: false
  },
  {
    id: "gift-3",
    title: "Midnight Pizza Ticket",
    description: "Grants one fresh, hot, extra-cheesy double stuffed-crust pizza delivered straight to your desk during the next late night jam.",
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
