# Muhammad Shaheer - Premium 3D Portfolio

A high-end, premium personal portfolio website for Muhammad Shaheer featuring interactive 3D elements, smooth animations, and an admin dashboard for media management.

## ✨ Features

### Hero Section
- **3D Morphing Object**: Interactive geometric shape that responds to mouse movement and scroll position
- **Particle System**: Black particles that follow the cursor smoothly
- **Premium Design**: Clean typography with bold "Muhammad Shaheer" headline
- **Smooth Animations**: Framer Motion powered transitions

### Core Sections
- **Navigation**: Fixed header with smooth scrolling and mobile-responsive menu
- **About**: Skills showcase with categorized expertise
- **Services**: Comprehensive service offerings (Web Dev, 3D Design, UI/UX, Animation, Branding, Performance)
- **Projects**: Featured projects grid with hover effects
- **Testimonials**: Rotating carousel of client testimonials
- **Contact**: Contact form with email, WhatsApp, and LinkedIn integration
- **Footer**: Full-featured footer with navigation and social links

### Admin Panel
- **Password Protected**: Secure `/admin` page with authentication
- **File Upload**: Drag & drop file upload with multiple file support
- **Media Library**: Manage uploaded images, videos, and PDFs
- **Local Storage**: Files stored in browser (ready for Netlify Blobs integration)

### Design & Performance
- **Responsive Design**: Mobile-first design that works perfectly on all devices
- **Fast Performance**: Optimized for speed with lazy loading and code splitting
- **Accessibility**: WCAG compliant with focus states and semantic HTML
- **3D Graphics**: React Three Fiber for stunning 3D visuals

## 🛠 Tech Stack

- **Frontend Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS + CSS Modules
- **3D Graphics**: Three.js + React Three Fiber
- **Animation**: Framer Motion + Lenis
- **Icons**: Lucide React
- **Deployment**: Netlify

## 📋 Prerequisites

Before getting started, ensure you have:
- Node.js 18+ installed
- npm, yarn, or pnpm package manager
- Git for version control
- A Netlify account (for deployment)

## 🚀 Quick Start

### 1. Clone or Download the Project

```bash
# If cloning from git
git clone <repository-url>
cd muhammad-shaheer-portfolio

# Or if you have the project files already
cd portfolio
```

### 2. Install Dependencies

```bash
npm install
# or
yarn install
# or
pnpm install
```

### 3. Set Up Environment Variables

Create a `.env.local` file in the root directory:

```bash
cp .env.example .env.local
```

Edit `.env.local` and update the values:

```env
# Admin Password (change to a secure password in production)
ADMIN_PASSWORD=admin2024

# Site Configuration
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

### 4. Run Development Server

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the result.

### 5. Access Admin Panel

Navigate to [http://localhost:3000/admin](http://localhost:3000/admin) and login with:
- **Password**: `admin2024` (or your custom password)

## 📁 Project Structure

```
portfolio/
├── app/
│   ├── admin/
│   │   ├── layout.tsx          # Admin layout
│   │   └── page.tsx            # Admin dashboard
│   ├── globals.css             # Global styles
│   ├── layout.tsx              # Root layout
│   └── page.tsx                # Home page
├── components/
│   ├── AboutSection.tsx        # About section
│   ├── ContactSection.tsx      # Contact section
│   ├── Footer.tsx              # Footer component
│   ├── HeroSection.tsx         # Hero with 3D
│   ├── Navigation.tsx          # Navigation header
│   ├── ProjectsSection.tsx     # Projects section
│   ├── ServicesSection.tsx     # Services section
│   └── TestimonialsSection.tsx # Testimonials section
├── lib/
│   └── auth.ts                 # Authentication utilities
├── public/
│   └── favicon.ico
├── .env.example                # Environment variables template
├── .env.local                  # Local environment variables (not committed)
├── .gitignore
├── netlify.toml                # Netlify configuration
├── next.config.js              # Next.js configuration
├── package.json
├── postcss.config.js           # PostCSS configuration
├── tailwind.config.js          # Tailwind configuration
├── tsconfig.json               # TypeScript configuration
└── README.md                   # This file
```

## 🎨 Customization

### Colors
Edit `tailwind.config.js` to customize the color palette:

```javascript
theme: {
  extend: {
    colors: {
      'primary-bg': '#f8f9fa',      // Background
      'primary-text': '#111111',    // Text
      'secondary-text': '#666666',  // Secondary text
      'accent-cyan': '#00f5ff',     // Accent color
    },
  },
}
```

### Content
- **Hero Title**: Edit `components/HeroSection.tsx`
- **About Section**: Edit `components/AboutSection.tsx`
- **Services**: Edit `components/ServicesSection.tsx`
- **Projects**: Edit `components/ProjectsSection.tsx`
- **Contact Info**: Edit `components/ContactSection.tsx`

### Admin Password
Update in `.env.local`:

```env
ADMIN_PASSWORD=your_secure_password
```

## 🚢 Deployment to Netlify

### Option 1: Using Netlify CLI (Recommended)

```bash
# Install Netlify CLI if you haven't already
npm install -g netlify-cli

