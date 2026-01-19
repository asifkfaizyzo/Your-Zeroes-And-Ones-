// app/blog/[slug]/page.js
import React from 'react';
import prisma from '@/lib/prisma';
import Header from '../../../components/Header';
import Footer from '../../../components/Footer';
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import rehypeSanitize from 'rehype-sanitize';
import Link from 'next/link';

export async function generateMetadata({ params }) {
  const { slug } = await params;

  const post = await prisma.blog.findUnique({ where: { slug } });
  if (!post) return { title: 'Article not found' };
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
      year: 'numeric',
      month: 'long',
      day: 'numeric',
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

export default async function PostPage({ params }) {
  const { slug } = await params;

  const post = await prisma.blog.findUnique({ where: { slug } });
  if (!post) {
    return (
      <>
        <Header />
        <main className="min-h-screen flex items-center justify-center bg-slate-50 p-6">
          <div className="text-center max-w-md">
            <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center">
              <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-slate-800 mb-3">Article Not Found</h2>
            <p className="text-slate-600 mb-6">
              The article you're looking for doesn't exist or may have been moved.
            </p>
            <Link 
              href="/blog" 
              className="inline-flex items-center gap-2 px-6 py-3 bg-slate-900 text-white font-semibold rounded-full hover:bg-blue-600 transition-colors"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Back to Blog
            </Link>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  const allPosts = await prisma.blog.findMany({
    where: { published: true },
    orderBy: { createdAt: 'desc' },
  });

  const index = allPosts.findIndex((p) => p.slug === slug);
  const prev = index < allPosts.length - 1 ? allPosts[index + 1] : null;
  const next = index > 0 ? allPosts[index - 1] : null;
  const relatedPosts = getRelatedPosts(post, allPosts, 3);

  return (
    <>
      <Header />

      <article className="min-h-screen">
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
              <div className="w-full h-full bg-gradient-to-br from-[#1a365d] via-[#2d5a87] to-[#1e3a5f]" />
            )}
            
            {/* Gradient overlays */}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/60 to-slate-900/30" />
          </div>

          {/* Hero Content */}
          <div className="relative z-10 pt-8 pb-10 sm:pt-12 sm:pb-14 lg:pt-16 lg:pb-20">
            <div 
              className="w-full"
              style={{
                paddingLeft: 'clamp(2rem, 8vw, 12rem)',
                paddingRight: 'clamp(2rem, 8vw, 12rem)'
              }}
            >
              {/* Back link */}
              <Link 
                href="/blog" 
                className="inline-flex items-center gap-1.5 text-white/70 hover:text-white text-xs sm:text-sm font-medium mb-4 sm:mb-6 transition-colors group"
              >
                <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                All articles
              </Link>

              <div className="max-w-4xl">
                {/* Tags */}
                {post.tags?.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-3 sm:mb-4">
                    {post.tags.slice(0, 3).map((t) => (
                      <span 
                        key={t} 
                        className="px-2.5 py-1 sm:px-3 sm:py-1.5 bg-white/10 backdrop-blur-sm text-white text-xs sm:text-sm font-medium rounded-full border border-white/20"
                      >
                        {t}
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
                  <p className="hidden sm:block text-base sm:text-lg lg:text-xl text-white/75 leading-relaxed max-w-2xl mb-4 sm:mb-6 line-clamp-2">
                    {post.excerpt}
                  </p>
                )}

                {/* Author & Meta Row */}
                <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-gradient-to-br from-blue-400 to-indigo-500 flex items-center justify-center text-white font-bold text-sm sm:text-base ring-2 ring-white/20">
                      {post.author?.charAt(0) || 'A'}
                    </div>
                    <div>
                      <div className="font-medium text-white text-sm sm:text-base">{post.author || 'Your Zeros and Ones'}</div>
                      <div className="flex items-center gap-2 text-white/50 text-xs sm:text-sm">
                        <span>{formatDate(post.createdAt)}</span>
                        {post.readTime && (
                          <>
                            <span className="w-1 h-1 rounded-full bg-white/40" />
                            <span>{post.readTime}</span>
                          </>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Share buttons - Hidden on mobile */}
                  <div className="hidden md:flex items-center gap-2 sm:ml-auto">
                    <span className="text-white/40 text-xs mr-1">Share:</span>
                    {['twitter', 'linkedin', 'facebook'].map((platform) => (
                      <button 
                        key={platform}
                        className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white/70 hover:text-white transition-all"
                      >
                        {platform === 'twitter' && (
                          <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                          </svg>
                        )}
                        {platform === 'linkedin' && (
                          <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                          </svg>
                        )}
                        {platform === 'facebook' && (
                          <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                          </svg>
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* ARTICLE BODY */}
        <div className="bg-white">
  <div 
    className="w-full py-10 sm:py-14 lg:py-20"
    style={{
      paddingLeft: 'clamp(2rem, 8vw, 12rem)',
      paddingRight: 'clamp(2rem, 8vw, 12rem)'
    }}
  >
    <div className="grid lg:grid-cols-12 gap-10 lg:gap-16">
      {/* Main content - Added min-w-0 */}
      <div className="lg:col-span-8 min-w-0">
        {/* Added overflow-hidden wrapper */}
        <div className="overflow-hidden">
          <div 
            className="
              prose prose-base sm:prose-lg max-w-none
              prose-headings:text-slate-800 prose-headings:font-bold prose-headings:tracking-tight
              prose-h2:text-2xl text-slate-900 prose-h2:sm:text-3xl prose-h2:mt-10 prose-h2:sm:mt-14 prose-h2:mb-4 prose-h2:sm:mb-6 prose-h2:pb-3 prose-h2:border-b prose-h2:border-slate-200
              prose-h3:text-xl prose-h3:sm:text-2xl prose-h3:mt-8 prose-h3:sm:mt-10 prose-h3:mb-3 prose-h3:sm:mb-4
              prose-p:text-slate-700 prose-p:leading-relaxed
              prose-a:text-blue-600 prose-a:font-medium prose-a:no-underline hover:prose-a:underline
              prose-strong:text-slate-800 prose-strong:font-bold
              prose-code:text-blue-700 prose-code:bg-blue-50 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:text-sm prose-code:before:content-none prose-code:after:content-none prose-code:font-medium
              prose-pre:bg-slate-900 prose-pre:rounded-xl prose-pre:shadow-xl prose-pre:text-sm
              prose-blockquote:border-l-4 prose-blockquote:border-blue-500 prose-blockquote:bg-blue-50/50 prose-blockquote:rounded-r-lg prose-blockquote:py-3 prose-blockquote:px-5 prose-blockquote:not-italic prose-blockquote:text-slate-700
              prose-img:rounded-xl prose-img:shadow-lg
              prose-ul:text-slate-900 prose-ul:marker:text-blue-500
              prose-ol:text-slate-700 prose-ol:marker:text-blue-600 prose-ol:marker:font-bold
              prose-li:text-slate-700
            "
            style={{
              overflowWrap: 'break-word',
              wordBreak: 'break-word'
            }}
          >
            <ReactMarkdown rehypePlugins={[rehypeRaw, rehypeSanitize]}>
              {post.content}
            </ReactMarkdown>
          </div>
        </div>

                {/* Tags Section */}
                {post.tags?.length > 0 && (
                  <div className="mt-12 sm:mt-16 pt-8 border-t border-slate-200">
                    <h3 className="text-xs sm:text-sm font-bold text-slate-800 uppercase tracking-widest mb-4 flex items-center gap-2">
                      <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                      </svg>
                      Topics
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {post.tags.map((tag) => (
                        <Link 
                          key={tag} 
                          href={`/blog?tag=${encodeURIComponent(tag.toLowerCase())}`} 
                          className="px-4 py-2 bg-slate-100 hover:bg-blue-600 text-slate-700 hover:text-white rounded-full text-sm font-medium transition-all duration-200"
                        >
                          {tag}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}

                {/* Author Bio - Compact on mobile */}
                <div className="mt-8 sm:mt-10 p-5 sm:p-6 bg-slate-50 rounded-2xl border border-slate-200">
                  <div className="flex items-center sm:items-start gap-4">
                    <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white font-bold text-lg sm:text-xl flex-shrink-0">
                      {post.author?.charAt(0) || 'A'}
                    </div>
                    <div className="min-w-0">
                      <div className="text-xs font-semibold text-blue-600 uppercase tracking-wider mb-0.5">Written by</div>
                      <h4 className="text-base sm:text-lg font-bold text-slate-800 truncate">{post.author || 'Your Zeros and Ones'}</h4>
                      <p className="hidden sm:block text-slate-600 text-sm mt-1 leading-relaxed">
                        Sharing insights on web development, design, and technology.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Prev / Next Navigation */}
                <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                  {prev ? (
                    <Link 
                      href={`/blog/${prev.slug}`} 
                      className="group p-4 sm:p-5 bg-slate-900 rounded-xl hover:bg-blue-600 transition-colors"
                    >
                      <div className="flex items-center gap-2 text-slate-400 group-hover:text-white/70 text-xs font-medium mb-2 transition-colors">
                        <svg className="w-4 h-4 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                        </svg>
                        Previous
                      </div>
                      <h4 className="font-semibold text-white text-sm sm:text-base line-clamp-2">{prev.title}</h4>
                    </Link>
                  ) : <div className="hidden sm:block" />}

                  {next ? (
                    <Link 
                      href={`/blog/${next.slug}`} 
                      className="group p-4 sm:p-5 bg-slate-900 rounded-xl hover:bg-blue-600 transition-colors text-right"
                    >
                      <div className="flex items-center justify-end gap-2 text-slate-400 group-hover:text-white/70 text-xs font-medium mb-2 transition-colors">
                        Next
                        <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                      </div>
                      <h4 className="font-semibold text-white text-sm sm:text-base line-clamp-2">{next.title}</h4>
                    </Link>
                  ) : <div className="hidden sm:block" />}
                </div>
              </div>

              {/* Sidebar - Hidden on mobile, shown as cards below content */}
              <aside className="lg:col-span-4">
                <div className="lg:sticky lg:top-24 space-y-6">
                  {/* Newsletter CTA */}
                  <div className="relative overflow-hidden rounded-2xl">
                    <div className="absolute inset-0 bg-gradient-to-br from-[#1a365d] via-[#2d5a87] to-[#1e3a5f]" />
                    
                    {/* Decorative elements */}
                    <div className="absolute -top-10 -right-10 w-32 h-32 bg-blue-400/20 rounded-full blur-2xl" />
                    <div className="absolute -bottom-6 -left-6 w-24 h-24 bg-indigo-400/20 rounded-full blur-2xl" />
                    
                    <div 
                      className="absolute inset-0 opacity-10"
                      style={{
                        backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
                        backgroundSize: '16px 16px'
                      }}
                    />
                    
                    <div className="relative p-5 sm:p-6 text-white">
                      <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-white/10 backdrop-blur flex items-center justify-center mb-4 ring-1 ring-white/20">
                        <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                      </div>
                      <h3 className="text-lg sm:text-xl font-bold mb-2">Stay in the loop</h3>
                      <p className="text-blue-100/70 text-sm mb-5 leading-relaxed">
                        Weekly insights on web dev, design & tech trends.
                      </p>
                      <div className="space-y-2.5">
                        <input 
                          type="email" 
                          placeholder="you@example.com" 
                          className="w-full px-4 py-3 bg-white/10 backdrop-blur border border-white/20 rounded-lg text-white text-sm placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/30 transition-all" 
                        />
                        <button className="w-full px-4 py-3 bg-white text-blue-700 font-bold rounded-lg text-sm hover:bg-blue-50 transition-colors">
                          Subscribe Free
                        </button>
                      </div>
                      <p className="text-[10px] sm:text-xs text-blue-200/40 mt-3 text-center">No spam. Unsubscribe anytime.</p>
                    </div>
                  </div>

                  {/* Related posts */}
                  {relatedPosts.length > 0 && (
                    <div className="bg-slate-50 rounded-2xl p-5 border border-slate-200">
                      <h3 className="text-xs font-bold text-slate-800 uppercase tracking-widest mb-4">Related</h3>
                      <div className="space-y-4">
                        {relatedPosts.map((rp) => (
                          <Link key={rp.id} href={`/blog/${rp.slug}`} className="group flex gap-3">
                            <div className="w-16 h-16 rounded-lg overflow-hidden flex-shrink-0 bg-slate-200">
                              {rp.image ? (
                                <img src={rp.image} alt={rp.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300" />
                              ) : (
                                <div className="w-full h-full bg-gradient-to-br from-blue-400 to-indigo-500" />
                              )}
                            </div>
                            <div className="flex-1 min-w-0">
                              <h4 className="font-semibold text-slate-800 group-hover:text-blue-600 transition-colors text-sm line-clamp-2 mb-1">
                                {rp.title}
                              </h4>
                              <p className="text-xs text-slate-500">{rp.readTime}</p>
                            </div>
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Topics */}
                  <div className="bg-white rounded-2xl p-5 border border-slate-200">
                    <h3 className="text-xs font-bold text-slate-800 uppercase tracking-widest mb-4">Explore Topics</h3>
                    <div className="flex flex-wrap gap-1.5">
                      {['React', 'Next.js', 'CSS', 'JavaScript', 'TypeScript', 'Design'].map((tag) => (
                        <Link 
                          key={tag} 
                          href={`/blog?tag=${tag.toLowerCase()}`} 
                          className="px-3 py-1.5 bg-slate-100 hover:bg-slate-800 text-slate-600 hover:text-white rounded-md text-xs font-medium transition-all"
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
          <section className="bg-slate-900 py-14 sm:py-20 relative overflow-hidden">
            {/* Background decoration */}
            <div className="absolute top-0 left-1/4 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl" />
            <div className="absolute bottom-0 right-1/4 w-48 h-48 bg-indigo-500/10 rounded-full blur-3xl" />
            
            <div 
              className="relative w-full"
              style={{
                paddingLeft: 'clamp(2rem, 8vw, 12rem)',
                paddingRight: 'clamp(2rem, 8vw, 12rem)'
              }}
            >
              {/* Section header */}
              <div className="mb-10 sm:mb-14">
                <span className="text-blue-400 font-semibold text-xs uppercase tracking-widest mb-2 block">Keep reading</span>
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white tracking-tight">
                  More stories
                </h2>
              </div>

              {/* Cards grid */}
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
                {relatedPosts.map((rp) => (
                  <Link key={rp.id} href={`/blog/${rp.slug}`} className="group">
                    <article className="h-full">
                      {/* Image */}
                      <div className="relative h-40 sm:h-48 rounded-xl overflow-hidden mb-4">
                        {rp.image ? (
                          <img 
                            src={rp.image} 
                            alt={rp.title} 
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                          />
                        ) : (
                          <div className="w-full h-full bg-gradient-to-br from-blue-500 to-indigo-600" />
                        )}
                        
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent" />
                        
                        {/* Tag */}
                        <div className="absolute top-3 left-3">
                          <span className="px-2.5 py-1 bg-white/90 rounded-md text-xs font-semibold text-slate-800">
                            {rp.tags?.[0] || 'Article'}
                          </span>
                        </div>
                      </div>
                      
                      {/* Content */}
                      <div className="flex items-center gap-2 text-slate-400 text-xs mb-2">
                        <span>{formatDate(rp.createdAt)}</span>
                        <span className="w-1 h-1 rounded-full bg-slate-600" />
                        <span>{rp.readTime}</span>
                      </div>
                      <h3 className="text-base sm:text-lg font-bold text-white group-hover:text-blue-400 transition-colors line-clamp-2 mb-2">
                        {rp.title}
                      </h3>
                      <p className="text-slate-400 text-sm line-clamp-2 leading-relaxed">
                        {rp.excerpt}
                      </p>
                    </article>
                  </Link>
                ))}
              </div>

              {/* View all button */}
              <div className="mt-10 sm:mt-14 text-center">
                <Link 
                  href="/blog" 
                  className="inline-flex items-center gap-2 px-6 sm:px-8 py-3 sm:py-4 bg-white hover:bg-blue-600 text-slate-800 hover:text-white font-bold rounded-full transition-all duration-300 group text-sm sm:text-base"
                >
                  View All Articles
                  <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </Link>
              </div>
            </div>
          </section>
        )}
      </article>

      <Footer />
    </>
  );
}
