import os

from gaia_bot_v2.process.console_manager import ConsoleManager
from gaia_bot_v2.kernel.utils.trie_node import Trie
from gaia_bot_v2.models.task_detect.prompt_to_response import inference

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
            infer = inference.infer(transcript, model) 
            cls.console_manager.console_output(info_log="Skill tag:" + infer)
            return infer
        except Exception as e:
            cls.console_manager.console_output(error_log="Failed to detect skill tag.")
        
    @classmethod
    def validate_assistant_response(cls, detected_skill, skills):
        try:
            trie_skill = Trie()
            trie_skill.search(detected_skill)
            if trie_skill == None:
                cls.console_manager.console_output(error_log="Skill not found.")
            else:
                cls.execute_skill(trie_skill, detected_skill)
        except:
            cls.console_manager.console_output(error_log="Failed to validate assistant response.")
            
    @classmethod
    async def execute_skill(cls, skill, text, *kwargs):
        if skill:
            cls.console_manager.console_output(info_log='Executing skill...')
            try:
                await skill(text)
            except Exception as e:
                cls.console_manager.console_output(error_log="Failed to execute skill...")
                
    @classmethod
    def sentence_detect(cls, text, skills):
        for skill in skills:
            for tag in str(skill['tags']).split(', '):
                if tag == 'default skill' or tag == 'first skill':
                    cls.execute_skill(skill['func'], text)
                    break
                
    @classmethod
    async def test_only_skill(cls, skills, test_skill):
        for skill in skills:
            for tag in str(skill['tags']).split(', '):
                if tag == test_skill:
                    await cls.execute_skill(skill['func'], test_skill)
                    break
    
    
            