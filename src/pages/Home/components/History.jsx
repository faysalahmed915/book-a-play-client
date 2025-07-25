import React from 'react';
import {
  VerticalTimeline,
  VerticalTimelineElement,
} from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';
import {
  FaStar,
  FaFlagCheckered,
  FaTrophy,
  FaHandshake,
} from 'react-icons/fa';

export default function History() {
  const timelineContentStyle = {
    background: 'hsl(var(--b1))',
    color: 'hsl(var(--bc))',
    border: '1px solid hsl(var(--b2))',
    boxShadow: '0 6px 20px rgba(0, 0, 0, 0.1)',
  };

  const timelineContentArrowStyle = {
    borderRight: '7px solid hsl(var(--b2))',
  };

  return (
    <section className="py-16 px-4 md:px-20 bg-base-200 shadow-xl rounded-2xl mb-16">
      <div className="text-center mb-12">
        <div className="inline-flex items-center justify-center bg-secondary text-secondary-content rounded-full p-5 shadow-lg mb-5">
          <FaFlagCheckered className="text-4xl" />
        </div>
        <h2 className="text-4xl font-extrabold text-primary drop-shadow-lg">
          Our History
        </h2>
        <p className="text-lg text-base-content max-w-2xl mx-auto mt-4 leading-relaxed">
          A journey of passion, perseverance, and progress in building a
          vibrant sports community.
        </p>
      </div>

      <VerticalTimeline lineColor="hsl(var(--p))">
        {/* Launch */}
        <VerticalTimelineElement
          contentStyle={timelineContentStyle}
          contentArrowStyle={timelineContentArrowStyle}
          date="2022"
          iconStyle={{ background: 'hsl(var(--a))', color: '#fff' }}
          icon={<FaFlagCheckered />}
        >
          <h3 className="text-xl font-bold text-primary">BookAPlay Launch</h3>
          <p className="text-base-content mt-2">
            Started as a small initiative to connect local players and create accessible courts for everyone.
          </p>
        </VerticalTimelineElement>

        {/* Tournament */}
        <VerticalTimelineElement
          contentStyle={timelineContentStyle}
          contentArrowStyle={timelineContentArrowStyle}
          date="2023"
          iconStyle={{ background: 'hsl(var(--a))', color: '#fff' }}
          icon={<FaTrophy />}
        >
          <h3 className="text-xl font-bold text-accent">First Tournament Hosted</h3>
          <p className="text-base-content mt-2">
            Organized our first multi-sport tournament — a milestone in our journey toward community engagement.
          </p>
        </VerticalTimelineElement>

        {/* Partnership */}
        <VerticalTimelineElement
          contentStyle={timelineContentStyle}
          contentArrowStyle={timelineContentArrowStyle}
          date="2024"
          iconStyle={{ background: 'hsl(var(--s))', color: '#fff' }}
          icon={<FaHandshake />}
        >
          <h3 className="text-xl font-bold text-secondary">Partnered with Local Clubs</h3>
          <p className="text-base-content mt-2">
            Collaborated with clubs and organizations to expand access and improve facilities.
          </p>
        </VerticalTimelineElement>

        {/* Growth */}
        <VerticalTimelineElement
          contentStyle={timelineContentStyle}
          contentArrowStyle={timelineContentArrowStyle}
          date="2025"
          iconStyle={{ background: 'hsl(var(--p))', color: '#fff' }}
          icon={<FaStar />}
        >
          <h3 className="text-xl font-bold text-primary">5K+ Members & Counting</h3>
          <p className="text-base-content mt-2">
            Celebrating a growing community of players united by passion and purpose.
          </p>
        </VerticalTimelineElement>
      </VerticalTimeline>
    </section>
  );
}
