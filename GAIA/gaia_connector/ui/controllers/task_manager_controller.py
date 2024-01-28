from flask import request, jsonify
import requests

from ui import app
from infrastructure.adapter import Adapter
from kernel.utils.get_auth_token import _get_token_parameters


task_manager_url = Adapter('task_manager').url

@app.route('/task-manager/create-task', methods=['POST'])
def create_task():
    data = request.get_json()
    task = data['task']
    print(task) 
    tokens = get_tokens()
    access_token = tokens['access_token']
    print(access_token)
    task_response = requests.post(f"{task_manager_url}/create-task", json={'task': task, 'access_token': access_token})
    
    if task_response.status_code == 200:
        return jsonify({'response': task_response.json()})
    else :
        return jsonify({'response': 'Cannot create task'})
    
@app.route('/task-manager/update-task', methods=['PUT'])
def update_task():
    data = request.get_json()
    task = data['task']
    
    access_token = get_tokens()['access_token']
    
    task_response = requests.put(f"{task_manager_url}/update-task", json={'task': task, 'access_token': access_token})
    
    if task_response.status_code == 200:
        return jsonify({'response': task_response.json()})
    else :
        return jsonify({'response': 'Cannot update task'})
    
@app.route('/task-manager/delete-task', methods=['DELETE'])
def delete_task():
    data = request.get_json()
    task = data['task']
    
    access_token = get_tokens()['access_token']
    
    task_response = requests.delete(f"{task_manager_url}/delete-task", json={'task': task, 'access_token': access_token})
    
    if task_response.status_code == 200:
        return jsonify({'response': task_response.json()})
    else :
        return jsonify({'response': 'Cannot delete task'})  
    
@app.route('/task-manager/view-task', methods=['GET'])
def view_task():
    data = request.get_json()
    task = data['task']
    
    access_token = get_tokens()['access_token']
    
    task_response = requests.get(f"{task_manager_url}/view-task", json={'task': task, 'access_token': access_token})
    
    if task_response.status_code == 200:
        return jsonify({'response': task_response.json()})
    else :
        return jsonify({'response': 'Cannot view task'})
    
def get_tokens():
    access_token, refresh_token = _get_token_parameters()
    data = {}
    data['access_token'] = access_token
    data['refresh_token'] = refresh_token
    return data