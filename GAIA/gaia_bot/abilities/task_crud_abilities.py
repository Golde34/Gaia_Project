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
        print(type_task == TypeTaskCRUD.TASK)
        if type_task == TypeTaskCRUD.TASK:
            task = cls._transfer_text_to_task(text)
            return cls._send_request(task, method)
    
    @classmethod
    def _send_request(cls, task, method):
        task_manager = TaskManagerConnector()
        print('Execute command to gaia connector...')
        # cls.console_manager.console_output(text=f"Executing {method} request to Task Manager: {task}")
        return task_manager.execute_task_command(task, method)
    
    @classmethod
    def _transfer_text_to_task(cls, text):
        return {
            'title': text,
            'description': 'Example description',
            'priority': 'High',
            'status': 'To Do',
            'startDate': '2024-08-10',
            'deadline': '2024-08-11',
            'duration': '8',
            'groupTaskId': 'abc',
            'activeStatus': 'ACTIVE'
            # 'tag': 'Example'
        }