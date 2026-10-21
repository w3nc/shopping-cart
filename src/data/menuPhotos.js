// Picks a photo for each menu item. menu.json still points at the placeholder
// SVG, so this maps each dish to a photo; a real image path in menu.json wins.

const PLACEHOLDER = /placeholder\.svg$/i;

const byTitle = {
  "pollo classic combo": { photo: "preview", altPhoto: "bucket" },
  "hermanos family bucket": { photo: "bucket2", altPhoto: "bucket" },
  "spicy pollo sandwich": {
    photo: "tender",
    altPhoto: "preview",
    focus: "78% 58%",
    zoom: 1.5,
  },
  "pollo wrap": { photo: "bucket", altPhoto: "tender" },
  "curly fries basket": {
    photo: "bucket3",
    altPhoto: "logo",
    focus: "50% 72%",
    zoom: 1.5,
  },
  "hermanos sauce bottle": {
    photo: "tender",
    altPhoto: "logo",
    focus: "45% 90%",
    zoom: 2.1,
  },
  "fresh lemonade": {
    photo: "bucket3",
    altPhoto: "logo",
    focus: "88% 62%",
    zoom: 2.3,
  },
  "sweet tea": {
    photo: "bucket3",
    altPhoto: "logo",
    focus: "22% 82%",
    zoom: 2,
  },
  "churro bites": { photo: "logo", altPhoto: "bucket3" },
};

// Pinned photos win over the image path in menu.json. The card's picture box
// is 4:3 landscape, so tall photos are cropped; "focus" picks the visible part.
const pinnedByTitle = {
  "crispy time combo": { photo: "firstFavorite", altPhoto: null },
  "pollos wrap": { photo: "wrap", altPhoto: null },
  "french fries friends": { photo: "fries", altPhoto: null },
  "hermanos sauce": { photo: "sauce", altPhoto: null },
  "fresh lemonade": { photo: "lemonade", altPhoto: null },
  "sweet tea": { photo: "tea", altPhoto: null },
  "churro bites": { photo: "churro", altPhoto: null },
  "family combo": { photo: "familyCombo", altPhoto: null },
  "crispy chicken nuggets": { photo: "nuggets", altPhoto: null },

  "solo crispy meal": { photo: "preview", altPhoto: null },
  "golden wings": { photo: "wings", altPhoto: null, focus: "50% 52%" },
  "creamy coleslaw": { photo: "coleslaw", altPhoto: null, focus: "50% 45%" },
  "mac and cheese": { photo: "macCheese", altPhoto: null, focus: "50% 30%" },
  "vanilla milkshake": {
    photo: "milkshake",
    altPhoto: null,
    focus: "50% 35%",
  },
  "orange mint cooler": {
    photo: "cooler",
    altPhoto: null,
    focus: "50% 52%",
  },
  "vanilla soft serve": {
    photo: "softServe",
    altPhoto: null,
    focus: "50% 48%",
  },
  "banana pudding cup": {
    photo: "pudding",
    altPhoto: null,
    focus: "50% 45%",
  },
  "chocolate brownie": {
    photo: "brownie",
    altPhoto: null,
    focus: "50% 55%",
  },
};

const fallback = { photo: "logo", altPhoto: null };

function normalize(title) {
  return String(title ?? "")
    .trim()
    .toLowerCase();
}

export function hasRealImage(item) {
  return Boolean(item && item.image && !PLACEHOLDER.test(item.image));
}

export function getMenuPhoto(item) {
  const pinned = pinnedByTitle[normalize(item?.title)];
  if (pinned) {
    return { focus: "50% 50%", zoom: 1, ...pinned };
  }

  if (hasRealImage(item)) {
    return null;
  }

  const match = byTitle[normalize(item?.title)] ?? fallback;
  return { focus: "50% 40%", zoom: 1, ...match };
}

export const heroPhotos = ["bucket", "bucket2", "preview"];
export const prismPhotos = ["bucket", "bucket2", "preview", "tender"];
export const trailPhotos = [
  "bucket",
  "bucket2",
  "bucket3",
  "preview",
  "tender",
  "logo",
];

// Inline style that crops/zooms a menu photo (object-position plus a scale)
export function photoStyle(mapped) {
  if (!mapped) return undefined;
  const style = { objectPosition: mapped.focus };
  if (mapped.zoom && mapped.zoom !== 1) {
    style.transform = `scale(${mapped.zoom})`;
    style.transformOrigin = mapped.focus;
  }
  return style;
}
