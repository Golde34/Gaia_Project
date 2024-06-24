import logging
import json

from gaia_bot.modules.skills.assistant_skill import AssistantSkill
from gaia_bot.modules.ports.commands.task_server_command import TaskManagerConnector
from gaia_bot.infrastructure.data_objects.task import Task


class TaskCRUDSkill(AssistantSkill):
    
    def detect_task(text):
        task = Task(text)
        task.title = 'new task' + text
        return task

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
    def execute_task_action(cls, action, task):
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
    
    @classmethod
    def _send_request(cls, task, method):
        task_manager = TaskManagerConnector()
        json_task = json.dumps(task.__dict__)
        cls.console_manager.console_output(text=f"Executing {method} request to Task Manager: {json_task}")
        return task_manager.execute_task_command(json_task, method)
    