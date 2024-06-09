import gaia_bot_v2

from gaia_bot_v2.domain.skills import SKILLS
from gaia_bot_v2.process.response_creator import ResponseCreator


class Processor:

    def __init__(self, console_manager, assistant, settings):
        self.console_manager = console_manager
        self.assistant = assistant
        self.settings = settings
        self.skills = SKILLS
        self.response_creator = ResponseCreator()

    async def run(self):
        transcript = gaia_bot_v2.input_engine.recognize_input()
        self.console_manager.console_input(
            text="Handling your command", info_log="Handle input"
        )
        # Response transcript
        response_transctript = self.response_creator.generate_response(transcript)
        tag_skill = self.assistant.detect_skill_tag(transcript)
        
        # self.assistant.sentence_detect(transcript, self.skills)
        await self.assistant.validate_assistant_response(tag_skill, self.skills)
        
        # test skill
        # await self.assistant.test_only_skill(self.skills, 'create a new task')
        
        # return response_transcript
        return response_transctript, tag_skill