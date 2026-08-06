'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import {
  ArrowRight,
  Play,
  Code,
  Brain,
  Lightbulb,
  Cloud,
  ShieldCheck,
  Smartphone,
} from 'lucide-react'
import Header from '@/components/header'
import Footer from '@/components/footer'

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: 'easeOut' },
  },
}

/* Signature element: a partial "orbit ring" — nods to Lumora's light/aurora
   mark without falling back to a generic blurred gradient blob. */
function OrbitRing({
  className,
  color = 'var(--accent)',
  size = 160,
  duration = 30,
  reverse = false,
}: {
  className?: string
  color?: string
  size?: number
  duration?: number
  reverse?: boolean
}) {
  return (
    <motion.svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 100 100"
      animate={{ rotate: reverse ? -360 : 360 }}
      transition={{ duration, repeat: Infinity, ease: 'linear' }}
    >
      <circle
        cx="50"
        cy="50"
        r="42"
        fill="none"
        stroke={color}
        strokeWidth="8"
        strokeLinecap="round"
        strokeDasharray="140 264"
      />
    </motion.svg>
  )
}

function Squiggle({ className }: { className?: string }) {
  return (
    <svg className={className} width="64" height="24" viewBox="0 0 64 24" fill="none">
      <path
        d="M2 18C8 6 14 6 20 18C26 30 32 6 38 6C44 6 48 18 62 6"
        stroke="var(--primary)"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
    </svg>
  )
}

