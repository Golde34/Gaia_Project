from flask import request, jsonify
import requests
import logging

from controllers import app
from controllers.controller_config.config import ControllerConfig


authentication_service_url = ControllerConfig('authentication_service').url

@app.route('/auth/sign-in', methods=['POST'])
def auth():
    data = request.get_json()
    username = data['username']
    password = data['password']

    auth_response = requests.post(f"{authentication_service_url}/gaia-auto-sign-in", json={'username': username, 'password': password})
    
    if auth_response.status_code == 200:
        print('authenticate successfully')
        return jsonify({'authenticated': True, 'response': auth_response.json()})
    else :
        return jsonify({'authenticated': False, 'message': 'Invalid credentials'}) 
    
@app.route('/auth/status', methods=['GET'])
def status():
    
    auth_response = requests.get(f"{authentication_service_url}/status")
    
    if auth_response.status_code == 200:
        return jsonify({'status': 'OK'})
    else :
        return jsonify({'status': 'ERROR'}) 