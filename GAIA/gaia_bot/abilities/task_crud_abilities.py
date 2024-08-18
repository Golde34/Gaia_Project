from gaia_bot.domain.entity.enum_model import TypeTaskCRUD
from gaia_bot.microservices.connection.task_server_command import TaskManagerConnector
from gaia_bot.abilities.sentence_object_recognizer import SORSkill


class TaskCRUDSkill():
    def __init__(self):
        self.task_manager = TaskManagerConnector()
        self.detect_sentence = SORSkill()

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
        print('Execute command to gaia connector...')
        # cls.console_manager.console_output(text=f"Executing {method} request to Task Manager: {task}")
        return cls.task_manager.execute_task_command(task, method)
    
    @classmethod
    def _transfer_text_to_task(cls, text):
        return cls.detect_sentence.call_detect_sentence_api(text)
