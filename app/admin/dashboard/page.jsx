// app/admin/dashboard/page.jsx
import Link from "next/link";
import AdminLayoutNew from '@/components/admin/AdminLayoutNew';
import prisma from "@/lib/prisma";

async function getStats() {
  // ✅ Fixed: Safely check if models exist
  const [
    totalBlogs,
    publishedBlogs,
    draftBlogs,
  ] = await Promise.all([
    prisma.blog.count(),
    prisma.blog.count({ where: { published: true } }),
    prisma.blog.count({ where: { published: false } }),
  ]);

  // ✅ Safely get portfolio count if model exists
  let totalPortfolio = 0;
  try {
    if (prisma.portfolio) {
      totalPortfolio = await prisma.portfolio.count();
    }
  } catch (error) {
    console.log('Portfolio model not found');
  }

  // ✅ Safely get testimonial counts if model exists
  let totalTestimonials = 0;
  let verifiedTestimonials = 0;
  try {
    if (prisma.testimonial) {
      totalTestimonials = await prisma.testimonial.count();
      verifiedTestimonials = await prisma.testimonial.count({ where: { verified: true } });
    }
  } catch (error) {
    console.log('Testimonial model not found');
  }
  
  return { 
    totalBlogs, 
    publishedBlogs, 
    draftBlogs,
    totalPortfolio,
    totalTestimonials,
    verifiedTestimonials
  };
}

async function getRecentBlogs() {
  return prisma.blog.findMany({
    take: 5,
    orderBy: { createdAt: "desc" },
    select: {
      id: true,
      title: true,
      slug: true,
      published: true,
      createdAt: true,
    },
  });
}

async function getRecentTestimonials() {
  // ✅ Safely get testimonials if model exists
  try {
    if (prisma.testimonial) {
      return await prisma.testimonial.findMany({
        take: 3,
        orderBy: { createdAt: "desc" },
        select: {
          id: true,
          name: true,
          role: true,
          rating: true,
          verified: true,
          published: true,
        },
      });
    }
  } catch (error) {
    console.log('Could not fetch testimonials');
  }
  return [];
}

