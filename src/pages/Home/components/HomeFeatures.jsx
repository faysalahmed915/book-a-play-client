import { motion } from "framer-motion";
import { Calendar, CreditCard, Users, Trophy } from "lucide-react";

export default function HomeFeatures() {
  return (
    <div className="bg-gradient-to-br from-base-200 to-base-300 py-20 px-6 md:px-16 lg:px-28 text-center">
      {/* Heading */}
      <motion.h2
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-3xl md:text-4xl font-bold mb-6 text-primary"
      >
        Why Choose BookAPlay?
      </motion.h2>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.8 }}
        className="text-lg md:text-xl max-w-3xl mx-auto mb-12"
      >
        We make sports easy, accessible, and enjoyable. Discover the features
        that set us apart and keep our community active every day.
      </motion.p>

      {/* Feature Cards */}
      <motion.div
        className="grid grid-cols-1 md:grid-cols-4 gap-6"
        initial="hidden"
        animate="visible"
        variants={{
          hidden: { opacity: 0, y: 30 },
          visible: {
            opacity: 1,
            y: 0,
            transition: { staggerChildren: 0.2, duration: 0.6 },
          },
        }}
      >
        <FeatureCard
          icon={<Calendar className="w-10 h-10 text-green-600" />}
          title="Easy Bookings"
          desc="Reserve courts quickly and hassle-free with our smart booking system."
        />
        <FeatureCard
          icon={<Users className="w-10 h-10 text-blue-600" />}
          title="Community Events"
          desc="Connect with fellow players in tournaments, leagues, and club events."
        />
        <FeatureCard
          icon={<CreditCard className="w-10 h-10 text-emerald-600" />}
          title="Secure Payments"
          desc="Pay safely online with trusted and encrypted payment options."
        />
        <FeatureCard
          icon={<Trophy className="w-10 h-10 text-yellow-500" />}
          title="Track Progress"
          desc="Stay on top of your bookings, payments, and sports milestones."
        />
      </motion.div>
    </div>
  );
}

function FeatureCard({ icon, title, desc }) {
  return (
    <motion.div
      className="bg-base-100 rounded-2xl p-6 shadow-md hover:shadow-lg transition"
      variants={{
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0 },
      }}
    >
      <div className="flex justify-center mb-4">{icon}</div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-sm">{desc}</p>
    </motion.div>
  );
}
