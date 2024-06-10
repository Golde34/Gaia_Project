import gaia_bot_v2

from gaia_bot_v2.domain.skills import SKILLS
from gaia_bot_v2.process.response_creator import ResponseCreator
from gaia_bot_v2.kernel.utils.trie_node import create_skill_trie
from gaia_bot.modules.local.models.task_detect.prompt_to_response.utils.model_utils import tokenize


class Processor:

    def __init__(self, console_manager, assistant, settings, response_model, response_tokenizer):
        self.console_manager = console_manager
        self.assistant = assistant
        self.settings = settings
        self.skills = SKILLS
        self.response_creator = ResponseCreator()
        self.response_model = response_model
        self.response_tokenizer = response_tokenizer
        
    async def run(self):
        transcript = gaia_bot_v2.input_engine.recognize_input()
        self.console_manager.console_output(
            text="Handling your command", info_log="Handle input"
        )
        # TODO 
        # user skills based on user authorization and available satellite services
        # user_skills = create_skill_trie(self.skills)
        # Response transcript
        response_transctript = self.response_creator.generate_response(transcript, self.response_model, self.response_tokenizer)
        # tag_skill = self.assistant.detect_skill_tag(transcript)
        
        # self.assistant.sentence_detect(transcript, self.skills)
        # await self.assistant.validate_assistant_response(tag_skill, user_skills)
        
        # test skill
        # await self.assistant.test_only_skill(self.skills, 'create a new task')
        
        # return response_transcript
        tag_skill = "Test response."
        return response_transctript, tag_skill