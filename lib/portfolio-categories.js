export const PORTFOLIO_CATEGORIES = [
  {
    category: 'Branding & Design',
    slug: 'branding-design',
    icon: 'palette',
    subServices: [
      { name: 'Brand Consulting', slug: 'brand-consulting' },
      { name: 'Logo Design', slug: 'logo-design' },
      { name: 'Graphic Design', slug: 'graphic-design' },
      { name: '2D & 3D Visualization', slug: '2d-3d-visualization' },
      { name: 'Video Production', slug: 'video-production' },
      { name: 'Audio Production', slug: 'audio-production' },
      { name: 'AI Video Production', slug: 'ai-video-production' },
    ],
  },
  {
    category: 'Digital Marketing',
    slug: 'digital-marketing',
    icon: 'chart',
    subServices: [
      { name: 'Search Engine Optimization (SEO)', slug: 'seo' },
      { name: 'Social Media Management (SMM)', slug: 'smm' },
      { name: 'Performance Marketing', slug: 'performance-marketing' },
      { name: 'Content Marketing', slug: 'content-marketing' },
      { name: 'Marketing Automations', slug: 'marketing-automations' },
      { name: 'Analytics', slug: 'analytics' },
    ],
  },
  {
    category: 'Technology',
    slug: 'technology',
    icon: 'code',
    subServices: [
      { name: 'AI & Machine Learning', slug: 'ai-ml' },
      { name: 'DevOps Consulting', slug: 'devops' },
      { name: 'Web Development', slug: 'web-development' },
      { name: 'Mobile App Development', slug: 'mobile-app' },
      { name: 'E-Commerce', slug: 'e-commerce' },
      { name: 'Quality Assurance & Testing', slug: 'qa-testing' },
      { name: 'Cloud Services', slug: 'cloud-services' },
      { name: 'Data & Analytics', slug: 'data-analytics' },
      { name: 'Cyber Security', slug: 'cyber-security' },
    ],
  },
];

// Helper to get just the subcategory names (for backward compatibility)
export function getSubCategories(category) {
  const cat = PORTFOLIO_CATEGORIES.find(c => c.category === category);
  return cat ? cat.subServices.map(s => s.name) : [];
}

// Helper to get category by slug
export function getCategoryBySlug(slug) {
  return PORTFOLIO_CATEGORIES.find(c => c.slug === slug);
}

// Helper to get all subcategory names as array (for admin forms)
export const SUBCATEGORIES_SIMPLE = PORTFOLIO_CATEGORIES.reduce((acc, cat) => {
  acc[cat.category] = cat.subServices.map(s => s.name);
  return acc;
}, {});