import os
import subprocess
import threading

import gaia_bot
from gaia_bot.core.console_manager import ConsoleManager
from gaia_bot.modules.local.models.task_detect.prompt_to_response import inference


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
    def detect_skill_tag(cls, text):
        try:
            infer = inference.infer(text) 
            cls.console_manager.console_output(info_log="Skill tag:" + infer)
            return infer
        except:
            infer = None
            cls.console_manager.console_output(error_log="Failed to detect skill tag.")
            return infer

    @classmethod
    def validate_assistant_response(cls, detected_skill, SKILLS):
        for skill in SKILLS:
            for tag in str(skill['tags']).split(', '):
                if detected_skill.__contains__(tag):
                    cls.execute_skill(skill['func'], detected_skill)
                    break

    @classmethod
    def execute_skill(cls, skill, text, *kwargs):
        if skill:
            cls.console_manager.console_output(info_log='Executing skill...')
            try:
                skill(text)
            except Exception as e:
                cls.console_manager.console_output(error_log="Failed to execute skill...")

    @classmethod
    def sentence_detect(cls, text, SKILLS):
        for skill in SKILLS:
            for tag in str(skill['tags']).split(', '):
                if tag == 'default skill' or tag == 'first skill':
                    cls.execute_skill(skill['func'], text)
                    break
