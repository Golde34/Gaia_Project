import requests
import subprocess
import logging

class CallMicroservices:
    def __init__(self, bash_script, url):
        self.bash_script = bash_script
        self.url = url
    
    def activate_service(self):
        if (self._check_microservice_status() == False):
            logging.info("Microservice is not running")
            self.call_microservice(self.bash_script)
        else:
            logging.info("Microservice is running")
    
    def _check_microservice_status(self):
        response = requests.get(f"{self.url}/status")
        if response.status_code == 200:
            return True
        return False
    
    def call_microservice(self):
        try:
            subprocess.run(['gnome-terminal', '--', 'bash', '-c', f'bash {self.bash_script}']) 
        except subprocess.CalledProcessError as e:
            print("Error running the bash script: ", e)
    
    def call_microservice(self, bash_script_path):
        try:
            subprocess.run(['gnome-terminal', '--', 'bash', '-c', f'bash {bash_script_path}']) 
        except subprocess.CalledProcessError as e:
            print("Error running the bash script: ", e)