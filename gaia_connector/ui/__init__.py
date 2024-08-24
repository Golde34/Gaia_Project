from flask import Flask
from flask_cors import CORS
from flask_kafka import FlaskKafka
from pathlib import Path


app = Flask(__name__)
app.config["KAFKA_CONFIG"] = {'bootstrap.servers': 'localhost:9094',
                               'group.id': 'gaia-connector',
                               'enable.auto.commit': 'false',
                               'auto.offset.reset': 'earliest'}


cors = CORS(app, resources={r"/*": {"origins": "*"}})
bus = FlaskKafka()
bus.init_app(app)
gaia_parent_path = Path(__file__).parent.parent

# Controllers
from ui.rest import middleware_loader_controller
from ui.rest import auth_service_controller
from ui.rest import task_manager_controller

# Kafka
from ui.kafka import open_camera_space