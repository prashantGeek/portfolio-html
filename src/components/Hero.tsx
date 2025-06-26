'use client'

import { motion } from 'framer-motion'
import { ArrowDown, Github, Linkedin, Mail, Download, Code, Database, Zap } from 'lucide-react'
import { useEffect, useState } from 'react'

const Hero = () => {
  const [typedText, setTypedText] = useState('')
  const titles = ['Full Stack Developer', 'React Specialist', 'Node.js Expert', 'UI/UX Enthusiast']
  const [currentTitle, setCurrentTitle] = useState(0)

  useEffect(() => {
    let charIndex = 0
    const currentText = titles[currentTitle]
    
    const typeWriter = setInterval(() => {
      if (charIndex < currentText.length) {
        setTypedText(currentText.substring(0, charIndex + 1))
        charIndex++
      } else {
        clearInterval(typeWriter)
        setTimeout(() => {
          // Clear text and move to next title
          const deleteTimer = setInterval(() => {
            if (charIndex > 0) {
              setTypedText(currentText.substring(0, charIndex - 1))
              charIndex--
            } else {
              clearInterval(deleteTimer)
              setCurrentTitle((prev) => (prev + 1) % titles.length)
            }
          }, 50)
        }, 2000)
      }
    }, 100)

    return () => clearInterval(typeWriter)
  }, [currentTitle])

  const downloadResume = () => {
    // Link to the HTML resume that can be printed as PDF
    const resumeUrl = '/resume.html'
    window.open(resumeUrl, '_blank')
  }

  return (
    <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        
        {/* Floating Elements */}
        <motion.div
          className="absolute top-20 left-20 w-16 h-16 bg-blue-500 rounded-full opacity-20"
          animate={{ y: [0, -20, 0], rotate: [0, 180, 360] }}
          transition={{ duration: 6, repeat: Infinity }}
        />
        <motion.div
          className="absolute top-40 right-32 w-12 h-12 bg-purple-500 rounded-square opacity-20"
          animate={{ y: [0, 20, 0], rotate: [0, -180, -360] }}
          transition={{ duration: 8, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-32 left-32 w-20 h-20 bg-indigo-500 rounded-full opacity-20"
          animate={{ y: [0, -30, 0], x: [0, 10, 0] }}
          transition={{ duration: 7, repeat: Infinity }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          {/* Name with enhanced styling */}
          <motion.h1
            className="text-5xl md:text-7xl font-bold text-gray-900 dark:text-white mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            Prashant Tiwari
          </motion.h1>

          {/* Typing Animation */}
          <motion.div
            className="h-12 md:h-16 mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            <h2 className="text-2xl md:text-4xl font-semibold text-blue-600 dark:text-blue-400">
              {typedText}
              <span className="animate-pulse">|</span>
            </h2>
          </motion.div>
          
          <motion.p
            className="text-lg md:text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-4xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            Passionate about creating exceptional digital experiences with{' '}
            <span className="font-semibold text-blue-600 dark:text-blue-400">2+ years</span> of expertise in 
            modern web technologies. I build scalable, performant applications that solve real-world problems.
          </motion.p>

          {/* Stats */}
          <motion.div
            className="flex flex-wrap justify-center gap-8 mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            <div className="flex items-center space-x-2 bg-white dark:bg-gray-800 px-4 py-2 rounded-full shadow-lg">
              <Code className="w-5 h-5 text-blue-600" />
              <span className="font-semibold text-gray-700 dark:text-gray-300">50+ Projects</span>
            </div>
            <div className="flex items-center space-x-2 bg-white dark:bg-gray-800 px-4 py-2 rounded-full shadow-lg">
              <Database className="w-5 h-5 text-green-600" />
              <span className="font-semibold text-gray-700 dark:text-gray-300">Full Stack</span>
            </div>
            <div className="flex items-center space-x-2 bg-white dark:bg-gray-800 px-4 py-2 rounded-full shadow-lg">
              <Zap className="w-5 h-5 text-yellow-600" />
              <span className="font-semibold text-gray-700 dark:text-gray-300">Fast Delivery</span>
            </div>
          </motion.div>

          {/* Social Links */}
          <motion.div
            className="flex justify-center space-x-6 mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
          >
            <motion.a
              href="https://github.com/prashantGeek"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.1, rotate: 5 }}
              whileTap={{ scale: 0.95 }}
              className="group p-4 bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200 dark:border-gray-700"
            >
              <Github className="w-6 h-6 text-gray-700 dark:text-gray-300 group-hover:text-black dark:group-hover:text-white transition-colors" />
            </motion.a>
            
            <motion.a
              href="https://www.linkedin.com/in/prashantgeek"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.1, rotate: -5 }}
              whileTap={{ scale: 0.95 }}
              className="group p-4 bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200 dark:border-gray-700"
            >
              <Linkedin className="w-6 h-6 text-blue-600 group-hover:text-blue-700 transition-colors" />
            </motion.a>
            
            <motion.a
              href="mailto:pt15052000@gmail.com"
              whileHover={{ scale: 1.1, rotate: 5 }}
              whileTap={{ scale: 0.95 }}
              className="group p-4 bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200 dark:border-gray-700"
            >
              <Mail className="w-6 h-6 text-red-500 group-hover:text-red-600 transition-colors" />
            </motion.a>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.8 }}
          >
            <motion.a
              href="#projects"
              whileHover={{ scale: 1.05, boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)" }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 font-semibold"
            >
              View My Work
            </motion.a>
            
            <motion.button
              onClick={downloadResume}
              whileHover={{ scale: 1.05, boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)" }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center justify-center space-x-2 px-8 py-4 border-2 border-blue-600 text-blue-600 dark:text-blue-400 rounded-xl hover:bg-blue-600 hover:text-white transition-all duration-300 font-semibold"
            >
              <Download className="w-5 h-5" />
              <span>Download Resume</span>
            </motion.button>
            
            <motion.a
              href="#contact"
              whileHover={{ scale: 1.05, boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)" }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-white dark:bg-gray-800 text-gray-900 dark:text-white border border-gray-300 dark:border-gray-600 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 font-semibold"
            >
              Get In Touch
            </motion.a>
          </motion.div>
        </motion.div>
      </div>

      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
      >
        <ArrowDown className="w-6 h-6 text-gray-400" />
      </motion.div>
    </section>
  )
}

export default Hero
