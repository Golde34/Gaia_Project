from flask import Flask
from flask_cors import CORS
import threading
import asyncio

import kafka_consumer
import kafka_producer

app = Flask(__name__)
cors = CORS(app)

CORS(app, resources={r"/*": {"origins": "*"}})

@app.before_first_request
def activate_consumer():
    init_thread = threading.Thread(target=kafka_consumer.initilize)
    init_thread.start()
    consumer_thread = threading.Thread(target=kafka_consumer.consume)
    consumer_thread.start()

@app.route('/produce', methods=["POST"])
def produce():
    loop = asyncio.get_event_loop()
    await kafka_producer.send_message(loop)