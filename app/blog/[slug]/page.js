// app/blog/[slug]/page.js
import React from "react";
import prisma from "@/lib/prisma";
import Link from "next/link";
import DOMPurify from "isomorphic-dompurify";
import ShareButtons from "../components/ShareButtons";

export async function generateMetadata({ params }) {
  const { slug } = await params;

  const post = await prisma.blog.findUnique({ where: { slug } });
  if (!post) return { title: "Article not found" };
  return {
    title: `${post.title} - Your Zeros and Ones`,
    description: post.excerpt || undefined,
    openGraph: {
      title: post.title,
      description: post.excerpt || undefined,
      images: post.image ? [{ url: post.image }] : [],
    },
  };
}

function formatDate(d) {
  try {
    return new Date(d).toLocaleDateString(undefined, {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  } catch {
    return d;
  }
}

function getRelatedPosts(current, all, limit = 3) {
  if (!current?.tags?.length) return [];
  return all
    .filter((p) => p.slug !== current.slug)
    .filter((p) => p.tags?.some((t) => current.tags.includes(t)))
    .slice(0, limit);
}

// Helper to get unique tags
function getUniqueTags(tags) {
  if (!tags || !Array.isArray(tags)) return [];
  return [...new Set(tags)];
}

// Sanitize HTML for safe rendering
function sanitizeContent(html) {
  if (!html) return "";

  const clean = DOMPurify.sanitize(html, {
    ALLOWED_TAGS: [
      "h1",
      "h2",
      "h3",
      "h4",
      "h5",
      "h6",
      "p",
      "br",
      "hr",
      "ul",
      "ol",
      "li",
      "blockquote",
      "pre",
      "code",
      "strong",
      "em",
      "u",
      "s",
      "sub",
      "sup",
      "a",
      "img",
      "figure",
      "figcaption",
      "div",
      "span",
      "iframe",
      "table",
      "thead",
      "tbody",
      "tr",
      "th",
      "td",
    ],
    ALLOWED_ATTR: [
      "href",
      "target",
      "rel",
      "src",
      "alt",
      "title",
      "width",
      "height",
      "loading",
      "class",
      "id",
      "style",
      "data-alignment",
      "data-width",
      "data-columns",
      "data-youtube-video",
      "frameborder",
      "allow",
      "allowfullscreen",
    ],
    ALLOWED_URI_REGEXP:
      /^(?:(?:https?|mailto|tel):|[^a-z]|[a-z+.-]+(?:[^a-z+.\-:]|$))/i,
    ADD_TAGS: ["iframe"],
    ADD_ATTR: ["allow", "allowfullscreen", "frameborder"],
  });

  return clean;
}

export default async function PostPage({ params }) {
  const { slug } = await params;

  const post = await prisma.blog.findUnique({ where: { slug } });
  if (!post) {
    return (
      <>
        <main className="min-h-screen flex items-center justify-center bg-[#060010] p-6 relative overflow-hidden">
          {/* Grid */}
          <div
            className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage:
                "linear-gradient(#20427f 1px, transparent 1px), linear-gradient(90deg, #20427f 1px, transparent 1px)",
              backgroundSize: "60px 60px",
            }}
          />
          {/* Ambient glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#5b8def]/5 rounded-full blur-[120px] pointer-events-none" />

          <div className="text-center max-w-md relative z-10">
            <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-[#1e3a6e] border border-[#5b8def]/30 flex items-center justify-center">
              <svg
                className="w-10 h-10 text-[#5b8def]"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-white mb-3">
              Article Not Found
            </h2>
            <p className="text-white/40 mb-6">
              The article you&apos;re looking for doesn&apos;t exist or may have been
              moved.
            </p>
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 px-6 py-3 bg-[#1e3a6e] border border-[#5b8def]/30 text-white font-semibold rounded-full hover:bg-[#2d5aa8] transition-colors"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10 19l-7-7m0 0l7-7m-7 7h18"
                />
              </svg>
              Back to Blog
            </Link>
          </div>
        </main>
      </>
    );
  }

  const allPosts = await prisma.blog.findMany({
    where: { published: true },
    orderBy: { createdAt: "desc" },
  });

  const index = allPosts.findIndex((p) => p.slug === slug);
  const prev = index < allPosts.length - 1 ? allPosts[index + 1] : null;
  const next = index > 0 ? allPosts[index - 1] : null;
  const relatedPosts = getRelatedPosts(post, allPosts, 3);

  // Use HTML content instead of Markdown
  const sanitizedContent = sanitizeContent(post.content_html);

  // Get unique tags
  const uniqueTags = getUniqueTags(post.tags);

  return (
    <>
      <article className="min-h-screen bg-[#060010]">
        {/* HERO - Compact & Responsive */}
        <header className="relative">
          {/* Background Image */}
          <div className="absolute inset-0">
            {post.image ? (
              <img
                src={post.image}
                alt={post.title}
                className="w-full h-full object-cover"
                loading="eager"
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-[#1e3a6e] via-[#0a1628] to-[#060010]" />
            )}

            {/* Gradient overlays */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#060010] via-[#060010]/70 to-[#060010]/30" />
          </div>

          {/* Hero Content */}
          <div className="relative z-10 pt-8 pb-10 sm:pt-12 sm:pb-14 lg:pt-16 lg:pb-20">
            <div
              className="w-full"
              style={{
                paddingLeft: "clamp(2rem, 8vw, 12rem)",
                paddingRight: "clamp(2rem, 8vw, 12rem)",
              }}
            >
              {/* Back link */}
              <Link
                href="/blog"
                className="inline-flex items-center gap-1.5 text-white/50 hover:text-white text-xs sm:text-sm font-medium mb-4 sm:mb-6 transition-colors group"
              >
                <svg
                  className="w-3.5 h-3.5 sm:w-4 sm:h-4 group-hover:-translate-x-1 transition-transform"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10 19l-7-7m0 0l7-7m-7 7h18"
                  />
                </svg>
                All articles
              </Link>

              <div className="max-w-4xl">
                {/* Tags - using uniqueTags */}
                {uniqueTags.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-3 sm:mb-4">
                    {uniqueTags.slice(0, 3).map((tag) => (
                      <span
                        key={tag}
                        className="px-2.5 py-1 sm:px-3 sm:py-1.5 bg-[#1e3a6e]/50 backdrop-blur-sm text-[#5b8def] text-xs sm:text-sm font-medium rounded-full border border-[#5b8def]/20"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}

                {/* Title */}
                <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight tracking-tight mb-3 sm:mb-4">
                  {post.title}
                </h1>

                {/* Excerpt - Hidden on very small screens */}
                {post.excerpt && (
                  <p className="hidden sm:block text-base sm:text-lg lg:text-xl text-white/50 leading-relaxed max-w-2xl mb-4 sm:mb-6 line-clamp-2">
                    {post.excerpt}
                  </p>
                )}

                {/* Author & Meta Row */}
                <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-[#1e3a6e] border border-[#5b8def]/30 flex items-center justify-center text-[#5b8def] font-bold text-sm sm:text-base">
                      {post.author?.charAt(0) || "A"}
                    </div>
                    <div>
                      <div className="font-medium text-white text-sm sm:text-base">
                        {post.author || "Your Zeros and Ones"}
                      </div>
                      <div className="flex items-center gap-2 text-white/40 text-xs sm:text-sm">
                        <span>{formatDate(post.createdAt)}</span>
                        {post.readTime && (
                          <>
                            <span className="w-1 h-1 rounded-full bg-white/30" />
                            <span>{post.readTime}</span>
                          </>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Share buttons - Now using the client component */}
                  <ShareButtons
                    title={post.title}
                    slug={slug}
                    excerpt={post.excerpt}
                  />
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* ARTICLE BODY */}
        <div className="bg-[#060812]">
          <div
            className="w-full py-10 sm:py-14 lg:py-20"
            style={{
              paddingLeft: "clamp(2rem, 8vw, 12rem)",
              paddingRight: "clamp(2rem, 8vw, 12rem)",
            }}
          >
            <div className="grid lg:grid-cols-12 gap-10 lg:gap-16">
              {/* Main content */}
              <div className="lg:col-span-8 min-w-0">
                <div className="overflow-hidden">
                  {/* Use blog-content class for styling */}
                  <article
                    className="blog-content blog-content-dark"
                    dangerouslySetInnerHTML={{ __html: sanitizedContent }}
                  />
                </div>

                {/* Tags Section - using uniqueTags */}
                {uniqueTags.length > 0 && (
                  <div className="mt-12 sm:mt-16 pt-8 border-t border-[#5b8def]/10">
                    <h3 className="text-xs sm:text-sm font-bold text-white uppercase tracking-widest mb-4 flex items-center gap-2">
                      <svg
                        className="w-4 h-4 text-[#5b8def]"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"
                        />
                      </svg>
                      Topics
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {uniqueTags.map((tag) => (
                        <Link
                          key={tag}
                          href={`/blog?tag=${encodeURIComponent(tag.toLowerCase())}`}
                          className="px-4 py-2 bg-[#5b8def]/5 border border-[#5b8def]/15 hover:bg-[#1e3a6e] hover:border-[#5b8def]/40 text-white/60 hover:text-white rounded-full text-sm font-medium transition-all duration-200"
                        >
                          {tag}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}

                {/* Author Bio */}
                <div className="mt-8 sm:mt-10 p-5 sm:p-6 rounded-2xl border border-[#5b8def]/15 bg-[#5b8def]/5 backdrop-blur-sm">
                  <div className="flex items-center sm:items-start gap-4">
                    <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-[#1e3a6e] border border-[#5b8def]/30 flex items-center justify-center text-[#5b8def] font-bold text-lg sm:text-xl flex-shrink-0">
                      {post.author?.charAt(0) || "A"}
                    </div>
                    <div className="min-w-0">
                      <div className="text-xs font-semibold text-[#5b8def] uppercase tracking-wider mb-0.5">
                        Written by
                      </div>
                      <h4 className="text-base sm:text-lg font-bold text-white truncate">
                        {post.author || "Your Zeros and Ones"}
                      </h4>
                      <p className="hidden sm:block text-white/40 text-sm mt-1 leading-relaxed">
                        Sharing insights on web development, design, and
                        technology.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Prev / Next Navigation */}
                <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                  {prev ? (
                    <Link
                      href={`/blog/${prev.slug}`}
                      className="group p-4 sm:p-5 bg-[#060010] border border-[#5b8def]/15 rounded-xl hover:bg-[#1e3a6e] hover:border-[#5b8def]/40 transition-all"
                    >
                      <div className="flex items-center gap-2 text-white/30 group-hover:text-white/70 text-xs font-medium mb-2 transition-colors">
                        <svg
                          className="w-4 h-4 group-hover:-translate-x-1 transition-transform"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M10 19l-7-7m0 0l7-7m-7 7h18"
                          />
                        </svg>
                        Previous
                      </div>
                      <h4 className="font-semibold text-white text-sm sm:text-base line-clamp-2">
                        {prev.title}
                      </h4>
                    </Link>
                  ) : (
                    <div className="hidden sm:block" />
                  )}

                  {next ? (
                    <Link
                      href={`/blog/${next.slug}`}
                      className="group p-4 sm:p-5 bg-[#060010] border border-[#5b8def]/15 rounded-xl hover:bg-[#1e3a6e] hover:border-[#5b8def]/40 transition-all text-right"
                    >
                      <div className="flex items-center justify-end gap-2 text-white/30 group-hover:text-white/70 text-xs font-medium mb-2 transition-colors">
                        Next
                        <svg
                          className="w-4 h-4 group-hover:translate-x-1 transition-transform"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M14 5l7 7m0 0l-7 7m7-7H3"
                          />
                        </svg>
                      </div>
                      <h4 className="font-semibold text-white text-sm sm:text-base line-clamp-2">
                        {next.title}
                      </h4>
                    </Link>
                  ) : (
                    <div className="hidden sm:block" />
                  )}
                </div>
              </div>

              {/* Sidebar */}
              <aside className="lg:col-span-4">
                <div className="lg:sticky lg:top-24 space-y-6">
                  {/* Newsletter CTA */}
                  <div className="relative overflow-hidden rounded-2xl">
                    <div className="absolute inset-0 bg-gradient-to-br from-[#0a1628] via-[#0f1d32] to-[#0a1628]" />

                    <div className="absolute -top-10 -right-10 w-32 h-32 bg-[#5b8def]/10 rounded-full blur-2xl" />
                    <div className="absolute -bottom-6 -left-6 w-24 h-24 bg-[#5b8def]/10 rounded-full blur-2xl" />

                    <div
                      className="absolute inset-0 opacity-[0.04]"
                      style={{
                        backgroundImage: `radial-gradient(circle at 2px 2px, #5b8def 1px, transparent 0)`,
                        backgroundSize: "16px 16px",
                      }}
                    />

                    <div className="relative p-5 sm:p-6 text-white">
                      <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-[#1e3a6e] border border-[#5b8def]/30 flex items-center justify-center mb-4">
                        <svg
                          className="w-5 h-5 sm:w-6 sm:h-6 text-[#5b8def]"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={1.5}
                            d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                          />
                        </svg>
                      </div>
                      <h3 className="text-lg sm:text-xl font-bold mb-2">
                        Stay in the loop
                      </h3>
                      <p className="text-white/40 text-sm mb-5 leading-relaxed">
                        Weekly insights on web dev, design & tech trends.
                      </p>
                      <div className="space-y-2.5">
                        <input
                          type="email"
                          placeholder="you@example.com"
                          className="w-full px-4 py-3 bg-white/5 backdrop-blur border border-[#5b8def]/20 rounded-lg text-white text-sm placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-[#5b8def]/50 transition-all"
                        />
                        <button className="w-full px-4 py-3 bg-white text-[#0f1d32] font-bold rounded-lg text-sm hover:bg-blue-50 transition-colors">
                          Subscribe Free
                        </button>
                      </div>
                      <p className="text-[10px] sm:text-xs text-white/20 mt-3 text-center">
                        No spam. Unsubscribe anytime.
                      </p>
                    </div>
                  </div>

                  {/* Related posts */}
                  {relatedPosts.length > 0 && (
                    <div className="rounded-2xl p-5 border border-[#5b8def]/15 bg-[#5b8def]/5 backdrop-blur-sm">
                      <h3 className="text-xs font-bold text-white uppercase tracking-widest mb-4">
                        Related
                      </h3>
                      <div className="space-y-4">
                        {relatedPosts.map((rp) => (
                          <Link
                            key={rp.id}
                            href={`/blog/${rp.slug}`}
                            className="group flex gap-3"
                          >
                            <div className="w-16 h-16 rounded-lg overflow-hidden flex-shrink-0 bg-[#0a1628] border border-[#5b8def]/10">
                              {rp.image ? (
                                <img
                                  src={rp.image}
                                  alt={rp.title}
                                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                                />
                              ) : (
                                <div className="w-full h-full bg-gradient-to-br from-[#1e3a6e] to-[#5b8def]" />
                              )}
                            </div>
                            <div className="flex-1 min-w-0">
                              <h4 className="font-semibold text-white group-hover:text-[#5b8def] transition-colors text-sm line-clamp-2 mb-1">
                                {rp.title}
                              </h4>
                              <p className="text-xs text-white/30">
                                {rp.readTime}
                              </p>
                            </div>
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Topics */}
                  <div className="rounded-2xl p-5 border border-[#5b8def]/15 bg-[#060812]">
                    <h3 className="text-xs font-bold text-white uppercase tracking-widest mb-4">
                      Explore Topics
                    </h3>
                    <div className="flex flex-wrap gap-1.5">
                      {[
                        "React",
                        "Next.js",
                        "CSS",
                        "JavaScript",
                        "TypeScript",
                        "Design",
                      ].map((tag) => (
                        <Link
                          key={tag}
                          href={`/blog?tag=${tag.toLowerCase()}`}
                          className="px-3 py-1.5 bg-[#5b8def]/5 border border-[#5b8def]/10 hover:bg-[#1e3a6e] hover:border-[#5b8def]/40 text-white/50 hover:text-white rounded-md text-xs font-medium transition-all"
                        >
                          {tag}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              </aside>
            </div>
          </div>
        </div>

        {/* CONTINUE READING SECTION */}
        {relatedPosts.length > 0 && (
          <section className="bg-[#060010] py-14 sm:py-20 relative overflow-hidden">
            <div className="absolute top-0 left-1/4 w-64 h-64 bg-[#5b8def]/5 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 right-1/4 w-48 h-48 bg-[#5b8def]/5 rounded-full blur-3xl pointer-events-none" />

            <div
              className="relative w-full"
              style={{
                paddingLeft: "clamp(2rem, 8vw, 12rem)",
                paddingRight: "clamp(2rem, 8vw, 12rem)",
              }}
            >
              <div className="mb-10 sm:mb-14">
                <span className="text-[#5b8def] font-semibold text-xs uppercase tracking-[0.2em] mb-2 block">
                  Keep reading
                </span>
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white tracking-tight">
                  More stories
                </h2>
              </div>

              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
                {relatedPosts.map((rp) => (
                  <Link key={rp.id} href={`/blog/${rp.slug}`} className="group">
                    <article className="h-full">
                      <div className="relative h-40 sm:h-48 rounded-xl overflow-hidden mb-4 border border-[#5b8def]/15 group-hover:border-[#5b8def]/40 transition-colors">
                        {rp.image ? (
                          <img
                            src={rp.image}
                            alt={rp.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                        ) : (
                          <div className="w-full h-full bg-gradient-to-br from-[#1e3a6e] to-[#5b8def]" />
                        )}

                        <div className="absolute inset-0 bg-gradient-to-t from-[#060010]/60 to-transparent" />

                        <div className="absolute top-3 left-3">
                          <span className="px-2.5 py-1 bg-[#1e3a6e]/80 backdrop-blur-sm border border-[#5b8def]/30 rounded-md text-xs font-semibold text-[#5b8def]">
                            {rp.tags?.[0] || "Article"}
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 text-white/30 text-xs mb-2">
                        <span>{formatDate(rp.createdAt)}</span>
                        <span className="w-1 h-1 rounded-full bg-white/20" />
                        <span>{rp.readTime}</span>
                      </div>
                      <h3 className="text-base sm:text-lg font-bold text-white group-hover:text-[#5b8def] transition-colors line-clamp-2 mb-2">
                        {rp.title}
                      </h3>
                      <p className="text-white/40 text-sm line-clamp-2 leading-relaxed">
                        {rp.excerpt}
                      </p>
                    </article>
                  </Link>
                ))}
              </div>

              <div className="mt-10 sm:mt-14 text-center">
                <Link
                  href="/blog"
                  className="inline-flex items-center gap-2 px-6 sm:px-8 py-3 sm:py-4 bg-[#1e3a6e] border border-[#5b8def]/30 hover:bg-[#2d5aa8] hover:border-[#5b8def]/60 text-white font-bold rounded-full transition-all duration-300 group text-sm sm:text-base hover:gap-4"
                >
                  View All Articles
                  <svg
                    className="w-4 h-4 group-hover:translate-x-1 transition-transform"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M14 5l7 7m0 0l-7 7m7-7H3"
                    />
                  </svg>
                </Link>
              </div>
            </div>
          </section>
        )}
      </article>
    </>
  );
}