import Hero from '@/components/Hero'
import About from '@/components/About'
import Experience from '@/components/Experience'
import Projects from '@/components/Projects'
import Skills from '@/components/Skills'
import Achievements from '@/components/Achievements'
import Testimonials from '@/components/Testimonials'
import Contact from '@/components/Contact'
import Navigation from '@/components/Navigation'

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navigation />
      <Hero />
      <About />
      <Experience />
      <Skills />
      <Achievements />
      <Projects />
      <Testimonials />
      <Contact />
    </div>
  )
}
