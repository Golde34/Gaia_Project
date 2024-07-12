from flask import jsonify
import requests

from core.domain.enums import Status
from kernel.utils.build_response import build_status_response


class MiddlewareServiceRequest:
    def __init__(self, url):
        self.url = url  
    
    def microservices_status(self):
        try:
            middleware_response = requests.get(f"{self.url}/status")
            
            if middleware_response.status_code == 200:
                return build_status_response(Status.OK)
            else :
                return build_status_response(Status.FAIL)
        except Exception as e:
            print(f"Exception when calling middleware service: {e}")
            return build_status_response(Status.ERROR)
    