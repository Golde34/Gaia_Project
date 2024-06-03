from flask import request

from ui import app
from infrastructure.adapter import Adapter
from core.services.request.auth_service import AuthServiceRequest

authentication_service_url = Adapter('authentication_service').url
auth_service = AuthServiceRequest(authentication_service_url)

@app.route('/auth/sign-in', methods=['POST'])
def auth():
    data = request.get_json()
    return auth_service.signin(data)
    
@app.route('/auth/status', methods=['GET'])
def auth_status():
    return auth_service.status() 