from flask import request, jsonify
from app.routes import contact_bp
from app.utils.db import query, query_one, execute, execute_returning
from app.utils.auth import token_required

@contact_bp.route('/submit', methods=['POST'])
def submit_contact():
    """Submit a contact form"""
    data = request.get_json()
    
    if not data.get('name') or not data.get('email') or not data.get('message'):
        return jsonify({'message': 'Missing required fields'}), 400
    
    try:
        submission = execute_returning(
            'INSERT INTO contact_submissions (name, email, phone, subject, message) VALUES (%s, %s, %s, %s, %s) RETURNING *',
            (data['name'], data['email'], data.get('phone'), data.get('subject'), data['message'])
        )
        return jsonify({'message': 'Contact form submitted successfully', 'id': submission['id']}), 201
    except Exception as e:
        return jsonify({'message': 'Error submitting contact form', 'error': str(e)}), 500

@contact_bp.route('/submissions', methods=['GET'])
@token_required
def get_contact_submissions():
    """Get all contact submissions (admin only)"""
    try:
        submissions = query('SELECT * FROM contact_submissions ORDER BY created_at DESC')
        return jsonify(submissions), 200
    except Exception as e:
        return jsonify({'message': 'Error fetching submissions', 'error': str(e)}), 500

@contact_bp.route('/submissions/<int:submission_id>', methods=['GET'])
@token_required
def get_contact_submission(submission_id):
    """Get a single contact submission (admin only)"""
    try:
        submission = query_one('SELECT * FROM contact_submissions WHERE id = %s', (submission_id,))
        
        if not submission:
            return jsonify({'message': 'Submission not found'}), 404
        
        # Mark as read
        execute('UPDATE contact_submissions SET read = true WHERE id = %s', (submission_id,))
        submission['read'] = True
        
        return jsonify(submission), 200
    except Exception as e:
        return jsonify({'message': 'Error fetching submission', 'error': str(e)}), 500

@contact_bp.route('/submissions/<int:submission_id>', methods=['DELETE'])
@token_required
def delete_contact_submission(submission_id):
    """Delete a contact submission (admin only)"""
    try:
        execute('DELETE FROM contact_submissions WHERE id = %s', (submission_id,))
        return jsonify({'message': 'Submission deleted successfully'}), 200
    except Exception as e:
        return jsonify({'message': 'Error deleting submission', 'error': str(e)}), 500
