'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowRight, Zap, Shield, Rocket, Code, Brain, Lightbulb } from 'lucide-react'
import Header from '@/components/header'
import Footer from '@/components/footer'

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.1,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: 'easeOut' },
  },
}

const floatingVariants = {
  animate: {
    y: [0, -20, 0],
    transition: { duration: 6, repeat: Infinity, ease: 'easeInOut' },
  },
}

export default function Home() {
  const services = [
    {
      icon: Code,
      title: 'Custom Development',
      description: 'Tailored software solutions built for your unique business needs.',
    },
    {
      icon: Brain,
      title: 'AI & Machine Learning',
      description: 'Intelligent systems that learn and adapt to drive innovation.',
    },
    {
      icon: Lightbulb,
      title: 'Digital Strategy',
      description: 'Strategic guidance to transform your business digitally.',
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

      <main className="min-h-screen bg-background">
        {/* Hero Section */}
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
          {/* Animated background elements */}
          <motion.div
            className="absolute top-20 right-10 w-72 h-72 bg-primary/20 rounded-full filter blur-3xl"
            animate={{ y: [0, 30, 0] }}
            transition={{ duration: 8, repeat: Infinity }}
          />
          <motion.div
            className="absolute bottom-20 left-10 w-96 h-96 bg-accent/10 rounded-full filter blur-3xl"
            animate={{ y: [0, -30, 0] }}
            transition={{ duration: 10, repeat: Infinity, delay: 1 }}
          />

          <motion.div
            className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <div className="text-center">
              <motion.div variants={itemVariants} className="mb-6">
                <span className="inline-block px-4 py-2 rounded-full bg-primary/10 border border-primary/50 text-primary text-sm font-semibold">
                  ✨ Welcome to the Future
                </span>
              </motion.div>

              <motion.h1
                variants={itemVariants}
                className="text-5xl md:text-7xl font-bold text-foreground mb-6 leading-tight"
              >
                Next-Level <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-accent to-secondary">Technology Solutions</span>
              </motion.h1>

              <motion.p
                variants={itemVariants}
                className="text-xl text-foreground/70 mb-8 max-w-2xl mx-auto"
              >
                Empower your business with cutting-edge AI, cloud technologies, and digital transformation strategies that drive real results.
              </motion.p>

              <motion.div
                variants={itemVariants}
                className="flex gap-4 justify-center flex-wrap"
              >
                <motion.button
                  whileHover={{ scale: 1.05, boxShadow: '0 0 30px rgba(0, 212, 255, 0.5)' }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-3 rounded-lg bg-gradient-to-r from-primary to-accent text-background font-semibold flex items-center gap-2 hover:shadow-lg transition-all duration-200"
                >
                  Start Your Journey <ArrowRight size={20} />
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-3 rounded-lg border border-primary/50 text-primary font-semibold hover:bg-primary/10 transition-all duration-200"
                >
                  Learn More
                </motion.button>
              </motion.div>
            </div>

            {/* Hero Image / Graphic */}
            <motion.div
              variants={itemVariants}
              className="mt-16 relative"
            >
              <motion.div
                variants={floatingVariants}
                animate="animate"
                className="w-full h-96 rounded-2xl border border-primary/20 bg-gradient-to-br from-primary/5 to-accent/5 backdrop-blur-sm overflow-hidden flex items-center justify-center"
              >
                <div className="relative w-full h-full flex items-center justify-center">
                  {/* Tech visualization */}
                  <motion.div
                    className="absolute inset-0 flex items-center justify-center"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                  >
                    <div className="grid grid-cols-3 gap-4 w-48 h-48">
                      {[...Array(9)].map((_, i) => (
                        <motion.div
                          key={i}
                          className="rounded-lg bg-primary/20 border border-primary/50"
                          animate={{
                            boxShadow: ['0 0 10px rgba(0, 212, 255, 0.3)', '0 0 20px rgba(0, 212, 255, 0.6)'],
                          }}
                          transition={{ duration: 2, repeat: Infinity, delay: i * 0.1 }}
                        />
                      ))}
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>
        </section>

        {/* Services Section */}
        <section className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
                Our Services
              </h2>
              <p className="text-foreground/60 text-lg max-w-2xl mx-auto">
                We provide comprehensive technology solutions tailored to your business needs.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-8">
              {services.map((service, index) => {
                const Icon = service.icon
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: index * 0.2 }}
                    viewport={{ once: true }}
                    whileHover={{ y: -10, boxShadow: '0 0 30px rgba(0, 212, 255, 0.2)' }}
                    className="p-8 rounded-xl border border-primary/20 bg-card/50 hover:border-primary/50 transition-all duration-300 cursor-pointer"
                  >
                    <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center text-background mb-4">
                      <Icon size={24} />
                    </div>
                    <h3 className="text-xl font-bold text-foreground mb-2">
                      {service.title}
                    </h3>
                    <p className="text-foreground/60">{service.description}</p>
                  </motion.div>
                )
              })}
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-card/30">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
                What Our Clients Say
              </h2>
              <p className="text-foreground/60 text-lg">
                Trusted by businesses worldwide.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-8">
              {testimonials.map((testimonial, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.8, delay: index * 0.2 }}
                  viewport={{ once: true }}
                  className="p-6 rounded-xl border border-primary/20 bg-background/50"
                >
                  <div className="flex gap-1 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <span key={i} className="text-primary text-lg">
                        ★
                      </span>
                    ))}
                  </div>
                  <p className="text-foreground/80 mb-4">
                    {testimonial.text}
                  </p>
                  <div>
                    <p className="font-semibold text-foreground">
                      {testimonial.name}
                    </p>
                    <p className="text-foreground/60 text-sm">
                      {testimonial.company}
                    </p>
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
              Ready to Transform Your Business?
            </h2>
            <p className="text-foreground/70 mb-8 text-lg">
              Let&apos;s work together to build something extraordinary.
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-3 rounded-lg bg-gradient-to-r from-primary to-accent text-background font-semibold flex items-center gap-2 mx-auto hover:shadow-lg hover:shadow-primary/50 transition-all duration-200"
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
