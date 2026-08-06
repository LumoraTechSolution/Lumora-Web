'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { Mail, Phone, MapPin, Linkedin, Twitter, Github } from 'lucide-react'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  const footerSections = [
    {
      title: 'Company',
      links: [
        { label: 'About', href: '/about' },
        { label: 'Services', href: '/services' },
        { label: 'Portfolio', href: '/portfolio' },
        { label: 'Blog', href: '/blog' },
      ],
    },
    {
      title: 'Resources',
      links: [
        { label: 'Documentation', href: '#' },
        { label: 'API Docs', href: '#' },
        { label: 'Status', href: '#' },
        { label: 'Support', href: '#' },
      ],
    },
    {
      title: 'Legal',
      links: [
        { label: 'Privacy', href: '#' },
        { label: 'Terms', href: '#' },
        { label: 'Cookie Policy', href: '#' },
      ],
    },
  ]

  const socialLinks = [
    { icon: Linkedin, href: '#', label: 'LinkedIn' },
    { icon: Twitter, href: '#', label: 'Twitter' },
    { icon: Github, href: '#', label: 'GitHub' },
  ]

  return (
    <footer className="bg-muted border-t border-border mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8 mb-12">
          {/* Brand */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <img src="/logo.png" alt="Lumora Technologies logo" className="w-10 h-10 object-contain" />
              <span className="font-bold text-lg text-foreground">Lumora</span>
            </div>
            <p className="text-foreground/60 text-sm mb-4">
              Next-generation technology solutions for modern businesses.
            </p>
            <div className="flex gap-3">
              {socialLinks.map((social) => {
                const Icon = social.icon
                return (
                  <motion.a
                    key={social.label}
                    href={social.href}
                    whileHover={{ scale: 1.2 }}
                    whileTap={{ scale: 0.9 }}
                    className="p-2 rounded-lg bg-muted text-primary hover:bg-primary hover:text-background transition-all duration-200"
                  >
                    <Icon size={18} />
                  </motion.a>
                )
              })}
            </div>
          </div>

          {/* Links */}
          {footerSections.map((section) => (
            <div key={section.title}>
              <h3 className="text-foreground font-semibold text-sm mb-4">
                {section.title}
              </h3>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-foreground/60 hover:text-primary text-sm transition-colors duration-200"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Contact Info */}
        <div className="border-t border-border pt-8 mb-8">
          <h3 className="text-foreground font-semibold text-sm mb-4">Contact</h3>
          <div className="flex flex-col gap-3">
            <a
              href="mailto:hello@lumora.tech"
              className="flex items-center gap-2 text-foreground/60 hover:text-primary text-sm transition-colors"
            >
              <Mail size={16} />
              hello@lumora.tech
            </a>
            <a
              href="tel:+1234567890"
              className="flex items-center gap-2 text-foreground/60 hover:text-primary text-sm transition-colors"
            >
              <Phone size={16} />
              +1 (234) 567-890
            </a>
            <div className="flex items-center gap-2 text-foreground/60 text-sm">
              <MapPin size={16} />
              San Francisco, CA 94105
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-border pt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-foreground/50 text-xs">
            &copy; {currentYear} Lumora Technologies. All rights reserved.
          </p>
          <div className="text-foreground/50 text-xs">
            Made by Lumora Team
          </div>
        </div>
      </div>
    </footer>
  )
}
