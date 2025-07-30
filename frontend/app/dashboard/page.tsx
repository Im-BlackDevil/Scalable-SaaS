'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import toast from 'react-hot-toast'

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState('overview')
  const [links, setLinks] = useState([
    {
      id: 1,
      shortCode: 'abc123',
      originalUrl: 'https://example.com/very-long-url-that-needs-shortening',
      clicks: 1250,
      createdAt: '2024-01-15',
      status: 'active'
    },
    {
      id: 2,
      shortCode: 'def456',
      originalUrl: 'https://another-example.com/another-long-url',
      clicks: 890,
      createdAt: '2024-01-10',
      status: 'active'
    },
    {
      id: 3,
      shortCode: 'ghi789',
      originalUrl: 'https://marketing-campaign.com/special-offer',
      clicks: 2340,
      createdAt: '2024-01-05',
      status: 'active'
    }
  ])

  const [analytics] = useState({
    totalClicks: 4480,
    uniqueClicks: 3200,
    avgCTR: 12.5,
    topCountries: [
      { country: 'United States', clicks: 1200, percentage: 26.8 },
      { country: 'India', clicks: 890, percentage: 19.9 },
      { country: 'United Kingdom', clicks: 650, percentage: 14.5 },
      { country: 'Germany', clicks: 420, percentage: 9.4 }
    ],
    topDevices: [
      { device: 'Mobile', clicks: 2800, percentage: 62.5 },
      { device: 'Desktop', clicks: 1400, percentage: 31.3 },
      { device: 'Tablet', clicks: 280, percentage: 6.2 }
    ]
  })

  const [teams] = useState([
    { id: 1, name: 'Marketing Team', members: 5, links: 12, role: 'Admin' },
    { id: 2, name: 'Sales Team', members: 3, links: 8, role: 'Member' }
  ])

  const tabs = [
    { id: 'overview', name: 'Overview', icon: '📊' },
    { id: 'links', name: 'Links', icon: '🔗' },
    { id: 'analytics', name: 'Analytics', icon: '📈' },
    { id: 'teams', name: 'Teams', icon: '👥' },
    { id: 'settings', name: 'Settings', icon: '⚙️' }
  ]

  const stats = [
    { label: 'Total Links', value: links.length.toString(), color: 'bg-cyan-900/50 text-cyan-400', progress: 85 },
    { label: 'Total Clicks', value: analytics.totalClicks.toLocaleString(), color: 'bg-green-900/50 text-green-400', progress: 92 },
    { label: 'Avg. CTR', value: `${analytics.avgCTR}%`, color: 'bg-yellow-900/50 text-yellow-400', progress: 78 },
    { label: 'Team Members', value: teams.reduce((sum, team) => sum + team.members, 0).toString(), color: 'bg-purple-900/50 text-purple-400', progress: 88 }
  ]

  const handleCreateLink = () => {
    const newLink = {
      id: links.length + 1,
      shortCode: `link${Math.random().toString(36).substr(2, 6)}`,
      originalUrl: 'https://example.com/new-link',
      clicks: 0,
      createdAt: new Date().toISOString().split('T')[0],
      status: 'active'
    }
    setLinks([newLink, ...links])
    toast.success('New link created successfully!')
  }

  const handleDeleteLink = (id: number) => {
    setLinks(links.filter(link => link.id !== id))
    toast.success('Link deleted successfully!')
  }

  const handleCopyLink = (shortCode: string) => {
    navigator.clipboard.writeText(`https://linkmanager.com/${shortCode}`)
    toast.success('Link copied to clipboard!')
  }

  return (
    <div className="min-h-screen gradient-bg">
      {/* Header */}
      <header className="glass-effect-glow border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <div className="h-8 w-8 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-lg flex items-center justify-center float-animation">
                <span className="text-white font-bold">L</span>
              </div>
              <span className="ml-2 text-xl font-bold text-white text-glow">LinkManager</span>
            </div>
            <div className="flex items-center space-x-4">
              <button className="text-gray-300 hover:text-cyan-400 transition-colors">
                <span className="text-sm">John Doe</span>
              </button>
              <button className="w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center hover:bg-gray-600 transition-colors">
                <span className="text-gray-300 text-sm">JD</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Navigation Tabs */}
        <div className="flex space-x-1 bg-gray-900 rounded-lg p-1 shadow-lg border border-gray-800 mb-8">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center px-4 py-2 rounded-md text-sm font-medium transition-all duration-300 ${
                activeTab === tab.id
                  ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-lg'
                  : 'text-gray-400 hover:text-cyan-400 hover:bg-gray-800'
              }`}
            >
              <span className="mr-2">{tab.icon}</span>
              {tab.name}
            </button>
          ))}
        </div>

        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-6"
          >
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="card-depth hover-lift"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-400">{stat.label}</p>
                      <p className="text-2xl font-bold text-white">{stat.value}</p>
                    </div>
                    <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${stat.color}`}>
                      <span className="text-lg icon-glow">📊</span>
                    </div>
                  </div>
                  <div className="mt-4">
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-gray-400">Progress</span>
                      <span className="text-cyan-400">{stat.progress}%</span>
                    </div>
                    <div className="progress-bar">
                      <div 
                        className="progress-fill" 
                        style={{ width: `${stat.progress}%` }}
                      ></div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Recent Links */}
            <div className="card-depth">
              <div className="px-6 py-4 border-b border-gray-800">
                <h2 className="text-lg font-semibold text-white">Recent Links</h2>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-900">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Short Link</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Original URL</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Clicks</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Created</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-800">
                    {links.slice(0, 5).map((link) => (
                      <tr key={link.id} className="table-row-hover">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <span className="text-sm font-medium text-cyan-400">linkmanager.com/{link.shortCode}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-sm text-gray-300 truncate max-w-xs">{link.originalUrl}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="text-sm text-gray-300">{link.clicks.toLocaleString()}</span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="text-sm text-gray-400">{link.createdAt}</span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <button
                            onClick={() => handleCopyLink(link.shortCode)}
                            className="text-cyan-400 hover:text-cyan-300 mr-3 transition-colors"
                          >
                            Copy
                          </button>
                          <button
                            onClick={() => handleDeleteLink(link.id)}
                            className="text-red-400 hover:text-red-300 transition-colors"
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </motion.div>
        )}

        {/* Links Tab */}
        {activeTab === 'links' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-6"
          >
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-white">Links</h2>
              <button 
                onClick={handleCreateLink}
                className="btn-stunning"
              >
                <span>Create New Link</span>
              </button>
            </div>
            
            <div className="card-depth">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-900">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Short Link</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Original URL</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Clicks</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Created</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Status</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-800">
                    {links.map((link) => (
                      <tr key={link.id} className="table-row-hover">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <span className="text-sm font-medium text-cyan-400">linkmanager.com/{link.shortCode}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-sm text-gray-300 truncate max-w-xs">{link.originalUrl}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="text-sm text-gray-300">{link.clicks.toLocaleString()}</span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="text-sm text-gray-400">{link.createdAt}</span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="px-2 py-1 text-xs font-medium bg-green-900/50 text-green-400 rounded-full">
                            {link.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <button
                            onClick={() => handleCopyLink(link.shortCode)}
                            className="text-cyan-400 hover:text-cyan-300 mr-3 transition-colors"
                          >
                            Copy
                          </button>
                          <button
                            onClick={() => handleDeleteLink(link.id)}
                            className="text-red-400 hover:text-red-300 transition-colors"
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </motion.div>
        )}

        {/* Analytics Tab */}
        {activeTab === 'analytics' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-6"
          >
            <h2 className="text-2xl font-bold text-white">Analytics</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Top Countries */}
              <div className="card-depth">
                <h3 className="text-lg font-semibold text-white mb-4">Top Countries</h3>
                <div className="space-y-3">
                  {analytics.topCountries.map((country, index) => (
                    <div key={country.country} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-300">{country.country}</span>
                        <span className="text-sm font-medium text-cyan-400">{country.clicks}</span>
                      </div>
                      <div className="progress-bar">
                        <div 
                          className="progress-fill" 
                          style={{ width: `${country.percentage}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Top Devices */}
              <div className="card-depth">
                <h3 className="text-lg font-semibold text-white mb-4">Top Devices</h3>
                <div className="space-y-3">
                  {analytics.topDevices.map((device, index) => (
                    <div key={device.device} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-300">{device.device}</span>
                        <span className="text-sm font-medium text-green-400">{device.clicks}</span>
                      </div>
                      <div className="progress-bar">
                        <div 
                          className="progress-fill" 
                          style={{ width: `${device.percentage}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Teams Tab */}
        {activeTab === 'teams' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-6"
          >
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-white">Teams</h2>
              <button 
                onClick={() => toast.success('Create team feature coming soon!')}
                className="btn-stunning"
              >
                <span>Create Team</span>
              </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {teams.map((team) => (
                <div key={team.id} className="card-depth hover-lift">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-lg font-semibold text-white">{team.name}</h3>
                    <span className="px-2 py-1 text-xs font-medium bg-cyan-900/50 text-cyan-400 rounded-full">
                      {team.role}
                    </span>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-400">Members:</span>
                      <span className="font-medium text-gray-300">{team.members}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-400">Links:</span>
                      <span className="font-medium text-gray-300">{team.links}</span>
                    </div>
                  </div>
                  <div className="mt-4 flex space-x-2">
                    <button className="text-cyan-400 hover:text-cyan-300 text-sm transition-colors">Manage</button>
                    <button className="text-gray-400 hover:text-gray-300 text-sm transition-colors">View</button>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Settings Tab */}
        {activeTab === 'settings' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-6"
          >
            <h2 className="text-2xl font-bold text-white">Settings</h2>
            
            <div className="card-depth">
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-white mb-4">Account Settings</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Email</label>
                      <input 
                        type="email" 
                        defaultValue="user@example.com"
                        className="input-stunning w-full"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Display Name</label>
                      <input 
                        type="text" 
                        defaultValue="John Doe"
                        className="input-stunning w-full"
                      />
                    </div>
                    <button className="btn-stunning">
                      <span>Save Changes</span>
                    </button>
                  </div>
                </div>
                
                <div className="border-t border-gray-800 pt-6">
                  <h3 className="text-lg font-semibold text-white mb-4">Preferences</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-300">Email Notifications</span>
                      <button className="w-12 h-6 bg-cyan-600 rounded-full relative">
                        <div className="w-4 h-4 bg-white rounded-full absolute right-1 top-1"></div>
                      </button>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-300">Analytics Tracking</span>
                      <button className="w-12 h-6 bg-cyan-600 rounded-full relative">
                        <div className="w-4 h-4 bg-white rounded-full absolute right-1 top-1"></div>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  )
} 