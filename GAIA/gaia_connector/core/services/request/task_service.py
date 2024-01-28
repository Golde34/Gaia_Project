from flask import jsonify
import requests

from kernel.utils.get_auth_token import _get_token_parameters


class TaskServiceRequest:
    def __init__(self, url):
        self.url = url
        
    def create_task(self, data):
        task = data['task']
        
        tokens = self._get_tokens()
        access_token = tokens['accessToken']
        task_response = requests.post(f"{self.url}/create-task", json={'task': task, 'access_token': access_token})
        
        if task_response.status_code == 200:
            print('Create task successfully')
            return jsonify({'status': 'OK', 'response': task_response.json()})
        else:
            print('Create task failed')
            return jsonify({'status': 'ERROR', 'message': 'Create task failed'})
    
    def _get_tokens(self):
        access_token, refresh_token = _get_token_parameters()
        if access_token is None or refresh_token is None:
            return None, None
        
        return access_token, refresh_token
    
    def update_task(self, data):
        task = data['task']
        
        access_token = self._get_tokens()['accessToken']
        
        task_response = requests.put(f"{self.url}/update-task", json={'task': task, 'access_token': access_token})
        
        if task_response.status_code == 200:
            print('Update task successfully')
            return jsonify({'status': 'OK', 'response': task_response.json()})
        else:
            print('Update task failed')
            return jsonify({'status': 'ERROR', 'message': 'Update task failed'})
        
    def delete_task(self, data):
        task = data['task']
        
        access_token = self._get_tokens()['accessToken']
        
        task_response = requests.delete(f"{self.url}/delete-task", json={'task': task, 'access_token': access_token})
        
        if task_response.status_code == 200:
            print('Delete task successfully')
            return jsonify({'status': 'OK', 'response': task_response.json()})
        else:
            print('Delete task failed')
            return jsonify({'status': 'ERROR', 'message': 'Delete task failed'})
        
    def view_task(self, data):
        task = data['task']
        
        access_token = self._get_tokens()['accessToken']
        
        task_response = requests.get(f"{self.url}/view-task", json={'task': task, 'access_token': access_token})
        
        if task_response.status_code == 200:
            print('View task successfully')
            return jsonify({'status': 'OK', 'response': task_response.json()})
        else:
            print('View task failed')
            return jsonify({'status': 'ERROR', 'message': 'View task failed'})