# 📖 Setup & Deployment Guide

## Complete Step-by-Step Instructions

### Part 1: Local Development Setup

#### Step 1: Extract Files
If you received the project as a ZIP file, extract it to a location on your computer:
```bash
# Windows
Right-click ZIP → Extract All

# macOS/Linux
unzip portfolio.zip
cd portfolio
```

#### Step 2: Install Node.js
If you don't have Node.js installed:
1. Visit https://nodejs.org
2. Download **LTS version** (20.x or higher)
3. Run the installer and follow the setup wizard
4. Verify installation:
```bash
node --version
npm --version
```

#### Step 3: Install Project Dependencies
Navigate to your project folder and run:
```bash
npm install
```

This will install all required packages listed in `package.json`. The installation may take 2-5 minutes.

#### Step 4: Configure Environment
Create `.env.local` file:
```bash
# Copy the example file
cp .env.example .env.local
```

Edit `.env.local` with your settings:
```env
ADMIN_PASSWORD=admin2024
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

#### Step 5: Start Development Server
```bash
npm run dev
```

You'll see output like:
```
> next dev
  ▲ Next.js 15.0.0

  Local:        http://localhost:3000
```

#### Step 6: Test Locally
1. Open http://localhost:3000 in your browser
2. Test the 3D hero section (move your mouse around)
3. Scroll through all sections
4. Try the contact form
5. Visit http://localhost:3000/admin and login with password `admin2024`

---

### Part 2: Deployment to Netlify

#### Method A: GitHub + Netlify (Recommended - Easiest)

**Step 1: Create GitHub Account**
1. Visit https://github.com
2. Sign up for a free account
3. Verify your email

**Step 2: Create Repository**
1. Click **+** icon → New repository
2. Name it: `shaheer-portfolio`
3. Set to Public or Private (your choice)
4. Click **Create repository**

**Step 3: Upload to GitHub**

Open terminal/command prompt and run:
```bash
# Navigate to your project
cd path/to/portfolio

# Initialize git
git init

# Add all files
git add .

# Commit files
git commit -m "Initial portfolio setup"

# Rename branch to main
git branch -M main

# Add remote (replace with your repo URL)
git remote add origin https://github.com/YOUR_USERNAME/shaheer-portfolio.git

# Push to GitHub
git push -u origin main
```

**Step 4: Connect to Netlify**
1. Visit https://netlify.com
2. Click **Sign up** (you can use GitHub to sign in)
3. Click **New site from Git**
4. Select GitHub and authorize Netlify
5. Select your `shaheer-portfolio` repository
6. Configure build settings:
   - **Base directory**: Leave empty
   - **Build command**: `npm run build`
   - **Publish directory**: `.next`
7. Click **Deploy site**

**Step 5: Add Environment Variables**
1. In Netlify dashboard, go to **Settings**
2. Click **Environment** → **Edit variables**
3. Add:
   ```
   ADMIN_PASSWORD = admin2024
   NEXT_PUBLIC_SITE_URL = https://[your-site-name].netlify.app
   ```
4. Redeploy: Click **Deploys** → **Trigger deploy**

---

#### Method B: Netlify CLI (For Advanced Users)

**Step 1: Install Netlify CLI**
```bash
npm install -g netlify-cli
```

**Step 2: Login to Netlify**
```bash
netlify login
```
This opens a browser to authenticate you.

**Step 3: Build Project**
```bash
npm run build
```

**Step 4: Deploy**
```bash
netlify deploy --prod
```

When prompted:
- Deploy path: `.next`
- Publish directory: accept default

**Step 5: Setup Environment Variables**
```bash
netlify env:set ADMIN_PASSWORD admin2024
netlify env:set NEXT_PUBLIC_SITE_URL https://[your-site].netlify.app
```

Redeploy:
```bash
netlify deploy --prod
```

---

#### Method C: Direct Upload (Simplest)

**Step 1: Build**
```bash
npm run build
```

**Step 2: Create Netlify Account**
Visit https://netlify.com and sign up

**Step 3: Deploy**
1. Drag and drop the `.next` folder onto https://app.netlify.com/drop
2. Your site is now live!

---

### Part 3: Custom Domain Setup

**Step 1: Buy Domain**
Options:
- Namecheap.com
- GoDaddy.com
- Google Domains
- Cloudflare.com

**Step 2: Connect to Netlify**
1. Go to Netlify dashboard
2. Click **Domain settings**
3. Click **Add custom domain**
4. Enter your domain name
5. Follow instructions to update DNS records at your registrar

**Step 3: Enable HTTPS**
Netlify automatically provisions an SSL certificate (free!)

---

### Part 4: Customize Before Deployment

#### 1. Update Contact Information
Edit `components/ContactSection.tsx`:
```typescript
// Change this
href="mailto:mirzashaheer.ai@gmail.com"
// To your email
href="mailto:your@email.com"
```

#### 2. Update Social Links
Edit `components/ContactSection.tsx` and `components/Footer.tsx`:
```typescript
// Update LinkedIn URL
href="https://linkedin.com/in/yourprofile"

