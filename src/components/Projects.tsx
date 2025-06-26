'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { ExternalLink, Github } from 'lucide-react'

const Projects = () => {
  const [ref, inView] = useInView({
    threshold: 0.2,
    triggerOnce: true
  })

  const projects = [
    {
      title: 'E-Commerce Platform',
      description: 'A modern, scalable e-commerce solution with React, Node.js, and Stripe integration. Features include user authentication, product catalog, shopping cart, order management, and admin dashboard.',
      image: '/api/placeholder/600/400',
      technologies: ['React', 'Node.js', 'MongoDB', 'Stripe API', 'Tailwind CSS', 'JWT'],
      github: 'https://github.com/prashantGeek',
      live: '#',
      featured: true,
      metrics: {
        users: '1,000+',
        performance: '98%',
        uptime: '99.9%'
      },
      challenges: 'Implemented complex state management and optimized for high traffic loads'
    },
    {
      title: 'Task Management App',
      description: 'A collaborative project management tool with real-time updates, drag-and-drop functionality, team collaboration features, and advanced analytics dashboard.',
      image: '/api/placeholder/600/400',
      technologies: ['Next.js', 'TypeScript', 'PostgreSQL', 'Socket.io', 'Prisma', 'Redis'],
      github: 'https://github.com/prashantGeek',
      live: '#',
      featured: true,
      metrics: {
        teams: '200+',
        tasks: '10,000+',
        realTime: '< 100ms'
      },
      challenges: 'Built real-time synchronization across multiple users and devices'
    },
    {
      title: 'AI-Powered Analytics Dashboard',
      description: 'Intelligent business analytics platform with machine learning insights, predictive modeling, and interactive data visualizations for enterprise decision-making.',
      image: '/api/placeholder/600/400',
      technologies: ['React', 'Python', 'TensorFlow', 'D3.js', 'PostgreSQL', 'AWS'],
      github: 'https://github.com/prashantGeek',
      live: '#',
      featured: true,
      metrics: {
        accuracy: '94%',
        dataPoints: '1M+',
        savings: '$50K+'
      },
      challenges: 'Integrated ML models with real-time data processing and visualization'
    },
    {
      title: 'Social Media Management Tool',
      description: 'Comprehensive social media management platform with content scheduling, analytics, team collaboration, and multi-platform posting capabilities.',
      image: '/api/placeholder/600/400',
      technologies: ['Vue.js', 'Node.js', 'MongoDB', 'Bull Queue', 'Chart.js', 'OAuth'],
      github: 'https://github.com/prashantGeek',
      live: '#',
      featured: false,
      metrics: {
        posts: '100K+',
        platforms: '6',
        engagement: '+45%'
      },
      challenges: 'Handled rate limiting and API integrations across multiple social platforms'
    },
    {
      title: 'Real Estate Platform',
      description: 'Modern property listing and management system with advanced search, virtual tours, mortgage calculator, and agent-client communication tools.',
      image: '/api/placeholder/600/400',
      technologies: ['Next.js', 'Strapi', 'PostgreSQL', 'Mapbox', 'Cloudinary', 'Stripe'],
      github: 'https://github.com/prashantGeek',
      live: '#',
      featured: false,
      metrics: {
        properties: '5,000+',
        agents: '150+',
        conversion: '+30%'
      },
      challenges: 'Implemented complex filtering and mapping functionalities with optimal performance'
    },
    {
      title: 'Learning Management System',
      description: 'Complete LMS with course creation, student progress tracking, video streaming, quiz system, and certificate generation for educational institutions.',
      image: '/api/placeholder/600/400',
      technologies: ['React', 'Node.js', 'MongoDB', 'FFmpeg', 'AWS S3', 'WebRTC'],
      github: 'https://github.com/prashantGeek',
      live: '#',
      featured: false,
      metrics: {
        students: '2,000+',
        courses: '100+',
        completion: '85%'
      },
      challenges: 'Built scalable video streaming and real-time collaboration features'
    }
  ]

  return (
    <section id="projects" className="py-20 bg-gray-50 dark:bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            Featured Projects
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto mb-6"></div>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Explore my portfolio of full-stack applications, each demonstrating modern development practices, 
            scalable architecture, and real-world impact.
          </p>
        </motion.div>

        {/* Featured Projects Grid */}
        <div className="grid lg:grid-cols-2 gap-8 mb-16">
          {projects.filter(p => p.featured).map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 50 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.2 + index * 0.1, duration: 0.8 }}
              className="group bg-white dark:bg-gray-900 rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300 border border-gray-100 dark:border-gray-800"
            >
              {/* Project Image/Preview */}
              <div className="relative h-64 bg-gradient-to-br from-blue-500 via-purple-600 to-indigo-600 overflow-hidden">
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-300"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-white text-center transform group-hover:scale-110 transition-transform duration-300">
                    <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center mx-auto mb-4 border border-white/30">
                      <ExternalLink className="w-10 h-10" />
                    </div>
                    <p className="text-lg font-semibold opacity-90">Live Preview</p>
                  </div>
                </div>
                
                {/* Featured Badge */}
                <div className="absolute top-4 left-4">
                  <span className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg">
                    ⭐ Featured
                  </span>
                </div>

                {/* Metrics Overlay */}
                <div className="absolute bottom-4 right-4 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-xl p-3 border border-white/50">
                  <div className="flex space-x-4 text-sm">
                    {Object.entries(project.metrics).map(([key, value]) => (
                      <div key={key} className="text-center">
                        <div className="font-bold text-gray-900 dark:text-white">{value}</div>
                        <div className="text-gray-600 dark:text-gray-400 capitalize">{key}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Project Content */}
              <div className="p-8">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                  {project.title}
                </h3>
                
                <p className="text-gray-600 dark:text-gray-300 mb-4 leading-relaxed">
                  {project.description}
                </p>

                {/* Challenge/Achievement */}
                <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-gray-800 dark:to-gray-700 rounded-xl p-4 mb-6 border border-blue-100 dark:border-gray-600">
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Key Challenge:</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-300">{project.challenges}</p>
                </div>

                {/* Technologies */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.technologies.map((tech, i) => (
                    <span
                      key={i}
                      className="px-3 py-1 bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900/50 dark:to-purple-900/50 text-blue-800 dark:text-blue-200 rounded-full text-sm font-medium border border-blue-200 dark:border-blue-800"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Action Buttons */}
                <div className="flex space-x-4">
                  <motion.a
                    href={project.live}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex-1 flex items-center justify-center space-x-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-xl font-semibold hover:shadow-lg transition-all duration-300"
                  >
                    <ExternalLink className="w-5 h-5" />
                    <span>Live Demo</span>
                  </motion.a>
                  
                  <motion.a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex items-center justify-center space-x-2 bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white px-6 py-3 rounded-xl font-semibold hover:bg-gray-200 dark:hover:bg-gray-700 transition-all duration-300 border border-gray-200 dark:border-gray-600"
                  >
                    <Github className="w-5 h-5" />
                    <span>Code</span>
                  </motion.a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Other Projects */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.filter(p => !p.featured).map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 50 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.4 + index * 0.1, duration: 0.8 }}
              className="group bg-white dark:bg-gray-900 rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-800"
            >
              {/* Project Preview */}
              <div className="relative h-48 bg-gradient-to-br from-indigo-500 to-purple-600">
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-300"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-white text-center transform group-hover:scale-110 transition-transform duration-300">
                    <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center mx-auto mb-3 border border-white/30">
                      <ExternalLink className="w-8 h-8" />
                    </div>
                    <p className="text-sm font-medium opacity-90">View Project</p>
                  </div>
                </div>

                {/* Quick Stats */}
                <div className="absolute bottom-3 left-3 right-3 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-lg p-2 border border-white/50">
                  <div className="flex justify-between text-xs">
                    {Object.entries(project.metrics).slice(0, 2).map(([key, value]) => (
                      <div key={key} className="text-center">
                        <div className="font-bold text-gray-900 dark:text-white">{value}</div>
                        <div className="text-gray-600 dark:text-gray-400 capitalize">{key}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                  {project.title}
                </h3>
                
                <p className="text-gray-600 dark:text-gray-300 mb-4 text-sm leading-relaxed">
                  {project.description.substring(0, 120)}...
                </p>

                {/* Technologies (limited) */}
                <div className="flex flex-wrap gap-1 mb-4">
                  {project.technologies.slice(0, 4).map((tech, i) => (
                    <span
                      key={i}
                      className="px-2 py-1 bg-blue-100 dark:bg-blue-900/50 text-blue-800 dark:text-blue-200 rounded-md text-xs font-medium"
                    >
                      {tech}
                    </span>
                  ))}
                  {project.technologies.length > 4 && (
                    <span className="px-2 py-1 bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 rounded-md text-xs">
                      +{project.technologies.length - 4} more
                    </span>
                  )}
                </div>

                {/* Actions */}
                <div className="flex space-x-3">
                  <motion.a
                    href={project.live}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex-1 flex items-center justify-center space-x-1 bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-blue-700 transition-colors"
                  >
                    <ExternalLink className="w-4 h-4" />
                    <span>Demo</span>
                  </motion.a>
                  
                  <motion.a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex items-center justify-center bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white px-4 py-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors border border-gray-200 dark:border-gray-600"
                  >
                    <Github className="w-4 h-4" />
                  </motion.a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.8, duration: 0.8 }}
          className="text-center mt-16"
        >
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white">
            <h3 className="text-2xl md:text-3xl font-bold mb-4">
              Interested in Working Together?
            </h3>
            <p className="text-xl mb-6 text-blue-100">
              I'm always open to discussing new projects and opportunities
            </p>
            <motion.a
              href="#contact"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-block bg-white text-blue-600 px-8 py-4 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
            >
              Let's Build Something Amazing
            </motion.a>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default Projects
