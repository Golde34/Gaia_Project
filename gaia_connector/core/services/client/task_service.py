from flask import jsonify
import requests

from kernel.utils.get_auth_token import _get_token_parameters
from core.domain.constants import Constants
from core.services.mapper.task_mapper import TaskMapper
from infrastructure.kafka_producer.producer import publish_message 


class TaskServiceRequest:
    def __init__(self, url):
        self.url = url

    def create_task(self, data):
        try:
            # Mapping TM task object and send to TM
            task = TaskMapper().map_create_task(data)
            group_task_id = self._get_group_task_id(data['group_task'], data['user_id'], data['project'])
            if group_task_id is None:
                return jsonify({Constants.StringConstants.status: 'ERROR', Constants.StringConstants.message: 'Invalid group task'})
            task['groupTaskId'] = group_task_id

            task_response = requests.post(f"{self.url}/task/private-create", json=task)
            print(task_response.json()) 
            if task_response.status_code == 200:
                print('Create task in TM successfully')

                # If create task in TM successfully, send message to Kafka to store task in GP
                data = TaskMapper().map_create_task_to_sor(data, task_response.json()['data']['message']['_id'])
                publish_message(Constants.KafkaTopic.CREATE_TASK_TOPIC, data)
                
                return jsonify({Constants.StringConstants.status: 'OK', 
                             Constants.StringConstants.response: task_response.json()})
            else:
                print('Create task failed')
                return jsonify({Constants.StringConstants.status: 'ERROR', Constants.StringConstants.message: 'Create task failed'})
        except:
            print('Create task failed')
            return jsonify({Constants.StringConstants.status: 'ERROR', Constants.StringConstants.message: 'Invalid data'})
   
    def _get_group_task_id(self, group_task, user_id, project):
        try:
            group_task_response = requests.get(f"{self.url}/group-task/find-by-name?name={group_task}&userId={user_id}&project={project}")
            if group_task_response.status_code == 200:
                return group_task_response.json()['data']['message']['_id']
            else:
                return None
        except:
            print('There is an error when getting group task id')


    def _get_tokens(self):
        access_token, refresh_token = _get_token_parameters()
        if access_token is None or refresh_token is None:
            return None, None
        
        return access_token, refresh_token
    
    def update_task(self, data):
        try:
            task = data['task']
            
            access_token = self._get_tokens()['accessToken']
            
            task_response = requests.put(f"{self.url}/task/update-task", json={'task': task, 'access_token': access_token})
            
            if task_response.status_code == 200:
                print('Update task successfully')
                return jsonify({Constants.StringConstants.status: 'OK', 
                                Constants.StringConstants.response: task_response.json()})
            else:
                print('Update task failed')
                return jsonify({Constants.StringConstants.status: 'ERROR', Constants.StringConstants.message: 'Update task failed'})
        except:
            print('Update task failed')
            return jsonify({Constants.StringConstants.status: 'ERROR', Constants.StringConstants.message: 'Invalid data'}) 
    
    def delete_task(self, data):
        try:
            task = data['task']
            
            access_token = self._get_tokens()['accessToken']
            
            task_response = requests.delete(f"{self.url}/task/delete-task", json={'task': task, 'access_token': access_token})
            
            if task_response.status_code == 200:
                print('Delete task successfully')
                return jsonify({Constants.StringConstants.status: 'OK', 
                                Constants.StringConstants.response: task_response.json()})
            else:
                print('Delete task failed')
                return jsonify({Constants.StringConstants.status: 'ERROR', Constants.StringConstants.message: 'Delete task failed'})
        except:
            print('Delete task failed')
            return jsonify({Constants.StringConstants.status: 'ERROR', Constants.StringConstants.message: 'Invalid data'}) 
    
    def view_task(self, data):
        try:
            task = data['task']
            
            access_token = self._get_tokens()['accessToken']
            
            task_response = requests.get(f"{self.url}/task/view-task", json={'task': task, 'access_token': access_token})
            
            if task_response.status_code == 200:
                print('View task successfully')
                return jsonify({Constants.StringConstants.status: 'OK', 
                                Constants.StringConstants.response: task_response.json()})
            else:
                print('View task failed')
                return jsonify({Constants.StringConstants.status: 'ERROR', Constants.StringConstants.message: 'View task failed'})
        except:
            print('View task failed')
            return jsonify({Constants.StringConstants.status: 'ERROR', Constants.StringConstants.message: 'Invalid data'})
        