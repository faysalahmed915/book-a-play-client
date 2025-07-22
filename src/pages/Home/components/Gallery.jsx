const galleryImages = [
  "/images/gallery1.jpg",
  "/images/gallery2.jpg",
  "/images/gallery3.jpg",
  "/images/gallery4.jpg",
];

export default function Gallery() {
  return (
    <section className="mb-12">
      <h2 className="text-3xl font-bold text-blue-800 mb-6 text-center md:text-left">
        Club Activities Gallery
      </h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {galleryImages.map((src, idx) => (
          <img
            key={idx}
            src={src}
            alt={`Gallery image ${idx + 1}`}
            className="w-full h-40 object-cover rounded shadow-md"
            loading="lazy"
          />
        ))}
      </div>
    </section>
  );
}
