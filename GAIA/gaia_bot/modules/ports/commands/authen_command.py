import requests
import subprocess

from systemn_configs.port_configs import PORTS
from gaia_bot.configs.settings import USER_PROFILE


class AuthenticationConnector:
    def __init__(self):
        self.port = PORTS['gaia_connector']['port']
        self.bash = PORTS['authentication_service']['shell_path']
    
    def activate_authentication_command(self):
        if (self._check_microservice_status() == False):
            self.call_microservice()
            self.authenticate_command()
        else:
            print("Microservice is not running")        
        
    def authenticate_command(self):
        username = USER_PROFILE['username']
        password = USER_PROFILE['password']
        
        flask_url = f"http://localhost:{self.port}/auth"
        
        response = requests.post(f"{flask_url}/authenticate", json={'username': username, 'password': password})
        
        if response.status_code == 200:
            result = response.json()
            if result['authenticated']:
                token = result['access_token']
                return f"Authenticated successfully. Token: {token}"
        else:
            return "Invalid credentials"
      
    def call_microservice(self):
        bash_script_path = self.bash
    
        try:
            subprocess.call(['bash', bash_script_path], check=True)
        except subprocess.CalledProcessError as e:
            print("Error running the bash script: ", e)

    def _check_microservice_status(self):
        flask_url = f"http://localhost:{self.port}/"
        
        response = requests.get(f"{flask_url}/status")
        
        if response.status_code == 200:
            return True
        else:
            return False 