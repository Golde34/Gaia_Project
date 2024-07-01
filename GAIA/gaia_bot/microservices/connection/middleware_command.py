import requests

from gaia_bot.kernel.configs.port_configs import PORTS, DOMAIN 
from gaia_bot.abilities.microservice_connections import MicroserviceConnection
from gaia_bot.domain.enums import AcronymsEnum

class MiddlewareLoaderConnector:
    def __init__(self):
        self.middleware_bash = PORTS['middleware_loader']['shell_path'] 
        
        # intances
        self.gaia_port = PORTS['gaia_connector']['port']
        self.router = PORTS['middleware_loader']['router']
        self.gaia_url = f"http://{DOMAIN}:{self.gaia_port}/{self.router}"
        
        self.microservice_state = MicroserviceConnection().call_microservice_by_name(AcronymsEnum.AS._value_)
             
    def activate_middleware_command(self):
        self.microservice_state.activate_service()
    
    def check_microservices_state(self):
        response = requests.get(f"{self.gaia_url}/microservices-status")
        
        return response.json()
        #Logic of microsercvices state will response which one is running, which one is not
    