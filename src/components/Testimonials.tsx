'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Star, Quote } from 'lucide-react'

const Testimonials = () => {
  const [ref, inView] = useInView({
    threshold: 0.2,
    triggerOnce: true
  })

  const testimonials = [
    {
      name: 'Sarah Johnson',
      role: 'Product Manager',
      company: 'TechCorp Inc.',
      image: '/api/placeholder/80/80',
      content: 'Prashant delivered an exceptional e-commerce platform that exceeded our expectations. His attention to detail and technical expertise are remarkable.',
      rating: 5,
      project: 'E-Commerce Platform'
    },
    {
      name: 'Michael Chen',
      role: 'CTO',
      company: 'StartupX',
      image: '/api/placeholder/80/80',
      content: 'Working with Prashant was a game-changer. He transformed our complex requirements into a beautiful, scalable application. Highly recommended!',
      rating: 5,
      project: 'Task Management System'
    },
    {
      name: 'Emily Rodriguez',
      role: 'Startup Founder',
      company: 'InnovateLabs',
      image: '/api/placeholder/80/80',
      content: 'Prashant\'s full-stack expertise helped us launch our MVP in record time. His code quality and communication skills are top-notch.',
      rating: 5,
      project: 'SaaS Dashboard'
    },
    {
      name: 'David Kumar',
      role: 'Development Lead',
      company: 'Capgemini',
      image: '/api/placeholder/80/80',
      content: 'As a colleague, Prashant consistently delivers high-quality code and mentors junior developers. A true asset to any development team.',
      rating: 5,
      project: 'Enterprise Solutions'
    }
  ]

  const renderStars = (rating: number) => {
    return [...Array(5)].map((_, index) => (
      <Star
        key={index}
        className={`w-5 h-5 ${
          index < rating 
            ? 'text-yellow-400 fill-current' 
            : 'text-gray-300 dark:text-gray-600'
        }`}
      />
    ))
  }

  return (
    <section className="py-20 bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            What People Say
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Don't just take my word for it - here's what clients and colleagues have to say about working with me
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto mt-6"></div>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.2 + index * 0.1, duration: 0.8 }}
              className="bg-gray-50 dark:bg-gray-800 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-700 relative overflow-hidden group"
            >
              {/* Quote Icon */}
              <div className="absolute top-6 right-6 opacity-10 group-hover:opacity-20 transition-opacity">
                <Quote className="w-16 h-16 text-blue-600" />
              </div>

              {/* Rating */}
              <div className="flex items-center space-x-1 mb-4">
                {renderStars(testimonial.rating)}
              </div>

              {/* Content */}
              <blockquote className="text-gray-700 dark:text-gray-300 text-lg leading-relaxed mb-6 relative z-10">
                "{testimonial.content}"
              </blockquote>

              {/* Project Tag */}
              <div className="inline-block bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 text-sm px-3 py-1 rounded-full mb-4">
                {testimonial.project}
              </div>

              {/* Author */}
              <div className="flex items-center space-x-4">
                <div className="w-14 h-14 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
                  {testimonial.name.split(' ').map(n => n[0]).join('')}
                </div>
                <div>
                  <div className="font-semibold text-gray-900 dark:text-white">
                    {testimonial.name}
                  </div>
                  <div className="text-gray-600 dark:text-gray-400 text-sm">
                    {testimonial.role} at {testimonial.company}
                  </div>
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
              Ready to Start Your Project?
            </h3>
            <p className="text-xl mb-6 text-blue-100">
              Let's create something amazing together
            </p>
            <motion.a
              href="#contact"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-block bg-white text-blue-600 px-8 py-4 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
            >
              Start a Conversation
            </motion.a>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default Testimonials
