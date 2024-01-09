import requests
import subprocess

from gaia_bot.configs.port_configs import PORTS


class ClientGUIConnector():

    def __init__(self, access_token, refresh_token):
        self.access_token = access_token
        self.refresh_token = refresh_token
        self.client_gui = "client_gui"
        self.gaia_port = PORTS['gaia_connector']['port']
        self.gaia_url = f'http://localhost:{self.gaia_port}'
        