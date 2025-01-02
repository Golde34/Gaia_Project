from flask import Flask
from flask_cors import CORS
from flask_kafka import FlaskKafka
from flask_mysqldb import MySQL
import os
from dotenv import load_dotenv


load_dotenv()

app = Flask(__name__)
mysql = MySQL(app)

cors = CORS(app, resources={r"/*": {"origins": "*"}})
CORS(app)

app.config["KAFKA_CONFIG"] = {'bootstrap.servers': os.getenv("KAFKA_BOOTSTRAP_SERVERS", "localhost:9094"),
                               'group.id': os.getenv("KAFKA_GROUP_ID", "gaia-connector"),
                               'enable.auto.commit': os.getenv("KAFKA_ENABLE_AUTO_COMMIT", "false"),
                               'auto.offset.reset': os.getenv("KAFKA_AUTO_OFFSET_RESET", "earliest"),}
app.config["MYSQL_HOST"] = os.getenv("MYSQL_HOST", "localhost")
app.config["MYSQL_USER"] = os.getenv("MYSQL_USER", "root")
app.config["MYSQL_PASSWORD"] = os.getenv("MYSQL_PASSWORD", "root")
app.config["MYSQL_DB"] = os.getenv("MYSQL_DB", "gaia_connector")

bus = FlaskKafka(app)
bus.init_app(app)

## Controllers
from ui.rest import chat_controller
## Kafka

## CLI
