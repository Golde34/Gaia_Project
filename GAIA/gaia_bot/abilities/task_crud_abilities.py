import time

from gaia_bot.process.console_manager import ConsoleManager
from gaia_bot.domain.mapper.model_enum import TypeTaskCRUD
from gaia_bot.microservices.connection.task_server_command import TaskManagerConnector
from gaia_bot.abilities.sentence_object_recognizer import SORSkill
from gaia_bot.kernel.configs.auth_config import USER_PROFILE
from gaia_bot.domain.enums import SORModel
from gaia_bot.kernel.utils.time_utils import convert_time_from_float_to_str


class TaskCRUDSkill():
    console_manager = ConsoleManager()

    def __init__(self):
        pass

    @classmethod
    def create_task(cls, text):
        cls.console_manager.console_log("Create task - Calling Gaia Connector...")
        return cls.execute_task_action("POST", text, TypeTaskCRUD.TASK)

    @classmethod
    def update_task(cls, text):
        print("Update task - Calling Gaia Connector...")
        return cls.execute_task_action("PUT", text, TypeTaskCRUD.TASK)

    @classmethod
    def execute_task_action(cls, method, text, type_task):
        if type_task == TypeTaskCRUD.TASK:
            task = cls._transfer_text_to_task(text)
            return cls._send_request(task, method)
    
    @classmethod
    def _send_request(cls, task, method):
        ConsoleManager().console_log(info_log=f"Executing {method} request to Task Manager: {task}")
        return TaskManagerConnector().execute_task_command(task, method)
    
    @classmethod
    def _transfer_text_to_task(cls, text):
        try:
            cls.console_manager.console_log(info_log=f"Transferring text to task, model {SORModel.TASK_DETECTION}")
            result = SORSkill().handle_input(text, SORModel.TASK_DETECTION)
            result = cls._handle_null_fields(result)
                
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

    @classmethod
    def _handle_null_fields(cls, result):
        if result['project'] is None or result['project'] == "":
            print("Project is empty, what is project you want to add task to?")
            project = str(input("Enter project: "))
            result['project'] = project

        if result['group_task'] is None or result['group_task'] == "":
            print("Group task is empty, what is group task you want to add task to?")
            group_task = str(input("Enter group task: "))
            result['group_task'] = group_task
        
        if result['task']['title'] is None or result['task']['title'] == "":
            print("Title is empty, what is title you want to add task to?")
            title = str(input("Enter title: "))
            result['task']['title'] = title 
        
        if result['task']['duration'] is None or result['task']['duration'] == "" or result['task']['duration'] == "0":
            result['task']['duration'] = 2
        else:
            result['task']['duration'] = int(result['task']['duration'])

        if result['task']['priority'] is None or result['task']['priority'] == "":
            result['task']['priority'] = "MEDIUM"
        
        if result['task']['status'] is None or result['task']['status'] == "":
            result['task']['status'] = "TODO"

        if result['task']['start_date'] is None or result['task']['start_date'] == "":
            result['task']['start_date'] = convert_time_from_float_to_str(time.time())

        if result['task']['deadline'] is None or result['task']['deadline'] == "":
            result['task']['deadline'] = convert_time_from_float_to_str(time.time() + 86400)

        return result
