import json

from gaia_bot.domain.entity.task import Task
from gaia_bot.domain.entity.enum_model import TypeTaskCRUD
from gaia_bot.microservices.connection.task_server_command import TaskManagerConnector


class TaskCRUDSkill():
    @classmethod
    def create_task(cls, text):
        print('Create task - Calling Gaia Connector...')
        return cls.execute_task_action('POST', text, TypeTaskCRUD.TASK)

    @classmethod
    def update_task(cls, text):
        print('Update task - Calling Gaia Connector...')
        return cls.execute_task_action('PUT', text, TypeTaskCRUD.TASK)

    @classmethod
    def execute_task_action(cls, method, text, type_task):
        if type_task == TypeTaskCRUD.TASK:
            task_json = cls._transfer_text_to_task(text)
            task  = Task().json_to_task(task_json)
            return cls._send_request(task, method)
    
    @classmethod
    def _send_request(cls, task, method):
        task_manager = TaskManagerConnector()
        json_task = json.dumps(task.__dict__)
        cls.console_manager.console_output(text=f"Executing {method} request to Task Manager: {json_task}")
        return task_manager.execute_task_command(json_task, method)
    
    @classmethod
    def _transfer_text_to_task(cls, text):
        return {'task': text}