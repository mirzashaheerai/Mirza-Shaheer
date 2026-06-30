// Constants and configuration values

export const SITE_CONFIG = {
  name: 'Muhammad Shaheer',
  title: 'Premium 3D Portfolio',
  description: 'Creative developer showcasing premium 3D projects and digital experiences',
  author: 'Muhammad Shaheer',
  email: 'mirzashaheer.ai@gmail.com',
  social: {
    linkedin: 'https://linkedin.com',
    whatsapp: 'https://wa.me/1234567890',
  },
};

export const COLORS = {
  primary: {
    bg: '#f8f9fa',
    text: '#111111',
  },
  secondary: {
    text: '#666666',
  },
  accent: '#00f5ff',
  white: '#ffffff',
  black: '#000000',
};

export const ANIMATION_DURATION = {
  fast: 0.3,
  normal: 0.6,
  slow: 1,
};

export const BREAKPOINTS = {
  mobile: 640,
  tablet: 768,
  desktop: 1024,
  widescreen: 1280,
};

export const SCROLL_BEHAVIOR = {
  smooth: 'smooth',
  auto: 'auto',
};

export const NAV_ITEMS = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Services', href: '#services' },
  { label: 'Projects', href: '#projects' },
  { label: 'Testimonials', href: '#testimonials' },
  { label: 'Contact', href: '#contact' },
];

export const SERVICES = [
  {
    title: 'Web Development',
    description: 'Custom websites and web applications built with modern technologies',
    icon: '💻',
  },
  {
    title: '3D & Interactive Design',
    description: 'Immersive 3D experiences and interactive web elements',
    icon: '🎨',
  },
  {
    title: 'UI/UX Design',
    description: 'Beautiful, intuitive user interfaces with attention to detail',
    icon: '✨',
  },
  {
    title: 'Animation & Motion',
    description: 'Smooth animations that enhance user experience',
    icon: '🎬',
  },
  {
    title: 'Brand Design',
    description: 'Complete branding solutions and visual identity',
    icon: '🎭',
  },
  {
    title: 'Performance Optimization',
    description: 'Lightning-fast load times and smooth performance',
    icon: '⚡',
  },
];

export const SKILLS = [
  {
    category: 'Frontend',
    items: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS'],
  },
  {
    category: '3D & Animation',
    items: ['Three.js', 'React Three Fiber', 'Framer Motion', 'GSAP'],
  },
  {
    category: 'Design',
    items: ['UI/UX Design', 'Figma', 'Motion Design', 'Brand Design'],
  },
  {
    category: 'Tools',
    items: ['Git', 'VS Code', 'Netlify', 'Vercel'],
  },
];

export const SUPPORTED_FILE_TYPES = {
  images: ['image/jpeg', 'image/png', 'image/gif', 'image/webp', 'image/svg+xml'],
  videos: ['video/mp4', 'video/webm', 'video/quicktime'],
  documents: ['application/pdf'],
};

export const MAX_FILE_SIZE = 50 * 1024 * 1024; // 50MB

export const API_ENDPOINTS = {
  contact: '/api/contact',
  upload: '/api/upload',
  files: '/api/files',
};

export const ERROR_MESSAGES = {
  fileToLarge: 'File is too large. Maximum size is 50MB.',
  unsupportedFormat: 'Unsupported file format.',
  uploadFailed: 'File upload failed. Please try again.',
  networkError: 'Network error. Please check your connection.',
};

export const SUCCESS_MESSAGES = {
  uploaded: 'File uploaded successfully!',
  deleted: 'File deleted successfully!',
  contactSent: 'Message sent! I will get back to you soon.',
};
