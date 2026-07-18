import os
from app import create_app

app = create_app()

if __name__ == '__main__':
    # Get host and port from environment variables
    host = os.environ.get('FLASK_HOST', '0.0.0.0')
    port = int(os.environ.get('FLASK_PORT', 5000))
    debug = os.environ.get('FLASK_ENV') == 'development'
    
    app.run(host=host, port=port, debug=debug)
