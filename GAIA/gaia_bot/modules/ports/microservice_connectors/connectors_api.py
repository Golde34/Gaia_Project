from flask import Flask, request, jsonify
from controllers.auth_service_controller import auth, status
import threading


app = Flask(__name__)

@app.route('/auth', methods=['POST'])
def flask_auth():
    return auth()

@app.route('/status', methods=['GET'])
def flask_status():
    return status()
    
if __name__ == "__main__":
    app.run(host='localhost', port=5000, debug=True)