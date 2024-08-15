import requests

from gaia_bot.kernel.configs.port_configs import PORTS, DOMAIN
from gaia_bot.abilities.microservice_connections import MicroserviceConnection
from gaia_bot.domain.enums import AcronymsEnum


class SORConnector:
    def __init__(self):
        self.sor_bash = PORTS['sentence_object_recognizer']['shell_path']
        
        # intances
        self.gaia_port = PORTS['gaia_connector']['port']
        self.router = PORTS['sentence_object_recognizer']['router']
        self.gaia_url = f"http://{DOMAIN}:{self.gaia_port}/{self.router}"
        
    def execute_sor_command(self, text, sor_model):
        response = requests.get(f"{self.gaia_url}/" + sor_model + "/detect", json={text})
        if response.status_code == 200:
            result = response.json()
            body = result['response']