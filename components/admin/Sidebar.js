// components/admin/Sidebar.js
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';

const menuItems = [
  {
    name: 'Dashboard',
    href: '/admin/dashboard',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 5a1 1 0 011-1h4a1 1 0 011 1v5a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM14 5a1 1 0 011-1h4a1 1 0 011 1v2a1 1 0 01-1 1h-4a1 1 0 01-1-1V5zM4 15a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1H5a1 1 0 01-1-1v-4zM14 12a1 1 0 011-1h4a1 1 0 011 1v7a1 1 0 01-1 1h-4a1 1 0 01-1-1v-7z" />
      </svg>
    ),
    badge: null,
    submenu: null,
  },
  {
    name: 'About',
    href: '/admin/about',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    badge: null,
    submenu: [
      { name: 'Who We Are', href: '/admin/about/content', icon: '●' },
      { name: 'All Timeline', href: '/admin/about/timeline', icon: '○' },
      { name: 'Add Timeline', href: '/admin/about/timeline/create', icon: '+' },
    ],
  },
  {
    name: 'Blogs',
    href: '/admin/blogs',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
      </svg>
    ),
    badge: null,
    submenu: [
      { name: 'All Blogs', href: '/admin/blogs', icon: '○' },
      { name: 'Add Blog', href: '/admin/blogs/create', icon: '+' },
    ],
  },
  {
    name: 'Portfolio',
    href: '/admin/portfolio',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
    ),
    badge: null,
    submenu: [
      { name: 'All Projects', href: '/admin/portfolio', icon: '○' },
      { name: 'Add Project', href: '/admin/portfolio/create', icon: '+' },
    ],
  },
  {
    name: 'Testimonials',
    href: '/admin/testimonials',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
      </svg>
    ),
    badge: null,
    submenu: [
      { name: 'All Testimonials', href: '/admin/testimonials', icon: '○' },
      { name: 'Add Testimonial', href: '/admin/testimonials/create', icon: '+' },
    ],
  },
  {
    name: 'Clients',
    href: '/admin/clients',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
      </svg>
    ),
    badge: null,
    submenu: [
      { name: 'All Clients', href: '/admin/clients', icon: '○' },
      { name: 'Add Client', href: '/admin/clients/create', icon: '+' },
    ],
  },
  {
    name: 'Team',
    href: '/admin/team',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
    ),
    badge: null,
    submenu: [
      { name: 'All Members', href: '/admin/team', icon: '○' },
      { name: 'Add Member', href: '/admin/team/create', icon: '+' },
    ],
  },
];

