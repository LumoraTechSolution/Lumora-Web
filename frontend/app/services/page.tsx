'use client'

import { motion } from 'framer-motion'
import Header from '@/components/header'
import Footer from '@/components/footer'
import {
  Code,
  Cloud,
  Brain,
  Shield,
  Zap,
  Lightbulb,
  ChevronRight,
  ArrowRight,
} from 'lucide-react'
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
    description: 'Intelligent systems that learn from your data and automate the work that slows your team down.',
    short_description: 'Intelligent AI solutions for modern business',
    icon: Brain,
  },
  {
    id: 2,
    title: 'Cloud Infrastructure',
    slug: 'cloud-infrastructure',
    description: 'Scalable, secure cloud environments on AWS, GCP, and Azure, built to grow with your business.',
    short_description: 'Enterprise-grade cloud deployment',
    icon: Cloud,
  },
  {
    id: 3,
    title: 'Custom Software Development',
    slug: 'custom-development',
    description: 'Web and mobile applications built from the ground up around your exact workflow.',
    short_description: 'Bespoke software for your needs',
    icon: Code,
  },
  {
    id: 4,
    title: 'Security & Compliance',
    slug: 'security-compliance',
    description: 'Enterprise-grade protection, compliance audits, and ongoing threat management.',
    short_description: 'Secure your business data',
    icon: Shield,
  },
  {
    id: 5,
    title: 'Performance Optimization',
    slug: 'performance-optimization',
    description: 'Faster load times and leaner infrastructure through caching, CDN, and load balancing.',
    short_description: 'Blazing fast performance',
    icon: Zap,
  },
  {
    id: 6,
    title: 'Digital Transformation',
    slug: 'digital-transformation',
    description: 'End-to-end guidance from strategy through implementation and change management.',
    short_description: 'Transform your business digitally',
    icon: Lightbulb,
  },
]

const whyChooseUs = [
  {
    number: '01',
    title: 'High Quality Engineering',
    description: 'Senior engineers who write code built to last, not just to ship.',
  },
  {
    number: '02',
    title: 'Dedicated 24/7 Support',
    description: 'A real team on call around the clock, not a ticket queue.',
  },
  {
    number: '03',
    title: 'Proven Track Record',
    description: 'Hundreds of projects delivered on time, across every industry.',
  },
  {
    number: '04',
    title: 'Agile & Transparent',
    description: "You see progress every sprint, never a black box.",
  },
  {
    number: '05',
    title: 'Cutting-Edge Technology',
    description: 'We build on modern, well-supported stacks, not legacy shortcuts.',
  },
  {
    number: '06',
    title: 'Scalable Solutions',
    description: 'Architecture that holds up whether you have 10 users or 10 million.',
  },
]

const stats = [
  { value: '300+', label: 'Projects Delivered' },
  { value: '50+', label: 'Engineers On Team' },
  { value: '100+', label: 'Happy Clients' },
]

/* Signature stat piece: a two-tone experience ring, standing in for the
   generic "big number" card. */
