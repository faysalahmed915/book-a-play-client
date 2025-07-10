// src/pages/About/About.jsx

const About = () => {
  return (
    <section className="py-12 px-4 max-w-7xl mx-auto">
      <div className="text-center mb-10">
        <h1 className="text-4xl font-extrabold text-primary mb-2">About BookaPlay</h1>
        <p className="text-base-content max-w-2xl mx-auto">
          BookaPlay is a modern platform that simplifies booking sports courts, joining clubs,
          and participating in events — all from one place. Whether you're a casual player or a
          club member, BookaPlay helps you manage everything efficiently.
        </p>
      </div>

      <div className="grid gap-8 md:grid-cols-2">
        <div>
          <h2 className="text-2xl font-bold mb-2 text-accent">Why BookaPlay?</h2>
          <ul className="list-disc list-inside space-y-2 text-base-content">
            <li>Book courts easily from your phone or computer</li>
            <li>Manage your schedule and see upcoming bookings</li>
            <li>Join clubs and participate in community events</li>
            <li>Flexible payments and secure transactions</li>
            <li>Get personalized dashboard experience</li>
          </ul>
        </div>

        <div>
          <h2 className="text-2xl font-bold mb-2 text-accent">Our Vision</h2>
          <p className="text-base-content">
            We aim to connect people through sports and make play accessible to everyone. BookaPlay
            is designed to support clubs, admins, and players — ensuring that time, space, and fun
            are never a challenge again.
          </p>
        </div>
      </div>
    </section>
  );
};

export default About;
