'use client'

import { motion } from 'framer-motion'
import Header from '@/components/header'
import Footer from '@/components/footer'
import { useEffect, useState } from 'react'
import { blogAPI } from '@/lib/api'
import { Calendar, User, ArrowRight } from 'lucide-react'

interface BlogPost {
  id: number
  title: string
  slug: string
  excerpt?: string
  content: string
  author?: string
  category?: string
  published_at?: string
  created_at?: string
}

const defaultPosts = [
  {
    id: 1,
    title: 'The Future of AI in Enterprise Solutions',
    slug: 'future-of-ai-enterprise',
    excerpt: 'Exploring how AI is revolutionizing enterprise software and creating unprecedented opportunities.',
    author: 'Sarah Johnson',
    category: 'AI & Technology',
    published_at: '2024-05-15T00:00:00Z',
    content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit...',
  },
  {
    id: 2,
    title: 'Cloud Migration Best Practices',
    slug: 'cloud-migration-best-practices',
    excerpt: 'Learn the essential strategies for successfully migrating your infrastructure to the cloud.',
    author: 'Michael Chen',
    category: 'Cloud & DevOps',
    published_at: '2024-05-12T00:00:00Z',
    content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit...',
  },
  {
    id: 3,
    title: 'Building Scalable Architecture',
    slug: 'scalable-architecture',
    excerpt: 'Best practices for designing systems that grow with your business needs.',
    author: 'Emma Davis',
    category: 'Architecture',
    published_at: '2024-05-10T00:00:00Z',
    content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit...',
  },
  {
    id: 4,
    title: 'Cybersecurity Trends 2024',
    slug: 'cybersecurity-trends-2024',
    excerpt: 'Stay ahead of threats with our comprehensive guide to cybersecurity trends.',
    author: 'James Wilson',
    category: 'Security',
    published_at: '2024-05-08T00:00:00Z',
    content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit...',
  },
  {
    id: 5,
    title: 'DevOps Automation Secrets',
    slug: 'devops-automation-secrets',
    excerpt: 'Discover powerful automation techniques to streamline your development pipeline.',
    author: 'Lisa Anderson',
    category: 'DevOps',
    published_at: '2024-05-05T00:00:00Z',
    content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit...',
  },
  {
    id: 6,
    title: 'Blockchain for Business',
    slug: 'blockchain-for-business',
    excerpt: 'Understanding blockchain technology and its practical applications in modern business.',
    author: 'Robert Martinez',
    category: 'Blockchain',
    published_at: '2024-05-01T00:00:00Z',
    content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit...',
  },
]