function ExperienceRing() {
  return (
    <div className="relative w-56 h-56 mx-auto lg:mx-0 flex-shrink-0">
      <div
        className="absolute inset-0 rounded-full"
        style={{
          background:
            'conic-gradient(from 220deg, var(--accent) 0deg 190deg, var(--secondary) 190deg 360deg)',
        }}
      />
      <span className="absolute -top-1 left-10 w-4 h-4 rounded-full bg-accent border-2 border-background" />
      <div className="absolute inset-5 rounded-full bg-background flex flex-col items-center justify-center text-center shadow-inner">
        <span className="text-4xl font-bold text-secondary leading-none">10+</span>
        <span className="text-sm text-muted-foreground mt-2 leading-tight">
          Years Of
          <br />
          Experience
        </span>
      </div>
    </div>
  )
}

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
      transition: { duration: 0.7 },
    },
  }

  return (
    <>
      <Header />

      <main className="min-h-screen bg-background">
        {/* Hero */}
        <section className="relative pt-32 pb-16 px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="max-w-3xl mx-auto text-center mb-12"
          >
            <span className="text-sm font-semibold text-primary">What We Do</span>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mt-3">Our Services</h1>
            <p className="text-muted-foreground mt-4 max-w-xl mx-auto">
              Comprehensive technology solutions designed to accelerate your business growth,
              built and supported by a team that ships production work every day.
            </p>
          </motion.div>

          {/* Photo banner with floating stat chips */}
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="relative max-w-6xl mx-auto"
          >
            <div className="relative h-64 md:h-80 rounded-[2rem] overflow-hidden shadow-lg shadow-secondary/10">
              <img
                src="https://picsum.photos/seed/lumora-services-hero/1600/700"
                alt="Lumora engineering team working together"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-secondary/70 via-secondary/10 to-transparent" />
              <p className="absolute left-6 md:left-10 bottom-6 md:bottom-8 text-background text-lg md:text-2xl font-semibold max-w-md">
                Built by engineers who ship.
              </p>
            </div>

            <motion.div
              className="hidden sm:flex absolute -bottom-8 left-8 bg-card rounded-2xl shadow-xl shadow-secondary/10 border border-border px-6 py-4 items-center gap-3"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
            >
              <span className="text-2xl font-bold text-primary">300+</span>
              <span className="text-sm text-muted-foreground leading-tight">
                Projects
                <br />
                Delivered
              </span>
            </motion.div>

            <motion.div
              className="hidden sm:flex absolute -bottom-8 right-8 bg-card rounded-2xl shadow-xl shadow-secondary/10 border border-border px-6 py-4 items-center gap-3"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.65, duration: 0.6 }}
            >
              <span className="text-2xl font-bold text-primary">50+</span>
              <span className="text-sm text-muted-foreground leading-tight">
                Engineers
                <br />
                On Team
              </span>
            </motion.div>
          </motion.div>
        </section>

        {/* Service cards */}
        <section className="pt-20 pb-24 px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="max-w-6xl mx-auto grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {(loading ? defaultServices : services).map((service, index) => {
              const Icon = 'icon' in service ? service.icon : Code
              return (
                <motion.div
                  key={service.id || index}
                  variants={itemVariants}
                  whileHover={{ y: -8, boxShadow: '0 20px 40px -20px rgba(25, 164, 238, 0.3)' }}
                  className="bg-card rounded-2xl border border-border p-8 text-center shadow-sm transition-shadow"
                >
                  <div className="w-16 h-16 rounded-full bg-primary text-primary-foreground flex items-center justify-center mx-auto mb-5">
                    <Icon size={26} />
                  </div>
                  <h3 className="text-lg font-bold text-foreground mb-2">{service.title}</h3>
                  <p className="text-sm text-muted-foreground mb-6">
                    {service.description || service.short_description}
                  </p>
                  <motion.button
                    whileHover={{ scale: 1.04 }}
                    whileTap={{ scale: 0.96 }}
                    className="inline-flex items-center gap-1 px-5 py-2 rounded-full bg-primary text-primary-foreground text-sm font-semibold"
                  >
                    Learn More <ChevronRight size={16} />
                  </motion.button>
                </motion.div>
              )
            })}
          </motion.div>
        </section>

        {/* Why Choose Us — paired with photo */}
        <section className="py-24 px-4 sm:px-6 lg:px-8 bg-muted">
          <div className="max-w-6xl mx-auto grid lg:grid-cols-[0.85fr_1.15fr] gap-14 items-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7 }}
              viewport={{ once: true }}
              className="relative h-[420px] hidden lg:block"
            >
              <div className="absolute left-0 top-6 w-[70%] h-[85%] rounded-[2rem] overflow-hidden shadow-lg shadow-secondary/10">
                <img
                  src="https://picsum.photos/seed/lumora-why-choose-1/700/860"
                  alt="Lumora engineer reviewing project architecture"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute right-0 bottom-0 w-[52%] h-[55%] rounded-[1.75rem] overflow-hidden shadow-xl shadow-secondary/10 border-4 border-background">
                <img
                  src="https://picsum.photos/seed/lumora-why-choose-2/500/500"
                  alt="Lumora support specialist at work"
                  className="w-full h-full object-cover"
                />
              </div>
            </motion.div>

            <div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7 }}
                viewport={{ once: true }}
                className="mb-10"
              >
                <span className="text-sm font-semibold text-primary">The Difference</span>
                <h2 className="text-4xl font-bold text-foreground mt-3">Why Choose Us</h2>
              </motion.div>

              <motion.div
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="grid sm:grid-cols-2 gap-x-10 gap-y-8"
              >
                {whyChooseUs.map((item) => (
                  <motion.div key={item.number} variants={itemVariants} className="flex gap-4">
                    <span className="text-2xl font-bold text-primary flex-shrink-0">{item.number}</span>
                    <div>
                      <h3 className="text-base font-bold text-foreground mb-1">{item.title}</h3>
                      <p className="text-sm text-muted-foreground">{item.description}</p>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </div>
        </section>

        {/* Experience ring + stats */}
        <section className="py-20 px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            className="max-w-5xl mx-auto flex flex-col lg:flex-row items-center gap-14"
          >
            <ExperienceRing />

            <div className="flex-1 grid grid-cols-1 sm:grid-cols-3 gap-8 w-full">
              {stats.map((stat) => (
                <div key={stat.label} className="flex items-start gap-3">
                  <span className="w-2.5 h-2.5 rounded-full bg-accent mt-2 flex-shrink-0" />
                  <div>
                    <p className="text-3xl font-bold text-secondary leading-none">{stat.value}</p>
                    <p className="text-sm text-muted-foreground mt-2">{stat.label}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </section>

        {/* CTA Section — photo-backed */}
        <section className="py-20 px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            className="relative max-w-5xl mx-auto text-center p-14 rounded-[2rem] overflow-hidden"
          >
            <img
              src="https://picsum.photos/seed/lumora-services-cta/1600/700"
              alt=""
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-secondary/85" />
            <div className="relative text-secondary-foreground">
              <h2 className="text-4xl font-bold mb-4">Need a Custom Solution?</h2>
              <p className="text-secondary-foreground/70 mb-8 text-lg max-w-xl mx-auto">
                Let&apos;s discuss how our services can transform your business.
              </p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-3 rounded-full bg-primary text-primary-foreground font-semibold inline-flex items-center gap-2 hover:shadow-lg hover:shadow-primary/40 transition-all"
              >
                Schedule a Consultation <ArrowRight size={18} />
              </motion.button>
            </div>
          </motion.div>
        </section>
      </main>

      <Footer />
    </>
  )
}
