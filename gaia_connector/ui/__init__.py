from flask import Flask
from flask_cors import CORS

from infrastructure.kafka.consumer.start_kafka_consumer import start_kafka


app = Flask(__name__)
cors = CORS(app)

CORS(app, resources={r"/*": {"origins": "*"}})

# Controllers
from ui.rest import middleware_loader_controller
from ui.rest import auth_service_controller
from ui.rest import task_manager_controller

#Kafka
start_kafka()