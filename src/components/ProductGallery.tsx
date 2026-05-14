import { useEffect, useState } from "react";

type ProductGalleryProps = {
  images: string[];
  title: string;
};

export default function ProductGallery({ images, title }: ProductGalleryProps) {
  const [activeImage, setActiveImage] = useState(images[0]);

  useEffect(() => {
    setActiveImage(images[0]);
  }, [images]);

  return (
    <section className="product-gallery" aria-label={`${title} image gallery`}>
      <div className="main-product-image">
        <img src={activeImage} alt={title} />
      </div>
      <div className="thumbnail-row" role="list">
        {images.map((image, index) => (
          <button
            type="button"
            key={`${image}-${index}`}
            className={image === activeImage ? "is-active" : ""}
            onClick={() => setActiveImage(image)}
            aria-label={`Show image ${index + 1} for ${title}`}
          >
            <img src={image} alt="" />
          </button>
        ))}
      </div>
    </section>
  );
}
