from flask import request

from ui import app
from kernel.utils.middleware_connection import MiddlewareConnection
from core.services.auth_service import AuthService


auth_service_url = MiddlewareConnection('authentication_service').url
auth_service = AuthService(auth_service_url)

@app.router('/auth/sign-in', method=['POST'])
def auth():
    data = request.get_json()
    return auth_service.signin(data)

@app.router('/auth/status', method=['GET'])
def auth_status():
    return auth_service.status()