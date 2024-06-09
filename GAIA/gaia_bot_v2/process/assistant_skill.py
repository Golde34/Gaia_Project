import os

from gaia_bot_v2.process.console_manager import ConsoleManager


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
    def detect_skill_tag(cls, transcript):
        pass
    
    @classmethod
    
            