import photos from "../../assets/photos";

// Shows one of our photos as a <picture>: WebP where the browser supports it, JPG otherwise.
// width and height come from the photo so there is no layout shift while it loads.
//
// alt:  leave undefined to use the photo's own description, or pass "" when the photo is decorative.
// priority: true for the big photo at the top of the page (loads right away).
export default function Photo({
  name,
  alt,
  sizes = "(min-width: 768px) 33vw, 100vw",
  priority = false,
  className = "",
  style,
}) {
  const photo = photos[name];
  if (!photo) return null;

  const text = alt === undefined ? photo.alt : alt;

  return (
    <picture>
      <source
        type="image/webp"
        srcSet={`${photo.small} 480w, ${photo.large} 736w`}
        sizes={sizes}
      />
      <img
        className={className}
        style={style}
        src={photo.jpg}
        alt={text}
        width={photo.width}
        height={photo.height}
        loading={priority ? "eager" : "lazy"}
        decoding="async"
        draggable="false"
      />
    </picture>
  );
}
