import requests
import subprocess
import json
import os

from gaia_bot.configs.port_configs import PORTS, DOMAIN 
from gaia_bot.modules.ports.commands.microservices_state.call_microservices import CallMicroservices


class MiddlewareLoaderConnector:
    def __init__(self):
        self.middleware_bash = PORTS['middleware_loader']['shell_path'] 
        
        # intances
        self.gaia_port = PORTS['gaia_connector']['port']
        self.router = PORTS['middleware_loader']['router']
        self.gaia_url = f"http://{DOMAIN}:{self.gaia_port}/{self.router}"
        
        self.microservice_state = CallMicroservices(self.middleware_bash, self.gaia_url)
            
    def activate_middleware_command(self):
        self.microservice_state.activate_service()
    
    def check_microservices_state(self):
        response = requests.get(f"{self.gaia_url}/microservices-status")
        
        return response.json()
        #Logic of microsercvices state will response which one is running, which one is not
    