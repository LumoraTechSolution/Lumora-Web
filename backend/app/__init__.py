from flask import Flask
from flask_cors import CORS
import os
from datetime import timedelta

def create_app():
    app = Flask(__name__)
    
    # Configuration
    app.config['SECRET_KEY'] = os.environ.get('SECRET_KEY', 'your-secret-key-change-in-production')
    app.config['JWT_SECRET_KEY'] = os.environ.get('JWT_SECRET_KEY', 'jwt-secret-key-change-in-production')
    app.config['JWT_ACCESS_TOKEN_EXPIRES'] = timedelta(hours=24)
    app.config['DATABASE_URL'] = os.environ.get('DATABASE_URL')
    
    # CORS configuration
    CORS(app, resources={
        r"/api/*": {
            "origins": ["http://localhost:3000", "http://localhost:5000", os.environ.get('FRONTEND_URL', 'http://localhost:3000')],
            "methods": ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
            "allow_headers": ["Content-Type", "Authorization"]
        }
    })
    
    # Register blueprints
    from app.routes import auth_bp, services_bp, projects_bp, blog_bp, jobs_bp, testimonials_bp, contact_bp
    
    app.register_blueprint(auth_bp, url_prefix='/api/auth')
    app.register_blueprint(services_bp, url_prefix='/api/services')
    app.register_blueprint(projects_bp, url_prefix='/api/projects')
    app.register_blueprint(blog_bp, url_prefix='/api/blog')
    app.register_blueprint(jobs_bp, url_prefix='/api/jobs')
    app.register_blueprint(testimonials_bp, url_prefix='/api/testimonials')
    app.register_blueprint(contact_bp, url_prefix='/api/contact')
    
    @app.route('/api/health', methods=['GET'])
    def health():
        return {'status': 'ok', 'message': 'Lumora API is running'}, 200
    
    return app
