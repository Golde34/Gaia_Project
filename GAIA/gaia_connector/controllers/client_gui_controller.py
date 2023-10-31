from flask import request, jsonify
import requests
import json

from controllers import app
from configs.port_configs import PORTS


client_gui_port = PORTS['client_gui']['port']
client_gui_url = f"http://localhost:{client_gui_port}"

@app.route('/client/gaia-connect', methods=['POST'])
def connect_client():
    access_token, refresh_token = _get_token_parameters()
    data = {}
    data['access_token'] = access_token
    data['refresh_token'] = refresh_token
    return jsonify({'data': data})

def _get_token_parameters():
    file_path = "..\\..\\gaia_bot\\modules\\local\\resources\\authen_cache\\response.json" 
    with open(file_path, "r") as f:
        response = json.load(f)   
    return response['accessToken'], response['refreshToken']
