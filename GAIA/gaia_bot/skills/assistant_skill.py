import os
import subprocess
import threading

import gaia_bot
from gaia_bot.core.console_manager import ConsoleManager
from gaia_bot.skills.registry import SKILLS, skill_objects


class AssistantSkill:
    first_activation = False
    console_manager = ConsoleManager()
    skill_dir = os.path.dirname(__file__)

    @classmethod
    def console(cls, text="", info_log=None, error_log=None, warning_log=None, debug_log=None, refresh_console=False):
        cls.console_manager.console_output(text=text,
                                           info_log=info_log,
                                           error_log=error_log,
                                           warning_log=warning_log,
                                           debug_log=debug_log,
                                           refresh_console=refresh_console)
        
    @classmethod
    def response(cls, text, refresh_console=False):
        cls.console_manager.console_output(text=text, info_log="Skill Handling", refresh_console=refresh_console)
        
    @classmethod
    def validate_assistant_response(cls, text):
        # check in here
        for skill in SKILLS:
            for tag in str(skill['tags']).split(', '):
                if text.__contains__(tag):
                    cls.execute_skill(skill['func'], text)
                    break

    @classmethod
    def execute_skill(cls, skill, text, *kwargs):
        if skill:
            cls.console_manager.console_output(info_log='Executing skill...')
            try:
                skill(text)
            except Exception as e:
                cls.console_manager.console_output(error_log="Failed to execute skill...")