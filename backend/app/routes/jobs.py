from flask import request, jsonify
from app.routes import jobs_bp
from app.utils.db import query, query_one, execute, execute_returning
from app.utils.auth import token_required

@jobs_bp.route('', methods=['GET'])
def get_job_openings():
    """Get all active job openings"""
    try:
        jobs = query('SELECT * FROM job_openings WHERE active = true ORDER BY created_at DESC')
        return jsonify(jobs), 200
    except Exception as e:
        return jsonify({'message': 'Error fetching job openings', 'error': str(e)}), 500

@jobs_bp.route('/<slug>', methods=['GET'])
def get_job_opening(slug):
    """Get a single job opening by slug"""
    try:
        job = query_one('SELECT * FROM job_openings WHERE slug = %s', (slug,))
        
        if not job:
            return jsonify({'message': 'Job opening not found'}), 404
        
        return jsonify(job), 200
    except Exception as e:
        return jsonify({'message': 'Error fetching job opening', 'error': str(e)}), 500

@jobs_bp.route('', methods=['POST'])
@token_required
def create_job_opening():
    """Create a new job opening (admin only)"""
    data = request.get_json()
    
    if not data.get('title') or not data.get('slug') or not data.get('description'):
        return jsonify({'message': 'Missing required fields'}), 400
    
    try:
        job = execute_returning(
            'INSERT INTO job_openings (title, slug, description, location, job_type, salary_range, requirements, active) VALUES (%s, %s, %s, %s, %s, %s, %s, %s) RETURNING *',
            (data['title'], data['slug'], data['description'], data.get('location'),
             data.get('job_type'), data.get('salary_range'), data.get('requirements'), data.get('active', True))
        )
        return jsonify(job), 201
    except Exception as e:
        return jsonify({'message': 'Error creating job opening', 'error': str(e)}), 500

@jobs_bp.route('/<int:job_id>', methods=['PUT'])
@token_required
def update_job_opening(job_id):
    """Update a job opening (admin only)"""
    data = request.get_json()
    
    try:
        execute(
            'UPDATE job_openings SET title = %s, slug = %s, description = %s, location = %s, job_type = %s, salary_range = %s, requirements = %s, active = %s, updated_at = CURRENT_TIMESTAMP WHERE id = %s',
            (data.get('title'), data.get('slug'), data.get('description'), data.get('location'),
             data.get('job_type'), data.get('salary_range'), data.get('requirements'), data.get('active', True), job_id)
        )
        
        job = query_one('SELECT * FROM job_openings WHERE id = %s', (job_id,))
        return jsonify(job), 200
    except Exception as e:
        return jsonify({'message': 'Error updating job opening', 'error': str(e)}), 500

@jobs_bp.route('/<int:job_id>', methods=['DELETE'])
@token_required
def delete_job_opening(job_id):
    """Delete a job opening (admin only)"""
    try:
        execute('DELETE FROM job_openings WHERE id = %s', (job_id,))
        return jsonify({'message': 'Job opening deleted successfully'}), 200
    except Exception as e:
        return jsonify({'message': 'Error deleting job opening', 'error': str(e)}), 500
