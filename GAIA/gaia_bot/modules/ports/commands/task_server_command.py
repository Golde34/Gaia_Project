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

    def execute_task_command(self, task, method, **kwargs):
        self.activate_task_manager_command()

        if method == 'POST':
            return self.create_task(task)
        elif method == 'PUT':
            return self.update_task(task)
        elif method == 'DELETE':
            return self.delete_task(task)
        elif method == 'GET':
            return self.view_task(task)
        else:
            return False

    def activate_task_manager_command(self):
        self.microservice_state.activate_service()
        
    def create_task(self, task):
        response = requests.post(f"{self.gaia_url}" + "/create-task", 
                                 json={'task': task})
        
        if response.status_code == 200:
            result = response.json()
            body = result['response']
            if body['data']['createTask']['success']:
                return f"Task created successfully. Task: {task}"
        else:
            return "Cannot create task"
        
    def update_task(self, task):
        response = requests.put(f"{self.gaia_url}" + "/update-task", 
                                 json={'task': task})
        
        if response.status_code == 200:
            result = response.json()
            body = result['response']
            if body['data']['updateTask']['success']:
                return f"Task updated successfully. Task: {task}"
        else:
            return "Cannot update task"
        
    def delete_task(self, task):
        response = requests.delete(f"{self.gaia_url}" + "/delete-task", 
                                 json={'task': task})
        
        if response.status_code == 200:
            result = response.json()
            body = result['response']
            if body['data']['deleteTask']['success']:
                return f"Task deleted successfully. Task: {task}"
        else:
            return "Cannot delete task"
        
    def view_task(self, task):
        response = requests.get(f"{self.gaia_url}" + "/view-task", 
                                 json={'task': task})
        
        if response.status_code == 200:
            result = response.json()
            body = result['response']
            if body['data']['viewTask']['success']:
                return f"Task: {task}"
        else:
            return "Cannot view task"