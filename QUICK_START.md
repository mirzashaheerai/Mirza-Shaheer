# ⚡ Quick Start (5 Minutes)

## For the Impatient

### 1. Prerequisites (1 min)
```bash
# Check if Node.js is installed
node --version
npm --version

# If not installed, download from https://nodejs.org (LTS version)
```

### 2. Install & Run (2 min)
```bash
# Navigate to project folder
cd portfolio

# Install dependencies
npm install

# Start dev server
npm run dev

# Open browser to http://localhost:3000
```

### 3. Test Admin Panel (1 min)
```
Visit: http://localhost:3000/admin
Password: admin2024
```

### 4. Deploy (1 min)
```bash
# Option A: Drag .next folder to https://app.netlify.com/drop
# Option B: Connect GitHub repo to Netlify
# Option C: Use Netlify CLI: netlify deploy --prod
```

---

## Key URLs

- **Home**: http://localhost:3000
- **Admin**: http://localhost:3000/admin

---

## Absolute Must-Do Before Deploy

1. Update email: `components/ContactSection.tsx`
2. Change admin password: `.env.local`
3. Update social links: `components/ContactSection.tsx`

---

## Help?

See `SETUP_GUIDE.md` for detailed instructions
See `TECHNICAL_GUIDE.md` for customization
See `README.md` for full documentation

---

**That's it! You're live in 5 minutes.** 🚀
