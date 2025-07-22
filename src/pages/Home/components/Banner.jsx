import React from "react";

const images = [
  "/images/club1.jpg",
  "/images/court1.jpg",
  "/images/activity1.jpg",
];

export default function Banner() {
  const [current, setCurrent] = React.useState(0);

  React.useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative h-64 md:h-96 rounded-lg overflow-hidden shadow-lg my-8">
      {images.map((src, i) => (
        <img
          key={i}
          src={src}
          alt={`Banner ${i + 1}`}
          className={`absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-1000 ${
            i === current ? "opacity-100" : "opacity-0"
          }`}
          loading="lazy"
        />
      ))}
      <div className="absolute bottom-5 left-5 text-white bg-black bg-opacity-60 px-4 py-2 rounded font-semibold text-xl">
        Welcome to Our Sports Club
      </div>
    </div>
  );
}
