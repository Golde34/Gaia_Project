import asyncio
import logging
import requests

from gaia_bot.skills.assistant_skill import AssistantSkill
from gaia_bot.configs.port_configs import PORTS, DOMAIN
from gaia_bot.utils.activate_microservice import check_microservice_state_by_name, check_port_in_use
from gaia_bot.modules.ports.commands.task_server_command import TaskManagerConnector


class TaskCRUDSkill(AssistantSkill):
    
    def detect_task(cls, text):
        return 'new task' + text

    def detect_task_action(cls, text):
        return 'create' + text
    
    @classmethod
    async def execute(cls, text, **kwargs):
        # activate gaia connector
        try:
            task = cls.detect_task(text)
            action = cls.detect_task_action(text)
            return cls.execute_task_action(action, task)              
        except:
            logging.error("Cannot activate Gaia Connector")
                
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
    async def _send_request(cls, task, method):
        task_manager = TaskManagerConnector()
        return task_manager.execute_task_command(task, method)
    