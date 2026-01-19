// app/portfolio/[slug]/page.js
import { notFound } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProjectDetail from "./ProjectDetail";

// Fetch single portfolio item
async function getPortfolioItem(slug) {
  try {
    const baseUrl = process.env.SITE_ORIGIN || 'http://localhost:3000';
    const res = await fetch(`${baseUrl}/api/portfolio/${slug}`, {
      cache: 'no-store', // or 'force-cache' for static
    });

    if (!res.ok) return null;
    return res.json();
  } catch (error) {
    console.error('Error fetching portfolio item:', error);
    return null;
  }
}

// Fetch related projects
async function getRelatedProjects(category, currentSlug) {
  try {
    const baseUrl = process.env.SITE_ORIGIN || 'http://localhost:3000';
    const res = await fetch(`${baseUrl}/api/portfolio?category=${encodeURIComponent(category)}`, {
      cache: 'no-store',
    });

    if (!res.ok) return [];
    const projects = await res.json();
    
    // Filter out current project and limit to 3
    return projects
      .filter(p => p.slug !== currentSlug)
      .slice(0, 3);
  } catch (error) {
    console.error('Error fetching related projects:', error);
    return [];
  }
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const project = await getPortfolioItem(slug);

  if (!project) {
    return { title: "Project Not Found" };
  }

  return {
    title: `${project.title} | Portfolio`,
    description: project.shortDescription,
  };
}

export default async function ProjectDetailPage({ params }) {
  const { slug } = await params;
  const project = await getPortfolioItem(slug);

  if (!project) {
    notFound();
  }

  const relatedProjects = await getRelatedProjects(project.category, slug);

  return (
    <>
      <Header />
      <ProjectDetail project={project} relatedProjects={relatedProjects} />
      <Footer />
    </>
  );
}
