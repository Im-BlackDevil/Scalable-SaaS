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
    { label: 'Total Links', value: links.length.toString(), color: 'bg-blue-100 text-blue-600' },
    { label: 'Total Clicks', value: analytics.totalClicks.toLocaleString(), color: 'bg-green-100 text-green-600' },
    { label: 'Avg. CTR', value: `${analytics.avgCTR}%`, color: 'bg-yellow-100 text-yellow-600' },
    { label: 'Team Members', value: teams.reduce((sum, team) => sum + team.members, 0).toString(), color: 'bg-purple-100 text-purple-600' }
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
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <button 
                onClick={() => window.location.href = '/'}
                className="flex items-center hover:opacity-80 transition-opacity"
              >
                <div className="h-8 w-8 bg-blue-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold">L</span>
                </div>
                <span className="ml-2 text-xl font-bold text-gray-900">LinkManager</span>
              </button>
            </div>
            <div className="flex items-center space-x-4">
              <button 
                onClick={handleCreateLink}
                className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200"
              >
                Create Link
              </button>
              <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white font-medium">
                JD
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Navigation Tabs */}
        <nav className="flex space-x-8 mb-8">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-3 py-2 text-sm font-medium rounded-md transition-colors flex items-center space-x-2 ${
                activeTab === tab.id
                  ? 'bg-blue-100 text-blue-700'
                  : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'
              }`}
            >
              <span>{tab.icon}</span>
              <span>{tab.name}</span>
            </button>
          ))}
        </nav>

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
                <div key={stat.label} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                  <div className="flex items-center">
                    <div className={`p-2 rounded-lg ${stat.color}`}>
                      <span className="text-2xl font-bold">{index + 1}</span>
                    </div>
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-600">{stat.label}</p>
                      <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Recent Links */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-gray-900">Recent Links</h3>
                <button 
                  onClick={() => setActiveTab('links')}
                  className="text-blue-600 hover:text-blue-500 text-sm font-medium"
                >
                  View all
                </button>
              </div>
              <div className="space-y-4">
                {links.slice(0, 3).map((link) => (
                  <div key={link.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3">
                        <div className="text-sm font-medium text-gray-900">{link.shortCode}</div>
                        <button
                          onClick={() => handleCopyLink(link.shortCode)}
                          className="text-blue-600 hover:text-blue-500 text-xs"
                        >
                          Copy
                        </button>
                      </div>
                      <div className="text-sm text-gray-500 truncate max-w-xs">{link.originalUrl}</div>
                    </div>
                    <div className="text-sm text-gray-900">{link.clicks.toLocaleString()} clicks</div>
                  </div>
                ))}
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
              <h2 className="text-2xl font-bold text-gray-900">Your Links</h2>
              <button 
                onClick={handleCreateLink}
                className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200"
              >
                Create New Link
              </button>
            </div>
            
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Short Link</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Original URL</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Clicks</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Created</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {links.map((link) => (
                      <tr key={link.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center space-x-2">
                            <span className="text-sm font-medium text-gray-900">{link.shortCode}</span>
                            <button
                              onClick={() => handleCopyLink(link.shortCode)}
                              className="text-blue-600 hover:text-blue-500 text-xs"
                            >
                              Copy
                            </button>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-sm text-gray-900 truncate max-w-xs">{link.originalUrl}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="text-sm text-gray-900">{link.clicks.toLocaleString()}</span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="text-sm text-gray-500">{link.createdAt}</span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <button
                            onClick={() => handleDeleteLink(link.id)}
                            className="text-red-600 hover:text-red-500 text-sm"
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
            <h2 className="text-2xl font-bold text-gray-900">Analytics Overview</h2>
            
            {/* Analytics Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Top Countries</h3>
                <div className="space-y-3">
                  {analytics.topCountries.map((country, index) => (
                    <div key={country.country} className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">{country.country}</span>
                      <span className="text-sm font-medium text-gray-900">{country.clicks.toLocaleString()} ({country.percentage}%)</span>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Device Breakdown</h3>
                <div className="space-y-3">
                  {analytics.topDevices.map((device, index) => (
                    <div key={device.device} className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">{device.device}</span>
                      <span className="text-sm font-medium text-gray-900">{device.clicks.toLocaleString()} ({device.percentage}%)</span>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Performance Metrics</h3>
                <div className="space-y-4">
                  <div>
                    <div className="text-sm text-gray-600">Total Clicks</div>
                    <div className="text-2xl font-bold text-gray-900">{analytics.totalClicks.toLocaleString()}</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-600">Unique Clicks</div>
                    <div className="text-2xl font-bold text-gray-900">{analytics.uniqueClicks.toLocaleString()}</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-600">Average CTR</div>
                    <div className="text-2xl font-bold text-gray-900">{analytics.avgCTR}%</div>
                  </div>
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
              <h2 className="text-2xl font-bold text-gray-900">Teams</h2>
              <button 
                onClick={() => toast.success('Create team feature coming soon!')}
                className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200"
              >
                Create Team
              </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {teams.map((team) => (
                <div key={team.id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-lg font-semibold text-gray-900">{team.name}</h3>
                    <span className="px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full">
                      {team.role}
                    </span>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Members:</span>
                      <span className="font-medium text-gray-900">{team.members}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Links:</span>
                      <span className="font-medium text-gray-900">{team.links}</span>
                    </div>
                  </div>
                  <div className="mt-4 flex space-x-2">
                    <button className="text-blue-600 hover:text-blue-500 text-sm">Manage</button>
                    <button className="text-gray-600 hover:text-gray-500 text-sm">View</button>
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
            <h2 className="text-2xl font-bold text-gray-900">Settings</h2>
            
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Account Settings</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                      <input 
                        type="email" 
                        defaultValue="user@example.com"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Display Name</label>
                      <input 
                        type="text" 
                        defaultValue="John Doe"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <button className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200">
                      Save Changes
                    </button>
                  </div>
                </div>
                
                <div className="border-t border-gray-200 pt-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Preferences</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-700">Email Notifications</span>
                      <button className="w-12 h-6 bg-blue-600 rounded-full relative">
                        <div className="w-4 h-4 bg-white rounded-full absolute right-1 top-1"></div>
                      </button>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-700">Analytics Tracking</span>
                      <button className="w-12 h-6 bg-blue-600 rounded-full relative">
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