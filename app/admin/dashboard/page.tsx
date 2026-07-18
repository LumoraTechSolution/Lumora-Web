'use client'

import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { apiClient, authAPI } from '@/lib/api'
import { LogOut, FileText, Briefcase, Users, Mail, Settings } from 'lucide-react'

export default function AdminDashboard() {
  const router = useRouter()
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [loading, setLoading] = useState(true)
  const [selectedSection, setSelectedSection] = useState('overview')

  useEffect(() => {
    const verifyAuth = async () => {
      try {
        if (!apiClient.isTokenValid()) {
          router.push('/admin/login')
          return
        }
        const response = await authAPI.verify()
        if (response.data) {
          setIsAuthenticated(true)
        }
      } catch (err) {
        router.push('/admin/login')
      } finally {
        setLoading(false)
      }
    }

    verifyAuth()
  }, [router])

  const handleLogout = () => {
    apiClient.clearToken()
    router.push('/admin/login')
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity }}
          className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full"
        />
      </div>
    )
  }

  if (!isAuthenticated) {
    return null
  }

  const menuItems = [
    { id: 'overview', label: 'Overview', icon: Settings },
    { id: 'projects', label: 'Projects', icon: Briefcase },
    { id: 'blog', label: 'Blog Posts', icon: FileText },
    { id: 'jobs', label: 'Job Openings', icon: Users },
    { id: 'contact', label: 'Contact Messages', icon: Mail },
  ]

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="fixed top-0 w-full z-50 border-b border-border bg-card/80 backdrop-blur-md"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center text-background font-bold">
              L
            </div>
            <div>
              <h1 className="text-xl font-bold text-foreground">Lumora Admin</h1>
              <p className="text-xs text-foreground/60">Content Management System</p>
            </div>
          </div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleLogout}
            className="flex items-center gap-2 px-4 py-2 rounded-lg border border-primary/50 text-primary hover:bg-primary/10 transition-all"
          >
            <LogOut size={18} />
            Logout
          </motion.button>
        </div>
      </motion.header>

      <div className="flex pt-24">
        {/* Sidebar */}
        <motion.aside
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
          className="w-64 bg-card/30 border-r border-border min-h-screen p-6"
        >
          <nav className="space-y-2">
            {menuItems.map((item, i) => {
              const Icon = item.icon
              return (
                <motion.button
                  key={item.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 + i * 0.05 }}
                  whileHover={{ x: 5 }}
                  onClick={() => setSelectedSection(item.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                    selectedSection === item.id
                      ? 'bg-gradient-to-r from-primary to-accent text-background'
                      : 'text-foreground/70 hover:text-foreground hover:bg-muted'
                  }`}
                >
                  <Icon size={20} />
                  <span>{item.label}</span>
                </motion.button>
              )
            })}
          </nav>
        </motion.aside>

        {/* Main Content */}
        <motion.main
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="flex-1 p-8"
        >
          <div className="max-w-6xl">
            {selectedSection === 'overview' && (
              <div>
                <h2 className="text-3xl font-bold text-foreground mb-8">Dashboard Overview</h2>

                {/* Stats Cards */}
                <div className="grid md:grid-cols-4 gap-6 mb-8">
                  {[
                    { label: 'Total Projects', value: '0', icon: Briefcase },
                    { label: 'Blog Posts', value: '0', icon: FileText },
                    { label: 'Job Openings', value: '0', icon: Users },
                    { label: 'Messages', value: '0', icon: Mail },
                  ].map((stat, i) => {
                    const Icon = stat.icon
                    return (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 + i * 0.1 }}
                        className="p-6 rounded-lg border border-primary/20 bg-card/50"
                      >
                        <div className="flex items-center justify-between mb-2">
                          <p className="text-foreground/60 text-sm">{stat.label}</p>
                          <Icon className="w-5 h-5 text-primary" />
                        </div>
                        <p className="text-3xl font-bold text-foreground">{stat.value}</p>
                      </motion.div>
                    )
                  })}
                </div>

                {/* Quick Actions */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7 }}
                  className="p-8 rounded-lg border border-primary/20 bg-card/50"
                >
                  <h3 className="text-xl font-bold text-foreground mb-6">Quick Actions</h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    {[
                      { label: 'Add New Project', section: 'projects' },
                      { label: 'Create Blog Post', section: 'blog' },
                      { label: 'Post Job Opening', section: 'jobs' },
                      { label: 'View Messages', section: 'contact' },
                    ].map((action, i) => (
                      <motion.button
                        key={i}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => setSelectedSection(action.section)}
                        className="px-4 py-3 rounded-lg border border-primary/30 text-primary hover:bg-primary/10 transition-all text-left font-semibold"
                      >
                        {action.label}
                      </motion.button>
                    ))}
                  </div>
                </motion.div>
              </div>
            )}

            {selectedSection === 'projects' && (
              <div>
                <h2 className="text-3xl font-bold text-foreground mb-8">Projects Management</h2>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="p-8 rounded-lg border border-primary/20 bg-card/50 text-center"
                >
                  <p className="text-foreground/60">Project management interface coming soon.</p>
                  <p className="text-foreground/60 text-sm mt-2">Use the API endpoints at /api/projects to manage projects.</p>
                </motion.div>
              </div>
            )}

            {selectedSection === 'blog' && (
              <div>
                <h2 className="text-3xl font-bold text-foreground mb-8">Blog Management</h2>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="p-8 rounded-lg border border-primary/20 bg-card/50 text-center"
                >
                  <p className="text-foreground/60">Blog management interface coming soon.</p>
                  <p className="text-foreground/60 text-sm mt-2">Use the API endpoints at /api/blog to manage posts.</p>
                </motion.div>
              </div>
            )}

            {selectedSection === 'jobs' && (
              <div>
                <h2 className="text-3xl font-bold text-foreground mb-8">Job Openings</h2>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="p-8 rounded-lg border border-primary/20 bg-card/50 text-center"
                >
                  <p className="text-foreground/60">Job management interface coming soon.</p>
                  <p className="text-foreground/60 text-sm mt-2">Use the API endpoints at /api/jobs to manage openings.</p>
                </motion.div>
              </div>
            )}

            {selectedSection === 'contact' && (
              <div>
                <h2 className="text-3xl font-bold text-foreground mb-8">Contact Messages</h2>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="p-8 rounded-lg border border-primary/20 bg-card/50 text-center"
                >
                  <p className="text-foreground/60">Messages interface coming soon.</p>
                  <p className="text-foreground/60 text-sm mt-2">Use the API endpoints at /api/contact to manage submissions.</p>
                </motion.div>
              </div>
            )}
          </div>
        </motion.main>
      </div>
    </div>
  )
}
