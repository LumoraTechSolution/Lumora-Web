# Lumora Technologies - Next-Level Website

A modern, high-performance website for Lumora Technologies built with cutting-edge web technologies and stunning animations.

## Features

- **🎨 Modern Design**: Dark theme with cyan/blue accents, cyberpunk aesthetic
- **✨ Advanced Animations**: Framer Motion-powered scroll triggers, parallax effects, and smooth transitions
- **📱 Responsive**: Mobile-first design that works seamlessly across all devices
- **⚡ High Performance**: Optimized for speed with Next.js 16 and server-side rendering
- **🔐 Secure Backend**: Flask API with JWT authentication and password hashing
- **📊 Admin Dashboard**: Content management system for projects, blog, jobs, and more
- **🗄️ Database**: PostgreSQL with Neon for scalable data storage
- **🔗 API-Driven**: RESTful API endpoints for all operations

## Tech Stack

### Frontend
- **Next.js 16** - React framework with App Router
- **Framer Motion** - Animation library
- **Tailwind CSS** - Utility-first CSS framework
- **TypeScript** - Type-safe JavaScript
- **Axios** - HTTP client

### Backend
- **Flask** - Python web framework
- **PostgreSQL** - Database (via Neon)
- **JWT** - Authentication tokens
- **bcrypt** - Password hashing
- **CORS** - Cross-origin support

### Deployment
- **Vercel** - Frontend hosting
- **Render/Railway/Heroku** - Backend hosting (optional)

## Project Structure

```
lumora-website/
├── app/                          # Next.js app directory
│   ├── page.tsx                 # Homepage
│   ├── services/                # Services page
│   ├── portfolio/               # Portfolio/Projects page
│   ├── blog/                    # Blog listing
│   ├── careers/                 # Jobs page
│   ├── contact/                 # Contact form
│   ├── admin/                   # Admin section
│   │   ├── login/              # Admin login
│   │   └── dashboard/          # Content management
│   ├── layout.tsx              # Root layout
│   └── globals.css             # Global styles
│
├── components/                  # React components
│   ├── header.tsx              # Navigation header
│   ├── footer.tsx              # Footer
│   ├── animated-button.tsx      # Animated button component
│   ├── animated-counter.tsx     # Counter animation
│   ├── gradient-text.tsx        # Gradient text effect
│   ├── parallax.tsx             # Parallax scroll effect
│   └── scroll-trigger.tsx       # Scroll trigger animation
│
├── lib/                         # Utilities
│   └── api.ts                  # API client and endpoints
│
├── backend/                     # Flask backend
│   ├── app/
│   │   ├── __init__.py         # Flask app factory
│   │   ├── routes/             # API route handlers
│   │   │   ├── auth.py        # Authentication
│   │   │   ├── services.py    # Services endpoints
│   │   │   ├── projects.py    # Projects endpoints
│   │   │   ├── blog.py        # Blog endpoints
│   │   │   ├── jobs.py        # Jobs endpoints
│   │   │   ├── testimonials.py # Testimonials
│   │   │   └── contact.py     # Contact form
│   │   └── utils/              # Helper functions
│   │       ├── db.py          # Database utilities
│   │       └── auth.py        # Authentication utilities
│   ├── run.py                  # Flask entry point
│   └── requirements.txt        # Python dependencies
│
├── public/                      # Static assets
├── package.json                # Node dependencies
└── README.md                    # This file
```

## Getting Started

### Prerequisites
- Node.js 18+
- Python 3.8+
- PostgreSQL (or Neon account)

### Frontend Setup

1. **Clone and Install Dependencies**
```bash
cd /vercel/share/v0-project
pnpm install
```

2. **Set Environment Variables**
```bash
cp .env.local.example .env.local
# Edit .env.local with your API URL
```

3. **Run Development Server**
```bash
pnpm dev
```

The frontend will be available at `http://localhost:3000`

### Backend Setup

1. **Install Dependencies**
```bash
cd backend
pip install -r requirements.txt
```

2. **Set Environment Variables**
```bash
cp .env.example .env
# Edit .env with your database URL and secrets
```

3. **Required Environment Variables**
```env
DATABASE_URL=postgresql://user:password@host:5432/lumora_db
SECRET_KEY=your-secret-key-change-in-production
JWT_SECRET_KEY=your-jwt-secret-key-change-in-production
FLASK_ENV=development
FLASK_HOST=0.0.0.0
FLASK_PORT=5000
FRONTEND_URL=http://localhost:3000
```

4. **Run Flask Server**
```bash
python run.py
```

The backend API will be available at `http://localhost:5000`

## Database Setup

The database schema is automatically created using the SQL migration in `backend/requirements`. The schema includes:

