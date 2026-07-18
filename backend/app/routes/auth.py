from flask import request, jsonify
from app.routes import auth_bp
from app.utils.db import query_one, execute_returning
from app.utils.auth import hash_password, verify_password, create_access_token, token_required

@auth_bp.route('/register', methods=['POST'])
def register():
    """Register a new admin user"""
    data = request.get_json()
    
    if not data.get('email') or not data.get('password') or not data.get('name'):
        return jsonify({'message': 'Missing required fields'}), 400
    
    # Check if user already exists
    existing_user = query_one('SELECT id FROM admin_users WHERE email = %s', (data['email'],))
    if existing_user:
        return jsonify({'message': 'User already exists'}), 409
    
    # Create new user
    password_hash = hash_password(data['password'])
    
    try:
        new_user = execute_returning(
            'INSERT INTO admin_users (email, password_hash, name, role) VALUES (%s, %s, %s, %s) RETURNING id, email, name, role',
            (data['email'], password_hash, data['name'], 'admin')
        )
        
        if new_user:
            token = create_access_token(new_user['id'], new_user['email'])
            return jsonify({
                'message': 'User created successfully',
                'user': {
                    'id': new_user['id'],
                    'email': new_user['email'],
                    'name': new_user['name'],
                    'role': new_user['role']
                },
                'token': token
            }), 201
    except Exception as e:
        return jsonify({'message': 'Error creating user', 'error': str(e)}), 500

@auth_bp.route('/login', methods=['POST'])
def login():
    """Login admin user"""
    data = request.get_json()
    
    if not data.get('email') or not data.get('password'):
        return jsonify({'message': 'Missing email or password'}), 400
    
    user = query_one('SELECT id, email, name, role, password_hash FROM admin_users WHERE email = %s', (data['email'],))
    
    if not user:
        return jsonify({'message': 'Invalid credentials'}), 401
    
    if not verify_password(data['password'], user['password_hash']):
        return jsonify({'message': 'Invalid credentials'}), 401
    
    token = create_access_token(user['id'], user['email'])
    
    return jsonify({
        'message': 'Login successful',
        'user': {
            'id': user['id'],
            'email': user['email'],
            'name': user['name'],
            'role': user['role']
        },
        'token': token
    }), 200

@auth_bp.route('/verify', methods=['GET'])
@token_required
def verify():
    """Verify if token is valid"""
    return jsonify({
        'message': 'Token is valid',
        'user_id': request.user_id,
        'email': request.user_email
    }), 200
