// Every photo the site uses, with a modern WebP at two sizes plus a JPG fallback.
// Most are 4:5 portrait (736 x 920); the menu photos keep their own size. Width and height are known up front, so width and height are known up front
// and the browser can reserve the space before the image loads (no layout shift).
//
// Not used on purpose: lph-logo.jpg (the show's official logo), lph-bg.jpg (a banner crop).

import bucketJpg from "./chicken-bucket.jpg";
import bucket480 from "./chicken-bucket-480.webp";
import bucket736 from "./chicken-bucket-736.webp";
import bucket2Jpg from "./chicken-bucket2.jpg";
import bucket2480 from "./chicken-bucket2-480.webp";
import bucket2736 from "./chicken-bucket2-736.webp";
import bucket3Jpg from "./chicken-bucket3-736.jpg";
import bucket3480 from "./chicken-bucket3-480.webp";
import bucket3736 from "./chicken-bucket3-736.webp";
import previewJpg from "./chicken-preview.jpg";
import preview480 from "./chicken-preview-480.webp";
import preview736 from "./chicken-preview-736.webp";
import tenderJpg from "./tender-dipped.jpg";
import tender480 from "./tender-dipped-480.webp";
import tender736 from "./tender-dipped-736.webp";
import logoJpg from "./pollos-hermanos-logo2.jpg";
import logo480 from "./pollos-hermanos-logo2-480.webp";
import logo736 from "./pollos-hermanos-logo2-736.webp";

import firstFavJpg from "./first-favorite.jpg";
import firstFav480 from "./first-favorite-480.webp";
import firstFav736 from "./first-favorite-736.webp";
import fringJpg from "./fring-hold-chicks.jpg";
import fring480 from "./fring-hold-chicks-480.webp";
import fring736 from "./fring-hold-chicks-736.webp";
import waltJpg from "./walt.jpg";
import walt480 from "./walt-480.webp";
import walt736 from "./walt-736.webp";
import walt2Jpg from "./walt2-736.jpg";
import walt2480 from "./walt2-480.webp";
import walt2736 from "./walt2-736.webp";
import waltJesseJpg from "./walt-and-jesse.jpg";
import waltJesse480 from "./walt-and-jesse-480.webp";
import waltJesse736 from "./walt-and-jesse-736.webp";
import jessePfp from "./jesse-pfp-120.jpg";
import saulPfp from "./saul-pfp-120.jpg";
import heisenbergPfp from "./heisenberg-pfp-120.jpg";

import wrapJpg from "./pollos-wrap.jpg";
import wrap480 from "./pollos-wrap-480.webp";
import wrap736 from "./pollos-wrap-736.webp";
import friesJpg from "./fries-friends.jpg";
import fries480 from "./fries-friends-480.webp";
import fries736 from "./fries-friends-736.webp";
import sauceJpg from "./dipping-sauce.jpg";
import sauce480 from "./dipping-sauce-480.webp";
import sauce736 from "./dipping-sauce-736.webp";
import lemonadeJpg from "./fresh-lemonade.jpg";
import lemonade480 from "./fresh-lemonade-480.webp";
import lemonade736 from "./fresh-lemonade-736.webp";
import teaJpg from "./sweet-tea-736.jpg";
import tea480 from "./sweet-tea-480.webp";
import tea736 from "./sweet-tea-736.webp";
import churroJpg from "./churro-bites.jpg";
import churro480 from "./churro-bites-480.webp";
import churro736 from "./churro-bites-736.webp";
import familyComboJpg from "./family-combo.jpg";
import familyCombo480 from "./family-combo-480.webp";
import familyCombo736 from "./family-combo-736.webp";
import nuggetsJpg from "./nuggets.jpg";
import nuggets480 from "./nuggets-480.webp";
import nuggets736 from "./nuggets-736.webp";

import wingsJpg from "./chicken-wings.jpg";
import wings480 from "./chicken-wings-480.webp";
import wings736 from "./chicken-wings-736.webp";
import coleslawJpg from "./coleslaw.jpg";
import coleslaw480 from "./coleslaw-480.webp";
import coleslaw736 from "./coleslaw-736.webp";
import macCheeseJpg from "./mac-and-cheese.jpg";
import macCheese480 from "./mac-and-cheese-480.webp";
import macCheese736 from "./mac-and-cheese-736.webp";
import milkshakeJpg from "./vanilla-milkshake.jpg";
import milkshake480 from "./vanilla-milkshake-480.webp";
import milkshake736 from "./vanilla-milkshake-736.webp";
import coolerJpg from "./orange-cooler.jpg";
import cooler480 from "./orange-cooler-480.webp";
import cooler736 from "./orange-cooler-736.webp";
import softServeJpg from "./vanilla-softserve.jpg";
import softServe480 from "./vanilla-softserve-480.webp";
import softServe736 from "./vanilla-softserve-736.webp";
import puddingJpg from "./banana-pudding.jpg";
import pudding480 from "./banana-pudding-480.webp";
import pudding736 from "./banana-pudding-736.webp";
import brownieJpg from "./chocolate-brownie.jpg";
import brownie480 from "./chocolate-brownie-480.webp";
import brownie736 from "./chocolate-brownie-736.webp";

