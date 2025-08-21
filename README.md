# 🚀 Modern Portfolio Website

A stunning, modern portfolio website built with Next.js, TypeScript, Tailwind CSS, and Framer Motion. This portfolio is designed to impress hiring managers and showcase full-stack development skills.

## ✨ Features

### 🎨 Design & User Experience
- **Modern, responsive design** that looks great on all devices
- **Dark/Light mode support** with smooth transitions
- **Smooth animations** using Framer Motion
- **Interactive elements** and micro-interactions
- **Professional typography** and color scheme
### 📱 Components
- **Dynamic Hero Section** with typing animation and floating elements
- **About Section** with engaging personal introduction
- **Skills Visualization** with animated progress bars
- **Experience Timeline** with detailed work history
- **Project Showcase** with live demos and GitHub links
- **Achievements & Metrics** with animated counters
- **Client Testimonials** with ratings and feedback
- **Contact Form** with email integration
- **Responsive Navigation** with smooth scrolling

### 🛠️ Technical Features
- **Next.js 15** with App Router
- **TypeScript** for type safety
- **Tailwind CSS** for styling
- **Framer Motion** for animations
- **Responsive design** mobile-first approach
- **SEO optimized** with proper meta tags
- **Performance optimized** with Next.js features

## 🚀 Quick Start

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Start the development server**
   ```bash
   npm run dev
   ```

3. **Open your browser** and visit [http://localhost:3000](http://localhost:3000)

## 🎯 Key Sections

### 🏠 Hero Section
- Eye-catching design with gradient backgrounds
- Typing animation cycling through different titles
- Social media links with hover animations
- Resume download functionality
- Achievement metrics display

### 👨‍💻 About Section
- Professional introduction
- Key strengths and values
- Call-to-action buttons

### 💼 Experience
- Timeline-based layout
- Detailed job descriptions
- Technology stacks used
- Company information

### 🛠️ Skills
- Categorized skill sets (Frontend, Backend, Tools)
- Animated progress bars
- Visual skill ratings

### 📊 Achievements
- Animated counters for metrics
- Key performance indicators
- Professional highlights

### 🚀 Projects
- Featured projects with detailed descriptions
- Live demo and GitHub links
- Technology stack for each project
- Performance metrics
- Challenge/solution highlights

### 💬 Testimonials
- Client feedback with ratings
- Professional recommendations
- Company information

### 📞 Contact
- Interactive contact form
- Contact information
- Response time expectations
- Why work with me section

## 🎨 Customization

### Content
Update your personal information in:
- `src/components/Hero.tsx` - Name, title, and social links
- `src/components/About.tsx` - Personal description
- `src/components/Experience.tsx` - Work experience
- `src/components/Projects.tsx` - Your projects
- `src/components/Skills.tsx` - Your skills and ratings
- `src/components/Contact.tsx` - Contact information

### Email Integration
To enable the contact form:
1. Sign up for [EmailJS](https://www.emailjs.com/)
2. Get your service ID, template ID, and public key
3. Update the configuration in `src/components/Contact.tsx`

## 🚀 Deployment

### Vercel (Recommended)
1. Push your code to GitHub
2. Connect your repository to [Vercel](https://vercel.com)
3. Deploy with one click

## 🛠️ Technologies Used

- **Frontend**: Next.js 15, React 19, TypeScript
- **Styling**: Tailwind CSS, Custom CSS animations
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Email**: EmailJS for contact form
- **Development**: ESLint, TypeScript compiler

## 🔧 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## 💡 Tips for Maximum Impact

1. **Update Projects**: Add your best 3-6 projects with live demos
2. **Add Metrics**: Include real numbers (users, performance, etc.)
3. **Professional Photos**: Use high-quality, professional images
4. **Testimonials**: Reach out to past clients/colleagues for reviews
5. **Keep Updated**: Regularly update with new projects and skills

## 📞 Contact

**Prashant Tiwari**
- Email: pt15052000@gmail.com
- LinkedIn: [linkedin.com/in/prashantgeek](https://linkedin.com/in/prashantgeek)
- GitHub: [github.com/prashantGeek](https://github.com/prashantGeek)

---

⭐ **Star this repository if it helped you create an amazing portfolio!**

## 🔗 GitHub Integration

This portfolio features a real-time GitHub contributions section that fetches live data from your GitHub profile.

### **Features:**
- **Real GitHub contribution graph** with 365-day activity heatmap
- **Live statistics**: repos, stars, followers, contributions
- **Recent repositories** showcase with live data
- **Programming languages** analysis from your repos
- **Streak tracking** and contribution patterns
- **Fallback support** when API is unavailable

### **API Integration:**
The GitHub section uses the GitHub REST API to fetch:
- User profile information
- Repository statistics
- Contribution data (estimated from repo activity)
- Programming language
- ## **Setup (Optional):**
For enhanced features, you can add a GitHub Personal Access Token:

1. Go to [GitHub Settings > Developer Settings > Personal Access Tokens](https://github.com/settings/tokens)
2. Create a new token with `public_repo` and `read:user` permissions
3. Copy `.env.example` to `.env.local`
4. Add your token: `NEXT_PUBLIC_GITHUB_TOKEN=your_token_here`
