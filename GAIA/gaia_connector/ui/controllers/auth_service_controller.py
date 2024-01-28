from flask import request

from ui import app
from infrastructure.adapter import Adapter
from core.services.auth_service import AuthService

authentication_service_url = Adapter('authentication_service').url
auth_service = AuthService(authentication_service_url)

@app.route('/auth/sign-in', methods=['POST'])
def auth():
    data = request.get_json()
    return auth_service.signin(data)
    
@app.route('/auth/status', methods=['GET'])
def status():
    return auth_service.status() 