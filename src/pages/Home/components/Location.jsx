export default function Location() {
  return (
    <section className="mb-12 text-center">
      <h2 className="text-3xl font-bold text-blue-800 mb-4">Our Location</h2>
      <p className="mb-6 text-gray-700">
        123 Sports Club Road, Dhaka, Bangladesh
      </p>
      <div className="max-w-4xl mx-auto rounded shadow-lg overflow-hidden">
        <iframe
          title="Club Location"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3651.9030150032264!2d90.41251841498177!3d23.81033129467404!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755c7e557d92f27%3A0xd7bfb48e5c327f39!2sDhaka!5e0!3m2!1sen!2sbd!4v1629973016721!5m2!1sen!2sbd"
          width="100%"
          height="300"
          style={{ border: 0 }}
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </div>
    </section>
  );
}
