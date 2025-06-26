'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

const About = () => {
  const [ref, inView] = useInView({
    threshold: 0.2,
    triggerOnce: true
  })

  return (
    <section id="about" className="py-20 bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            About Me
          </h2>
          <div className="w-24 h-1 bg-blue-600 mx-auto"></div>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            <div className="bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl p-8 text-white">
              <h3 className="text-2xl font-bold mb-4">Full Stack Developer</h3>
              <p className="text-lg leading-relaxed">
                Passionate about creating innovative web solutions with a focus on user experience 
                and clean, efficient code. I enjoy tackling complex problems and turning ideas into 
                reality through technology.
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="space-y-6"
          >
            <div>
              <h4 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                What I Do
              </h4>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="w-3 h-3 bg-blue-600 rounded-full mt-2"></div>
                  <div>
                    <h5 className="font-medium text-gray-900 dark:text-white">Frontend Development</h5>
                    <p className="text-gray-600 dark:text-gray-400">
                      Building responsive, interactive user interfaces with React, Next.js, and modern CSS
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <div className="w-3 h-3 bg-blue-600 rounded-full mt-2"></div>
                  <div>
                    <h5 className="font-medium text-gray-900 dark:text-white">Backend Development</h5>
                    <p className="text-gray-600 dark:text-gray-400">
                      Creating robust APIs and server-side solutions with Node.js, Python, and databases
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <div className="w-3 h-3 bg-blue-600 rounded-full mt-2"></div>
                  <div>
                    <h5 className="font-medium text-gray-900 dark:text-white">Full Stack Solutions</h5>
                    <p className="text-gray-600 dark:text-gray-400">
                      End-to-end application development with seamless integration between frontend and backend
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default About