# Login to Netlify
netlify login

# Deploy the project
netlify deploy --prod
```

### Option 2: Connect GitHub to Netlify

1. Push your project to GitHub:
```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin <your-repo-url>
git push -u origin main
```

2. Go to [Netlify](https://netlify.com) and sign up/login
3. Click "New site from Git"
4. Connect your GitHub repository
5. Configure build settings:
   - **Build command**: `npm run build`
   - **Publish directory**: `.next`
6. Add environment variables in Netlify dashboard:
   - `ADMIN_PASSWORD`: your_secure_password
   - `NEXT_PUBLIC_SITE_URL`: your_deployed_url
7. Deploy

### Option 3: Direct Upload

```bash
# Build the project
npm run build

# Install Netlify CLI
npm install -g netlify-cli

# Deploy
netlify deploy --prod --dir=.next
```

## 📝 Environment Variables

### Required
- `ADMIN_PASSWORD`: Password for admin panel (default: `admin2024`)

### Optional
- `NEXT_PUBLIC_SITE_URL`: Your website URL
- `NEXT_PUBLIC_GA_ID`: Google Analytics ID

## 🔒 Security

### Admin Panel Security
- Passwords are hashed using SHA256
- Authentication stored in localStorage
- Add HTTPS to your Netlify custom domain for production
- Change default password in production

### Best Practices
1. Never commit `.env.local` to git
2. Use strong, unique passwords for admin access
3. Enable Netlify's built-in security features
4. Regular backups of your media files

## 🎯 Performance Optimization

The portfolio is optimized for performance:

- **Code Splitting**: Automatic with Next.js
- **Image Optimization**: Next.js Image component ready
- **CSS**: Tailwind CSS purges unused styles
- **3D**: Efficient Three.js rendering with WebGL
- **Lazy Loading**: Sections load on viewport intersection
- **Caching**: Netlify caches static assets

## 🐛 Troubleshooting

### Issue: Admin page shows blank screen
- Clear browser cache and localStorage
- Verify `.env.local` has `ADMIN_PASSWORD` set
- Check browser console for errors

### Issue: 3D object not rendering
- Ensure WebGL is enabled in your browser
- Check if your graphics drivers are updated
- Try a different browser

### Issue: Deployment fails
- Verify all environment variables are set in Netlify
- Check build logs in Netlify dashboard
- Ensure `package.json` versions are compatible

### Issue: Styling looks wrong
- Clear Next.js cache: `rm -rf .next`
- Rebuild: `npm run build`
- Clear browser cache

## 📞 Contact

For questions or support:
- **Email**: mirzashaheer.ai@gmail.com
- **LinkedIn**: [Connect on LinkedIn](https://linkedin.com)
- **WhatsApp**: [Chat on WhatsApp](https://wa.me/1234567890)

## 📄 License

This project is personal and proprietary. All rights reserved.

## 🙏 Credits

- **3D Graphics**: Three.js & React Three Fiber
- **Animation**: Framer Motion
- **Styling**: Tailwind CSS
- **Deployment**: Netlify

---

**Last Updated**: June 2024
**Version**: 1.0.0
