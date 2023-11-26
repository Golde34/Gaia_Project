from flask import Flask
from flask_cors import CORS

app = Flask(__name__)
cors = CORS(app)

CORS(app, resources={r"/*": {"origins": "*"}})
from controllers import auth_service_controller, task_manager_controller, client_gui_controller