import psycopg2
from psycopg2.extras import RealDictCursor
import os
from urllib.parse import urlparse

def get_db_connection():
    """Get a database connection from Neon"""
    db_url = os.environ.get('DATABASE_URL')
    if not db_url:
        raise Exception('DATABASE_URL not set')
    
    # Parse the connection URL
    parsed = urlparse(db_url)
    
    conn = psycopg2.connect(
        host=parsed.hostname,
        database=parsed.path.lstrip('/'),
        user=parsed.username,
        password=parsed.password,
        port=parsed.port or 5432,
        sslmode='require'
    )
    return conn

def query(sql, params=None):
    """Execute a SELECT query and return results"""
    conn = get_db_connection()
    cur = conn.cursor(cursor_factory=RealDictCursor)
    try:
        cur.execute(sql, params or ())
        results = cur.fetchall()
        return [dict(row) for row in results]
    finally:
        cur.close()
        conn.close()

def query_one(sql, params=None):
    """Execute a SELECT query and return a single result"""
    results = query(sql, params)
    return results[0] if results else None

def execute(sql, params=None):
    """Execute an INSERT/UPDATE/DELETE query"""
    conn = get_db_connection()
    cur = conn.cursor()
    try:
        cur.execute(sql, params or ())
        conn.commit()
        return True
    except Exception as e:
        conn.rollback()
        raise e
    finally:
        cur.close()
        conn.close()

def execute_returning(sql, params=None):
    """Execute an INSERT/UPDATE query and return the inserted/updated row"""
    conn = get_db_connection()
    cur = conn.cursor(cursor_factory=RealDictCursor)
    try:
        cur.execute(sql, params or ())
        result = cur.fetchone()
        conn.commit()
        return dict(result) if result else None
    except Exception as e:
        conn.rollback()
        raise e
    finally:
        cur.close()
        conn.close()
