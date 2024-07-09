from flask import request

from ui import app
from kernel.utils.middleware_connection import MiddlewareConnection
from core.services.client.auth_service import AuthServiceRequest


auth_service_url = MiddlewareConnection('authentication_service').url
auth_service = AuthServiceRequest(auth_service_url)

@app.route('/auth/sign-in', methods=['POST'])
def auth():
    data = request.get_json()
    return auth_service.signin(data)
    
@app.route('/auth/status', methods=['GET'])
def auth_status():
    return auth_service.status() 