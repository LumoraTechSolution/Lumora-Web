from flask import request, jsonify
from app.routes import services_bp
from app.utils.db import query, query_one, execute, execute_returning
from app.utils.auth import token_required

@services_bp.route('', methods=['GET'])
def get_services():
    """Get all services"""
    try:
        services = query('SELECT * FROM services ORDER BY order_index ASC')
        
        # Get tech stacks for each service
        for service in services:
            techs = query('SELECT tech_name FROM service_tech_stacks WHERE service_id = %s', (service['id'],))
            service['technologies'] = [tech['tech_name'] for tech in techs]
        
        return jsonify(services), 200
    except Exception as e:
        return jsonify({'message': 'Error fetching services', 'error': str(e)}), 500

@services_bp.route('/<slug>', methods=['GET'])
def get_service(slug):
    """Get a single service by slug"""
    try:
        service = query_one('SELECT * FROM services WHERE slug = %s', (slug,))
        
        if not service:
            return jsonify({'message': 'Service not found'}), 404
        
        techs = query('SELECT tech_name FROM service_tech_stacks WHERE service_id = %s', (service['id'],))
        service['technologies'] = [tech['tech_name'] for tech in techs]
        
        return jsonify(service), 200
    except Exception as e:
        return jsonify({'message': 'Error fetching service', 'error': str(e)}), 500

@services_bp.route('', methods=['POST'])
@token_required
def create_service():
    """Create a new service (admin only)"""
    data = request.get_json()
    
    if not data.get('title') or not data.get('slug') or not data.get('description'):
        return jsonify({'message': 'Missing required fields'}), 400
    
    try:
        service = execute_returning(
            'INSERT INTO services (title, slug, description, short_description, icon_url, order_index) VALUES (%s, %s, %s, %s, %s, %s) RETURNING *',
            (data['title'], data['slug'], data['description'], data.get('short_description'), data.get('icon_url'), data.get('order_index', 0))
        )
        
        # Add technologies if provided
        if data.get('technologies'):
            for tech in data['technologies']:
                execute('INSERT INTO service_tech_stacks (service_id, tech_name) VALUES (%s, %s)', (service['id'], tech))
            
            techs = query('SELECT tech_name FROM service_tech_stacks WHERE service_id = %s', (service['id'],))
            service['technologies'] = [tech['tech_name'] for tech in techs]
        else:
            service['technologies'] = []
        
        return jsonify(service), 201
    except Exception as e:
        return jsonify({'message': 'Error creating service', 'error': str(e)}), 500

@services_bp.route('/<int:service_id>', methods=['PUT'])
@token_required
def update_service(service_id):
    """Update a service (admin only)"""
    data = request.get_json()
    
    try:
        execute(
            'UPDATE services SET title = %s, slug = %s, description = %s, short_description = %s, icon_url = %s, order_index = %s, updated_at = CURRENT_TIMESTAMP WHERE id = %s',
            (data.get('title'), data.get('slug'), data.get('description'), data.get('short_description'), data.get('icon_url'), data.get('order_index', 0), service_id)
        )
        
        # Update technologies if provided
        if 'technologies' in data:
            execute('DELETE FROM service_tech_stacks WHERE service_id = %s', (service_id,))
            for tech in data['technologies']:
                execute('INSERT INTO service_tech_stacks (service_id, tech_name) VALUES (%s, %s)', (service_id, tech))
        
        service = query_one('SELECT * FROM services WHERE id = %s', (service_id,))
        techs = query('SELECT tech_name FROM service_tech_stacks WHERE service_id = %s', (service_id,))
        service['technologies'] = [tech['tech_name'] for tech in techs]
        
        return jsonify(service), 200
    except Exception as e:
        return jsonify({'message': 'Error updating service', 'error': str(e)}), 500

@services_bp.route('/<int:service_id>', methods=['DELETE'])
@token_required
def delete_service(service_id):
    """Delete a service (admin only)"""
    try:
        execute('DELETE FROM services WHERE id = %s', (service_id,))
        return jsonify({'message': 'Service deleted successfully'}), 200
    except Exception as e:
        return jsonify({'message': 'Error deleting service', 'error': str(e)}), 500
