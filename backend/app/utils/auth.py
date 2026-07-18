import jwt
import bcrypt
import os
from datetime import datetime, timedelta
from functools import wraps
from flask import request, jsonify

def hash_password(password):
    """Hash a password using bcrypt"""
    return bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt()).decode('utf-8')

def verify_password(password, hash_password):
    """Verify a password against its hash"""
    return bcrypt.checkpw(password.encode('utf-8'), hash_password.encode('utf-8'))

def create_access_token(user_id, user_email, expires_delta=None):
    """Create a JWT token"""
    if expires_delta is None:
        expires_delta = timedelta(hours=24)
    
    expire = datetime.utcnow() + expires_delta
    payload = {
        'user_id': user_id,
        'email': user_email,
        'exp': expire
    }
    
    token = jwt.encode(
        payload,
        os.environ.get('JWT_SECRET_KEY', 'jwt-secret-key-change-in-production'),
        algorithm='HS256'
    )
    return token

def verify_token(token):
    """Verify a JWT token"""
    try:
        payload = jwt.decode(
            token,
            os.environ.get('JWT_SECRET_KEY', 'jwt-secret-key-change-in-production'),
            algorithms=['HS256']
        )
        return payload
    except jwt.ExpiredSignatureError:
        return None
    except jwt.InvalidTokenError:
        return None

def token_required(f):
    """Decorator to protect routes with JWT"""
    @wraps(f)
    def decorated(*args, **kwargs):
        token = None
        
        if 'Authorization' in request.headers:
            auth_header = request.headers['Authorization']
            try:
                token = auth_header.split(" ")[1]
            except IndexError:
                return jsonify({'message': 'Invalid token format'}), 401
        
        if not token:
            return jsonify({'message': 'Token is missing'}), 401
        
        payload = verify_token(token)
        if not payload:
            return jsonify({'message': 'Invalid or expired token'}), 401
        
        request.user_id = payload.get('user_id')
        request.user_email = payload.get('email')
        return f(*args, **kwargs)
    
    return decorated
