import { describe, expect, it } from "vitest";
import photos from "../assets/photos";
import { getMenuPhoto, hasRealImage, photoStyle } from "./menuPhotos";

const placeholder = "/images/menu/placeholder.svg";

const menuTitles = [
  "Pollo Classic Combo",
  "Hermanos Family Bucket",
  "Spicy Pollo Sandwich",
  "Pollo Wrap",
  "Curly Fries Basket",
  "Hermanos Sauce Bottle",
  "Fresh Lemonade",
  "Sweet Tea",
  "Churro Bites",
];

describe("getMenuPhoto", () => {
  it("matches dishes by title, ignoring capital letters", () => {
    expect(
      getMenuPhoto({ title: "POLLO classic COMBO", image: placeholder }).photo,
    ).toBe("preview");
  });

  it("gives every dish on the menu a photo that really exists", () => {
    menuTitles.forEach((title) => {
      const mapped = getMenuPhoto({ title, image: placeholder });

      expect(photos[mapped.photo], title).toBeDefined();
      if (mapped.altPhoto) {
        expect(photos[mapped.altPhoto], title).toBeDefined();
      }
    });
  });

  it("falls back to the logo photo for a dish it does not know", () => {
    expect(getMenuPhoto({ title: "Mystery Dish", image: placeholder }).photo).toBe(
      "logo",
    );
  });

  it("steps aside when menu.json has a real image path", () => {
    const item = { title: "Pollo Wrap", image: "/images/menu/wrap.jpg" };

    expect(hasRealImage(item)).toBe(true);
    expect(getMenuPhoto(item)).toBeNull();
  });
});

describe("photoStyle", () => {
  it("crops with object-position and zooms with scale", () => {
    const style = photoStyle({ focus: "10% 20%", zoom: 2 });

    expect(style.objectPosition).toBe("10% 20%");
    expect(style.transform).toBe("scale(2)");
  });

  it("does not add a transform when there is no zoom", () => {
    expect(photoStyle({ focus: "50% 50%", zoom: 1 }).transform).toBeUndefined();
  });
});
