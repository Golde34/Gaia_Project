from flask import Flask, request, jsonify
import requests
from controllers import app
from configs.port_configs import PORTS


authentication_service_port = PORTS['authentication_service']

@app.route('/auth', methods=['POST'])
def auth():
    data = request.get_json()
    username = data['username']
    password = data['password']
    print(data)
    auth_response = requests.post(f"http://localhost:{authentication_service_port['port']}/auth/sign-in", json={'username': username, 'password': password})
    print(auth_response.status_code)
    if auth_response.status_code == 200:
        print('authenticate successfully')
        return jsonify({'authenticated': True, 'data': auth_response.json()})
    else :
        return jsonify({'authenticated': False, 'message': 'Invalid credentials'}) 
    
@app.route('/status', methods=['GET'])
def status():
    
    # auth_response = request.get(authentication_service_port['port'])
    
    # if auth_response.status_code == 200:
        return jsonify({'status': 'OK'})
    # else :
        # return jsonify({'status': 'ERROR'}) 