export default async function AdminDashboard() {
  const stats = await getStats();
  const recentBlogs = await getRecentBlogs();
  const recentTestimonials = await getRecentTestimonials();

  const statCards = [
    {
      title: "Total Blogs",
      value: stats.totalBlogs,
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
        </svg>
      ),
      bgGradient: "from-blue-500 to-blue-600",
      link: "/admin/blogs",
    },
    {
      title: "Published Blogs",
      value: stats.publishedBlogs,
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      bgGradient: "from-emerald-500 to-emerald-600",
      link: "/admin/blogs",
    },
    {
      title: "Portfolio Items",
      value: stats.totalPortfolio,
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      ),
      bgGradient: "from-violet-500 to-violet-600",
      link: "/admin/portfolio",
    },
    {
      title: "Testimonials",
      value: stats.totalTestimonials,
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
        </svg>
      ),
      bgGradient: "from-amber-500 to-amber-600",
      link: "/admin/testimonials",
    },
  ];

  const quickActions = [
    {
      title: "Create Blog Post",
      description: "Write and publish a new blog article",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
        </svg>
      ),
      href: "/admin/blogs/create",
      color: "blue",
    },
    {
      title: "Add Portfolio Item",
      description: "Showcase your latest project",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
        </svg>
      ),
      href: "/admin/portfolio/create",
      color: "violet",
    },
    {
      title: "Add Testimonial",
      description: "Share client feedback and reviews",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
        </svg>
      ),
      href: "/admin/testimonials/create",
      color: "amber",
    },
  ];

  return (
    <AdminLayoutNew>
      <div className="min-h-screen  mt-0">
        {/* Page Header */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-slate-800">Dashboard</h1>
              <p className="text-slate-600 mt-1 text-sm sm:text-base">Welcome back! Here's your content overview</p>
            </div>
            <div className="flex items-center gap-2">
              <span className="px-3 py-1.5 bg-emerald-100 text-emerald-700 text-sm font-medium rounded-lg">
                All Systems Active
              </span>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {statCards.map((stat, index) => (
            <Link
              key={index}
              href={stat.link}
              className="relative overflow-hidden bg-white rounded-xl border border-slate-200 p-5 hover:shadow-lg hover:border-slate-300 transition-all duration-300 group"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-500 mb-1">{stat.title}</p>
                  <p className="text-3xl font-bold text-slate-800">{stat.value}</p>
                </div>
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${stat.bgGradient} flex items-center justify-center text-white shadow-lg`}>
                  {stat.icon}
                </div>
              </div>
              {/* Decorative element */}
              <div className={`absolute -bottom-4 -right-4 w-24 h-24 bg-gradient-to-br ${stat.bgGradient} opacity-5 rounded-full group-hover:opacity-10 transition-opacity`} />
            </Link>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          {quickActions.map((action, index) => (
            <Link
              key={index}
              href={action.href}
              className="group bg-white rounded-xl border border-slate-200 p-6 hover:shadow-lg hover:border-slate-300 transition-all duration-300"
            >
              <div className={`w-12 h-12 rounded-xl bg-${action.color}-100 flex items-center justify-center text-${action.color}-600 mb-4 group-hover:scale-110 transition-transform`}>
                {action.icon}
              </div>
              <h3 className="text-lg font-bold text-slate-800 mb-1 group-hover:text-blue-600 transition-colors">
                {action.title}
              </h3>
              <p className="text-sm text-slate-500">{action.description}</p>
            </Link>
          ))}
        </div>

        {/* Content Sections */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Recent Blogs - Takes 2 columns */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
              <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
                <h2 className="text-xl font-bold text-slate-800">Recent Blogs</h2>
                <Link
                  href="/admin/blogs"
                  className="text-sm text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1"
                >
                  View all
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
              <div className="divide-y divide-slate-100">
                {recentBlogs.length === 0 ? (
                  <div className="p-12 text-center">
                    <div className="w-16 h-16 mx-auto mb-4 rounded-xl bg-slate-100 flex items-center justify-center">
                      <svg className="w-8 h-8 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                      </svg>
                    </div>
                    <p className="text-slate-500 font-medium mb-2">No blogs yet</p>
                    <p className="text-sm text-slate-400 mb-4">Create your first blog post to get started</p>
                    <Link
                      href="/admin/blogs/create"
                      className="inline-flex items-center gap-2 px-4 py-2 bg-slate-900 text-white rounded-lg text-sm font-medium hover:bg-blue-600 transition-colors"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                      </svg>
                      Create Blog
                    </Link>
                  </div>
                ) : (
                  recentBlogs.map((blog) => (
                    <div key={blog.id} className="p-4 hover:bg-slate-50 transition-colors group">
                      <div className="flex items-center justify-between gap-4">
                        <div className="flex-1 min-w-0">
                          <h3 className="font-semibold text-slate-800 truncate group-hover:text-blue-600 transition-colors">
                            {blog.title}
                          </h3>
                          <div className="flex items-center gap-3 mt-1">
                            <p className="text-sm text-slate-500">
                              {new Date(blog.createdAt).toLocaleDateString("en-US", {
                                year: "numeric",
                                month: "short",
                                day: "numeric",
                              })}
                            </p>
                            <span
                              className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium ${
                                blog.published
                                  ? "bg-emerald-100 text-emerald-700"
                                  : "bg-amber-100 text-amber-700"
                              }`}
                            >
                              <span className={`w-1.5 h-1.5 rounded-full ${blog.published ? 'bg-emerald-500' : 'bg-amber-500'}`} />
                              {blog.published ? "Published" : "Draft"}
                            </span>
                          </div>
                        </div>
                        <Link
                          href={`/admin/blogs/${blog.id}/edit`}
                          className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                          </svg>
                        </Link>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>

          {/* Right Sidebar */}
          <div className="space-y-6">
            {/* Recent Testimonials */}
            <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
              <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
                <h2 className="text-lg font-bold text-slate-800">Recent Reviews</h2>
                <Link
                  href="/admin/testimonials"
                  className="text-sm text-blue-600 hover:text-blue-700 font-medium"
                >
                  View all
                </Link>
              </div>
              <div className="p-4 space-y-3">
                {recentTestimonials.length === 0 ? (
                  <div className="text-center py-8">
                    <p className="text-sm text-slate-500">No testimonials yet</p>
                  </div>
                ) : (
                  recentTestimonials.map((testimonial) => (
                    <div key={testimonial.id} className="p-3 bg-slate-50 rounded-lg hover:bg-slate-100 transition-colors">
                      <div className="flex items-center justify-between mb-2">
                        <p className="font-semibold text-slate-800 text-sm truncate">{testimonial.name}</p>
                        {testimonial.verified && (
                          <svg className="w-4 h-4 text-green-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                        )}
                      </div>
                      <p className="text-xs text-slate-500 truncate">{testimonial.role}</p>
                      <div className="flex items-center gap-1 mt-2">
                        {[...Array(5)].map((_, i) => (
                          <svg
                            key={i}
                            className={`w-3 h-3 ${
                              i < testimonial.rating
                                ? 'text-yellow-400 fill-yellow-400'
                                : 'text-gray-200 fill-gray-200'
                            }`}
                            viewBox="0 0 20 20"
                          >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        ))}
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* Quick Links */}
            <div className="bg-white rounded-xl border border-slate-200 p-6">
              <h3 className="text-lg font-bold text-slate-800 mb-4">Quick Links</h3>
              <div className="space-y-2">
                <Link
                  href="/blog"
                  target="_blank"
                  className="flex items-center gap-3 p-3 rounded-lg hover:bg-slate-50 transition-colors text-slate-700 group"
                >
                  <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                  <span className="text-sm font-medium group-hover:text-blue-600 transition-colors">View Public Blog</span>
                </Link>
                <Link
                  href="/portfolio"
                  target="_blank"
                  className="flex items-center gap-3 p-3 rounded-lg hover:bg-slate-50 transition-colors text-slate-700 group"
                >
                  <svg className="w-5 h-5 text-violet-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                  <span className="text-sm font-medium group-hover:text-violet-600 transition-colors">View Portfolio</span>
                </Link>
                <Link
                  href="/"
                  target="_blank"
                  className="flex items-center gap-3 p-3 rounded-lg hover:bg-slate-50 transition-colors text-slate-700 group"
                >
                  <svg className="w-5 h-5 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                  </svg>
                  <span className="text-sm font-medium group-hover:text-slate-800 transition-colors">Visit Homepage</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AdminLayoutNew>
  );
}
