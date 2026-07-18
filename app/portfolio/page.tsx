'use client'

import { motion } from 'framer-motion'
import Header from '@/components/header'
import Footer from '@/components/footer'
import { useEffect, useState } from 'react'
import { projectsAPI } from '@/lib/api'
import { ExternalLink } from 'lucide-react'

interface Project {
  id: number
  title: string
  slug: string
  description: string
  short_description?: string
  thumbnail_url?: string
  category?: string
  client_name?: string
  featured?: boolean
}

const defaultProjects = [
  {
    id: 1,
    title: 'AI-Powered Analytics Dashboard',
    slug: 'ai-analytics-dashboard',
    category: 'AI & Analytics',
    client_name: 'TechCorp Inc.',
    description: 'Built a comprehensive analytics platform using machine learning to provide real-time insights and predictive analytics.',
    short_description: 'Real-time insights with ML predictions',
    featured: true,
  },
  {
    id: 2,
    title: 'Cloud Migration Service',
    slug: 'cloud-migration',
    category: 'Cloud Infrastructure',
    client_name: 'Enterprise Co.',
    description: 'Successfully migrated 500+ applications to AWS, reducing infrastructure costs by 40% and improving performance.',
    short_description: 'Enterprise cloud transformation',
    featured: true,
  },
  {
    id: 3,
    title: 'E-Commerce Platform',
    slug: 'ecommerce-platform',
    category: 'Custom Development',
    client_name: 'RetailHub',
    description: 'Developed a high-performance e-commerce platform handling 1M+ transactions monthly with 99.9% uptime.',
    short_description: 'High-scale online marketplace',
    featured: true,
  },
  {
    id: 4,
    title: 'IoT Monitoring System',
    slug: 'iot-monitoring',
    category: 'IoT Solutions',
    client_name: 'SmartFactory',
    description: 'Created IoT monitoring system for manufacturing with real-time alerts and predictive maintenance.',
    short_description: 'Smart factory automation',
    featured: false,
  },
  {
    id: 5,
    title: 'Mobile Banking App',
    slug: 'mobile-banking',
    category: 'Mobile Development',
    client_name: 'FinanceBank',
    description: 'Engineered secure mobile banking application with advanced encryption and blockchain-based transactions.',
    short_description: 'Secure financial transactions',
    featured: false,
  },
  {
    id: 6,
    title: 'Data Pipeline Architecture',
    slug: 'data-pipeline',
    category: 'Data Engineering',
    client_name: 'DataViz Corp',
    description: 'Built scalable data pipeline processing 10TB+ daily, enabling data-driven decision making.',
    short_description: 'Massive data processing system',
    featured: false,
  },
]

const categories = ['All', 'AI & Analytics', 'Cloud Infrastructure', 'Custom Development', 'IoT Solutions', 'Mobile Development', 'Data Engineering']

