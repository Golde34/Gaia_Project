from flask import Flask, request, jsonify
from gaia_bot.configs.settings import USER_PROFILE
from gaia_bot.configs.port_configs import PORTS


app = Flask(__name__)

authentication_service_port = PORTS['authentication_service']

@app.route('/auth', methods=['POST'])
def auth():
    username = USER_PROFILE['username']
    password = USER_PROFILE['password']
    
    auth_response = request.post(authentication_service_port['port'], json={'username': username, 'password': password})
    
    if auth_response.status_code == 200:
        return jsonify({'authenticated': True, 'user': username})
    else :
        return jsonify({'authenticated': False, 'message': 'Invalid credentials'}) 
    
@app.route('/status', methods=['GET'])
def status():
    
    auth_response = request.get(authentication_service_port['port'])
    
    if auth_response.status_code == 200:
        return jsonify({'status': 'OK'})
    else :
        return jsonify({'status': 'ERROR'})