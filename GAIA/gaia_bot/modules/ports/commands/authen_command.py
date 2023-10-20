import requests
import subprocess

from gaia_bot.configs.port_configs import PORTS
from gaia_bot.configs.settings import USER_PROFILE


class AuthenticationConnector:
    def __init__(self, username, password):
        self.username = username
        self.password = password
        self.gaia_port = PORTS['gaia_connector']['port']
        self.auth_port = PORTS['authentication_service']['port']
        self.auth_bash = PORTS['authentication_service']['shell_path']
    
    def activate_authentication_command(self):
        if (self._check_microservice_status() == False):
            self.call_microservice() 
        else:
            print("Microservice is running")        
        token_string = self.authenticate_command()
        return token_string
        
    def authenticate_command(self):
        username = USER_PROFILE['username']
        password = USER_PROFILE['password']
        
        flask_url = f"http://localhost:{self.gaia_port}/auth"
        
        response = requests.post(f"{flask_url}", json={'username': username, 'password': password})
        
        if response.status_code == 200:
            result = response.json()
            if result['authenticated']:
                token = result['data']['accessToken']
                return f"Authenticated successfully. Token: {token}"
        else:
            return "Invalid credentials"
      
    def call_microservice(self):
        bash_script_path = self.auth_bash
    
        try:
            subprocess.run(['gnome-terminal', '--', 'bash', '-c', f'bash {bash_script_path}']) 
        except subprocess.CalledProcessError as e:
            print("Error running the bash script: ", e)

    def _check_microservice_status(self):
        flask_url = f"http://localhost:{self.gaia_port}/"
        
        response = requests.get(f"{flask_url}/status")
        
        if response.status_code == 200:
            return True
        else:
            return False 