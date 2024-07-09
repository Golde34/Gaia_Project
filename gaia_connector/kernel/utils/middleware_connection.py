from kernel.configs.port_configs import DOMAIN, PORTS


class MiddlewareConnection:
    def __init__(self, microservice):
        self.domain = DOMAIN
        self.port = PORTS['middleware_loader']['port']
        self.router = self._get_microservice_router(microservice)
        self.url = f"http://{self.domain}:{self.port}/{self.router}"
        
    def _get_microservice_router(self, microservice):
        return PORTS[microservice]['router']