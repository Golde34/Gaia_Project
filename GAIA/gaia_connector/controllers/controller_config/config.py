from configs.port_configs import PORTS, DOMAIN

class ControllerConfig:
    def __init__(self, microservice):
        self.middleware = 'middleware_loader'
        self.domain = DOMAIN
        self.port = PORTS[self.middleware]['port']
        self.router = self._get_microservice_router(microservice)
        self.url = f"http://{self.domain}:{self.port}/{self.router}"
        
    def _get_microservice_router(self, microservice):
        return PORTS[microservice]['router']