// Update WhatsApp
href="https://wa.me/your_phone_number"
```

#### 3. Update Projects
Edit `components/ProjectsSection.tsx` and replace sample projects with your actual work.

#### 4. Update About Section
Edit `components/AboutSection.tsx` with your bio and skills.

#### 5. Update Site Metadata
Edit `app/layout.tsx`:
```typescript
title: 'Muhammad Shaheer | Premium 3D Portfolio'
// Change to your name
```

---

### Part 5: Admin Panel Usage

**Access Admin Panel**
```
http://localhost:3000/admin (development)
https://yourdomain.netlify.app/admin (production)
```

**Login**
- Default password: `admin2024`
- Change in `.env.local` or Netlify environment variables

**Upload Files**
1. Drag & drop or click to select files
2. Supports: Images (JPG, PNG, GIF, WebP), Videos (MP4, WebM, MOV), PDFs
3. Files are stored in browser localStorage

**Manage Files**
- View all uploaded media
- Download files
- Delete files
- Check file size and type

---

### Part 6: Post-Deployment Checklist

- [ ] Website loads without errors
- [ ] 3D hero section renders and responds to mouse movement
- [ ] All sections scroll smoothly
- [ ] Contact form works
- [ ] Admin panel is accessible and password protected
- [ ] Links to email, WhatsApp, LinkedIn work
- [ ] Mobile responsive design works on phone
- [ ] Performance is good (check Netlify Analytics)
- [ ] HTTPS is enabled (green padlock)
- [ ] Meta tags and SEO are correct

---

### Part 7: Maintenance

**Regular Tasks**
- Monitor analytics (Netlify has built-in analytics)
- Update project examples quarterly
- Check for package updates: `npm outdated`
- Review admin panel uploads

**Update Dependencies**
```bash
npm update
npm audit fix
```

**Backup**
- Keep regular git commits
- Export files from admin panel periodically
- Use GitHub as backup

---

### Part 8: Troubleshooting

**Problem: Site shows error 404**
- Solution: Check build logs in Netlify dashboard
- Ensure build command is: `npm run build`
- Verify publish directory is: `.next`

**Problem: Styles not loading**
- Solution: Clear browser cache (Ctrl+Shift+Delete)
- Hard refresh (Ctrl+F5)
- Rebuild: Click **Deploys** → **Trigger deploy**

**Problem: Admin page not working**
- Solution: Check if ADMIN_PASSWORD is set in Netlify env
- Verify password matches environment variable
- Clear localStorage: Open DevTools → Storage → Clear All

**Problem: 3D hero not rendering**
- Solution: Ensure WebGL is enabled
- Try different browser
- Check browser console for errors (F12)

**Problem: Deployment fails**
- Solution: 
  1. Check build logs in Netlify
  2. Run `npm run build` locally to test
  3. Ensure all dependencies are in package.json
  4. Check for TypeScript errors: `npm run lint`

---

### Support Resources

**Official Documentation**
- Next.js: https://nextjs.org/docs
- Netlify: https://docs.netlify.com
- Tailwind CSS: https://tailwindcss.com/docs
- Three.js: https://threejs.org/docs
- Framer Motion: https://www.framer.com/motion

**Community Help**
- Stack Overflow
- GitHub Discussions
- Discord communities

---

## Quick Reference Commands

```bash
# Local Development
npm install          # Install dependencies
npm run dev         # Start dev server
npm run build       # Build for production
npm run start       # Start production server
npm run lint        # Check for errors

# Deployment
git add .
git commit -m "message"
git push origin main

# Environment
cp .env.example .env.local
```

---

**Estimated Time to Deployment**: 15-30 minutes

Good luck! 🚀
