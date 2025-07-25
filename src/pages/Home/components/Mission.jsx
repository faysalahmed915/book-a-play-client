import React from "react";
import { Fade } from "react-awesome-reveal";
import { FaHeartbeat, FaUsers } from "react-icons/fa";

export default function Mission() {
  return (
    <section className="py-20 px-4 md:px-20 bg-base-200 rounded-2xl shadow-xl mb-16">
      <Fade triggerOnce>
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center bg-gradient-to-tr from-secondary to-primary text-white rounded-full p-5 shadow-lg mb-5">
            <FaHeartbeat className="text-4xl animate-pulse" />
          </div>
          <h2 className="text-4xl md:text-5xl font-extrabold text-primary drop-shadow">
            Our Mission
          </h2>
          <p className="mt-4 text-lg md:text-xl text-base-content max-w-2xl mx-auto leading-relaxed">
            At <span className="font-semibold text-primary">BookAPlay</span>, we are dedicated to fostering a
            vibrant and active community where sports lovers can connect, grow,
            and chase their fitness dreams in a safe, inclusive environment.
          </p>
        </div>
      </Fade>

      <Fade delay={300} direction="up" triggerOnce>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {/* Card 1 */}
          <div className="card bg-base-100 glass border border-base-300 hover:shadow-2xl transition duration-300">
            <div className="card-body items-center text-center">
              <div className="text-primary bg-primary/10 p-4 rounded-full mb-4 hover:scale-110 transition">
                <FaUsers className="text-3xl" />
              </div>
              <h3 className="card-title text-2xl font-semibold text-blue-700">
                Community First
              </h3>
              <p className="text-base text-base-content mt-2">
                We build a welcoming and inclusive space where athletes of all
                ages and skill levels can unite around their passion for play.
              </p>
            </div>
          </div>

          {/* Card 2 */}
          <div className="card bg-base-100 glass border border-base-300 hover:shadow-2xl transition duration-300">
            <div className="card-body items-center text-center">
              <div className="text-primary bg-primary/10 p-4 rounded-full mb-4 hover:scale-110 transition">
                <FaHeartbeat className="text-3xl" />
              </div>
              <h3 className="card-title text-2xl font-semibold text-blue-700">
                Health & Discipline
              </h3>
              <p className="text-base text-base-content mt-2">
                We encourage mental and physical growth through structured
                training, teamwork, and dedication — the heart of a healthy lifestyle.
              </p>
            </div>
          </div>
        </div>
      </Fade>
    </section>
  );
}
