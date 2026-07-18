'use client'

import { motion } from 'framer-motion'
import Header from '@/components/header'
import Footer from '@/components/footer'
import { useEffect, useState } from 'react'
import { jobsAPI } from '@/lib/api'
import { MapPin, Briefcase, DollarSign, ArrowRight } from 'lucide-react'

interface JobOpening {
  id: number
  title: string
  slug: string
  description: string
  location?: string
  job_type?: string
  salary_range?: string
}

const defaultJobs = [
  {
    id: 1,
    title: 'Senior Full-Stack Engineer',
    slug: 'senior-fullstack-engineer',
    location: 'San Francisco, CA',
    job_type: 'Full-time',
    salary_range: '$180K - $220K',
    description: 'We are seeking an experienced full-stack engineer to lead our product development. Must have 5+ years experience with modern web technologies.',
  },
  {
    id: 2,
    title: 'AI/ML Engineer',
    slug: 'ai-ml-engineer',
    location: 'Remote',
    job_type: 'Full-time',
    salary_range: '$160K - $200K',
    description: 'Join our AI team to build cutting-edge machine learning solutions. Experience with TensorFlow, PyTorch, and large-scale systems required.',
  },
  {
    id: 3,
    title: 'DevOps Specialist',
    slug: 'devops-specialist',
    location: 'New York, NY',
    job_type: 'Full-time',
    salary_range: '$140K - $180K',
    description: 'Manage our cloud infrastructure on AWS/GCP. Kubernetes, Docker, and CI/CD pipeline expertise essential.',
  },
  {
    id: 4,
    title: 'Product Manager',
    slug: 'product-manager',
    location: 'San Francisco, CA',
    job_type: 'Full-time',
    salary_range: '$150K - $190K',
    description: 'Shape the future of our products. Lead cross-functional teams to deliver innovative solutions for enterprise clients.',
  },
  {
    id: 5,
    title: 'UX/UI Designer',
    slug: 'uxui-designer',
    location: 'Remote',
    job_type: 'Full-time',
    salary_range: '$100K - $140K',
    description: 'Create beautiful, intuitive user experiences. Portfolio required. Proficiency in Figma and design systems.',
  },
  {
    id: 6,
    title: 'Security Engineer',
    slug: 'security-engineer',
    location: 'Austin, TX',
    job_type: 'Full-time',
    salary_range: '$130K - $170K',
    description: 'Protect our systems and data. Experience with penetration testing, security audits, and compliance frameworks.',
  },
]

export default function CareersPage() {
  const [jobs, setJobs] = useState<JobOpening[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await jobsAPI.getAll()
        if (response.data && response.data.length > 0) {
          setJobs(response.data)
        } else {
          setJobs(defaultJobs)
        }
      } catch (error) {
        console.log('Using default jobs')
        setJobs(defaultJobs)
      } finally {
        setLoading(false)
      }
    }

    fetchJobs()
  }, [])

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
            className="absolute top-10 right-10 w-96 h-96 bg-primary/10 rounded-full filter blur-3xl"
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
                Join Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">Team</span>
              </h1>
              <p className="text-xl text-foreground/70 max-w-2xl mx-auto">
                Be part of a team of innovators building the future of technology. We&apos;re looking for talented individuals who want to make an impact.
              </p>
            </motion.div>
          </div>

          {/* Company Values */}
          <div className="max-w-6xl mx-auto mb-16">
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="grid md:grid-cols-3 gap-8"
            >
              {[
                { title: 'Innovation First', description: 'We encourage creative thinking and bold ideas.' },
                { title: 'Growth Mindset', description: 'Continuous learning and development opportunities.' },
                { title: 'Work-Life Balance', description: 'Flexible work arrangements and great benefits.' },
              ].map((value, i) => (
                <motion.div
                  key={i}
                  variants={itemVariants}
                  className="p-6 rounded-xl border border-primary/20 bg-card/50 text-center"
                >
                  <h3 className="text-xl font-bold text-foreground mb-2">{value.title}</h3>
                  <p className="text-foreground/70">{value.description}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Job Listings */}
          <div className="max-w-6xl mx-auto">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-3xl font-bold text-foreground mb-8 text-center"
            >
              Open Positions
            </motion.h2>

            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="space-y-6"
            >
              {(loading ? defaultJobs : jobs).map((job, index) => (
                <motion.div
                  key={job.id || index}
                  variants={itemVariants}
                  whileHover={{ x: 10, boxShadow: '0 0 40px rgba(0, 212, 255, 0.2)' }}
                  className="p-8 rounded-xl border border-primary/20 bg-card/50 hover:border-primary/50 transition-all duration-300 cursor-pointer"
                >
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-4">
                    <div>
                      <h3 className="text-2xl font-bold text-foreground mb-2">
                        {job.title}
                      </h3>
                      <div className="flex flex-wrap gap-4 text-sm text-foreground/70">
                        {job.location && (
                          <div className="flex items-center gap-1">
                            <MapPin size={16} className="text-primary" />
                            {job.location}
                          </div>
                        )}
                        {job.job_type && (
                          <div className="flex items-center gap-1">
                            <Briefcase size={16} className="text-primary" />
                            {job.job_type}
                          </div>
                        )}
                        {job.salary_range && (
                          <div className="flex items-center gap-1">
                            <DollarSign size={16} className="text-primary" />
                            {job.salary_range}
                          </div>
                        )}
                      </div>
                    </div>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-6 py-2 rounded-lg border border-primary/50 text-primary font-semibold hover:bg-primary/10 transition-all whitespace-nowrap"
                    >
                      Apply Now
                    </motion.button>
                  </div>

                  <p className="text-foreground/70 mb-4">
                    {job.description}
                  </p>

                  <motion.button
                    whileHover={{ x: 5 }}
                    className="text-primary font-semibold flex items-center gap-2 hover:gap-3 transition-all text-sm"
                  >
                    Learn More <ArrowRight size={16} />
                  </motion.button>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-card/30">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl font-bold text-foreground mb-4">
                Why Work With Us
              </h2>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                'Competitive Salary & Equity',
                'Health & Wellness Benefits',
                'Remote-Friendly Culture',
                'Professional Development',
                'Flexible Time Off',
                'Annual Team Retreats',
              ].map((benefit, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: i * 0.1 }}
                  viewport={{ once: true }}
                  className="p-6 rounded-xl border border-primary/20 bg-background/50"
                >
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center text-background font-bold mb-4">
                    ✓
                  </div>
                  <h3 className="text-lg font-semibold text-foreground">
                    {benefit}
                  </h3>
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
              Don&apos;t see your role?
            </h2>
            <p className="text-foreground/70 mb-8 text-lg">
              We&apos;re always looking for talented people. Send us your resume and let&apos;s talk.
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-3 rounded-lg bg-gradient-to-r from-primary to-accent text-background font-semibold hover:shadow-lg hover:shadow-primary/50 transition-all"
            >
              Send Your Resume
            </motion.button>
          </motion.div>
        </section>
      </main>

      <Footer />
    </>
  )
}
