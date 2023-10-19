import requests
import subprocess

from gaia_bot.configs.port_configs import PORTS
from gaia_bot.configs.settings import USER_PROFILE


class AuthenticationConnector:
    def __init__(self):
        self.port = PORTS['gaia']['port']
        self.bash = PORTS['authentication_service']['shell_path']
    
    @classmethod
    def activate_authentication_command(cls):
        if (cls._check_microservice_status() == True and cls.port['shell_path'] != None):
            cls.call_microservice()
            cls.authenticate_command()
        else:
            print("Microservice is not running or shell path is not defined")        
        
    @classmethod
    def authenticate_command(cls):
        username = USER_PROFILE['username']
        password = USER_PROFILE['password']
        
        flask_url = f"http://localhost:{cls.port}/auth"
        
        response = requests.post(f"{flask_url}/authenticate", json={'username': username, 'password': password})
        
        if response.status_code == 200:
            result = response.json()
            if result['authenticated']:
                token = result['access_token']
                return f"Authenticated successfully. Token: {token}"
        else:
            return "Invalid credentials"
    
    @classmethod    
    def call_microservice(cls):
        bash_script_path = cls.bash
    
        try:
            subprocess.call(['bash', bash_script_path], check=True)
        except subprocess.CalledProcessError as e:
            print("Error running the bash script: ", e)

    # Check microservice status
    @classmethod
    def _check_microservice_status(cls):
        flask_url = f"http://localhost:{cls.port}/"
        
        response = requests.get(f"{flask_url}/status")
        
        if response.status_code == 200:
            return True
        else:
            return False 