- **admin_users** - Administrator accounts
- **services** - Service offerings
- **service_tech_stacks** - Technologies per service
- **projects** - Portfolio projects
- **project_images** - Project images
- **blog_posts** - Blog articles
- **job_openings** - Career opportunities
- **testimonials** - Client testimonials
- **contact_submissions** - Contact form submissions

## API Endpoints

### Authentication
- `POST /api/auth/register` - Create admin account
- `POST /api/auth/login` - Admin login
- `GET /api/auth/verify` - Verify token

### Services
- `GET /api/services` - Get all services
- `GET /api/services/<slug>` - Get specific service
- `POST /api/services` - Create service (admin)
- `PUT /api/services/<id>` - Update service (admin)
- `DELETE /api/services/<id>` - Delete service (admin)

### Projects
- `GET /api/projects` - Get all projects
- `GET /api/projects/<slug>` - Get specific project
- `POST /api/projects` - Create project (admin)
- `PUT /api/projects/<id>` - Update project (admin)
- `DELETE /api/projects/<id>` - Delete project (admin)
- `POST /api/projects/<id>/images` - Add project image (admin)

### Blog
- `GET /api/blog` - Get all published posts
- `GET /api/blog/<slug>` - Get specific post
- `POST /api/blog` - Create post (admin)
- `PUT /api/blog/<id>` - Update post (admin)
- `DELETE /api/blog/<id>` - Delete post (admin)

### Jobs
- `GET /api/jobs` - Get all job openings
- `GET /api/jobs/<slug>` - Get specific job
- `POST /api/jobs` - Create job (admin)
- `PUT /api/jobs/<id>` - Update job (admin)
- `DELETE /api/jobs/<id>` - Delete job (admin)

### Contact
- `POST /api/contact/submit` - Submit contact form
- `GET /api/contact/submissions` - Get all submissions (admin)
- `GET /api/contact/submissions/<id>` - Get specific submission (admin)
- `DELETE /api/contact/submissions/<id>` - Delete submission (admin)

## Admin Dashboard

Access the admin panel at `/admin/login`

**Features:**
- Content management for all data types
- Dashboard with quick statistics
- Message inbox for contact submissions
- Secure authentication with JWT tokens

## Deployment

### Frontend (Vercel)

1. Push code to GitHub
2. Connect repository to Vercel
3. Set environment variables in Vercel dashboard
4. Deploy automatically on push

### Backend (Render/Railway/Heroku)

1. Create account on your chosen platform
2. Connect GitHub repository
3. Set environment variables
4. Deploy Flask application
5. Get production URL
6. Update frontend `NEXT_PUBLIC_API_URL` to production backend URL

## Performance Optimizations

- Server-side rendering for SEO
- Image optimization with Next.js Image component
- Code splitting and lazy loading
- CSS-in-JS for minimal CSS file sizes
- Database indexing for fast queries
- Redis caching ready (can be added to Flask)
- CDN support via Vercel

## Security Features

- JWT-based authentication
- Password hashing with bcrypt
- CORS enabled for API access control
- Environment variables for secrets
- SQL injection prevention with parameterized queries
- Rate limiting ready (can be added to Flask)
- HTTPS ready for production

## Animations & Effects

- **Hero Section**: Floating background blobs with parallax
- **Scroll Triggers**: Elements animate in as they come into view
- **Hover Effects**: Cards lift and glow on hover
- **Button Animations**: Scale and shadow effects
- **Page Transitions**: Smooth fade and slide animations
- **Gradient Text**: Animated gradient text effects
- **Pulse Glow**: Pulsing shadow effects

## Customization

### Colors
Edit the design tokens in `app/globals.css`:
```css
--primary: #00d4ff;      /* Cyan */
--accent: #00ffff;       /* Bright Cyan */
--secondary: #0066cc;    /* Blue */
```

### Fonts
Modify font imports in `app/layout.tsx` to use different Google Fonts or system fonts.

### Content
Use the admin dashboard to manage all content or update database directly.

## Troubleshooting

### API Connection Issues
1. Ensure Flask server is running on port 5000
2. Check `NEXT_PUBLIC_API_URL` in `.env.local`
3. Verify CORS settings in Flask `__init__.py`

### Authentication Problems
1. Make sure admin account exists in database
2. Check JWT_SECRET_KEY is set correctly
3. Verify token expiry settings

### Database Errors
1. Ensure PostgreSQL is running
2. Check DATABASE_URL format
3. Run migrations if needed

## Support

For issues or questions:
- Check the documentation in this README
- Review API endpoint implementations in `backend/app/routes/`
- Inspect browser console for frontend errors
- Check Flask logs for backend errors

## License

This project is proprietary to Lumora Technologies.

## Contact

**Lumora Technologies**
- Email: hello@lumora.tech
- Phone: +1 (234) 567-890
- Address: San Francisco, CA 94105
