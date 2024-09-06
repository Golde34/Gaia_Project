from gaia_bot.process.console_manager import ConsoleManager
from gaia_bot.domain.entity.enum_model import TypeTaskCRUD
from gaia_bot.microservices.connection.task_server_command import TaskManagerConnector
from gaia_bot.abilities.sentence_object_recognizer import SORSkill
from gaia_bot.kernel.configs.auth_config import USER_PROFILE
from gaia_bot.domain.enums import SORModel 


class TaskCRUDSkill():
    console_manager = ConsoleManager()

    def __init__(self):
        pass
    @classmethod
    def create_task(cls, text):
        print("Create task - Calling Gaia Connector...")
        return cls.execute_task_action("POST", text, TypeTaskCRUD.TASK)

    @classmethod
    def update_task(cls, text):
        print("Update task - Calling Gaia Connector...")
        return cls.execute_task_action("PUT", text, TypeTaskCRUD.TASK)

    @classmethod
    def execute_task_action(cls, method, text, type_task):
        print(type_task == TypeTaskCRUD.TASK)
        if type_task == TypeTaskCRUD.TASK:
            task = cls._transfer_text_to_task(text)
            return cls._send_request(task, method)
    
    @classmethod
    def _send_request(cls, task, method):
        print("Execute command to gaia connector...")
        ConsoleManager().console_log(info_log=f"Executing {method} request to Task Manager: {task}")
        return TaskManagerConnector().execute_task_command(task, method)
    
    @classmethod
    def _transfer_text_to_task(cls, text):
        try:
            cls.console_manager.console_log(info_log=f"Transferring text to task, model {SORModel.TASK_DETECTION}")
            result = SORSkill().handle_input(text, SORModel.TASK_DETECTION)
            print("Result: ", result)
            return result
        except Exception as e:
            print(f"Failed to transfer text to task: {e}")
            return None

    @classmethod
    def _manual_create_task(cls, text):
        print("Manual create task...")
        project = str(input("Enter project: "))
        group_task = str(input("Enter group task: "))
        title = str(input("Enter title: "))
        priority = str(input("Enter priority: "))
        status = str(input("Enter status: "))
        start_date = str(input("Enter start date: "))
        deadline = str(input("Enter deadline: "))
        duration = str(input("Enter duration: "))
        user_id = USER_PROFILE.get("user_id")

        return {
            "sentence": text,
            "project": project,
            "group_task": group_task,
            "task": {
                "title": title,
                "priority": priority,
                "status": status,
                "start_date": start_date,
                "deadline": deadline,
                "duration": duration
            },
            "user_id": int(user_id)
        }