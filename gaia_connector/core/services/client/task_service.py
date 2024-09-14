from flask import jsonify
import requests

from kernel.utils.get_auth_token import _get_token_parameters
from core.domain.constants import Constants
from core.services.mapper.task_mapper import TaskMapper
from infrastructure.kafka_producer.producer import publish_message 
from infrastructure.client_adapter.task_adapter import TaskAdapter


class TaskServiceRequest:
    def __init__(self, url):
        self.url = url
        self.adapter = TaskAdapter(url) 

    def map_group_task_in_task_object(self, data, task):
        group_task_id = self.adapter.get_group_task_id(data['group_task'], data['user_id'], data['project'])
        print(f"Get group_task_id: {group_task_id} by query group_task: {data['group_task']}")
        if group_task_id is None:
            return None
        task['groupTaskId'] = group_task_id
        return task

    def create_task(self, data):
        task_response = self.adapter.create_task(data)
        if task_response.status_code == 200:
            print('Create task successfully in TM Service')
            try:
                data = TaskMapper().map_create_task_to_sor(data, task_response.json()['data']['message']['_id'])
                publish_message(Constants.KafkaTopic.CREATE_TASK_TOPIC, Constants.KafkaCommand.GAIA_CREATE_TASK, data)
                return jsonify({Constants.StringConstants.status: 'OK',
                                Constants.StringConstants.response: task_response.json()})
            except Exception as e:
                print('Create task successfully in TM Service but failed to send message to Kafka')
                return jsonify({Constants.StringConstants.status: 'ERROR', Constants.StringConstants.message: 'Invalid data'})
        else:
            print('Create task failed')
            return jsonify({Constants.StringConstants.status: 'ERROR', Constants.StringConstants.message: 'Create task failed'})

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
        