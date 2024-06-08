from flask import jsonify
import requests


class AuthServiceRequest:
    def __init__(self, url):
        self.url = url
    
    def signin(self, data):
        try:
            username = data['username']
            password = data['password']
            
            auth_response = requests.post(f"{self.url}/gaia-auto-sign-in", json={'username': username, 'password': password})  
            
            if auth_response.status_code == 200:
                print('Sign in successfully')
                return jsonify({'authenticated': True, 'response': auth_response.json()})
            else:
                print('Sign in failed')
                return jsonify({'authenticated': False, 'response': auth_response.json()})
        except:
            print('Sign in failed')
            return jsonify({'authenticated': False, 'response': 'Invalid data'})
        
    def status(self):
        try:
            auth_response = requests.get(f"{self.url}/status")
            
            if auth_response.status_code == 200:
                print('Get status successfully')
                return jsonify({'status': 'OK'})
            else:
                print('Get status failed')
                return jsonify({'status': 'ERROR'})
        except:
            print('Get status failed')
            return jsonify({'status': 'ERROR'})