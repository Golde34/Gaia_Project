from flask import jsonify
import requests

from kernel.utils.get_auth_token import _save_middleware_response, _get_token_parameters, _load_user_info

class MiddlewareService:
    def __init__(self, url):
        self.url = url
        
    def health_service(self, user_info):
        _save_middleware_response(user_info)
        return status_response(200, 'Gaia Connection is OK')        