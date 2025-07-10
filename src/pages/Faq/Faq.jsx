// src/pages/Faq/Faq.jsx

const Faq = () => {
  const faqs = [
    {
      question: "What is BookaPlay?",
      answer:
        "BookaPlay is a platform that allows users to book sports courts, join clubs, and manage their sports-related activities easily and efficiently.",
    },
    {
      question: "How do I create an account?",
      answer:
        "Click on the Register button on the top right and fill in your details. Once registered, you can log in and start booking or joining clubs.",
    },
    {
      question: "Is there a payment system integrated?",
      answer:
        "Yes, BookaPlay offers secure online payments for court bookings and club memberships. You'll see payment options at checkout.",
    },
    {
      question: "Can I cancel or reschedule a booking?",
      answer:
        "Yes, you can manage your bookings from your dashboard. Cancellations and rescheduling depend on the club’s cancellation policy.",
    },
    {
      question: "Who can use BookaPlay?",
      answer:
        "Anyone! Whether you're a player looking for a quick game, a member of a sports club, or an admin managing facilities — BookaPlay supports all roles.",
    },
  ];

  return (
    <section className="py-12 px-4 max-w-5xl mx-auto">
      <div className="text-center mb-10">
        <h1 className="text-4xl font-extrabold text-primary mb-2">Frequently Asked Questions</h1>
        <p className="text-base-content max-w-2xl mx-auto">
          Have questions? We've got answers. Here’s everything you need to know about using BookaPlay.
        </p>
      </div>

      <div className="space-y-6">
        {faqs.map((faq, idx) => (
          <div key={idx} className="bg-base-200 rounded-md p-6 shadow hover:shadow-md transition">
            <h3 className="text-lg font-semibold text-accent mb-2">{faq.question}</h3>
            <p className="text-base-content">{faq.answer}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Faq;
