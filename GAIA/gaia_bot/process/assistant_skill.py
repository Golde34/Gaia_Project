import os

from gaia_bot.abilities.task_detection import DetectSkill
from gaia_bot.process.console_manager import ConsoleManager
from gaia_bot.kernel.utils.trie_node import search_skills


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
    def response(cls, transcript, refresh_console=False):
        cls.console_manager.console_output(text=transcript, info_log="Skill Handling", refresh_console=refresh_console)
        
    @classmethod
    def detect_skill_tag(cls, transcript, model):
        try:
            detected_task = DetectSkill.detect_skill_tag(transcript, model) 
            cls.console_manager.console_output(text=f"Skill tag: {detected_task}", info_log=f"Skill tag detected: {detected_task}")
            return detected_task
        except Exception as e:
            cls.console_manager.console_log(error_log="Failed to detect skill tag.")
        
    @classmethod
    def validate_assistant_response(cls, detected_skill, skills):
        try:
            detected_skill = str(detected_skill).lower()
            results = search_skills(skills, detected_skill)
            if results == None:
                cls.console_manager.console_log(error_log="Skill not found.")
            else:
                cls.execute_skill(results[0].get('func'), detected_skill)
        except:
            cls.console_manager.console_log(error_log="Failed to validate assistant response.")
            
    @classmethod
    def execute_skill(cls, skill, text, *kwargs):
        if skill:
            cls.console_manager.console_log(info_log=f'Executing skill {skill}')
            try:
                skill(text, *kwargs)
            except Exception as e:
                cls.console_manager.console_log(error_log="Failed to execute skill...")

            