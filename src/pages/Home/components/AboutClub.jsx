import React from 'react';
import { FaInfoCircle } from 'react-icons/fa';

export default function AboutClub() {
  return (
    <section className="bg-base-200 py-16 px-4 md:px-20 shadow-xl rounded-2xl mb-16">
      <div className="text-center mb-10">
        <div className="inline-flex items-center justify-center bg-primary text-primary-content rounded-full p-5 shadow-lg mb-5">
          <FaInfoCircle className="text-4xl" />
        </div>
        <h2 className="text-4xl font-extrabold text-primary drop-shadow-lg">
          About The Club
        </h2>
      </div>

      <p className="text-lg text-base-content max-w-3xl mx-auto leading-relaxed text-center">
        Since 1990, our Sports Club has stood as a vibrant hub for athletic growth, friendship, and community. 
        We offer state-of-the-art courts, expert coaching, and a welcoming atmosphere for players of all ages and skill levels.
        Whether you're here to compete, learn, or simply enjoy the game — you're part of the family.
      </p>
    </section>
  );
}
