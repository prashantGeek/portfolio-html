/*
 * GitHub Contributions Component
 * 
 * This component displays a GitHub-style contribution graph with super techy styling.
 * Currently uses simulated data, but can be connected to real GitHub API.
 * 
 * To connect to real GitHub API:
 * 1. Get a GitHub Personal Access Token
 * 2. Replace generateContributionData() with GitHub GraphQL API call
 * 3. Use this query:
 * 
 * query($username: String!) {
 *   user(login: $username) {
 *     contributionsCollection {
 *       contributionCalendar {
 *         weeks {
 *           contributionDays {
 *             contributionCount
 *             date
 *           }
 *         }
 *       }
 *     }
 *   }
 * }
 */

'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Github, Activity, Calendar, Code2, GitBranch, Star, ExternalLink, Users, BookOpen } from 'lucide-react'
import { useEffect, useState } from 'react'
import { fetchGitHubContributions, getContributionLevel, calculateStreaks } from '@/services/github'

const GitHubContributions = () => {
  const [ref, inView] = useInView({
    threshold: 0.2,
    triggerOnce: true
  })

  const [stats, setStats] = useState({
    totalContributions: 0,
    longestStreak: 0,
    currentStreak: 0,
    totalCommits: 0,
    publicRepos: 0,
    totalStars: 0,
    followers: 0,
    languages: [] as string[]
  })

  const [githubData, setGithubData] = useState<any>(null)
  const [contributionData, setContributionData] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Helper function to safely format dates
  const formatDate = (dateString: string): string => {
    try {
      return new Date(dateString).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric'
      })
    } catch (error) {
      return dateString
    }
  }

  // Fetch real GitHub data
  useEffect(() => {
    const loadGitHubData = async () => {
      try {
        setLoading(true)
        const data = await fetchGitHubContributions('prashantGeek')
        
        setGithubData(data)
        setContributionData(data.contributionData)
        
        const streaks = calculateStreaks(data.contributionData)
        
        setStats({
          totalContributions: data.stats.totalContributions,
          longestStreak: streaks.longest,
          currentStreak: streaks.current,
          totalCommits: data.stats.totalContributions, // Use actual contribution count
          publicRepos: data.stats.publicRepos,
          totalStars: data.stats.totalStars,
          followers: data.user.followers,
          languages: (data.stats.languages as string[]) || []
        })
        
        setError(null)
      } catch (err) {
        console.error('Failed to fetch GitHub data:', err)
        setError('Failed to load GitHub data')
        // Fallback to mock data
        const fallbackData = generateFallbackData()
        setContributionData(fallbackData.contributionData)
        setStats(fallbackData.stats)
      } finally {
        setLoading(false)
      }
    }

    loadGitHubData()
  }, [])

  // Fallback data in case API fails
  const generateFallbackData = () => {
    const weeks = 52
    const data = []
    let totalContributions = 0
    
    for (let week = 0; week < weeks; week++) {
      const weekData = []
      for (let day = 0; day < 7; day++) {
        const contributions = Math.floor(Math.random() * 8)
        totalContributions += contributions
        const date = new Date()
        date.setDate(date.getDate() - (weeks - week) * 7 + day - 365)
        
        weekData.push({
          date: date.toISOString().split('T')[0], // Store as string
          count: contributions,
          level: contributions === 0 ? 0 : 
                 contributions <= 2 ? 1 :
                 contributions <= 4 ? 2 :
                 contributions <= 6 ? 3 : 4
        })
      }
      data.push(weekData)
    }
    
    return {
      contributionData: data,
      stats: {
        totalContributions,
        longestStreak: 47,
        currentStreak: 12,
        totalCommits: totalContributions * 1.4,
        publicRepos: 25,
        totalStars: 150,
        followers: 100,
        languages: ['TypeScript', 'JavaScript', 'Python', 'React']
      }
    }
  }

  const getContributionColor = (level: number) => {
    const colors = {
      0: 'bg-gray-800 dark:bg-gray-900 border border-gray-700',
      1: 'bg-green-900/50 dark:bg-green-900/70 border border-green-700 shadow-sm shadow-green-500/20',
      2: 'bg-green-700/70 dark:bg-green-700 border border-green-500 shadow-md shadow-green-500/30',
      3: 'bg-green-500 dark:bg-green-500 border border-green-400 shadow-lg shadow-green-500/40 neon-glow',
      4: 'bg-green-400 dark:bg-green-300 border border-green-300 shadow-xl shadow-green-400/50 neon-glow'
    }
    return colors[level as keyof typeof colors]
  }

  const quickStats = [
    {
      icon: Activity,
      label: 'Total Contributions',
      value: loading ? '...' : stats.totalContributions.toLocaleString(),
      color: 'from-green-500 to-emerald-500',
      bgColor: 'bg-green-50 dark:bg-green-900/20',
      subtitle: '(Last 6 months)'
    },
    {
      icon: GitBranch,
      label: 'Public Repositories',
      value: loading ? '...' : stats.publicRepos.toString(),
      color: 'from-blue-500 to-cyan-500',
      bgColor: 'bg-blue-50 dark:bg-blue-900/20'
    },
    {
      icon: Star,
      label: 'Total Stars',
      value: loading ? '...' : stats.totalStars.toString(),
      color: 'from-yellow-500 to-orange-500',
      bgColor: 'bg-yellow-50 dark:bg-yellow-900/20'
    },
    {
      icon: Users,
      label: 'Followers',
      value: loading ? '...' : stats.followers.toString(),
      color: 'from-purple-500 to-violet-500',
      bgColor: 'bg-purple-50 dark:bg-purple-900/20'
    }
  ]

  return (
    <section id="github" className="py-20 bg-gray-900 dark:bg-black relative overflow-hidden">
      {/* Animated tech background */}
      <div className="absolute inset-0 tech-grid opacity-20"></div>
      <div className="absolute inset-0 circuit-pattern"></div>
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-green-500 via-blue-500 to-purple-500 tech-loading"></div>
      
      {/* Matrix rain effect */}
      <div className="absolute inset-0 matrix-bg opacity-30"></div>
      
      {/* Floating code elements */}
      <div className="absolute top-10 left-10 text-green-400 font-mono text-sm opacity-30 animate-float">
        {'{ "commits": "loading..." }'}
      </div>
      <div className="absolute top-20 right-20 text-blue-400 font-mono text-sm opacity-30 animate-float" style={{ animationDelay: '1s' }}>
        git push origin main
      </div>
      <div className="absolute bottom-20 left-20 text-purple-400 font-mono text-sm opacity-30 animate-float" style={{ animationDelay: '2s' }}>
        npm run build
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center mb-6">
            <motion.div
              animate={{ 
                rotate: 360,
                boxShadow: [
                  '0 0 20px rgba(34, 197, 94, 0.5)',
                  '0 0 40px rgba(59, 130, 246, 0.5)',
                  '0 0 20px rgba(34, 197, 94, 0.5)'
                ]
              }}
              transition={{ 
                rotate: { duration: 20, repeat: Infinity, ease: "linear" },
                boxShadow: { duration: 3, repeat: Infinity, ease: "easeInOut" }
              }}
              className="w-16 h-16 bg-gradient-to-r from-green-600 to-blue-600 rounded-2xl flex items-center justify-center mr-4 neon-glow"
            >
              <Github className="w-8 h-8 text-white" />
            </motion.div>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 terminal-cursor">
              GitHub Activity Matrix
            </h2>
          </div>
          <div className="w-24 h-1 bg-gradient-to-r from-green-400 via-blue-400 to-purple-400 mx-auto mb-6 neon-glow"></div>
          <p className="text-xl text-green-300 max-w-3xl mx-auto font-mono">
            {loading ? (
              <>
                &gt; Connecting to GitHub API...<br />
                &gt; <span className="animate-pulse">Loading real contribution data...</span><br />
                &gt; <span className="text-blue-300 typewriter">Please wait...</span>
              </>
            ) : error ? (
              <>
                &gt; <span className="text-red-400">Connection failed - using cached data</span><br />
                &gt; <span className="text-yellow-300">Some features may be limited</span><br />
                &gt; <span className="text-blue-300">Displaying available information...</span>
              </>
            ) : (
              <>
                &gt; Successfully connected to @{githubData?.user?.login || 'prashantGeek'}<br />
                &gt; Real-time data from GitHub API v4<br />
                &gt; <span className="text-blue-300 typewriter">Contribution matrix loaded</span>
              </>
            )}
          </p>
        </motion.div>

        {/* Quick Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-12"
        >
          {quickStats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: 0.1 * index, duration: 0.5 }}
              whileHover={{ scale: 1.05, y: -5 }}
              className={`${stat.bgColor} rounded-2xl p-6 border-2 border-green-400/30 card-hover quantum-glow 
                         bg-gray-900/80 backdrop-blur-sm`}
            >
              <div className={`w-12 h-12 bg-gradient-to-r ${stat.color} rounded-xl flex items-center justify-center mb-4 neon-glow`}>
                <stat.icon className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-green-400 mb-2 font-mono">
                {stat.value}
              </h3>
              <p className="text-gray-300 text-sm font-medium font-mono">
                [{stat.label.toUpperCase()}]
                {(stat as any).subtitle && (
                  <span className="block text-xs text-gray-500 mt-1">{(stat as any).subtitle}</span>
                )}
              </p>
            </motion.div>
          ))}
        </motion.div>

        {/* Contribution Graph */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="bg-gray-900/90 backdrop-blur-sm rounded-3xl p-8 shadow-2xl border-2 border-green-400/30 
                     scan-lines github-card relative overflow-hidden"
        >
          <div className="flex items-center justify-between mb-8">
            <div>
              <h3 className="text-2xl font-bold text-green-400 mb-2 font-mono">
                &gt; CONTRIBUTION_MATRIX.exe
              </h3>
              <p className="text-gray-300 font-mono">
                {loading ? 'Loading data...' : error ? 'Limited data available' : 
                `Scanning ${stats.totalContributions} contributions across ${stats.publicRepos} repositories (Last 6 months)...`}
              </p>
              <p className="text-xs text-gray-500 mt-1 font-mono">
                * Showing recent 6-month activity pattern (most relevant)
              </p>
            </div>
            <div className="flex items-center space-x-2 text-sm text-gray-300 font-mono">
              <span>[INTENSITY_SCALE]</span>
              <div className="flex space-x-1">
                {[0, 1, 2, 3, 4].map(level => (
                  <div
                    key={level}
                    className={`w-3 h-3 rounded-sm ${getContributionColor(level)} contribution-square`}
                  />
                ))}
              </div>
              <span>[MAX_POWER]</span>
            </div>
          </div>

          {/* Contribution Grid */}
          <div className="overflow-x-auto">
            <div className="min-w-full">
              {/* Month labels - Last 6 months with better alignment */}
              <div className="flex mb-2">
                <div className="w-8"></div>
                <div className="flex-1 flex">
                  {(() => {
                    const monthLabels = [];
                    const weekCount = contributionData.length;
                    const monthPositions = new Map();
                    
                    // Calculate month positions based on actual data
                    contributionData.forEach((week: any[], weekIndex: number) => {
                      if (week.length > 0) {
                        const firstDay = week[0];
                        const month = firstDay.month;
                        if (!monthPositions.has(month)) {
                          monthPositions.set(month, weekIndex);
                        }
                      }
                    });

                    // Create month labels at correct positions
                    for (let i = 0; i < weekCount; i++) {
                      const isMonthStart = Array.from(monthPositions.values()).includes(i);
                      const monthName = isMonthStart ? 
                        Array.from(monthPositions.keys())[Array.from(monthPositions.values()).indexOf(i)] : '';
                      
                      monthLabels.push(
                        <div key={i} className="text-xs text-gray-500 dark:text-gray-400 text-center" style={{width: '16px'}}>
                          {monthName}
                        </div>
                      );
                    }
                    
                    return monthLabels;
                  })()}
                </div>
              </div>

              {/* Day labels and contribution squares */}
              <div className="flex">
                {/* Day labels */}
                <div className="flex flex-col justify-between text-xs text-gray-500 dark:text-gray-400 mr-2 h-24">
                  <span></span>
                  <span>Mon</span>
                  <span></span>
                  <span>Wed</span>
                  <span></span>
                  <span>Fri</span>
                  <span></span>
                </div>

                {/* Contribution squares */}
                <div className="flex space-x-1">
                  {contributionData.map((week: any[], weekIndex: number) => (
                    <div key={weekIndex} className="flex flex-col space-y-1">
                      {week.map((day: any, dayIndex: number) => (
                        <motion.div
                          key={`${weekIndex}-${dayIndex}`}
                          initial={{ scale: 0, opacity: 0 }}
                          animate={inView ? { scale: 1, opacity: 1 } : {}}
                          transition={{ 
                            delay: (weekIndex * 0.01) + (dayIndex * 0.002),
                            duration: 0.2 
                          }}
                          whileHover={{ 
                            scale: 1.8, 
                            zIndex: 10,
                            rotateZ: 5,
                            boxShadow: '0 0 30px rgba(34, 197, 94, 0.8)'
                          }}
                          className={`w-3 h-3 rounded-sm cursor-pointer ${getContributionColor(day.level)} 
                                     ${day.isRecent && day.count > 0 ? 'real-time-activity' : ''}
                                     transition-all duration-200 contribution-square relative overflow-hidden`}
                          title={`${day.count} commits • ${formatDate(day.date)}${day.isRecent && day.count > 0 ? ' (Recent!)' : ''}`}
                        >
                          {/* Add a small indicator for recent activity */}
                          {day.isRecent && day.count > 0 && (
                            <div className="absolute -top-1 -right-1 w-2 h-2 bg-yellow-400 rounded-full animate-pulse"></div>
                          )}
                        </motion.div>
                      ))}
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Time range indicator */}
              <div className="flex justify-between items-center mt-4 text-xs text-gray-500 font-mono">
                <span>← 6 months ago</span>
                <span className="px-2 py-1 bg-green-900/30 rounded border border-green-400/30">
                  Recent Activity Pattern
                </span>
                <span>Today →</span>
              </div>
            </div>
          </div>

          {/* GitHub Profile Link */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 0.8, duration: 0.5 }}
            className="mt-8 pt-6 border-t border-green-400/30"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-gradient-to-r from-gray-800 to-gray-600 rounded-full flex items-center justify-center neon-glow">
                  <Github className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h4 className="font-semibold text-green-400 font-mono">
                    @{githubData?.user?.login || 'prashantGeek'}
                  </h4>
                  <p className="text-gray-300 text-sm font-mono">
                    {loading ? '[LOADING...]' : 
                     error ? '[OFFLINE_MODE]' : 
                     `[${stats.publicRepos}_REPOS] [${stats.totalStars}_STARS]`}
                  </p>
                </div>
              </div>
              <motion.a
                href="https://github.com/prashantGeek"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-gradient-to-r from-green-600 to-blue-600 text-white px-6 py-3 rounded-xl font-semibold 
                         hover:from-green-500 hover:to-blue-500 transition-all duration-300 flex items-center space-x-2
                         shadow-lg hover:shadow-xl font-mono neon-glow"
              >
                <Github className="w-5 h-5" />
                <span>[VIEW_PROFILE]</span>
              </motion.a>
            </div>
          </motion.div>
        </motion.div>

        {/* Recent Repositories */}
        {githubData?.recentRepos && !loading && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.8, duration: 0.8 }}
            className="mt-12"
          >
            <h3 className="text-2xl font-bold text-green-400 mb-6 font-mono text-center">
              &gt; RECENT_REPOSITORIES.json
            </h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {githubData.recentRepos.slice(0, 6).map((repo: any, index: number) => (
                <motion.div
                  key={repo.name}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={inView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ delay: 0.9 + (index * 0.1), duration: 0.5 }}
                  whileHover={{ scale: 1.05, y: -5 }}
                  className="bg-gray-900/80 backdrop-blur-sm rounded-xl p-6 border-2 border-green-400/30 
                           hover:border-blue-400/50 transition-all duration-300 quantum-glow"
                >
                  <div className="flex items-start justify-between mb-3">
                    <h4 className="font-semibold text-white font-mono text-lg truncate">
                      {repo.name}
                    </h4>
                    <motion.a
                      href={repo.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.2, rotate: 15 }}
                      className="text-green-400 hover:text-blue-400 transition-colors"
                    >
                      <ExternalLink className="w-5 h-5" />
                    </motion.a>
                  </div>
                  
                  <p className="text-gray-300 text-sm mb-4 line-clamp-2 font-mono">
                    {repo.description || '// No description provided'}
                  </p>
                  
                  <div className="flex items-center justify-between text-xs">
                    <div className="flex items-center space-x-4">
                      {repo.language && (
                        <span className="px-2 py-1 bg-blue-600/30 text-blue-300 rounded font-mono">
                          {repo.language}
                        </span>
                      )}
                      <div className="flex items-center space-x-1 text-yellow-400">
                        <Star className="w-3 h-3" />
                        <span className="font-mono">{repo.stars}</span>
                      </div>
                      <div className="flex items-center space-x-1 text-gray-400">
                        <GitBranch className="w-3 h-3" />
                        <span className="font-mono">{repo.forks}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-3 pt-3 border-t border-gray-700">
                    <p className="text-xs text-gray-500 font-mono">
                      Updated: {formatDate(repo.updated)}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Programming Languages */}
        {stats.languages.length > 0 && !loading && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 1.0, duration: 0.8 }}
            className="mt-12 bg-gray-900/80 backdrop-blur-sm rounded-2xl p-6 border-2 border-green-400/30"
          >
            <h3 className="text-xl font-bold text-green-400 mb-4 font-mono">
              [PROGRAMMING_LANGUAGES]
            </h3>
            <div className="flex flex-wrap gap-3">
              {stats.languages.map((language: string, index: number) => (
                <motion.span
                  key={language}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={inView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ delay: 1.1 + (index * 0.1), duration: 0.3 }}
                  whileHover={{ scale: 1.1, y: -2 }}
                  className="px-3 py-2 bg-gradient-to-r from-blue-600/30 to-purple-600/30 
                           text-blue-300 rounded-lg font-mono text-sm border border-blue-500/30 
                           hover:border-purple-500/50 transition-all duration-300 neon-glow"
                >
                  {language}
                </motion.span>
              ))}
            </div>
          </motion.div>
        )}

        {/* Fun Facts with Real Data */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 1.2, duration: 0.8 }}
          className="mt-12 grid md:grid-cols-3 gap-6"
        >
          {[
            {
              icon: GitBranch,
              title: 'LONGEST_STREAK',
              value: loading ? '...' : `${stats.longestStreak}_DAYS`,
              description: 'Maximum consecutive contribution days'
            },
            {
              icon: Code2,
              title: 'PRIMARY_LANG',
              value: loading ? '...' : `${stats.languages[0] || 'TypeScript'}.exe`,
              description: 'Most frequently used language'
            },
            {
              icon: BookOpen,
              title: 'ACCOUNT_AGE',
              value: loading ? '...' : 
                     githubData?.user?.created_at ? 
                     `${Math.floor((Date.now() - new Date(githubData.user.created_at).getTime()) / (365.25 * 24 * 60 * 60 * 1000))}_YEARS` : 
                     '2+_YEARS',
              description: 'Years of development experience'
            }
          ].map((fact, index) => (
            <motion.div
              key={fact.title}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.7 + (index * 0.1), duration: 0.5 }}
              className="bg-gray-900/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border-2 border-green-400/30 
                         hover:shadow-xl transition-all duration-300 quantum-glow scan-lines"
            >
              <div className="flex items-center space-x-3 mb-3">
                <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-blue-500 rounded-lg flex items-center justify-center neon-glow">
                  <fact.icon className="w-5 h-5 text-white" />
                </div>
                <h4 className="font-semibold text-green-400 font-mono text-sm">[{fact.title}]</h4>
              </div>
              <p className="text-2xl font-bold text-blue-400 mb-1 font-mono">{fact.value}</p>
              <p className="text-gray-300 text-sm font-mono">{`// ${fact.description}`}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

export default GitHubContributions