export default function PortfolioPage() {
  const [projects, setProjects] = useState<Project[]>([])
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await projectsAPI.getAll()
        if (response.data && response.data.length > 0) {
          setProjects(response.data)
        } else {
          setProjects(defaultProjects)
        }
      } catch (error) {
        console.log('Using default projects')
        setProjects(defaultProjects)
      } finally {
        setLoading(false)
      }
    }

    fetchProjects()
  }, [])

  const filteredProjects = selectedCategory === 'All'
    ? (loading ? defaultProjects : projects)
    : (loading ? defaultProjects : projects).filter(p => p.category === selectedCategory)

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8 },
    },
  }

  return (
    <>
      <Header />

      <main className="min-h-screen bg-background pt-24">
        {/* Hero Section */}
        <section className="relative py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
          <motion.div
            className="absolute top-10 right-10 w-96 h-96 bg-accent/10 rounded-full filter blur-3xl"
            animate={{ y: [0, 30, 0] }}
            transition={{ duration: 8, repeat: Infinity }}
          />

          <div className="relative z-10 max-w-6xl mx-auto text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-6">
                Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">Portfolio</span>
              </h1>
              <p className="text-xl text-foreground/70 max-w-2xl mx-auto">
                Showcasing successful projects that transformed businesses through innovative technology solutions.
              </p>
            </motion.div>
          </div>

          {/* Category Filter */}
          <div className="max-w-6xl mx-auto mb-12">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="flex flex-wrap gap-3 justify-center"
            >
              {categories.map((category) => (
                <motion.button
                  key={category}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-6 py-2 rounded-full font-semibold transition-all duration-300 ${
                    selectedCategory === category
                      ? 'bg-gradient-to-r from-primary to-accent text-background shadow-lg shadow-primary/50'
                      : 'border border-primary/30 text-foreground/70 hover:border-primary/50 hover:text-foreground'
                  }`}
                >
                  {category}
                </motion.button>
              ))}
            </motion.div>
          </div>

          {/* Projects Grid */}
          <div className="max-w-6xl mx-auto">
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {filteredProjects.map((project, index) => (
                <motion.div
                  key={project.id || index}
                  variants={itemVariants}
                  whileHover={{ y: -10, boxShadow: '0 0 40px rgba(0, 212, 255, 0.3)' }}
                  className="rounded-xl overflow-hidden border border-primary/20 bg-card/50 hover:border-primary/50 transition-all duration-300 cursor-pointer group"
                >
                  {/* Project Image */}
                  <div className="h-48 bg-gradient-to-br from-primary/20 to-accent/20 overflow-hidden relative flex items-center justify-center">
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-primary/0 via-accent/20 to-primary/0"
                      animate={{ x: ['-100%', '100%'] }}
                      transition={{ duration: 3, repeat: Infinity }}
                    />
                    <div className="text-center z-10">
                      <div className="text-primary text-4xl font-bold mb-2">
                        {project.featured ? '★' : '◆'}
                      </div>
                      <p className="text-foreground/60 text-sm">{project.category}</p>
                    </div>
                  </div>

                  {/* Project Info */}
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-foreground mb-2">
                      {project.title}
                    </h3>

                    {project.client_name && (
                      <p className="text-sm text-primary mb-3">
                        Client: {project.client_name}
                      </p>
                    )}

                    <p className="text-foreground/70 text-sm mb-6 line-clamp-3">
                      {project.description || project.short_description}
                    </p>

                    <motion.button
                      whileHover={{ x: 5 }}
                      className="text-primary font-semibold flex items-center gap-2 hover:gap-3 transition-all text-sm"
                    >
                      View Details <ExternalLink size={16} />
                    </motion.button>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-card/30">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-4 gap-8 text-center">
              {[
                { number: '150+', label: 'Projects Delivered' },
                { number: '50+', label: 'Team Members' },
                { number: '100+', label: 'Happy Clients' },
                { number: '15+', label: 'Years Experience' },
              ].map((stat, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: i * 0.1 }}
                  viewport={{ once: true }}
                >
                  <motion.div
                    className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent mb-2"
                    initial={{ scale: 0.8 }}
                    whileInView={{ scale: 1 }}
                    transition={{ duration: 0.6, delay: i * 0.1 }}
                    viewport={{ once: true }}
                  >
                    {stat.number}
                  </motion.div>
                  <p className="text-foreground/60">{stat.label}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto text-center bg-gradient-to-r from-primary/10 via-accent/10 to-secondary/10 p-12 rounded-2xl border border-primary/20"
          >
            <h2 className="text-4xl font-bold text-foreground mb-4">
              Ready to Build Something Amazing?
            </h2>
            <p className="text-foreground/70 mb-8 text-lg">
              Let&apos;s create your next success story together.
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-3 rounded-lg bg-gradient-to-r from-primary to-accent text-background font-semibold hover:shadow-lg hover:shadow-primary/50 transition-all"
            >
              Start Your Project
            </motion.button>
          </motion.div>
        </section>
      </main>

      <Footer />
    </>
  )
}
