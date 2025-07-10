// src/pages/About/About.jsx

import { CalendarClock, Users, CreditCard, CheckCircle, Rocket, ShieldCheck, LayoutGrid, HeartHandshake } from 'lucide-react';

const About = () => {
    return (
        <section className="py-16 px-4 lg:px-8 max-w-7xl mx-auto">
            {/* Header Section */}
            <div className="text-center mb-14">
                <h1 className="text-4xl md:text-5xl font-extrabold text-primary mb-4">
                    About <span className="text-accent">BookaPlay</span>
                </h1>
                <p className="text-lg text-base-content max-w-3xl mx-auto leading-relaxed">
                    BookaPlay is your all-in-one digital companion for booking sports courts, joining clubs,
                    and discovering events. Designed for casual players, dedicated athletes, and club
                    organizers — our platform brings convenience, connection, and community to your fingertips.
                </p>
            </div>

            {/* Why & Vision */}
            <div className="grid gap-10 md:grid-cols-2 items-start mb-16">
                <div className="bg-base-200 p-6 rounded-2xl shadow-md hover:shadow-lg transition-shadow duration-300">
                    <h2 className="text-2xl font-semibold text-accent mb-4">Why Choose BookaPlay?</h2>
                    <ul className="list-disc list-inside space-y-3 text-base-content text-base leading-relaxed">
                        <li>Instantly book courts via web or mobile — anytime, anywhere</li>
                        <li>Track your game schedule and upcoming sessions with ease</li>
                        <li>Connect with local sports clubs and explore events near you</li>
                        <li>Enjoy secure payments and flexible booking options</li>
                        <li>Personalized dashboard to manage your sports lifestyle</li>
                    </ul>
                </div>

                <div className="bg-base-200 p-6 rounded-2xl shadow-md hover:shadow-lg transition-shadow duration-300">
                    <h2 className="text-2xl font-semibold text-accent mb-4">Our Vision</h2>
                    <p className="text-base text-base-content leading-relaxed">
                        At BookaPlay, we believe that play is powerful. Our mission is to empower people to
                        connect through sports by removing barriers to participation. Whether you're running a
                        club or just looking for your next match, we’re here to ensure that playtime is always
                        possible — fun, fair, and flexible.
                    </p>
                </div>
            </div>

            {/* How It Works */}
            <div className="mb-8">
                <h2 className="text-3xl font-bold text-center text-primary mb-10">How It Works</h2>
                <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4 text-center">
                    <div className="flex flex-col items-center bg-base-200 p-6 rounded-xl shadow-md hover:shadow-lg transition">
                        <CalendarClock className="w-10 h-10 text-accent mb-4" />
                        <h3 className="text-xl font-semibold mb-2">1. Browse & Book</h3>
                        <p className="text-base-content text-sm">
                            Find available courts, clubs, and events in your area. Filter by location, time, and type.
                        </p>
                    </div>
                    <div className="flex flex-col items-center bg-base-200 p-6 rounded-xl shadow-md hover:shadow-lg transition">
                        <Users className="w-10 h-10 text-accent mb-4" />
                        <h3 className="text-xl font-semibold mb-2">2. Join Clubs</h3>
                        <p className="text-base-content text-sm">
                            Become a member of local clubs or create your own group with friends and teammates.
                        </p>
                    </div>
                    <div className="flex flex-col items-center bg-base-200 p-6 rounded-xl shadow-md hover:shadow-lg transition">
                        <CreditCard className="w-10 h-10 text-accent mb-4" />
                        <h3 className="text-xl font-semibold mb-2">3. Pay & Confirm</h3>
                        <p className="text-base-content text-sm">
                            Use secure, flexible payment options to confirm your booking and receive instant confirmation.
                        </p>
                    </div>
                    <div className="flex flex-col items-center bg-base-200 p-6 rounded-xl shadow-md hover:shadow-lg transition">
                        <CheckCircle className="w-10 h-10 text-accent mb-4" />
                        <h3 className="text-xl font-semibold mb-2">4. Play & Enjoy</h3>
                        <p className="text-base-content text-sm">
                            Show up, have fun, and enjoy the game! We'll handle the rest in the background.
                        </p>
                    </div>
                </div>
            </div>

            {/* What Makes Us Different */}
            <div className="mb-8">
                <h2 className="text-3xl font-bold text-center text-primary mb-10">
                    What Makes Us Different
                </h2>
                <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4 text-center">
                    <div className="flex flex-col items-center bg-base-200 p-6 rounded-xl shadow-md hover:shadow-lg transition">
                        <Rocket className="w-10 h-10 text-accent mb-4" />
                        <h3 className="text-xl font-semibold mb-2">Lightning Fast Booking</h3>
                        <p className="text-base-content text-sm">
                            Book a court or join an event in just a few clicks. No hassle, no wait.
                        </p>
                    </div>

                    <div className="flex flex-col items-center bg-base-200 p-6 rounded-xl shadow-md hover:shadow-lg transition">
                        <ShieldCheck className="w-10 h-10 text-accent mb-4" />
                        <h3 className="text-xl font-semibold mb-2">Trusted & Secure</h3>
                        <p className="text-base-content text-sm">
                            Your data and transactions are fully encrypted and safe with us.
                        </p>
                    </div>

                    <div className="flex flex-col items-center bg-base-200 p-6 rounded-xl shadow-md hover:shadow-lg transition">
                        <LayoutGrid className="w-10 h-10 text-accent mb-4" />
                        <h3 className="text-xl font-semibold mb-2">All-in-One Dashboard</h3>
                        <p className="text-base-content text-sm">
                            Control your bookings, events, and club memberships — all from one place.
                        </p>
                    </div>

                    <div className="flex flex-col items-center bg-base-200 p-6 rounded-xl shadow-md hover:shadow-lg transition">
                        <HeartHandshake className="w-10 h-10 text-accent mb-4" />
                        <h3 className="text-xl font-semibold mb-2">Community Driven</h3>
                        <p className="text-base-content text-sm">
                            We partner with local communities to make sports more inclusive and accessible.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default About;
