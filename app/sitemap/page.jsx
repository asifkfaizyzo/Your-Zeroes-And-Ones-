// app/sitemap/page.jsx
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import prisma from '@/lib/prisma';

export const metadata = {
  title: 'Sitemap | YourZerosAndOnes',
  description: 'Complete sitemap of all pages and services offered by YourZerosAndOnes.',
};

async function getSitemapData() {
  try {
    const [blogs, portfolios] = await Promise.all([
      prisma.blog.findMany({
        where: { published: true },
        select: { slug: true, title: true },
        orderBy: { createdAt: 'desc' },
      }),
      prisma.portfolio.findMany({
        where: { published: true },
        select: { slug: true, title: true },
        orderBy: { createdAt: 'desc' },
      }),
    ]);
    return { blogs, portfolios };
  } catch (error) {
    console.error('Error fetching sitemap data:', error);
    return { blogs: [], portfolios: [] };
  }
}

export default async function SitemapPage() {
  const { blogs, portfolios } = await getSitemapData();

  const sections = [
    {
      title: 'Main Pages',
      links: [
        { url: '/', label: 'Home' },
        { url: '/about', label: 'About Us' },
        { url: '/services', label: 'Services' },
        { url: '/portfolio', label: 'Portfolio' },
        { url: '/blog', label: 'Blog' },
        { url: '/clients', label: 'Our Clients' },
        { url: '/testimonials', label: 'Testimonials' },
        { url: '/contact', label: 'Contact Us' },
      ],
    },
    {
      title: 'Branding & Design Services',
      links: [
        { url: '/services/branding-design', label: 'Branding & Design Overview' },
        { url: '/services/branding-design/brand-consulting', label: 'Brand Consulting' },
        { url: '/services/branding-design/logo-design', label: 'Logo Design' },
        { url: '/services/branding-design/graphic-design', label: 'Graphic Design' },
        { url: '/services/branding-design/2d-3d-visualization', label: '2D & 3D Visualization' },
        { url: '/services/branding-design/video-production', label: 'Video Production' },
        { url: '/services/branding-design/audio-production', label: 'Audio Production' },
        { url: '/services/branding-design/ai-video-production', label: 'AI Video Production' },
      ],
    },
    {
      title: 'Digital Marketing Services',
      links: [
        { url: '/services/digital-marketing', label: 'Digital Marketing Overview' },
        { url: '/services/digital-marketing/seo', label: 'SEO' },
        { url: '/services/digital-marketing/social-media-management', label: 'Social Media Management' },
        { url: '/services/digital-marketing/performance-marketing', label: 'Performance Marketing' },
        { url: '/services/digital-marketing/content-marketing', label: 'Content Marketing' },
        { url: '/services/digital-marketing/marketing-automation', label: 'Marketing Automation' },
        { url: '/services/digital-marketing/analytics', label: 'Analytics & Reporting' },
      ],
    },
    {
      title: 'Technology Services',
      links: [
        { url: '/services/technology', label: 'Technology Overview' },
        { url: '/services/technology/ai-ml', label: 'AI & Machine Learning' },
        { url: '/services/technology/devops-consulting', label: 'DevOps Consulting' },
        { url: '/services/technology/web-development', label: 'Web Development' },
        { url: '/services/technology/mobile-app-development', label: 'Mobile App Development' },
        { url: '/services/technology/ecommerce', label: 'E-Commerce Solutions' },
        { url: '/services/technology/qa-testing', label: 'Quality Assurance' },
        { url: '/services/technology/cloud-services', label: 'Cloud Services' },
        { url: '/services/technology/data-analytics', label: 'Data & Analytics' },
        { url: '/services/technology/cyber-security', label: 'Cyber Security' },
      ],
    },
  ];

  return (
    <>
      <Header />
      <main className="min-h-screen bg-white">
        {/* Hero */}
        <section className="bg-gradient-to-br from-[#203E7F] to-cyan-600 py-16 sm:py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
              Sitemap
            </h1>
            <p className="text-lg text-blue-100 max-w-2xl mx-auto">
              Explore all pages and services we offer
            </p>
          </div>
        </section>

        {/* Content */}
        <section className="py-12 sm:py-16 lg:py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
              {/* Static sections */}
              {sections.map((section, idx) => (
                <div key={idx} className="bg-white rounded-xl border border-slate-200 p-6 hover:shadow-lg transition-shadow">
                  <h2 className="text-xl font-bold text-slate-800 mb-4 pb-3 border-b border-slate-200">
                    {section.title}
                  </h2>
                  <ul className="space-y-2">
                    {section.links.map((link, linkIdx) => (
                      <li key={linkIdx}>
                        <Link
                          href={link.url}
                          className="text-slate-600 hover:text-blue-600 hover:underline transition-colors flex items-center group"
                        >
                          <svg
                            className="w-4 h-4 mr-2 text-slate-400 group-hover:text-blue-600 transition-colors"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M9 5l7 7-7 7"
                            />
                          </svg>
                          {link.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}

              {/* Portfolio Projects */}
              {portfolios.length > 0 && (
                <div className="bg-white rounded-xl border border-slate-200 p-6 hover:shadow-lg transition-shadow">
                  <h2 className="text-xl font-bold text-slate-800 mb-4 pb-3 border-b border-slate-200">
                    Portfolio Projects ({portfolios.length})
                  </h2>
                  <ul className="space-y-2 max-h-96 overflow-y-auto">
                    {portfolios.map((project) => (
                      <li key={project.slug}>
                        <Link
                          href={`/portfolio/${project.slug}`}
                          className="text-slate-600 hover:text-blue-600 hover:underline transition-colors flex items-center group"
                        >
                          <svg
                            className="w-4 h-4 mr-2 text-slate-400 group-hover:text-blue-600 transition-colors flex-shrink-0"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M9 5l7 7-7 7"
                            />
                          </svg>
                          {project.title}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Blog Posts */}
              {blogs.length > 0 && (
                <div className="bg-white rounded-xl border border-slate-200 p-6 hover:shadow-lg transition-shadow">
                  <h2 className="text-xl font-bold text-slate-800 mb-4 pb-3 border-b border-slate-200">
                    Blog Articles ({blogs.length})
                  </h2>
                  <ul className="space-y-2 max-h-96 overflow-y-auto">
                    {blogs.map((blog) => (
                      <li key={blog.slug}>
                        <Link
                          href={`/blog/${blog.slug}`}
                          className="text-slate-600 hover:text-blue-600 hover:underline transition-colors flex items-center group"
                        >
                          <svg
                            className="w-4 h-4 mr-2 text-slate-400 group-hover:text-blue-600 transition-colors flex-shrink-0"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M9 5l7 7-7 7"
                            />
                          </svg>
                          {blog.title}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Legal */}
              <div className="bg-white rounded-xl border border-slate-200 p-6 hover:shadow-lg transition-shadow">
                <h2 className="text-xl font-bold text-slate-800 mb-4 pb-3 border-b border-slate-200">
                  Legal & Policies
                </h2>
                <ul className="space-y-2">
                  <li>
                    <Link
                      href="/privacy-policy"
                      className="text-slate-600 hover:text-blue-600 hover:underline transition-colors flex items-center group"
                    >
                      <svg
                        className="w-4 h-4 mr-2 text-slate-400 group-hover:text-blue-600 transition-colors"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                      Privacy Policy
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
