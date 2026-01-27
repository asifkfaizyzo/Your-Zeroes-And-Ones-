// app/portfolio/page.jsx
"use client";
import { useState, useMemo, useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PortfolioHero from "./components/PortfolioHero";
import PortfolioFilter from "./components/PortfolioFilter";
import ProjectGrid from "./components/ProjectGrid";
import PortfolioCTA from "./components/PortfolioCTA";
import { PORTFOLIO_CATEGORIES } from "@/lib/portfolio-categories";
import { FolderCheck, Users, Clock, Star } from "lucide-react";

// Helper function to safely parse categories
const parseCategories = (categories) => {
  if (!categories) return [];
  if (typeof categories === "string") {
    try {
      return JSON.parse(categories);
    } catch {
      return [];
    }
  }
  return Array.isArray(categories) ? categories : [];
};

export default function Portfolio() {
  const [projects, setProjects] = useState([]);
  const [activeCategory, setActiveCategory] = useState(null);
  const [activeSubCategory, setActiveSubCategory] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isFiltering, setIsFiltering] = useState(false);
  
  // ✅ NEW: Dynamic stats state
  const [stats, setStats] = useState({
    projects: 0,
    clients: 30,
    years: 15,
    satisfaction: 100,
  });

  // ✅ NEW: Fetch stats from API
  useEffect(() => {
    fetch("/api/stats")
      .then((res) => res.json())
      .then((data) => {
        setStats({
          projects: data.projects || 0,
          clients: data.clients || 30,
          years: data.years || 15,
          satisfaction: 100, // Always 100%
        });
      })
      .catch(() => {
        // Fallback values if API fails
        setStats({
          projects: 20,
          clients: 30,
          years: 15,
          satisfaction: 100,
        });
      });
  }, []);

  // Fetch projects
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

  // Filter projects based on categories array
  const filteredProjects = useMemo(() => {
    let result = projects;

    if (activeCategory) {
      const category = PORTFOLIO_CATEGORIES.find(
        (c) => c.slug === activeCategory,
      );
      if (category) {
        result = result.filter((project) => {
          const projectCategories = parseCategories(project.categories);
          return projectCategories.some(
            (cat) => cat.category === category.category,
          );
        });
      }
    }

    if (activeSubCategory && activeCategory) {
      const category = PORTFOLIO_CATEGORIES.find(
        (c) => c.slug === activeCategory,
      );
      if (category) {
        const subService = category.subServices.find(
          (s) => s.slug === activeSubCategory,
        );
        if (subService) {
          result = result.filter((project) => {
            const projectCategories = parseCategories(project.categories);
            return projectCategories.some(
              (cat) =>
                cat.category === category.category &&
                cat.subCategory === subService.name,
            );
          });
        }
      }
    }

    return result;
  }, [projects, activeCategory, activeSubCategory]);

  // Project counts by category slug
  const projectCounts = useMemo(() => {
    const counts = { all: projects.length };

    PORTFOLIO_CATEGORIES.forEach((category) => {
      counts[category.slug] = projects.filter((project) => {
        const projectCategories = parseCategories(project.categories);
        return projectCategories.some(
          (cat) => cat.category === category.category,
        );
      }).length;
    });

    return counts;
  }, [projects]);

  // Loading state for filters
  useEffect(() => {
    setIsFiltering(true);
    const timer = setTimeout(() => setIsFiltering(false), 300);
    return () => clearTimeout(timer);
  }, [activeCategory, activeSubCategory]);

  return (
    <>
      
      <main className="min-h-screen bg-white">
        {/* ✅ UPDATED: Pass dynamic stats to hero */}
        <PortfolioHero stats={stats} />

        <PortfolioFilter
          categories={PORTFOLIO_CATEGORIES}
          activeCategory={activeCategory}
          activeSubCategory={activeSubCategory}
          onCategoryChange={setActiveCategory}
          onSubCategoryChange={setActiveSubCategory}
          projectCounts={projectCounts}
        />

        {/* Projects Section with Dynamic Padding */}
        <section className="py-16 bg-gray-50">
          <div
            className="max-w-[1800px] mx-auto"
            style={{
              paddingLeft: "clamp(2rem, 8vw, 12rem)",
              paddingRight: "clamp(2rem, 8vw, 12rem)",
            }}
          >
            <div className="mb-8">
              <p className="text-gray-600">
                Showing{" "}
                <span className="font-semibold text-gray-900">
                  {filteredProjects.length}
                </span>{" "}
                projects
                {activeCategory && (
                  <span className="text-gray-400">
                    {" "}
                    in{" "}
                    {
                      PORTFOLIO_CATEGORIES.find(
                        (c) => c.slug === activeCategory,
                      )?.category
                    }
                    {activeSubCategory && (
                      <span>
                        {" → "}
                        {
                          PORTFOLIO_CATEGORIES.find(
                            (c) => c.slug === activeCategory,
                          )?.subServices.find(
                            (s) => s.slug === activeSubCategory,
                          )?.name
                        }
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

        {/* ✅ UPDATED: Stats Section with Dynamic Data */}
        <section className="py-16 bg-white">
          <div
            className="max-w-[1800px] mx-auto"
            style={{
              paddingLeft: "clamp(2rem, 8vw, 12rem)",
              paddingRight: "clamp(2rem, 8vw, 12rem)",
            }}
          >
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
              {[
                {
                  value: `${stats.projects}+`,
                  label: "Projects Completed",
                  Icon: FolderCheck,
                },
                { 
                  value: `${stats.clients}+`, 
                  label: "Happy Clients", 
                  Icon: Users 
                },
                { 
                  value: `${stats.years}+`, 
                  label: "Years Experience", 
                  Icon: Clock 
                },
                { 
                  value: `${stats.satisfaction}%`, 
                  label: "Client Satisfaction", 
                  Icon: Star 
                },
              ].map((stat, index) => (
                <div
                  key={index}
                  className="bg-gray-50 p-4 sm:p-6 rounded-2xl text-center group hover:bg-white hover:shadow-lg transition-all duration-300"
                >
                  <div className="w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-br from-[#203E7F] to-cyan-600 rounded-xl flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                    <stat.Icon className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
                  </div>
                  <div className="text-2xl sm:text-3xl font-bold text-[#203E7F] mb-2">
                    {stat.value}
                  </div>
                  <div className="text-gray-600 text-xs sm:text-sm">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <PortfolioCTA />
      </main>
      <Footer />
    </>
  );
}