from flask import request, jsonify
import requests

from controllers import app
from controllers.controller_config.config import ControllerConfig
from controllers.controller_config.base_response import status_response
from utils.get_auth_token import _get_token_parameters, _load_user_info, _save_middleware_response


middleware_loader_url = ControllerConfig('middleware_loader').url

@app.route('/middleware/health-check', methods=['GET'])
def health_check():
    user_info = request.get_json()
    _save_middleware_response(user_info)    
    return status_response(200, 'Gaia Connection is OK')

@app.route('/middleware/microservices-status', methods=['GET'])
def microservices_status():
    
    middleware_response = requests.get(f"{middleware_loader_url}/status")
    
    if middleware_response.status_code == 200:
        return jsonify({'status': 'OK'})
    else :
        return jsonify({'status': 'ERROR'})
    
@app.route('/middleware/gaia-connect', methods=['GET'])
def gaia_connect():
    access_token, refresh_token = _get_token_parameters()
    username, name, email = _load_user_info()
    data = {} 
    
    data['accessToken'] = access_token
    data['refreshToken'] = refresh_token
    data['username'] = username
    data['name'] = name
    data['email'] = email
    
    return status_response(200, data)