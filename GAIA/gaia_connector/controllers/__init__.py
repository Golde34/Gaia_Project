from flask import Flask
from flask_cors import CORS

app = Flask(__name__)
cors = CORS(app)

from controllers import auth_service_controller, task_manager_controller