import gaia_bot

from gaia_bot.core.response_creator import ResponseCreator
from gaia_bot.modules.skills.registry import SKILLS

class Processor:

    def __init__(self, console_manager, settings, assistant):
        self.console_manager = console_manager
        self.settings = settings
        self.assistant = assistant
        self.skills = SKILLS 
        self.response_creator = ResponseCreator()

    async def run(self):
        transcript = gaia_bot.input_engine.recognize_input()
        self.console_manager.console_output(text="Handling your command",
                                            info_log="Handle input")
        # Response transcript
        response_transcript = self.response_creator.generate_response(transcript)        
        tag_skill = self.assistant.detect_skill_tag(transcript)

        # self.assistant.sentence_detect(transcript, self.skills)
        await self.assistant.validate_assistant_response(tag_skill, self.skills)
        
        # test skill
        # await self.assistant.test_only_skill(self.skills, 'create a new task')
            
        # return response_transcript
        return response_transcript, tag_skill
