import logging
import json

from gaia_bot.domain.model.task import Task
from gaia_bot.domain.model.enum_model import TypeTaskCRUD

class TaskCRUDSkill():
    def detect_task_action(text):
        return 'create'
    
    @classmethod
    def execute(cls, text, **kwargs):
        # activate gaia connector
        try:
            task = cls.detect_task(text)
            action = cls.detect_task_action(text)
            cls.execute_task_action(action, task) 
        except Exception as e:
            logging.error("Cannot activate Gaia Connector")
            cls.console_manager.console_output("Cannot activate Gaia Connector") 
               
    @classmethod
    def call_api(cls, type_task, task_object):
        if type_task == TypeTaskCRUD.TASK:
            task = Task().json_to_task(task_object)
            return cls.execute_task_action(task)
        return None
    
    @classmethod
    def execute_task_action(cls, action, task,):
        if action == 'create':
            return cls._send_request(task, 'POST')
        elif action == 'update':
            return cls._send_request(task, 'PUT')
        elif action == 'delete':
            return cls._send_request(task, 'DELETE')
        elif action == 'read':
            return cls._send_request(task, 'GET')
        else:
            logging.error("Invalid action")
            return False
    
    # @classmethod
    # def _send_request(cls, task, method):
    #     task_manager = TaskManagerConnector()
    #     json_task = json.dumps(task.__dict__)
    #     cls.console_manager.console_output(text=f"Executing {method} request to Task Manager: {json_task}")
    #     return task_manager.execute_task_command(json_task, method)
    