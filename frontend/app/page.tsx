'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'

export default function HomePage() {
  const [email, setEmail] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const features = [
    {
      title: 'Smart Link Management',
      description: 'Create, customize, and track your links with advanced UTM parameters and analytics.',
      icon: '🔗',
      progress: 95
    },
    {
      title: 'Advanced Analytics',
      description: 'Real-time insights into clicks, devices, locations, and user behavior patterns.',
      icon: '📊',
      progress: 88
    },
    {
      title: 'Team Collaboration',
      description: 'Work together with your team, share links, and manage permissions seamlessly.',
      icon: '👥',
      progress: 92
    },
    {
      title: 'Global Reach',
      description: 'Track performance across countries, devices, and browsers worldwide.',
      icon: '🌍',
      progress: 85
    }
  ]

  const stats = [
    { label: 'Links Created', value: '10M+', color: 'text-cyan-400', progress: 95 },
    { label: 'Clicks Tracked', value: '100M+', color: 'text-green-400', progress: 88 },
    { label: 'Active Users', value: '50K+', color: 'text-purple-400', progress: 92 },
    { label: 'Countries', value: '150+', color: 'text-orange-400', progress: 85 }
  ]

  const handleGetStarted = () => {
    router.push('/dashboard')
  }

  const handleStartTrial = () => {
    if (!email) {
      toast.error('Please enter your email address')
      return
    }
    setIsLoading(true)
    // Simulate API call
    setTimeout(() => {
      toast.success('Welcome! Redirecting to dashboard...')
      setIsLoading(false)
      router.push('/dashboard')
    }, 1500)
  }

  const handleViewDemo = () => {
    router.push('/dashboard')
  }

          const handleNavClick = (section: string) => {
          if (section === 'Features') {
            document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' })
          } else if (section === 'Pricing') {
            document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' })
          } else if (section === 'About') {
            document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })
          } else if (section === 'Technical') {
            document.getElementById('technical')?.scrollIntoView({ behavior: 'smooth' })
          } else {
            toast(`${section} section coming soon!`)
          }
        }

  const handlePricingPlan = (plan: string) => {
    if (plan === 'Free') {
      toast.success('Free plan activated! Welcome to LinkManager!')
      setTimeout(() => {
        router.push('/dashboard')
      }, 1500)
    } else if (plan === 'Pro') {
      toast.success('Pro trial started! Redirecting to dashboard...')
      setTimeout(() => {
        router.push('/dashboard')
      }, 1500)
    } else if (plan === 'Enterprise') {
      toast.success('Enterprise plan selected! Our sales team will contact you soon.')
    }
  }

  return (
    <div className="min-h-screen gradient-bg">
      {/* Navigation */}
      <nav className="glass-effect-glow sticky top-0 z-50 border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <button 
                onClick={() => router.push('/')}
                className="flex items-center hover:opacity-80 transition-opacity"
              >
                <div className="h-8 w-8 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-lg flex items-center justify-center float-animation">
                  <span className="text-white font-bold">L</span>
                </div>
                <span className="ml-2 text-xl font-bold text-white text-glow">LinkManager</span>
              </button>
            </div>
            <div className="flex items-center space-x-6">
              <button 
                onClick={() => handleNavClick('Features')}
                className="nav-item font-medium"
              >
                Features
              </button>
              <button 
                onClick={() => handleNavClick('Pricing')}
                className="nav-item font-medium"
              >
                Pricing
              </button>
                                  <button
                      onClick={() => handleNavClick('About')}
                      className="nav-item font-medium"
                    >
                      About
                    </button>
                    <button
                      onClick={() => handleNavClick('Technical')}
                      className="nav-item font-medium"
                    >
                      Technical
                    </button>
              <button 
                onClick={handleGetStarted}
                className="btn-stunning"
              >
                <span>Get Started</span>
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-5xl md:text-6xl font-bold text-white mb-6"
            >
              Professional
              <span className="text-gradient"> Link Management</span>
              <br />
              & Analytics Platform
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto"
            >
              Transform your links into powerful marketing tools. Track, analyze, and optimize your campaigns with our comprehensive SaaS platform.
            </motion.p>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            >
              <div className="flex w-full max-w-md">
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleStartTrial()}
                  className="input-stunning flex-1 rounded-r-none"
                />
                <button 
                  onClick={handleStartTrial}
                  disabled={isLoading}
                  className="btn-stunning rounded-l-none"
                >
                  {isLoading ? (
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  ) : (
                    'Start Free Trial'
                  )}
                </button>
              </div>
              <button 
                onClick={handleViewDemo}
                className="btn-secondary"
              >
                View Demo
              </button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-4xl font-bold text-white mb-4"
            >
              Everything you need to succeed
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-xl text-gray-300 max-w-3xl mx-auto"
            >
              From simple link shortening to advanced analytics, we've got you covered.
            </motion.p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                className="card-depth hover-lift"
              >
                <div className="text-4xl mb-4 icon-glow">{feature.icon}</div>
                <h3 className="text-xl font-semibold text-white mb-2">{feature.title}</h3>
                <p className="text-gray-300 mb-4">{feature.description}</p>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Proficiency</span>
                    <span className="text-cyan-400 font-medium">{feature.progress}%</span>
                  </div>
                  <div className="progress-bar">
                    <div 
                      className="progress-fill" 
                      style={{ width: `${feature.progress}%` }}
                    ></div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                className="text-center card-glow"
              >
                <div className={`text-3xl md:text-4xl font-bold mb-2 ${stat.color}`}>{stat.value}</div>
                <div className="text-gray-300 mb-3">{stat.label}</div>
                <div className="progress-bar">
                  <div 
                    className="progress-fill" 
                    style={{ width: `${stat.progress}%` }}
                  ></div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-4xl font-bold text-white mb-4"
            >
              Simple, transparent pricing
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-xl text-gray-300"
            >
              Choose the plan that fits your needs. All plans include our core features.
            </motion.p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Free Plan */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="card-depth hover-lift"
            >
              <h3 className="text-2xl font-bold text-white mb-2">Free</h3>
              <div className="text-4xl font-bold text-white mb-4">$0<span className="text-lg text-gray-400">/month</span></div>
              <p className="text-gray-300 mb-6">Perfect for getting started</p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center">
                  <span className="text-green-400 mr-2">✓</span>
                  <span className="text-gray-300">Up to 100 links</span>
                </li>
                <li className="flex items-center">
                  <span className="text-green-400 mr-2">✓</span>
                  <span className="text-gray-300">Basic analytics</span>
                </li>
                <li className="flex items-center">
                  <span className="text-green-400 mr-2">✓</span>
                  <span className="text-gray-300">UTM parameters</span>
                </li>
                <li className="flex items-center">
                  <span className="text-green-400 mr-2">✓</span>
                  <span className="text-gray-300">Email support</span>
                </li>
              </ul>
              <button 
                onClick={() => handlePricingPlan('Free')}
                className="btn-secondary w-full"
              >
                Get Started Free
              </button>
            </motion.div>

            {/* Pro Plan */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="card-depth hover-lift relative"
            >
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                <span className="bg-gradient-to-r from-cyan-500 to-blue-500 text-white px-4 py-1 rounded-full text-sm font-medium">Most Popular</span>
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">Pro</h3>
              <div className="text-4xl font-bold text-white mb-4">$29<span className="text-lg text-gray-400">/month</span></div>
              <p className="text-gray-300 mb-6">For growing businesses</p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center">
                  <span className="text-green-400 mr-2">✓</span>
                  <span className="text-gray-300">Unlimited links</span>
                </li>
                <li className="flex items-center">
                  <span className="text-green-400 mr-2">✓</span>
                  <span className="text-gray-300">Advanced analytics</span>
                </li>
                <li className="flex items-center">
                  <span className="text-green-400 mr-2">✓</span>
                  <span className="text-gray-300">Team collaboration</span>
                </li>
                <li className="flex items-center">
                  <span className="text-green-400 mr-2">✓</span>
                  <span className="text-gray-300">Priority support</span>
                </li>
                <li className="flex items-center">
                  <span className="text-green-400 mr-2">✓</span>
                  <span className="text-gray-300">Custom domains</span>
                </li>
              </ul>
              <button 
                onClick={() => handlePricingPlan('Pro')}
                className="btn-stunning w-full"
              >
                <span>Start Pro Trial</span>
              </button>
            </motion.div>

            {/* Enterprise Plan */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="card-depth hover-lift"
            >
              <h3 className="text-2xl font-bold text-white mb-2">Enterprise</h3>
              <div className="text-4xl font-bold text-white mb-4">$99<span className="text-lg text-gray-400">/month</span></div>
              <p className="text-gray-300 mb-6">For large organizations</p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center">
                  <span className="text-green-400 mr-2">✓</span>
                  <span className="text-gray-300">Everything in Pro</span>
                </li>
                <li className="flex items-center">
                  <span className="text-green-400 mr-2">✓</span>
                  <span className="text-gray-300">API access</span>
                </li>
                <li className="flex items-center">
                  <span className="text-green-400 mr-2">✓</span>
                  <span className="text-gray-300">White-label options</span>
                </li>
                <li className="flex items-center">
                  <span className="text-green-400 mr-2">✓</span>
                  <span className="text-gray-300">Dedicated support</span>
                </li>
                <li className="flex items-center">
                  <span className="text-green-400 mr-2">✓</span>
                  <span className="text-gray-300">Custom integrations</span>
                </li>
              </ul>
              <button 
                onClick={() => handlePricingPlan('Enterprise')}
                className="btn-secondary w-full"
              >
                Contact Sales
              </button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-4xl font-bold text-white mb-4"
            >
              About LinkManager
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-xl text-gray-300 max-w-3xl mx-auto"
            >
              Professional SaaS platform for link management and analytics. Built with modern technologies and designed for scalability.
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="card-depth text-center hover-lift"
            >
              <div className="text-4xl mb-4 icon-glow">🚀</div>
              <h3 className="text-xl font-semibold text-white mb-2">Modern Technology</h3>
              <p className="text-gray-300">Built with Next.js, TypeScript, and TailwindCSS for optimal performance and developer experience.</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="card-depth text-center hover-lift"
            >
              <div className="text-4xl mb-4 icon-glow">🔒</div>
              <h3 className="text-xl font-semibold text-white mb-2">Secure & Reliable</h3>
              <p className="text-gray-300">Enterprise-grade security with JWT authentication, rate limiting, and data encryption.</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="card-depth text-center hover-lift"
            >
              <div className="text-4xl mb-4 icon-glow">📈</div>
              <h3 className="text-xl font-semibold text-white mb-2">Scalable Architecture</h3>
              <p className="text-gray-300">Designed to handle millions of links and clicks with Redis caching and PostgreSQL database.</p>
            </motion.div>
          </div>
        </div>
      </section>

                      {/* Technical Excellence Section */}
                <section id="technical" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-4xl font-bold text-white mb-4"
            >
              Technical Excellence
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-xl text-gray-300 max-w-3xl mx-auto"
            >
              Built with enterprise-grade strategies for scalability, performance, and reliability.
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="card-depth hover-lift"
            >
              <div className="text-3xl mb-4 icon-glow">🏗️</div>
              <h3 className="text-lg font-semibold text-white mb-2">Modular Architecture</h3>
              <p className="text-gray-300 text-sm">Microservices-ready design with clean separation of concerns and independent scaling capabilities.</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="card-depth hover-lift"
            >
              <div className="text-3xl mb-4 icon-glow">⚡</div>
              <h3 className="text-lg font-semibold text-white mb-2">Performance Optimization</h3>
              <p className="text-gray-300 text-sm">Redis caching, CDN integration, and load balancing for lightning-fast response times.</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="card-depth hover-lift"
            >
              <div className="text-3xl mb-4 icon-glow">☁️</div>
              <h3 className="text-lg font-semibold text-white mb-2">Cloud Infrastructure</h3>
              <p className="text-gray-300 text-sm">Elastic scaling with automatic resource management and high availability across regions.</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="card-depth hover-lift"
            >
              <div className="text-3xl mb-4 icon-glow">🗄️</div>
              <h3 className="text-lg font-semibold text-white mb-2">Data Management</h3>
              <p className="text-gray-300 text-sm">Distributed PostgreSQL with sharding and optimized queries for millions of records.</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="card-depth hover-lift"
            >
              <div className="text-3xl mb-4 icon-glow">🔄</div>
              <h3 className="text-lg font-semibold text-white mb-2">CI/CD Pipeline</h3>
              <p className="text-gray-300 text-sm">Automated testing, deployment, and continuous integration for rapid, reliable updates.</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="card-depth hover-lift"
            >
              <div className="text-3xl mb-4 icon-glow">📊</div>
              <h3 className="text-lg font-semibold text-white mb-2">Monitoring & Analytics</h3>
              <p className="text-gray-300 text-sm">Real-time system monitoring with comprehensive analytics and proactive alerting.</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="card-depth hover-lift"
            >
              <div className="text-3xl mb-4 icon-glow">🛡️</div>
              <h3 className="text-lg font-semibold text-white mb-2">Security & Compliance</h3>
              <p className="text-gray-300 text-sm">GDPR compliance, SOC 2 readiness, and enterprise-grade security measures.</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.7 }}
              className="card-depth hover-lift"
            >
              <div className="text-3xl mb-4 icon-glow">🎯</div>
              <h3 className="text-lg font-semibold text-white mb-2">User Experience</h3>
              <p className="text-gray-300 text-sm">Intuitive design with responsive interfaces and seamless user interactions.</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to get started?
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            Join thousands of marketers and businesses using our platform.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              onClick={handleStartTrial}
              className="btn-stunning flex items-center justify-center"
            >
              <span>Start Free Trial</span>
              <span className="ml-2">→</span>
            </button>
            <button 
              onClick={handleViewDemo}
              className="btn-secondary"
            >
              View Demo
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-800 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center mb-4">
                <div className="h-8 w-8 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold">L</span>
                </div>
                <span className="ml-2 text-xl font-bold text-white">LinkManager</span>
              </div>
              <p className="text-gray-400">
                Professional link management and analytics platform for modern businesses.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-4 text-white">Product</h3>
              <ul className="space-y-2 text-gray-400">
                <li><button onClick={() => handleNavClick('Features')} className="hover:text-cyan-400 transition-colors">Features</button></li>
                <li><button onClick={() => handleNavClick('Pricing')} className="hover:text-cyan-400 transition-colors">Pricing</button></li>
                <li><button onClick={() => handleNavClick('API')} className="hover:text-cyan-400 transition-colors">API</button></li>
                <li><button onClick={() => handleNavClick('Documentation')} className="hover:text-cyan-400 transition-colors">Documentation</button></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4 text-white">Company</h3>
              <ul className="space-y-2 text-gray-400">
                                          <li><button onClick={() => handleNavClick('About')} className="hover:text-cyan-400 transition-colors">About</button></li>
                          <li><button onClick={() => handleNavClick('Technical')} className="hover:text-cyan-400 transition-colors">Technical</button></li>
                          <li><button onClick={() => handleNavClick('Blog')} className="hover:text-cyan-400 transition-colors">Blog</button></li>
                          <li><button onClick={() => handleNavClick('Careers')} className="hover:text-cyan-400 transition-colors">Careers</button></li>
                          <li><button onClick={() => handleNavClick('Contact')} className="hover:text-cyan-400 transition-colors">Contact</button></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4 text-white">Support</h3>
              <ul className="space-y-2 text-gray-400">
                <li><button onClick={() => handleNavClick('Help Center')} className="hover:text-cyan-400 transition-colors">Help Center</button></li>
                <li><button onClick={() => handleNavClick('Community')} className="hover:text-cyan-400 transition-colors">Community</button></li>
                <li><button onClick={() => handleNavClick('Status')} className="hover:text-cyan-400 transition-colors">Status</button></li>
                <li><button onClick={() => handleNavClick('Security')} className="hover:text-cyan-400 transition-colors">Security</button></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 LinkManager. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
} 