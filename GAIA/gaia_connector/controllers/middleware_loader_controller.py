from flask import jsonify
import requests

from controllers import app
from controllers.controller_config.config import ControllerConfig


middleware_loader_url = ControllerConfig('middleware_loader').url

@app.route('/middleware/microservices-status', methods=['GET'])
def microservices_status():
    
    middleware_response = requests.get(f"{middleware_loader_url}/status")
    
    if middleware_response.status_code == 200:
        return jsonify({'status': 'OK'})
    else :
        return jsonify({'status': 'ERROR'})