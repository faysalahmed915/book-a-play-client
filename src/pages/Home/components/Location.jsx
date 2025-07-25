import React from 'react';
import { FaMapMarkerAlt } from 'react-icons/fa';

export default function Location() {
  return (
    <section className="py-16 px-4 md:px-20 bg-base-200 shadow-xl rounded-2xl mb-16">
      <div className="text-center mb-12">
        <div className="inline-flex items-center justify-center bg-secondary text-secondary-content rounded-full p-5 shadow-lg mb-5">
          <FaMapMarkerAlt className="text-4xl" />
        </div>
        <h2 className="text-4xl font-extrabold text-primary drop-shadow-lg">
          Our Location
        </h2>
        <p className="text-lg text-base-content max-w-2xl mx-auto mt-4 leading-relaxed">
          Visit us at our home base to enjoy top-tier courts and a vibrant sports community.
          <br />
          <span className="font-semibold">123 Sports Club Road, Dhaka, Bangladesh</span>
        </p>
      </div>

      <div className="max-w-4xl mx-auto rounded-lg shadow-xl overflow-hidden ring-1 ring-base-300 dark:ring-base-700">
        <iframe
          title="Club Location"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3651.9030150032264!2d90.41251841498177!3d23.81033129467404!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755c7e557d92f27%3A0xd7bfb48e5c327f39!2sDhaka!5e0!3m2!1sen!2sbd!4v1629973016721!5m2!1sen!2sbd"
          width="100%"
          height="400"
          style={{ border: 0 }}
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="rounded-b-lg"
        />
      </div>
    </section>
  );
}
