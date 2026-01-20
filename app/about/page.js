// app/about/page.js
"use client";
import { useState, useEffect, useMemo } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

// Import all sections
import AboutHero from "./sections/AboutHero";
import WhoWeAre from "./sections/WhoWeAre";
import Timeline from "./sections/Timeline";
import VisionMission from "./sections/VisionMission";
import Team from "./sections/Team";
import WhyChooseUs from "./sections/WhyChooseUs";
import AboutCTA from "./sections/AboutCTA";

// Default fallback data
const DEFAULT_ABOUT_CONTENT = {
  badge: 'Who We Are',
  title: 'Crafting Digital',
  highlightedText: 'Excellence',
  paragraph1: 'Your Zeros and Ones is a premier IT consulting and software development company dedicated to helping businesses thrive in the digital age. We combine technical expertise with business acumen to deliver innovative solutions that drive growth and efficiency.',
  paragraph2: 'Our team of passionate developers, designers, and strategists work collaboratively to transform complex challenges into elegant, user-friendly solutions.',
  media: '/images/about/about-company.png',
  mediaType: 'image',
  published: true
};

export default function About() {
  // State for dynamic data
  const [aboutContent, setAboutContent] = useState(DEFAULT_ABOUT_CONTENT);
  const [timelineItems, setTimelineItems] = useState([]);
  const [timelineLoading, setTimelineLoading] = useState(true);
  const [teamMembers, setTeamMembers] = useState([]);
  const [teamLoading, setTeamLoading] = useState(true);
  const [stats, setStats] = useState({
    projects: 20,
    clients: 30,
    years: 15,
    support: "24/7",
  });

  // Fetch all data on mount
  useEffect(() => {
    const fetchAllData = async () => {
      try {
        const [aboutRes, statsRes, timelineRes, teamRes] = await Promise.all([
          fetch('/api/admin/about/content').catch(() => null),
          fetch('/api/stats').catch(() => null),
          fetch('/api/admin/about/timeline?published=true').catch(() => null),
          fetch('/api/team').catch(() => null),
        ]);

        // About Content
        if (aboutRes?.ok) {
          const data = await aboutRes.json();
          if (data?.published !== false) {
            setAboutContent(data);
          }
        }

        // Stats
        if (statsRes?.ok) {
          const data = await statsRes.json();
          setStats({
            projects: data.projects || 20,
            clients: data.clients || 30,
            years: data.years || 15,
            support: data.support || "24/7",
          });
        }

        // Timeline
        if (timelineRes?.ok) {
          const data = await timelineRes.json();
          setTimelineItems(data);
        }
        setTimelineLoading(false);

        // Team
        if (teamRes?.ok) {
          const data = await teamRes.json();
          setTeamMembers(data);
        }
        setTeamLoading(false);

      } catch (error) {
        console.error('Failed to fetch data:', error);
        setTimelineLoading(false);
        setTeamLoading(false);
      }
    };

    fetchAllData();
  }, []);

  // Memoized display stats
  const displayStats = useMemo(() => [
    { value: `${stats.projects}+`, label: "Projects Completed", icon: "CheckCircle" },
    { value: `${stats.years}+`, label: "Years Experience", icon: "Calendar" },
    { value: `${stats.clients}+`, label: "Happy Clients", icon: "Users" },
    { value: stats.support, label: "Support", icon: "Clock" },
  ], [stats]);

  return (
    <>
      <Header />
      <main className="min-h-screen bg-gray-100">
        <AboutHero />
        <WhoWeAre aboutContent={aboutContent} displayStats={displayStats} />
        <Timeline timelineItems={timelineItems} loading={timelineLoading} />
        <VisionMission />
        <Team teamMembers={teamMembers} loading={teamLoading} />
        <WhyChooseUs />
        <AboutCTA />
      </main>
      <Footer />
    </>
  );
}