export default function BlogPage() {
  const [posts, setPosts] = useState<BlogPost[]>([])
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await blogAPI.getAll()
        if (response.data && response.data.length > 0) {
          setPosts(response.data)
        } else {
          setPosts(defaultPosts)
        }
      } catch (error) {
        console.log('Using default posts')
        setPosts(defaultPosts)
      } finally {
        setLoading(false)
      }
    }

    fetchPosts()
  }, [])

  const allPosts = loading ? defaultPosts : posts
  const categories = Array.from(new Set(allPosts.map(p => p.category).filter(Boolean)))
  const filteredPosts = selectedCategory
    ? allPosts.filter(p => p.category === selectedCategory)
    : allPosts

  const formatDate = (dateString?: string) => {
    if (!dateString) return ''
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
  }

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
                Lumora <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">Blog</span>
              </h1>
              <p className="text-xl text-foreground/70 max-w-2xl mx-auto">
                Insights, trends, and best practices from our technology experts. Stay updated with the latest in tech.
              </p>
            </motion.div>
          </div>

          {/* Category Filter */}
          {categories.length > 0 && (
            <div className="max-w-6xl mx-auto mb-12">
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="flex flex-wrap gap-3 justify-center"
              >
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setSelectedCategory(null)}
                  className={`px-6 py-2 rounded-full font-semibold transition-all duration-300 ${
                    selectedCategory === null
                      ? 'bg-gradient-to-r from-primary to-accent text-background shadow-lg shadow-primary/50'
                      : 'border border-primary/30 text-foreground/70 hover:border-primary/50'
                  }`}
                >
                  All Posts
                </motion.button>
                {categories.map((category) => (
                  <motion.button
                    key={category}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setSelectedCategory(category)}
                    className={`px-6 py-2 rounded-full font-semibold transition-all duration-300 ${
                      selectedCategory === category
                        ? 'bg-gradient-to-r from-primary to-accent text-background shadow-lg shadow-primary/50'
                        : 'border border-primary/30 text-foreground/70 hover:border-primary/50'
                    }`}
                  >
                    {category}
                  </motion.button>
                ))}
              </motion.div>
            </div>
          )}

          {/* Featured Post */}
          {filteredPosts.length > 0 && (
            <div className="max-w-6xl mx-auto mb-16">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                whileHover={{ boxShadow: '0 0 40px rgba(0, 212, 255, 0.3)' }}
                className="p-8 rounded-xl border border-primary/20 bg-gradient-to-br from-primary/5 to-accent/5 hover:border-primary/50 transition-all duration-300 cursor-pointer"
              >
                <span className="text-xs font-semibold text-primary bg-primary/10 px-3 py-1 rounded-full">
                  Featured
                </span>
                <h2 className="text-3xl font-bold text-foreground my-4">
                  {filteredPosts[0].title}
                </h2>
                <p className="text-foreground/70 mb-6">
                  {filteredPosts[0].excerpt || filteredPosts[0].content.substring(0, 150)}
                </p>
                <div className="flex flex-wrap gap-6 mb-6 text-sm text-foreground/60">
                  <div className="flex items-center gap-2">
                    <Calendar size={16} />
                    {formatDate(filteredPosts[0].published_at)}
                  </div>
                  {filteredPosts[0].author && (
                    <div className="flex items-center gap-2">
                      <User size={16} />
                      {filteredPosts[0].author}
                    </div>
                  )}
                </div>
                <motion.button
                  whileHover={{ x: 5 }}
                  className="text-primary font-semibold flex items-center gap-2 hover:gap-3 transition-all"
                >
                  Read Article <ArrowRight size={18} />
                </motion.button>
              </motion.div>
            </div>
          )}

          {/* Posts Grid */}
          <div className="max-w-6xl mx-auto">
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {filteredPosts.slice(1).map((post, index) => (
                <motion.div
                  key={post.id || index}
                  variants={itemVariants}
                  whileHover={{ y: -10, boxShadow: '0 0 40px rgba(0, 212, 255, 0.3)' }}
                  className="rounded-xl border border-primary/20 bg-card/50 hover:border-primary/50 transition-all duration-300 cursor-pointer overflow-hidden group"
                >
                  {/* Category Badge */}
                  <div className="h-32 bg-gradient-to-br from-primary/20 to-accent/20 overflow-hidden relative flex items-center justify-center">
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-primary/0 via-accent/20 to-primary/0"
                      animate={{ x: ['-100%', '100%'] }}
                      transition={{ duration: 3, repeat: Infinity }}
                    />
                    {post.category && (
                      <span className="relative text-xs font-semibold text-primary bg-background/80 px-3 py-1 rounded-full">
                        {post.category}
                      </span>
                    )}
                  </div>

                  {/* Post Info */}
                  <div className="p-6">
                    <h3 className="text-lg font-bold text-foreground mb-3 line-clamp-2 group-hover:text-primary transition-colors">
                      {post.title}
                    </h3>

                    <p className="text-foreground/70 text-sm mb-4 line-clamp-2">
                      {post.excerpt || post.content.substring(0, 100)}
                    </p>

                    <div className="flex flex-wrap gap-4 mb-4 text-xs text-foreground/60 border-t border-border pt-4">
                      <div className="flex items-center gap-1">
                        <Calendar size={14} />
                        {formatDate(post.published_at || post.created_at)}
                      </div>
                      {post.author && (
                        <div className="flex items-center gap-1">
                          <User size={14} />
                          {post.author}
                        </div>
                      )}
                    </div>

                    <motion.button
                      whileHover={{ x: 5 }}
                      className="text-primary font-semibold text-sm flex items-center gap-2 hover:gap-3 transition-all"
                    >
                      Read More <ArrowRight size={16} />
                    </motion.button>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            {filteredPosts.length === 0 && (
              <div className="text-center py-12">
                <p className="text-foreground/60 text-lg">No posts found in this category.</p>
              </div>
            )}
          </div>
        </section>

        {/* Newsletter Section */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-card/30">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="max-w-2xl mx-auto text-center"
          >
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Stay Updated
            </h2>
            <p className="text-foreground/70 mb-8">
              Subscribe to our newsletter for the latest insights and technology trends.
            </p>
            <div className="flex gap-3">
              <input
                type="email"
                placeholder="Your email address"
                className="flex-1 px-4 py-3 rounded-lg bg-input border border-border text-foreground placeholder-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-6 py-3 rounded-lg bg-gradient-to-r from-primary to-accent text-background font-semibold hover:shadow-lg hover:shadow-primary/50 transition-all"
              >
                Subscribe
              </motion.button>
            </div>
          </motion.div>
        </section>
      </main>

      <Footer />
    </>
  )
}
