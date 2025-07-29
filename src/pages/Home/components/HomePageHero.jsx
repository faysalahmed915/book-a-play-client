import React from "react";
import { Fade, Slide } from "react-awesome-reveal";
import { Link } from "react-router";

export default function HomePageHero() {
  return (
    <div className="bg-gradient-to-br from-base-200 to-base-300 py-20 px-6 md:px-16 lg:px-28 text-center">
      <Slide direction="up" triggerOnce>
        <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
          Welcome to <span className="text-green-600">BookAPlay</span> Club
        </h1>
      </Slide>

      <Fade delay={200} cascade damping={0.1} triggerOnce>
        <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto mb-8">
          Join our premier sports club — where passion meets performance!
          Book courts, manage sessions, and stay connected with all activities
          through your personalized dashboard.
        </p>

        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Link
            to="/courts"
            className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-xl font-medium transition"
          >
            Explore Courts
          </Link>
          <Link
            to="/dashboard"
            className="bg-white hover:bg-gray-100 text-green-600 px-6 py-3 rounded-xl border border-green-500 font-medium transition"
          >
            Go to Dashboard
          </Link>
        </div>
      </Fade>

      <Fade delay={400} triggerOnce>
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
          <img
            src="https://i.ibb.co/qLCGL9rv/Whats-App-Image-2025-07-29-at-8-15-47-PM.jpg"
            alt="Courts"
            className="rounded-2xl shadow-lg object-cover w-full"
          />
          <img
            src="https://i.ibb.co/svnK5Y4d/Whats-App-Image-2025-07-29-at-8-15-46-PM.jpg"
            alt="Club"
            className="rounded-2xl shadow-lg object-cover w-full"
          />
          <img
            src="https://i.ibb.co/xq8bpTj0/Whats-App-Image-2025-07-29-at-8-15-46-PM-1.jpg"
            alt="Activities"
            className="rounded-2xl shadow-lg object-cover w-full"
          />
        </div>
      </Fade>
    </div>
  );
}
