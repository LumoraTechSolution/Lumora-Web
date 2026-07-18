'use client'

import { motion } from 'framer-motion'
import Header from '@/components/header'
import Footer from '@/components/footer'
import { Code, Cloud, Brain, Shield, Zap, Lightbulb, CheckCircle2 } from 'lucide-react'
import { useEffect, useState } from 'react'
import { servicesAPI } from '@/lib/api'

interface Service {
  id: number
  title: string
  slug: string
  description: string
  short_description?: string
  icon_url?: string
  technologies?: string[]
}

const defaultServices = [
  {
    id: 1,
    title: 'AI & Machine Learning',
    slug: 'ai-machine-learning',
    description: 'Harness the power of artificial intelligence to automate processes, gain insights, and create intelligent systems that learn and adapt.',
    short_description: 'Intelligent AI solutions for modern business',
    technologies: ['TensorFlow', 'PyTorch', 'OpenAI', 'Scikit-Learn'],
    icon: Brain,
  },
  {
    id: 2,
    title: 'Cloud Infrastructure',
    slug: 'cloud-infrastructure',
    description: 'Scalable, secure cloud solutions built on AWS, GCP, and Azure. We design and implement infrastructure that grows with your business.',
    short_description: 'Enterprise-grade cloud deployment',
    technologies: ['AWS', 'Kubernetes', 'Docker', 'Terraform'],
    icon: Cloud,
  },
  {
    id: 3,
    title: 'Custom Software Development',
    slug: 'custom-development',
    description: 'Tailored applications built from the ground up. We create web and mobile solutions that solve your unique challenges.',
    short_description: 'Bespoke software for your needs',
    technologies: ['Next.js', 'React', 'Node.js', 'PostgreSQL'],
    icon: Code,
  },
  {
    id: 4,
    title: 'Security & Compliance',
    slug: 'security-compliance',
    description: 'Protect your digital assets with enterprise-grade security solutions, compliance audits, and threat management.',
    short_description: 'Secure your business data',
    technologies: ['OAuth2', 'SSL/TLS', 'GDPR', 'SOC2'],
    icon: Shield,
  },
  {
    id: 5,
    title: 'Performance Optimization',
    slug: 'performance-optimization',
    description: 'Lightning-fast systems that deliver. We optimize your infrastructure for speed, efficiency, and user experience.',
    short_description: 'Blazing fast performance',
    technologies: ['CDN', 'Caching', 'Load Balancing', 'Monitoring'],
    icon: Zap,
  },
  {
    id: 6,
    title: 'Digital Transformation',
    slug: 'digital-transformation',
    description: 'End-to-end guidance for your digital transformation journey. From strategy to implementation and beyond.',
    short_description: 'Transform your business digitally',
    technologies: ['Strategy', 'Change Management', 'Training', 'Support'],
    icon: Lightbulb,
  },
]

export default function ServicesPage() {
  const [services, setServices] = useState<Service[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await servicesAPI.getAll()
        if (response.data && response.data.length > 0) {
          setServices(response.data)
        } else {
          setServices(defaultServices)
        }
      } catch (error) {
        console.log('Using default services')
        setServices(defaultServices)
      } finally {
        setLoading(false)
      }
    }

    fetchServices()
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
                Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">Services</span>
              </h1>
              <p className="text-xl text-foreground/70 max-w-2xl mx-auto">
                Comprehensive technology solutions designed to accelerate your business growth and digital transformation.
              </p>
            </motion.div>
          </div>

          {/* Services Grid */}
          <div className="max-w-6xl mx-auto">
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {(loading ? defaultServices : services).map((service, index) => {
                const Icon = 'icon' in service ? service.icon : Code
                return (
                  <motion.div
                    key={service.id || index}
                    variants={itemVariants}
                    whileHover={{ y: -10, boxShadow: '0 0 40px rgba(0, 212, 255, 0.3)' }}
                    className="p-8 rounded-xl border border-primary/20 bg-card/50 hover:border-primary/50 transition-all duration-300 cursor-pointer group"
                  >
                    <div className="w-14 h-14 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center text-background mb-6 group-hover:scale-110 transition-transform">
                      <Icon size={28} />
                    </div>

                    <h3 className="text-2xl font-bold text-foreground mb-3">
                      {service.title}
                    </h3>

                    <p className="text-foreground/70 mb-6 h-24">
                      {service.description || service.short_description}
                    </p>

                    {(service.technologies || []).length > 0 && (
                      <div className="flex flex-wrap gap-2 mb-6">
                        {(service.technologies || []).slice(0, 3).map((tech, i) => (
                          <span
                            key={i}
                            className="text-xs px-3 py-1 rounded-full bg-primary/10 text-primary border border-primary/30"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    )}

                    <motion.button
                      whileHover={{ x: 5 }}
                      className="text-primary font-semibold flex items-center gap-2 hover:gap-3 transition-all"
                    >
                      Learn More →
                    </motion.button>
                  </motion.div>
                )
              })}
            </motion.div>
          </div>
        </section>

        {/* Features Section */}
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
                Why Choose Lumora?
              </h2>
              <p className="text-foreground/60 text-lg">
                We bring expertise, innovation, and dedication to every project.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-8">
              {[
                'Expert Team of 50+ Engineers',
                '24/7 Dedicated Support',
                'Proven Track Record',
                'Cutting-Edge Technology',
                'Agile & Transparent',
                'Scalable Solutions',
              ].map((feature, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: i * 0.1 }}
                  viewport={{ once: true }}
                  className="flex gap-4"
                >
                  <CheckCircle2 className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="text-lg font-semibold text-foreground mb-1">
                      {feature}
                    </h3>
                  </div>
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
              Need a Custom Solution?
            </h2>
            <p className="text-foreground/70 mb-8 text-lg">
              Let&apos;s discuss how our services can transform your business.
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-3 rounded-lg bg-gradient-to-r from-primary to-accent text-background font-semibold hover:shadow-lg hover:shadow-primary/50 transition-all"
            >
              Schedule a Consultation
            </motion.button>
          </motion.div>
        </section>
      </main>

      <Footer />
    </>
  )
}
