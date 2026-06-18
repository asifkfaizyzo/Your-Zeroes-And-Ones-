// app/about/page.js
"use client";
import { useState, useEffect, useMemo } from "react";

import AboutHero from "./sections/AboutHero";
import WhoWeAre from "./sections/WhoWeAre";
import Timeline from "./sections/Timeline";
import VisionMission from "./sections/VisionMission";
import Team from "./sections/Team";
import WhyChooseUs from "./sections/WhyChooseUs";
import AboutCTA from "./sections/AboutCTA";

const DEFAULT_ABOUT_CONTENT = {
  badge: "Who We Are",
  title: "Crafting Digital",
  highlightedText: "Excellence",
  paragraph1:
    "Your Zeros and Ones is a premier IT consulting and software development company dedicated to helping businesses thrive in the digital age. We combine technical expertise with business acumen to deliver innovative solutions that drive growth and efficiency.",
  paragraph2:
    "Our team of passionate developers, designers, and strategists work collaboratively to transform complex challenges into elegant, user-friendly solutions.",
  media: "/images/about/about-company.png",
  mediaType: "image",
  published: true,
};

export default function About() {
  const [aboutContent, setAboutContent] = useState(DEFAULT_ABOUT_CONTENT);
  const [timelineItems, setTimelineItems] = useState([]);
  const [timelineLoading, setTimelineLoading] = useState(true);
  const [teamMembers, setTeamMembers] = useState([]);
  const [teamLoading, setTeamLoading] = useState(true);
  const [stats, setStats] = useState({
    projects: 20,
    clients: 30,
    years: 10,
    support: "24/7",
  });

  useEffect(() => {
    const fetchAllData = async () => {
      try {
        const [aboutRes, statsRes, timelineRes, teamRes] = await Promise.all([
          fetch("/api/admin/about/content").catch(() => null),
          fetch("/api/stats").catch(() => null),
          fetch("/api/admin/about/timeline?published=true").catch(() => null),
          fetch("/api/team").catch(() => null),
        ]);

        if (aboutRes?.ok) {
          const data = await aboutRes.json();
          if (data?.published !== false) setAboutContent(data);
        }

        if (statsRes?.ok) {
          const data = await statsRes.json();
          setStats({
            projects: data.projects || 20,
            clients: data.clients || 20,
            years: data.years || 10,
            support: data.support || "24/7",
          });
        }

        if (timelineRes?.ok) {
          const data = await timelineRes.json();
          setTimelineItems(data);
        }
        setTimelineLoading(false);

        if (teamRes?.ok) {
          const data = await teamRes.json();
          setTeamMembers(data);
        }
        setTeamLoading(false);
      } catch (error) {
        console.error("Failed to fetch data:", error);
        setTimelineLoading(false);
        setTeamLoading(false);
      }
    };

    fetchAllData();
  }, []);

  const displayStats = useMemo(
    () => [
      {
        value: `${stats.projects}+`,
        label: "Projects Completed",
        icon: "CheckCircle",
      },
      {
        value: `${stats.years}+`,
        label: "Years Experience",
        icon: "Calendar",
      },
      {
        value: `${stats.clients}+`,
        label: "Happy Clients",
        icon: "Users",
      },
      { 
        value: stats.support, 
        label: "Support", 
        icon: "Clock" 
      },
    ],
    [stats]
  );

  return (
    // Matches landing page root bg
    <div className="bg-[#060010] font-['Inter',sans-serif]">
      <AboutHero />
      <WhoWeAre aboutContent={aboutContent} displayStats={displayStats} />
      <Timeline timelineItems={timelineItems} loading={timelineLoading} />
      <VisionMission />
      <Team teamMembers={teamMembers} loading={teamLoading} />
      <WhyChooseUs />
      <AboutCTA />
    </div>
  );
}