export default function Home() {
  const services = [
    {
      icon: Code,
      title: 'App Development',
      description: 'Native and cross-platform apps built for speed and scale.',
    },
    {
      icon: Cloud,
      title: 'Cloud Infrastructure',
      description: 'Resilient, secure cloud environments that grow with you.',
    },
    {
      icon: Brain,
      title: 'AI & Machine Learning',
      description: 'Intelligent systems that learn from your business data.',
    },
    {
      icon: ShieldCheck,
      title: 'Security & Compliance',
      description: 'Enterprise-grade protection built in from day one.',
    },
    {
      icon: Smartphone,
      title: 'Digital Products',
      description: 'End-to-end product design, from wireframe to launch.',
    },
    {
      icon: Lightbulb,
      title: 'Digital Strategy',
      description: 'A clear roadmap for your next stage of growth.',
    },
  ]

  const testimonials = [
    {
      name: 'Sarah Johnson',
      company: 'TechCorp Inc.',
      text: 'Lumora transformed our operations with their innovative AI solutions. Highly professional team!',
    },
    {
      name: 'Michael Chen',
      company: 'StartupHub',
      text: 'The best tech partner we could ask for. Fast, reliable, and incredibly creative.',
    },
    {
      name: 'Emma Davis',
      company: 'Enterprise Co.',
      text: 'Outstanding service and support. They really understood our vision and delivered beyond expectations.',
    },
  ]

  return (
    <>
      <Header />

      <main className="min-h-screen bg-background overflow-x-clip">
        {/* Hero Section */}
        <section className="relative pt-32 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
          <OrbitRing
            className="hidden md:block absolute -right-8 top-24 opacity-70"
            color="#19a4ee"
            size={140}
            duration={26}
          />
          <OrbitRing
            className="hidden md:block absolute left-0 bottom-10 opacity-60"
            color="#19a4ee"
            size={110}
            duration={22}
            reverse
          />
          <div className="absolute -left-24 top-1/3 w-72 h-72 rounded-full bg-primary/5" />

          <div className="relative z-10 max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
            {/* Left: copy */}
            <motion.div variants={containerVariants} initial="hidden" animate="visible">
              <motion.div variants={itemVariants} className="flex items-center gap-3 mb-6">
                <Squiggle />
                <span className="text-sm font-semibold text-primary">Trusted Technology Partner</span>
              </motion.div>

              <motion.h1
                variants={itemVariants}
                className="text-5xl md:text-6xl font-bold text-foreground mb-6 leading-[1.1]"
              >
                We Build Next-Level
                <span className="block text-primary">Software Solutions</span>
                <span className="block">For Modern Business.</span>
              </motion.h1>

              <motion.p variants={itemVariants} className="text-lg text-muted-foreground mb-8 max-w-xl">
                Lumora partners with ambitious teams to design, build, and scale the
                AI, cloud, and digital products that move their business forward.
              </motion.p>

              <motion.div variants={itemVariants} className="flex gap-4 flex-wrap">
                <motion.button
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.96 }}
                  className="px-7 py-3 rounded-full bg-primary text-primary-foreground font-semibold flex items-center gap-2 shadow-lg shadow-primary/25 hover:shadow-primary/40 transition-shadow"
                >
                  Contact Now <ArrowRight size={18} />
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.96 }}
                  className="px-7 py-3 rounded-full border border-border text-foreground font-semibold flex items-center gap-2 hover:border-primary hover:text-primary transition-colors"
                >
                  <span className="w-8 h-8 rounded-full bg-accent/15 text-accent flex items-center justify-center">
                    <Play size={14} fill="currentColor" />
                  </span>
                  Watch Demo
                </motion.button>
              </motion.div>
            </motion.div>

            {/* Right: photo collage */}
            <motion.div
              initial={{ opacity: 0, scale: 0.94 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative h-[440px] sm:h-[480px]"
            >
              <div className="absolute right-0 top-0 w-[78%] h-[92%] rounded-[2rem] overflow-hidden shadow-xl shadow-secondary/10">
                <img
                  src="/Home_Team.png"
                  alt="Lumora team collaborating in the office"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Floating stat card */}
              <motion.div
                className="float absolute left-0 top-4 bg-card rounded-2xl shadow-xl shadow-secondary/10 p-4 w-44 border border-border"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6, duration: 0.6 }}
              >
                <p className="text-xs text-muted-foreground mb-2">Total Projects</p>
                <div className="flex items-center gap-3">
                  <div
                    className="w-12 h-12 rounded-full flex-shrink-0"
                    style={{
                      background:
                        'conic-gradient(var(--primary) 0deg 260deg, var(--accent) 260deg 360deg)',
                    }}
                  />
                  <div>
                    <p className="text-lg font-bold text-foreground leading-none">684.58</p>
                    <p className="text-[11px] text-muted-foreground mt-1">this year</p>
                  </div>
                </div>
              </motion.div>

              {/* Floating "watch" card */}
              <motion.div
                className="float-slow absolute left-4 bottom-8 bg-card rounded-2xl shadow-xl shadow-secondary/10 p-4 w-52 border border-border"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, duration: 0.6 }}
              >
                <div className="flex items-center gap-3 mb-3">
                  <span className="w-9 h-9 rounded-full bg-primary text-primary-foreground flex items-center justify-center flex-shrink-0">
                    <Play size={14} fill="currentColor" />
                  </span>
                  <span className="text-sm font-semibold text-foreground">26,807 views</span>
                </div>
                <div className="h-1.5 rounded-full bg-muted overflow-hidden">
                  <div className="h-full w-2/3 rounded-full bg-accent" />
                </div>
              </motion.div>

              {/* Floating bar-chart card */}
              <motion.div
                className="float absolute right-6 -bottom-6 bg-card rounded-2xl shadow-xl shadow-secondary/10 p-4 w-32 border border-border"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1, duration: 0.6 }}
              >
                <div className="flex items-end gap-1.5 h-14">
                  {[40, 70, 50, 90, 60].map((h, i) => (
                    <div
                      key={i}
                      className="flex-1 rounded-t-sm"
                      style={{
                        height: `${h}%`,
                        background: i % 2 === 0 ? 'var(--primary)' : 'var(--accent)',
                      }}
                    />
                  ))}
                </div>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* About / Stats Section */}
        <section className="py-24 px-4 sm:px-6 lg:px-8 border-y border-border">
          <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              viewport={{ once: true }}
            >
              <span className="text-sm font-semibold text-primary">About Us</span>
              <h2 className="text-4xl font-bold text-foreground mt-3 mb-5 leading-tight">
                We Turn Technology Into Business Growth
              </h2>
              <p className="text-muted-foreground mb-8">
                For over a decade, Lumora has partnered with product and
                engineering teams to ship AI, cloud, and platform work that
                holds up in production — not just in a pitch deck.
              </p>

              <div className="grid grid-cols-3 gap-6 mb-8 pb-8 border-b border-border">
                {[
                  { value: '300+', label: 'Projects completed' },
                  { value: '1.6M', label: 'Users served' },
                  { value: '300+', label: 'Team members' },
                ].map((stat) => (
                  <div key={stat.label}>
                    <p className="text-2xl md:text-3xl font-bold text-primary">{stat.value}</p>
                    <p className="text-xs text-muted-foreground mt-1">{stat.label}</p>
                  </div>
                ))}
              </div>

              <Link href="/services">
                <motion.button
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.96 }}
                  className="px-7 py-3 rounded-full bg-primary text-primary-foreground font-semibold"
                >
                  Read More
                </motion.button>
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.94 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7 }}
              viewport={{ once: true }}
              className="relative h-[380px]"
            >
              <div className="absolute -right-4 -top-4 w-64 h-64 rounded-full bg-accent/10 -z-10" />
              <div className="absolute left-0 top-0 w-[62%] h-full rounded-[2rem] overflow-hidden shadow-lg shadow-secondary/10">
                <img
                  src="/Home2.png"
                  alt="Engineers working at Lumora"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="float-slow absolute right-0 bottom-0 w-[46%] h-[58%] rounded-[1.75rem] overflow-hidden shadow-xl shadow-secondary/10 border-4 border-background">
                <img
                  src="/Home4.png"
                  alt="Lumora team member"
                  className="w-full h-full object-cover"
                />
              </div>
              <OrbitRing
                className="absolute -left-6 bottom-6 opacity-70"
                color="#19a4ee"
                size={80}
                duration={20}
              />
            </motion.div>
          </div>
        </section>

        {/* Featured Services */}
        <section className="py-24 px-4 sm:px-6 lg:px-8 bg-muted">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <span className="text-sm font-semibold text-primary">Featured Services</span>
              <h2 className="text-4xl font-bold text-foreground mt-3">
                Technology Solutions That Work For You
              </h2>
            </motion.div>

            <div className="grid lg:grid-cols-[0.8fr_1.2fr] gap-10 items-center">
              <motion.div
                initial={{ opacity: 0, scale: 0.94 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.7 }}
                viewport={{ once: true }}
                className="relative h-[380px] hidden lg:block"
              >
                <div className="absolute left-0 top-6 w-[64%] h-[85%] rounded-[2rem] overflow-hidden shadow-lg shadow-secondary/10">
                  <img
                    src="/Home5.png"
                    alt="Lumora specialist reviewing a project"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="float absolute right-0 bottom-0 w-[52%] h-[62%] rounded-[1.75rem] overflow-hidden shadow-xl shadow-secondary/10 border-4 border-background">
                  <img
                    src="/Home6.png"
                    alt="Lumora developer at work"
                    className="w-full h-full object-cover"
                  />
                </div>
              </motion.div>

              <motion.div
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="grid sm:grid-cols-2 gap-5"
              >
                {services.map((service) => {
                  const Icon = service.icon
                  return (
                    <motion.div
                      key={service.title}
                      variants={itemVariants}
                      whileHover={{ y: -6 }}
                      className="p-6 rounded-2xl bg-card border border-border shadow-sm hover:shadow-lg hover:shadow-primary/10 transition-shadow"
                    >
                      <div className="w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center mb-4">
                        <Icon size={22} />
                      </div>
                      <h3 className="font-bold text-foreground mb-2">{service.title}</h3>
                      <p className="text-sm text-muted-foreground">{service.description}</p>
                    </motion.div>
                  )
                })}
              </motion.div>
            </div>
          </div>
        </section>

        {/* How We Work */}
        <section className="py-24 px-4 sm:px-6 lg:px-8 border-y border-border">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <span className="text-sm font-semibold text-primary">Our Process</span>
              <h2 className="text-4xl font-bold text-foreground mt-3">How We Work</h2>
            </motion.div>

            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="relative grid sm:grid-cols-2 lg:grid-cols-4 gap-10"
            >
              <div className="hidden lg:block absolute top-6 left-[12.5%] right-[12.5%] h-px bg-border" />
              {[
                { step: '01', title: 'Discover', description: 'We map your goals, constraints, and technical landscape.' },
                { step: '02', title: 'Design', description: 'Architecture and UX decisions get made before code does.' },
                { step: '03', title: 'Build', description: 'Agile sprints with visible progress and weekly demos.' },
                { step: '04', title: 'Launch & Support', description: 'We ship, monitor, and stay on for ongoing support.' },
              ].map((phase) => (
                <motion.div key={phase.step} variants={itemVariants} className="relative text-center lg:text-left">
                  <div className="relative z-10 w-12 h-12 rounded-full bg-primary text-primary-foreground font-bold flex items-center justify-center mx-auto lg:mx-0 mb-4">
                    {phase.step}
                  </div>
                  <h3 className="text-lg font-bold text-foreground mb-2">{phase.title}</h3>
                  <p className="text-sm text-muted-foreground">{phase.description}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="py-24 px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <span className="text-sm font-semibold text-primary">Testimonials</span>
              <h2 className="text-4xl font-bold text-foreground mt-3">What Our Clients Say</h2>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-6">
              {testimonials.map((testimonial, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.15 }}
                  viewport={{ once: true }}
                  className="p-7 rounded-2xl bg-card border border-border shadow-sm"
                >
                  <div className="flex gap-1 mb-4 text-accent">
                    {[...Array(5)].map((_, i) => (
                      <span key={i}>★</span>
                    ))}
                  </div>
                  <p className="text-foreground/80 mb-6">{testimonial.text}</p>
                  <div>
                    <p className="font-semibold text-foreground">{testimonial.name}</p>
                    <p className="text-muted-foreground text-sm">{testimonial.company}</p>
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
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            className="relative max-w-5xl mx-auto text-center bg-secondary text-secondary-foreground p-14 rounded-[2rem] overflow-hidden"
          >
            <OrbitRing
              className="absolute -left-10 -top-10 opacity-40"
              color="#19a4ee"
              size={160}
              duration={28}
            />
            <OrbitRing
              className="absolute -right-8 -bottom-10 opacity-40"
              color="#19a4ee"
              size={140}
              duration={24}
              reverse
            />
            <h2 className="relative text-4xl font-bold mb-4">Ready to Transform Your Business?</h2>
            <p className="relative text-secondary-foreground/70 mb-8 text-lg max-w-xl mx-auto">
              Let&apos;s work together to build something extraordinary.
            </p>
            <motion.button
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              className="relative px-8 py-3 rounded-full bg-accent text-accent-foreground font-semibold flex items-center gap-2 mx-auto"
            >
              Get In Touch <ArrowRight size={20} />
            </motion.button>
          </motion.div>
        </section>
      </main>

      <Footer />
    </>
  )
}