// Small square profile pictures, used for the avatar stacks.
export const avatars = [
  { src: heisenbergPfp, alt: "Heisenberg" },
  { src: jessePfp, alt: "Jesse" },
  { src: saulPfp, alt: "Saul" },
];

const WIDTH = 736;
const HEIGHT = 920;

function photo(jpg, small, large, alt, width = WIDTH, height = HEIGHT) {
  return { jpg, small, large, alt, width, height };
}

export const photos = {
  bucket: photo(
    bucketJpg,
    bucket480,
    bucket736,
    "A red bucket of golden fried chicken surrounded by Pollos Hermanos boxes",
  ),
  bucket2: photo(
    bucket2Jpg,
    bucket2480,
    bucket2736,
    "A big bucket of crispy fried chicken with the Pollos Hermanos logo",
  ),
  bucket3: photo(
    bucket3Jpg,
    bucket3480,
    bucket3736,
    "Fried chicken pieces in a yellow Pollos Hermanos bucket next to a milkshake",
  ),
  preview: photo(
    previewJpg,
    preview480,
    preview736,
    "Two pieces of crispy fried chicken on Pollos Hermanos paper",
  ),
  tender: photo(
    tenderJpg,
    tender480,
    tender736,
    "A crispy chicken tender being dipped into creamy orange sauce",
  ),
  firstFavorite: photo(
    firstFavJpg,
    firstFav480,
    firstFav736,
    "Family Crispy Time: a plate of golden fried chicken with a free lemon tea",
  ),
  fringChicken: photo(
    fringJpg,
    fring480,
    fring736,
    "A man in a cream shirt holding a tray of crispy chicken tenders",
  ),
  walt: photo(
    waltJpg,
    walt480,
    walt736,
    "Walter White in a respirator and Pollos Hermanos vest, ready to eat fried chicken",
  ),
  walt2: photo(
    walt2Jpg,
    walt2480,
    walt2736,
    "Walt in a yellow jacket holding up a crispy chicken nugget",
  ),
  waltJesse: photo(
    waltJesseJpg,
    waltJesse480,
    waltJesse736,
    "Walt and Jesse in yellow suits sharing a Pollos Hermanos bucket",
  ),
  wrap: photo(
    wrapJpg,
    wrap480,
    wrap736,
    "Crispy chicken strips with a dip of ketchup",
    736,
    920,
  ),
  fries: photo(
    friesJpg,
    fries480,
    fries736,
    "A red Los Pollos box of golden french fries",
    736,
    920,
  ),
  sauce: photo(
    sauceJpg,
    sauce480,
    sauce736,
    "Five bowls of dipping sauces on a wooden board",
    736,
    736,
  ),
  lemonade: photo(
    lemonadeJpg,
    lemonade480,
    lemonade736,
    "A tall glass of fresh orange lemonade with mint and a striped straw",
    736,
    1104,
  ),
  tea: photo(
    teaJpg,
    tea480,
    tea736,
    "A jar of iced sweet tea with a lemon slice and mint",
    736,
    941,
  ),
  churro: photo(
    churroJpg,
    churro480,
    churro736,
    "Cinnamon churro bites next to a bowl of chocolate dip",
    736,
    552,
  ),
  familyCombo: photo(
    familyComboJpg,
    familyCombo480,
    familyCombo736,
    "A family combo of fried chicken, fries, sauces and a cola",
    736,
    920,
  ),
  nuggets: photo(
    nuggetsJpg,
    nuggets480,
    nuggets736,
    "A stack of golden chicken nuggets with dipping sauces",
    736,
    736,
  ),
  wings: photo(
    wingsJpg,
    wings480,
    wings736,
    "A plate of crispy chicken wings glazed in red sauce with sesame seeds",
    736,
    1104,
  ),
  coleslaw: photo(
    coleslawJpg,
    coleslaw480,
    coleslaw736,
    "A white bowl of creamy coleslaw with shredded cabbage and carrot",
    736,
    1104,
  ),
  macCheese: photo(
    macCheeseJpg,
    macCheese480,
    macCheese736,
    "A baking dish of golden baked mac and cheese with a spoonful lifted out",
    736,
    1104,
  ),
  milkshake: photo(
    milkshakeJpg,
    milkshake480,
    milkshake736,
    "A vanilla milkshake topped with whipped cream and caramel with a striped straw",
    736,
    1104,
  ),
  cooler: photo(
    coolerJpg,
    cooler480,
    cooler736,
    "A glass mug of iced orange drink with an orange slice on the rim",
    736,
    883,
  ),
  softServe: photo(
    softServeJpg,
    softServe480,
    softServe736,
    "A cup of vanilla soft serve with a tall swirl",
    736,
    981,
  ),
  pudding: photo(
    puddingJpg,
    pudding480,
    pudding736,
    "A glass of banana pudding layered with bananas, wafers and caramel",
    736,
    736,
  ),
  brownie: photo(
    brownieJpg,
    brownie480,
    brownie736,
    "A stack of fudgy chocolate brownies drizzled with chocolate",
    736,
    736,
  ),
  logo: photo(
    logoJpg,
    logo480,
    logo736,
    "The Pollos Hermanos logo with two chickens in sombreros",
  ),
};

export default photos;
