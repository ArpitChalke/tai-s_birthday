import { SlideshowCollection } from "./types";

const ASSET_IMAGES = ((import.meta as any).glob("./assets/images/*", {
  eager: true,
  query: "?url",
  import: "default",
})) as Record<string, string>;

const normalizeAssetReference = (path: string) =>
  path
    .replace(/^\//, "")
    .replace(/^src\//, "")
    .replace(/^assets\//, "")
    .replace(/^images\//, "")
    .toLowerCase();

const getAsset = (path: string) => {
  const normalized = normalizeAssetReference(path);
  const key = Object.keys(ASSET_IMAGES).find((assetKey) => {
    const fileName = assetKey.split("/").pop()?.toLowerCase() ?? "";
    const fileNameWithoutExt = fileName.replace(/\.[^.]+$/, "");
    return fileName === normalized || fileNameWithoutExt === normalized;
  });

  return key ? ASSET_IMAGES[key] : path;
};

export const DEFAULT_SLIDESHOWS: SlideshowCollection[] = [
  {
    id: "slideshow-anuu-darling",
    title: "Anuu Darling",
    songTitle: "Itni Kyun Tum Khubsurat Ho",
    soundtrackId: "anuu-darling",
    photos: [
      {
        id: "owner-1",
        image: getAsset("/images/img-5"),
        caption: "Birthday sparkle, cake in hand, and the happiest grin.",
      },
      {
        id: "owner-9",
        image: getAsset("/images/img-15"),
        caption: "Golden-hour light and a calm smile make this one shine.",
      },
      {
        id: "owner-6",
        image: getAsset("/images/img-11"),
        caption: "A graceful solo portrait in pink that feels effortlessly radiant.",
      },
      {
        id: "owner-7",
        image: getAsset("/images/img-12"),
        caption: "A striking workday portrait with quiet strength and confidence.",
      },
      {
        id: "owner-2",
        image: getAsset("/images/img-9"),
        caption: "Soft lights, a dreamy setup, and a timeless birthday pose.",
      },
      {
        id: "owner-10",
        image: getAsset("/images/img-16"),
        caption: "A floral backdrop and a soft smile make this portrait extra lovely.",
      },
      {
        id: "owner-12",
        image: getAsset("/images/img-19"),
        caption: "A side-glance portrait full of sparkle and festive elegance.",
      },
      {
        id: "owner-14",
        image: getAsset("/images/img-21"),
        caption: "A city-stroll frame with fresh energy and a big smile.",
      },
      {
        id: "owner-15",
        image: getAsset("/images/img-22"),
        caption: "A sunset seaside shot that looks straight out of a movie.",
      },
      {
        id: "owner-16",
        image: getAsset("/images/img-23"),
        caption: "Windy beach vibes and a carefree moment by the water.",
      },
      {
        id: "img-25-first",
        image: getAsset("/images/img-25"),
        caption: "A sunset beach frame with soft golden light and a dreamy profile pose.",
      },
      {
        id: "img-28-first",
        image: getAsset("/images/img-28"),
        caption: "A bright solo close-up full of sunshine and a natural smile.",
      },
      {
        id: "img-35-first",
        image: getAsset("/images/img-35"),
        caption: "A calm garden portrait with graceful poise and a gentle smile.",
      },
      {
        id: "img-36-first",
        image: getAsset("/images/img-36"),
        caption: "A relaxed solo room shot that feels warm, simple, and candid.",
      },
      {
        id: "img-40-first",
        image: getAsset("/images/img-40"),
        caption: "A graceful staircase portrait with an elegant over-the-shoulder look.",
      },
      {
        id: "img-41-first",
        image: getAsset("/images/img-41"),
        caption: "A sweet countryside candid with an adorable little goat.",
      },
      {
        id: "img-42-first",
        image: getAsset("/images/img-42"),
        caption: "A striking blue-saree portrait glowing in soft golden light.",
      },
      {
        id: "img-43-first",
        image: getAsset("/images/img-43"),
        caption: "A peaceful solo bench moment with a thoughtful, cinematic vibe.",
      },
    ],
  },
  {
    id: "slideshow-owner-of-our-hearts",
    title: "Owner of Our Hearts",
    songTitle: "Piyu Bole Piya Bole",
    soundtrackId: "owner-of-our-hearts",
    photos: [
      {
        id: "anuu-2",
        image: getAsset("/images/img-3"),
        caption: "A warm selfie moment filled with comfort and love.",
      },
      {
        id: "anuu-4",
        image: getAsset("/images/img-8"),
        caption: "A candid twin-smile moment that feels instantly joyful.",
      },
      {
        id: "owner-4",
        image: getAsset("/images/WhatsApp Image 2026-05-23 at 22.26.21.jpeg"),
        caption: "A simple close-up that captures her warmth perfectly.",
      },
      {
        id: "owner-8",
        image: getAsset("/images/img-13"),
        caption: "A soft pink portrait with extra breathing space and elegance.",
      },
      {
        id: "owner-11",
        image: getAsset("/images/img-18"),
        caption: "A bright uniform selfie with happy, easygoing charm.",
      },
      {
        id: "owner-13",
        image: getAsset("/images/img-20"),
        caption: "A casual striped selfie that feels simple, sweet, and real.",
      },
      {
        id: "fam-5",
        image: getAsset("/images/img-17"),
        caption: "A sweet selfie moment with dad that belongs in the family reel.",
      },
      {
        id: "img-26-second",
        image: getAsset("/images/img-26"),
        caption: "A cheerful family selfie with everyone tucked into one warm frame.",
      },
      {
        id: "img-27-second",
        image: getAsset("/images/img-27"),
        caption: "A bright selfie with mom that feels affectionate and close.",
      },
      {
        id: "img-28-second",
        image: getAsset("/images/img-28"),
        caption: "A sunny solo selfie that captures her smile up close.",
      },
      {
        id: "img-29-second",
        image: getAsset("/images/img-29"),
        caption: "A happy two-person selfie with festive outfits and big smiles.",
      },
      {
        id: "img-30-second",
        image: getAsset("/images/img-30"),
        caption: "A scenic family selfie with cloudy skies and joyful expressions.",
      },
      {
        id: "img-34-second",
        image: getAsset("/images/img-34"),
        caption: "A travel-day selfie with parents in a lively outdoor setting.",
      },
      {
        id: "img-36-second",
        image: getAsset("/images/img-36"),
        caption: "A cozy close-up selfie that feels easy, casual, and real.",
      },
      {
        id: "img-37-second",
        image: getAsset("/images/img-37"),
        caption: "A playful sister selfie with matching happy energy.",
      },
      {
        id: "img-38-second",
        image: getAsset("/images/img-38"),
        caption: "A sweet selfie with dad that feels affectionate and candid.",
      },
      {
        id: "img-39-second",
        image: getAsset("/images/img-39"),
        caption: "A bright family selfie with everyone squeezed into the frame.",
      },
      {
        id: "img-44-second",
        image: getAsset("/images/img-44"),
        caption: "A fun upside-down selfie that captures a playful mood.",
      },
    ],
  },
  {
    id: "slideshow-fam-jam",
    title: "Fam-Jam",
    songTitle: "Pal Pal Dil Ke Paas Tum Rehti Ho",
    soundtrackId: "fam-jam",
    photos: [
      {
        id: "fam-1",
        image: getAsset("/images/img-2"),
        caption: "A bright family portrait full of pride and togetherness.",
      },
      {
        id: "fam-2",
        image: getAsset("/images/img-6"),
        caption: "A home celebration with everyone gathered in one sweet frame.",
      },
      {
        id: "fam-3",
        image: getAsset("/images/img-7"),
        caption: "An outdoor family picture packed with color and happy faces.",
      },
      // {
      //   id: "fam-4",
      //   image: getAsset("/images/WhatsApp Image 2026-05-23 at 23.19.47.jpeg"),
      //   caption: "A birthday couch photo that feels like pure home.",
      // },
      {
        id: "anuu-1",
        image: getAsset("/images/img-1"),
        caption: "Traditional glow and a smile that lights up the frame.",
      },
      {
        id: "anuu-3",
        image: getAsset("/images/img-4"),
        caption: "Bright outdoor energy and effortless happiness.",
      },
      {
        id: "fam-5",
        image: getAsset("/images/img-17"),
        caption: "A sweet selfie moment with dad that belongs in the family reel.",
      },
      {
        id: "fam-6",
        image: getAsset("/images/img-24"),
        caption: "A warm birthday family frame filled with closeness and celebration.",
      },
      {
        id: "owner-5",
        image: getAsset("/images/img-10"),
        caption: "A proud milestone frame with her beautiful achievement smile.",
      },
      {
        id: "img-26-third",
        image: getAsset("/images/img-26"),
        caption: "A lovely group selfie with both parents gathered around her.",
      },
      {
        id: "img-27-third",
        image: getAsset("/images/img-27"),
        caption: "A warm mother-daughter frame with matching smiles.",
      },
      {
        id: "img-29-third",
        image: getAsset("/images/img-29"),
        caption: "A festive duo portrait that feels cheerful and close-knit.",
      },
      {
        id: "img-30-third",
        image: getAsset("/images/img-30"),
        caption: "A full family selfie against a beautiful misty landscape.",
      },
      {
        id: "img-31-third",
        image: getAsset("/images/img-31"),
        caption: "A classic three-person family portrait under dramatic skies.",
      },
      {
        id: "img-32-third",
        image: getAsset("/images/img-32"),
        caption: "A tender candid with mom that feels full of love.",
      },
      {
        id: "img-33-third",
        image: getAsset("/images/img-33"),
        caption: "A multigenerational family portrait packed with warmth and togetherness.",
      },
      {
        id: "img-34-third",
        image: getAsset("/images/img-34"),
        caption: "A travel-stop family selfie with bright, happy faces.",
      },
      {
        id: "img-37-third",
        image: getAsset("/images/img-37"),
        caption: "A two-person selfie full of playful sister energy.",
      },
      {
        id: "img-38-third",
        image: getAsset("/images/img-38"),
        caption: "A sweet father-daughter selfie with an easy, heartfelt smile.",
      },
      {
        id: "img-39-third",
        image: getAsset("/images/img-39"),
        caption: "A smiling three-person family selfie in a bright outdoor setting.",
      },
      {
        id: "img-44-third",
        image: getAsset("/images/img-44"),
        caption: "A playful two-person selfie snapped from a fun angle.",
      },
    ],
  },
];
