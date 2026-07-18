from flask import request, jsonify
from app.routes import testimonials_bp
from app.utils.db import query, query_one, execute, execute_returning
from app.utils.auth import token_required

@testimonials_bp.route('', methods=['GET'])
def get_testimonials():
    """Get all testimonials"""
    try:
        testimonials = query('SELECT * FROM testimonials ORDER BY order_index ASC')
        return jsonify(testimonials), 200
    except Exception as e:
        return jsonify({'message': 'Error fetching testimonials', 'error': str(e)}), 500

@testimonials_bp.route('/<int:testimonial_id>', methods=['GET'])
def get_testimonial(testimonial_id):
    """Get a single testimonial"""
    try:
        testimonial = query_one('SELECT * FROM testimonials WHERE id = %s', (testimonial_id,))
        
        if not testimonial:
            return jsonify({'message': 'Testimonial not found'}), 404
        
        return jsonify(testimonial), 200
    except Exception as e:
        return jsonify({'message': 'Error fetching testimonial', 'error': str(e)}), 500

@testimonials_bp.route('', methods=['POST'])
@token_required
def create_testimonial():
    """Create a new testimonial (admin only)"""
    data = request.get_json()
    
    if not data.get('author_name') or not data.get('content'):
        return jsonify({'message': 'Missing required fields'}), 400
    
    try:
        testimonial = execute_returning(
            'INSERT INTO testimonials (author_name, author_title, author_company, content, rating, order_index) VALUES (%s, %s, %s, %s, %s, %s) RETURNING *',
            (data['author_name'], data.get('author_title'), data.get('author_company'),
             data['content'], data.get('rating', 5), data.get('order_index', 0))
        )
        return jsonify(testimonial), 201
    except Exception as e:
        return jsonify({'message': 'Error creating testimonial', 'error': str(e)}), 500

@testimonials_bp.route('/<int:testimonial_id>', methods=['PUT'])
@token_required
def update_testimonial(testimonial_id):
    """Update a testimonial (admin only)"""
    data = request.get_json()
    
    try:
        execute(
            'UPDATE testimonials SET author_name = %s, author_title = %s, author_company = %s, content = %s, rating = %s, order_index = %s, updated_at = CURRENT_TIMESTAMP WHERE id = %s',
            (data.get('author_name'), data.get('author_title'), data.get('author_company'),
             data.get('content'), data.get('rating', 5), data.get('order_index', 0), testimonial_id)
        )
        
        testimonial = query_one('SELECT * FROM testimonials WHERE id = %s', (testimonial_id,))
        return jsonify(testimonial), 200
    except Exception as e:
        return jsonify({'message': 'Error updating testimonial', 'error': str(e)}), 500

@testimonials_bp.route('/<int:testimonial_id>', methods=['DELETE'])
@token_required
def delete_testimonial(testimonial_id):
    """Delete a testimonial (admin only)"""
    try:
        execute('DELETE FROM testimonials WHERE id = %s', (testimonial_id,))
        return jsonify({'message': 'Testimonial deleted successfully'}), 200
    except Exception as e:
        return jsonify({'message': 'Error deleting testimonial', 'error': str(e)}), 500
