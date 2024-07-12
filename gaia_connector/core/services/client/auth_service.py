from flask import jsonify
import requests

from core.domain.enums import Status
from kernel.utils.build_response import build_auth_login_response, build_status_response


class AuthServiceRequest:
    def __init__(self, url):
        self.url = url
        
    def signin(self, data):
        try:
            username = data['username']
            password = data['password']
            
            api = f"{self.url}/gaia-auto-sign-in"
            
            auth_response = requests.post(api, json={'username': username, 'password': password})
            
            if auth_response.status_code == 200:
                print('Sign in successfully')
                return build_auth_login_response(status=True, response=auth_response.json())
            else:
                print('Sign in failed')
                return build_auth_login_response(status=False, response=auth_response.json())
     
        except Exception as e:
            print(f"Exception when calling auth service: {e}")
            return build_auth_login_response(status=False, response='Invalid data')
            
    def status(self):
        try:
            api = f"{self.url}/status"
            auth_response = requests.get(api)
            
            if auth_response.status_code == 200:
                print('Get status successfully')
                return build_status_response(Status.OK)
            else:
                print('Get status failed')
                return build_status_response(Status.FAIL)
        except Exception as e:
            print(f"Exception when calling auth service: {e}")
            return build_status_response(Status.ERROR) 
