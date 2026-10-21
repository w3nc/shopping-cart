// Every photo the site uses, with a modern WebP at two sizes plus a JPG fallback.
// All are 4:5 portrait (736 x 920), so width and height are known up front
// and the browser can reserve the space before the image loads (no layout shift).
//
// Not used on purpose: walt.jpg, walt-and-jesse.jpg, fring-hold-chicks.jpg (real people),
// lph-logo.jpg (the show's official logo), lph-bg.jpg (a banner crop).

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

const WIDTH = 736;
const HEIGHT = 920;

function photo(jpg, small, large, alt) {
  return { jpg, small, large, alt, width: WIDTH, height: HEIGHT };
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
  logo: photo(
    logoJpg,
    logo480,
    logo736,
    "The Pollos Hermanos logo with two chickens in sombreros",
  ),
};

export default photos;
