import React from "react";
import img1 from "../../../assets/banner-urban.png";
import img2 from "../../../assets/banner-offer.png";
import img3 from "../../../assets/banner-commingSoon.png";

const images = [
  { src: img1, alt: "Urban Sports Court", caption: "Play Urban, Play Strong" },
  { src: img2, alt: "Special Offer Banner", caption: "Exclusive Discounts Available" },
  { src: img3, alt: "Coming Soon Banner", caption: "New Courts Coming Soon" },
];

export default function Banner() {
  const [current, setCurrent] = React.useState(0);

  React.useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  // Manual navigation dots handler
  const goToSlide = (index) => setCurrent(index);

  return (
    <section
      aria-label="Promotional banners"
      className="relative h-64 md:h-96 lg:h-[720px] rounded-lg overflow-hidden shadow-lg my-8 select-none"
    >
      {images.map(({ src, alt }, i) => (
        <img
          key={i}
          src={src}
          alt={alt}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ease-in-out ${
            i === current ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}
          loading="lazy"
          aria-hidden={i !== current}
        />
      ))}

      {/* Gradient overlay for better text visibility */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-50 pointer-events-none" />

      {/* Caption */}
      <div className="absolute bottom-8 left-6 md:left-12 text-white text-2xl md:text-4xl font-bold drop-shadow-lg max-w-lg">
        {images[current].caption}
      </div>

      {/* Navigation dots */}
      <div className="absolute bottom-4 right-6 flex space-x-3">
        {images.map((_, i) => (
          <button
            key={i}
            className={`w-4 h-4 rounded-full transition-colors duration-300 ${
              i === current ? "bg-primary" : "bg-gray-400"
            }`}
            onClick={() => goToSlide(i)}
            aria-label={`Go to slide ${i + 1}`}
            aria-current={i === current}
          />
        ))}
      </div>
    </section>
  );
}
