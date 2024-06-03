from flask import jsonify
import requests


class MiddlewareServiceRequest:
    def __init__(self, url):
        self.url = url  
    
    def microservices_status(self):
        try:
            middleware_response = requests.get(f"{self.url}/status")
            
            if middleware_response.status_code == 200:
                return jsonify({'status': 'OK'})
            else :
                return jsonify({'status': 'ERROR'})
        except:
            return jsonify({'status': 'ERROR'})
    