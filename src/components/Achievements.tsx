'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { useEffect, useState } from 'react'
import { Code, Users, Award, Clock, GitBranch, Star } from 'lucide-react'

const Achievements = () => {
  const [ref, inView] = useInView({
    threshold: 0.2,
    triggerOnce: true
  })

  // Counter animation hook
  const useCounter = (target: number, duration: number = 2000) => {
    const [count, setCount] = useState(0)

    useEffect(() => {
      if (inView) {
        let start = 0
        const increment = target / (duration / 16)
        const timer = setInterval(() => {
          start += increment
          if (start >= target) {
            setCount(target)
            clearInterval(timer)
          } else {
            setCount(Math.floor(start))
          }
        }, 16)

        return () => clearInterval(timer)
      }
    }, [inView, target, duration])

    return count
  }

  const projectsCount = useCounter(50)
  const clientsCount = useCounter(15)
  const hoursCount = useCounter(2000)
  const commitsCount = useCounter(1200)

  const achievements = [
    {
      icon: Code,
      value: projectsCount,
      suffix: '+',
      label: 'Projects Completed',
      description: 'Full-stack applications built from scratch',
      color: 'text-blue-600',
      bgColor: 'bg-blue-100 dark:bg-blue-900/30'
    },
    {
      icon: Users,
      value: clientsCount,
      suffix: '+',
      label: 'Happy Clients',
      description: 'Satisfied customers worldwide',
      color: 'text-green-600',
      bgColor: 'bg-green-100 dark:bg-green-900/30'
    },
    {
      icon: Clock,
      value: hoursCount,
      suffix: '+',
      label: 'Hours Coded',
      description: 'Dedicated development time',
      color: 'text-purple-600',
      bgColor: 'bg-purple-100 dark:bg-purple-900/30'
    },
    {
      icon: GitBranch,
      value: commitsCount,
      suffix: '+',
      label: 'Git Commits',
      description: 'Code contributions and improvements',
      color: 'text-orange-600',
      bgColor: 'bg-orange-100 dark:bg-orange-900/30'
    }
  ]

  const highlights = [
    {
      icon: Award,
      title: 'Performance Excellence',
      description: 'Delivered 95% of projects ahead of schedule with zero critical bugs'
    },
    {
      icon: Star,
      title: 'Code Quality',
      description: 'Maintained 90%+ test coverage across all major projects'
    },
    {
      icon: Users,
      title: 'Team Leadership',
      description: 'Led cross-functional teams of 5+ developers on critical projects'
    }
  ]

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-white dark:from-gray-800 dark:to-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            Achievements & Impact
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Numbers that showcase my commitment to excellence and continuous growth
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto mt-6"></div>
        </motion.div>

        {/* Metrics Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {achievements.map((achievement, index) => {
            const Icon = achievement.icon
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.2 + index * 0.1, duration: 0.8 }}
                className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-700 group hover:scale-105"
              >
                <div className={`inline-flex items-center justify-center w-16 h-16 rounded-xl ${achievement.bgColor} mb-6 group-hover:scale-110 transition-transform`}>
                  <Icon className={`w-8 h-8 ${achievement.color}`} />
                </div>
                
                <div className="text-center">
                  <div className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-2">
                    {achievement.value}{achievement.suffix}
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                    {achievement.label}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">
                    {achievement.description}
                  </p>
                </div>
              </motion.div>
            )
          })}
        </div>

        {/* Key Highlights */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="grid md:grid-cols-3 gap-8"
        >
          {highlights.map((highlight, index) => {
            const Icon = highlight.icon
            return (
              <div
                key={index}
                className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-100 dark:border-gray-700 hover:shadow-xl transition-all duration-300"
              >
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                      {highlight.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400">
                      {highlight.description}
                    </p>
                  </div>
                </div>
              </div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}

export default Achievements
