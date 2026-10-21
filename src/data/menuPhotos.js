// Picks a photo for each menu item.
//
// The menu file (public/menu.json) still points at the placeholder SVG.
// Until you put real photos in it, this file maps each dish to the best matching
// picture we have. If an item in menu.json gets a real image path, that wins.
//
// "focus" crops a photo with object-position, "zoom" scales it up.

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
