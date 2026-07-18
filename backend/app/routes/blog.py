from flask import request, jsonify
from app.routes import blog_bp
from app.utils.db import query, query_one, execute, execute_returning
from app.utils.auth import token_required

@blog_bp.route('', methods=['GET'])
def get_blog_posts():
    """Get all published blog posts"""
    try:
        posts = query('SELECT * FROM blog_posts WHERE published = true ORDER BY published_at DESC')
        return jsonify(posts), 200
    except Exception as e:
        return jsonify({'message': 'Error fetching blog posts', 'error': str(e)}), 500

@blog_bp.route('/<slug>', methods=['GET'])
def get_blog_post(slug):
    """Get a single blog post by slug"""
    try:
        post = query_one('SELECT * FROM blog_posts WHERE slug = %s AND published = true', (slug,))
        
        if not post:
            return jsonify({'message': 'Blog post not found'}), 404
        
        return jsonify(post), 200
    except Exception as e:
        return jsonify({'message': 'Error fetching blog post', 'error': str(e)}), 500

@blog_bp.route('', methods=['POST'])
@token_required
def create_blog_post():
    """Create a new blog post (admin only)"""
    data = request.get_json()
    
    if not data.get('title') or not data.get('slug') or not data.get('content'):
        return jsonify({'message': 'Missing required fields'}), 400
    
    try:
        post = execute_returning(
            'INSERT INTO blog_posts (title, slug, content, excerpt, author, featured_image_url, category, published, published_at) VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s) RETURNING *',
            (data['title'], data['slug'], data['content'], data.get('excerpt'), data.get('author'),
             data.get('featured_image_url'), data.get('category'), data.get('published', False),
             data.get('published_at') if data.get('published') else None)
        )
        return jsonify(post), 201
    except Exception as e:
        return jsonify({'message': 'Error creating blog post', 'error': str(e)}), 500

@blog_bp.route('/<int:post_id>', methods=['PUT'])
@token_required
def update_blog_post(post_id):
    """Update a blog post (admin only)"""
    data = request.get_json()
    
    try:
        execute(
            'UPDATE blog_posts SET title = %s, slug = %s, content = %s, excerpt = %s, author = %s, featured_image_url = %s, category = %s, published = %s, published_at = %s, updated_at = CURRENT_TIMESTAMP WHERE id = %s',
            (data.get('title'), data.get('slug'), data.get('content'), data.get('excerpt'), data.get('author'),
             data.get('featured_image_url'), data.get('category'), data.get('published', False),
             data.get('published_at') if data.get('published') else None, post_id)
        )
        
        post = query_one('SELECT * FROM blog_posts WHERE id = %s', (post_id,))
        return jsonify(post), 200
    except Exception as e:
        return jsonify({'message': 'Error updating blog post', 'error': str(e)}), 500

@blog_bp.route('/<int:post_id>', methods=['DELETE'])
@token_required
def delete_blog_post(post_id):
    """Delete a blog post (admin only)"""
    try:
        execute('DELETE FROM blog_posts WHERE id = %s', (post_id,))
        return jsonify({'message': 'Blog post deleted successfully'}), 200
    except Exception as e:
        return jsonify({'message': 'Error deleting blog post', 'error': str(e)}), 500
