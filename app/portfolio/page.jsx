// app/portfolio/page.jsx
"use client";
import { useState, useMemo, useEffect } from "react";
import PortfolioHero from "./components/PortfolioHero";
import PortfolioFilter from "./components/PortfolioFilter";
import ProjectGrid from "./components/ProjectGrid";
import PortfolioCTA from "./components/PortfolioCTA";
import { PORTFOLIO_CATEGORIES } from "@/lib/portfolio-categories";
import { FolderCheck, Users, Clock, Star } from "lucide-react";

const parseCategories = (categories) => {
  if (!categories) return [];
  if (typeof categories === "string") {
    try { return JSON.parse(categories); } catch { return []; }
  }
  return Array.isArray(categories) ? categories : [];
};

export default function Portfolio() {
  const [projects, setProjects] = useState([]);
  const [activeCategory, setActiveCategory] = useState(null);
  const [activeSubCategory, setActiveSubCategory] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isFiltering, setIsFiltering] = useState(false);

  const [stats, setStats] = useState({
    projects: 0, clients: 30, years: 10, satisfaction: 100,
  });

  useEffect(() => {
    fetch("/api/stats")
      .then((res) => res.json())
      .then((data) => {
        setStats({
          projects: data.projects || 20,
          clients: data.clients || 15,
          years: data.years,
          satisfaction: 100,
        });
      })
      .catch(() => {
        setStats({ projects: 20, clients: 20, years: 10, satisfaction: 100 });
      });
  }, []);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setIsLoading(true);
        const res = await fetch("/api/portfolio");
        if (res.ok) {
          const data = await res.json();
          setProjects(data);
        }
      } catch (error) {
        console.error("Error fetching projects:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchProjects();
  }, []);

  const filteredProjects = useMemo(() => {
    let result = projects;
    if (activeCategory) {
      const category = PORTFOLIO_CATEGORIES.find((c) => c.slug === activeCategory);
      if (category) {
        result = result.filter((project) => {
          const projectCategories = parseCategories(project.categories);
          return projectCategories.some((cat) => cat.category === category.category);
        });
      }
    }
    if (activeSubCategory && activeCategory) {
      const category = PORTFOLIO_CATEGORIES.find((c) => c.slug === activeCategory);
      if (category) {
        const subService = category.subServices.find((s) => s.slug === activeSubCategory);
        if (subService) {
          result = result.filter((project) => {
            const projectCategories = parseCategories(project.categories);
            return projectCategories.some(
              (cat) => cat.category === category.category && cat.subCategory === subService.name
            );
          });
        }
      }
    }
    return result;
  }, [projects, activeCategory, activeSubCategory]);

  const projectCounts = useMemo(() => {
    const counts = { all: projects.length };
    PORTFOLIO_CATEGORIES.forEach((category) => {
      counts[category.slug] = projects.filter((project) => {
        const projectCategories = parseCategories(project.categories);
        return projectCategories.some((cat) => cat.category === category.category);
      }).length;
    });
    return counts;
  }, [projects]);

  useEffect(() => {
    setIsFiltering(true);
    const timer = setTimeout(() => setIsFiltering(false), 300);
    return () => clearTimeout(timer);
  }, [activeCategory, activeSubCategory]);

  return (
    <div className="bg-[#060010] font-['Inter',sans-serif]">
      <PortfolioHero stats={stats} />

      <PortfolioFilter
        categories={PORTFOLIO_CATEGORIES}
        activeCategory={activeCategory}
        activeSubCategory={activeSubCategory}
        onCategoryChange={setActiveCategory}
        onSubCategoryChange={setActiveSubCategory}
        projectCounts={projectCounts}
      />

      {/* Projects Section */}
      <section className="py-16 bg-[#060812]">
        <div
          className="w-full"
          style={{
            paddingLeft: "clamp(2rem, 8vw, 12rem)",
            paddingRight: "clamp(2rem, 8vw, 12rem)",
          }}
        >
          <div className="mb-8">
            <p className="text-white/50">
              Showing{" "}
              <span className="font-semibold text-white">
                {filteredProjects.length}
              </span>{" "}
              projects
              {activeCategory && (
                <span className="text-white/30">
                  {" "}in{" "}
                  {PORTFOLIO_CATEGORIES.find((c) => c.slug === activeCategory)?.category}
                  {activeSubCategory && (
                    <span>
                      {" → "}
                      {PORTFOLIO_CATEGORIES.find((c) => c.slug === activeCategory)
                        ?.subServices.find((s) => s.slug === activeSubCategory)?.name}
                    </span>
                  )}
                </span>
              )}
            </p>
          </div>
          <ProjectGrid
            projects={filteredProjects}
            isLoading={isLoading || isFiltering}
          />
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-[#060010]">
        <div
          className="w-full"
          style={{
            paddingLeft: "clamp(2rem, 8vw, 12rem)",
            paddingRight: "clamp(2rem, 8vw, 12rem)",
          }}
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
            {[
              { value: `${stats.projects}+`, label: "Projects Completed", Icon: FolderCheck },
              { value: `${stats.clients}+`, label: "Happy Clients", Icon: Users },
              { value: `${stats.years}+`, label: "Years Experience", Icon: Clock },
              { value: `${stats.satisfaction}%`, label: "Client Satisfaction", Icon: Star },
            ].map((stat, index) => (
              <div
                key={index}
                className="p-4 sm:p-6 rounded-2xl text-center border border-[#5b8def]/20 bg-[#5b8def]/5
                           backdrop-blur-sm hover:border-[#5b8def]/40 hover:-translate-y-1 hover:bg-[#5b8def]/10
                           transition-all duration-300 group"
              >
                <div className="w-12 h-12 sm:w-14 sm:h-14 bg-[#1e3a6e] border border-[#5b8def]/30 rounded-xl flex items-center justify-center mx-auto mb-3 group-hover:scale-110 group-hover:border-[#5b8def]/60 transition-all duration-300">
                  <stat.Icon className="w-6 h-6 sm:w-7 sm:h-7 text-[#5b8def]" />
                </div>
                <div className="text-2xl sm:text-3xl font-bold text-white mb-2">
                  {stat.value}
                </div>
                <div className="text-white/40 text-xs sm:text-sm">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <PortfolioCTA />
    </div>
  );
}