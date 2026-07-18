from flask import request, jsonify
from app.routes import projects_bp
from app.utils.db import query, query_one, execute, execute_returning
from app.utils.auth import token_required

@projects_bp.route('', methods=['GET'])
def get_projects():
    """Get all projects with optional filtering"""
    try:
        category = request.args.get('category')
        featured = request.args.get('featured')
        
        sql = 'SELECT * FROM projects'
        params = []
        
        conditions = []
        if category:
            conditions.append('category = %s')
            params.append(category)
        if featured == 'true':
            conditions.append('featured = true')
        
        if conditions:
            sql += ' WHERE ' + ' AND '.join(conditions)
        
        sql += ' ORDER BY order_index ASC'
        
        projects = query(sql, params)
        
        # Get images for each project
        for project in projects:
            images = query('SELECT * FROM project_images WHERE project_id = %s ORDER BY order_index ASC', (project['id'],))
            project['images'] = images
        
        return jsonify(projects), 200
    except Exception as e:
        return jsonify({'message': 'Error fetching projects', 'error': str(e)}), 500

@projects_bp.route('/<slug>', methods=['GET'])
def get_project(slug):
    """Get a single project by slug"""
    try:
        project = query_one('SELECT * FROM projects WHERE slug = %s', (slug,))
        
        if not project:
            return jsonify({'message': 'Project not found'}), 404
        
        images = query('SELECT * FROM project_images WHERE project_id = %s ORDER BY order_index ASC', (project['id'],))
        project['images'] = images
        
        return jsonify(project), 200
    except Exception as e:
        return jsonify({'message': 'Error fetching project', 'error': str(e)}), 500

@projects_bp.route('', methods=['POST'])
@token_required
def create_project():
    """Create a new project (admin only)"""
    data = request.get_json()
    
    if not data.get('title') or not data.get('slug') or not data.get('description'):
        return jsonify({'message': 'Missing required fields'}), 400
    
    try:
        project = execute_returning(
            'INSERT INTO projects (title, slug, description, short_description, thumbnail_url, status, client_name, category, featured, order_index) VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s) RETURNING *',
            (data['title'], data['slug'], data['description'], data.get('short_description'), data.get('thumbnail_url'), 
             data.get('status', 'completed'), data.get('client_name'), data.get('category'), data.get('featured', False), data.get('order_index', 0))
        )
        
        project['images'] = []
        return jsonify(project), 201
    except Exception as e:
        return jsonify({'message': 'Error creating project', 'error': str(e)}), 500

@projects_bp.route('/<int:project_id>', methods=['PUT'])
@token_required
def update_project(project_id):
    """Update a project (admin only)"""
    data = request.get_json()
    
    try:
        execute(
            'UPDATE projects SET title = %s, slug = %s, description = %s, short_description = %s, thumbnail_url = %s, status = %s, client_name = %s, category = %s, featured = %s, order_index = %s, updated_at = CURRENT_TIMESTAMP WHERE id = %s',
            (data.get('title'), data.get('slug'), data.get('description'), data.get('short_description'), data.get('thumbnail_url'),
             data.get('status'), data.get('client_name'), data.get('category'), data.get('featured', False), data.get('order_index', 0), project_id)
        )
        
        project = query_one('SELECT * FROM projects WHERE id = %s', (project_id,))
        images = query('SELECT * FROM project_images WHERE project_id = %s ORDER BY order_index ASC', (project_id,))
        project['images'] = images
        
        return jsonify(project), 200
    except Exception as e:
        return jsonify({'message': 'Error updating project', 'error': str(e)}), 500

@projects_bp.route('/<int:project_id>', methods=['DELETE'])
@token_required
def delete_project(project_id):
    """Delete a project (admin only)"""
    try:
        execute('DELETE FROM projects WHERE id = %s', (project_id,))
        return jsonify({'message': 'Project deleted successfully'}), 200
    except Exception as e:
        return jsonify({'message': 'Error deleting project', 'error': str(e)}), 500

@projects_bp.route('/<int:project_id>/images', methods=['POST'])
@token_required
def add_project_image(project_id):
    """Add an image to a project"""
    data = request.get_json()
    
    if not data.get('image_url'):
        return jsonify({'message': 'Missing image_url'}), 400
    
    try:
        image = execute_returning(
            'INSERT INTO project_images (project_id, image_url, caption, order_index) VALUES (%s, %s, %s, %s) RETURNING *',
            (project_id, data['image_url'], data.get('caption'), data.get('order_index', 0))
        )
        return jsonify(image), 201
    except Exception as e:
        return jsonify({'message': 'Error adding image', 'error': str(e)}), 500
