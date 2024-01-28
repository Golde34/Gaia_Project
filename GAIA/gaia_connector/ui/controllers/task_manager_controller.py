from flask import request, jsonify
import requests

from ui import app
from infrastructure.adapter import Adapter
from kernel.utils.get_auth_token import _get_token_parameters
from core.services.request.task_service import TaskServiceRequest


task_manager_url = Adapter('task_manager').url
task_service_request = TaskServiceRequest(task_manager_url)

@app.route('/task-manager/create-task', methods=['POST'])
def create_task():
    data = request.get_json()
    return task_service_request.create_task(data) 

@app.route('/task-manager/update-task', methods=['PUT'])
def update_task():
    data = request.get_json()
    return task_service_request.update_task(data)
    
@app.route('/task-manager/delete-task', methods=['DELETE'])
def delete_task():
    data = request.get_json()
    return task_service_request.delete_task(data)
    
@app.route('/task-manager/view-task', methods=['GET'])
def view_task():
    data = request.get_json()
    return task_service_request.view_task(data)