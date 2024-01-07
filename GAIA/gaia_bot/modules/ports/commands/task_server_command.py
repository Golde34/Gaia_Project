import requests

from gaia_bot.configs.port_configs import PORTS, DOMAIN
from gaia_bot.modules.ports.commands.microservices_state.call_microservices import CallMicroservices


class TaskManagerConnector:
    def __init__(self):
        self.task_manager_bash = PORTS['task_manager']['shell_path']
        
        # intances
        self.gaia_port = PORTS['gaia_connector']['port']
        self.router = PORTS['task_manager']['router']
        self.gaia_url = f"http://{DOMAIN}:{self.gaia_port}/{self.router}"
        
        self.microservice_state = CallMicroservices(self.task_manager_bash, self.gaia_url)
        
    def activate_task_manager_command(self):
        self.microservice_state.activate_service()