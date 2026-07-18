from flask import Blueprint

auth_bp = Blueprint('auth', __name__)
services_bp = Blueprint('services', __name__)
projects_bp = Blueprint('projects', __name__)
blog_bp = Blueprint('blog', __name__)
jobs_bp = Blueprint('jobs', __name__)
testimonials_bp = Blueprint('testimonials', __name__)
contact_bp = Blueprint('contact', __name__)

from app.routes.auth import *
from app.routes.services import *
from app.routes.projects import *
from app.routes.blog import *
from app.routes.jobs import *
from app.routes.testimonials import *
from app.routes.contact import *
