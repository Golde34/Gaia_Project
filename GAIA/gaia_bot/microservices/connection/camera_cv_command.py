import requests
import json

from gaia_bot.kernel.configs.port_configs import PORTS, DOMAIN
from gaia_bot.microservices.connection.microservices_state.call_microservices import CallMicroservices


class CameraCVConnector:
    def __init__(self):
        self.camera_cv_bash = PORTS['camera_cv']['shell_path']
        
        # intances
        self.gaia_port = PORTS['gaia_connector']['port']
        self.router = PORTS['camera_cv']['router']
        self.gaia_url = f"http://{DOMAIN}:{self.gaia_port}/{self.router}"

        self.microservice_state = CallMicroservices(self.camera_cv_bash, self.gaia_url)

    def open_command(self, **kwargs):
        response = requests.get(f"{self.gaia_url}" + "/camera-cv/open-space")
        if response.status_code == 200:
            result = response.json()
            body = result['response']
            return body
        else:
            return "Cannot open camera"
