from flask import request, jsonify
import requests

from controllers import app
from configs.port_configs import PORTS
from utils.get_auth_token import _get_token_parameters

client_gui_port = PORTS['client_gui']['port']
client_gui_url = f"http://localhost:{client_gui_port}"

@app.route('/client/gaia-connect', methods=['GET'])
def connect_client():
    access_token, refresh_token = _get_token_parameters()
    data = {}
    data['access_token'] = access_token
    data['refresh_token'] = refresh_token
    return jsonify({'data': data})