from flask import request, jsonify
import requests

from ui import app
from infrastructure.adapter import Adapter 
from infrastructure.base_response import status_response
from kernel.utils.get_auth_token import _get_token_parameters, _load_user_info, _save_middleware_response


middleware_loader_url = Adapter('middleware_loader').url

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
    data = {}
    
    access_token, refresh_token = _get_token_parameters()
    if access_token is None or refresh_token is None:
        data['accessToken'] = None
        data['refreshToken'] = None
     
    username, name, email = _load_user_info()
    if username is None or name is None or email is None:
        data['username'] = None
        data['name'] = None
        data['email'] = None
    
    data['accessToken'] = access_token
    data['refreshToken'] = refresh_token
    data['username'] = username
    data['name'] = name
    data['email'] = email
    
    return status_response(200, data)