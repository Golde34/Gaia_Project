from flask import Flask
from flask_cors import CORS

app = Flask(__name__)
cors = CORS(app)

CORS(app, resources={r"/*": {"origins": "*"}})

from ui.rest import middleware_loader_controller, auth_service_controller, task_manager_controller