export default function Sidebar({ isCollapsed = false, onToggle, onLogout }) {
  const pathname = usePathname();
  const [expandedMenu, setExpandedMenu] = useState(null);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  useEffect(() => {
    menuItems.forEach(item => {
      if (item.submenu && item.submenu.some(sub => pathname.startsWith(sub.href))) {
        setExpandedMenu(item.name);
      }
    });
  }, [pathname]);

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && isMobileOpen) {
        setIsMobileOpen(false);
      }
    };
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isMobileOpen]);

  useEffect(() => {
    setIsMobileOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (isMobileOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileOpen]);

  const isActive = (href) => {
    if (href === '/admin/dashboard') {
      return pathname === href;
    }
    
    if (href.endsWith('/create')) {
      return pathname === href;
    }
    
    if (pathname === href) return true;
    
    if (pathname.startsWith(href + '/') && !pathname.includes('/create')) {
      return true;
    }
    
    return false;
  };

  const isMenuActive = (item) => {
    if (item.submenu) {
      return item.submenu.some(sub => isActive(sub.href));
    }
    return isActive(item.href);
  };

  const handleMenuClick = (item) => {
    if (item.submenu) {
      setExpandedMenu(expandedMenu === item.name ? null : item.name);
    }
  };

  const handleLogoutClick = () => {
    setIsMobileOpen(false);
    if (onLogout) {
      onLogout();
    }
  };

  return (
    <>
      {/* Mobile Overlay */}
      <div 
        className={`
          fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-40 lg:hidden
          transition-opacity duration-300
          ${isMobileOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}
        `}
        onClick={() => setIsMobileOpen(false)}
        aria-hidden="true"
      />

      {/* Mobile Toggle Button */}
      <button
        onClick={() => setIsMobileOpen(!isMobileOpen)}
        className="fixed top-4 left-4 z-50 p-2.5 bg-white rounded-xl shadow-lg border border-slate-200 lg:hidden hover:bg-slate-50 transition-colors"
        aria-label="Toggle menu"
        aria-expanded={isMobileOpen}
      >
        <svg className="w-5 h-5 text-slate-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          {isMobileOpen ? (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          ) : (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          )}
        </svg>
      </button>

      {/* Sidebar */}
      <aside 
        className={`
          fixed left-0 top-0 h-screen bg-white border-r border-slate-200 z-50 
          flex flex-col
          transition-all duration-300 ease-in-out
          ${isMobileOpen ? 'translate-x-0' : '-translate-x-full'}
          lg:translate-x-0
          ${isCollapsed ? 'lg:w-20' : 'lg:w-64'}
          w-64
        `}
      >
        {/* Logo Section */}
        <div className="h-16 flex items-center justify-between px-4 border-b border-slate-100 flex-shrink-0">
          <Link href="/admin/dashboard" className="flex items-center gap-3 group" onClick={() => setIsMobileOpen(false)}>
            <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/20 group-hover:shadow-blue-500/40 transition-all duration-300 group-hover:scale-105 flex-shrink-0">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            {!isCollapsed && (
              <div className="overflow-hidden">
                <div className="text-base font-bold text-slate-800 whitespace-nowrap">YZO Admin</div>
                <div className="text-[10px] text-slate-400 font-medium uppercase tracking-wider whitespace-nowrap">Control Panel</div>
              </div>
            )}
          </Link>
          
          {/* Desktop collapse toggle */}
          <button
            onClick={onToggle}
            className="hidden lg:flex p-1.5 rounded-lg hover:bg-slate-100 text-slate-500 transition-colors flex-shrink-0"
            aria-label="Toggle sidebar"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isCollapsed ? "M13 5l7 7-7 7M5 5l7 7-7 7" : "M11 19l-7-7 7-7m8 14l-7-7 7-7"} />
            </svg>
          </button>

          {/* Close button for mobile */}
          <button
            onClick={() => setIsMobileOpen(false)}
            className="p-1.5 rounded-lg hover:bg-slate-100 lg:hidden flex-shrink-0"
            aria-label="Close menu"
          >
            <svg className="w-5 h-5 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Navigation Menu */}
        <nav className="flex-1 overflow-y-auto overflow-x-hidden p-3 space-y-1">
          {!isCollapsed && (
            <p className="px-3 py-2 text-[10px] font-semibold text-slate-400 uppercase tracking-wider">
              Main Menu
            </p>
          )}

          {menuItems.map((item) => {
            const active = isMenuActive(item);
            const isExpanded = expandedMenu === item.name;

            return (
              <div key={item.name}>
                {item.submenu ? (
                  <button
                    onClick={() => handleMenuClick(item)}
                    className={`
                      w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 group relative
                      ${active
                        ? 'bg-blue-50 text-blue-600'
                        : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                      }
                    `}
                    aria-expanded={isExpanded}
                    title={isCollapsed ? item.name : undefined}
                  >
                    {active && (
                      <span className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-blue-600 rounded-r-full" />
                    )}
                    
                    <span className={`flex-shrink-0 ${active ? 'text-blue-600' : 'text-slate-400 group-hover:text-slate-600'}`}>
                      {item.icon}
                    </span>
                    
                    {!isCollapsed && (
                      <>
                        <span className="flex-1 text-left text-sm font-medium truncate">{item.name}</span>
                        
                        {item.badge && (
                          <span className="px-2 py-0.5 bg-blue-600 text-white text-[10px] font-bold rounded-full flex-shrink-0">
                            {item.badge}
                          </span>
                        )}
                        
                        <svg
                          className={`w-4 h-4 text-slate-400 transition-transform duration-200 flex-shrink-0 ${isExpanded ? 'rotate-180' : ''}`}
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </>
                    )}
                  </button>
                ) : (
                  <Link
                    href={item.href}
                    onClick={() => setIsMobileOpen(false)}
                    className={`
                      flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 group relative
                      ${active
                        ? 'bg-blue-50 text-blue-600'
                        : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                      }
                    `}
                    title={isCollapsed ? item.name : undefined}
                  >
                    {active && (
                      <span className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-blue-600 rounded-r-full" />
                    )}
                    
                    <span className={`flex-shrink-0 ${active ? 'text-blue-600' : 'text-slate-400 group-hover:text-slate-600'}`}>
                      {item.icon}
                    </span>
                    
                    {!isCollapsed && (
                      <>
                        <span className="flex-1 text-sm font-medium truncate">{item.name}</span>
                        
                        {item.badge && (
                          <span className="px-2 py-0.5 bg-blue-600 text-white text-[10px] font-bold rounded-full flex-shrink-0">
                            {item.badge}
                          </span>
                        )}
                      </>
                    )}
                  </Link>
                )}

                {/* Submenu Items */}
                {item.submenu && !isCollapsed && (
                  <div 
                    className={`
                      overflow-hidden transition-all duration-200 ease-in-out
                      ${isExpanded ? 'max-h-40 opacity-100 mt-1' : 'max-h-0 opacity-0'}
                    `}
                  >
                    <div className="ml-4 pl-4 border-l-2 border-slate-100 space-y-1">
                      {item.submenu.map((subitem) => (
                        <Link
                          key={subitem.name}
                          href={subitem.href}
                          onClick={() => setIsMobileOpen(false)}
                          className={`
                            flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-all duration-200
                            ${isActive(subitem.href)
                              ? 'bg-blue-600 text-white font-medium shadow-sm'
                              : 'text-slate-500 hover:text-slate-800 hover:bg-slate-50'
                            }
                          `}
                        >
                          <span className={`text-xs flex-shrink-0 ${isActive(subitem.href) ? 'text-blue-200' : 'text-slate-400'}`}>
                            {subitem.icon}
                          </span>
                          <span className="truncate">{subitem.name}</span>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            );
          })}

          {!isCollapsed && (
            <div className="my-4 border-t border-slate-100" />
          )}
        </nav>

        {/* Footer */}
        <div className="flex-shrink-0 p-4 border-t border-slate-100 bg-white">
          {!isCollapsed ? (
            <div className="flex items-center justify-between">
              <div className="min-w-0">
                <p className="text-xs font-semibold text-slate-700 truncate">YZO Admin</p>
                <p className="text-[10px] text-slate-400">Version 1.0.0</p>
              </div>
              <button 
                onClick={handleLogoutClick}
                className="p-2 rounded-lg bg-slate-100 hover:bg-red-50 text-slate-500 hover:text-red-600 transition-colors flex-shrink-0"
                title="Logout"
                aria-label="Logout"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
              </button>
            </div>
          ) : (
            <button 
              onClick={handleLogoutClick}
              className="w-full p-2 rounded-lg bg-slate-100 hover:bg-red-50 text-slate-500 hover:text-red-600 transition-colors flex justify-center"
              title="Logout"
              aria-label="Logout"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
            </button>
          )}
        </div>
      </aside>
    </>
  );
}