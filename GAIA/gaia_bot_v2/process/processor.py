import gaia_bot_v2

from gaia_bot_v2.commands.response import AlpacaResponse
from gaia_bot_v2.domain.skills import SKILLS
from gaia_bot_v2.kernel.utils.trie_node import create_skill_trie


class Processor:
    def __init__(self, console_manager, assistant, settings, register_models):
        self.console_manager = console_manager
        self.assistant = assistant
        self.settings = settings
        self.skills = SKILLS
        self.register_models = register_models

    async def run(self):
        """This function is used to run the Gaia bot.

        Returns:
            response_transcript: Gaia response
            tag_skill: detected Gaia skill
        """
        transcript = gaia_bot_v2.input_engine.recognize_input()
        self.console_manager.console_output(
            text="Handling your command", info_log="Handle input"
        )
        # TODO
        # user skills based on user authorization and available satellite services
        # user_skills = create_skill_trie(self.skills)
        # Response transcript
        response_transcript, tag_skill = self._response_and_detect_skill(transcript)

        # self.assistant.sentence_detect(transcript, self.skills)
        # await self.assistant.validate_assistant_response(tag_skill, user_skills)

        # test skill
        # await self.assistant.test_only_skill(self.skills, 'create a new task')

        # return response_transcript
        tag_skill = "Test response."
        return response_transcript, tag_skill

    def _response_and_detect_skill(self, transcript):
        response_model, response_tokenizer = self.register_models["response"]
        detect_skill_model = self.register_models["detect_skill"]

        if response_model is None:
            response_transcript, _ = self._handle_insufficient_resources("response")
        else:
            response_transcript = self._generate_response(
                transcript, response_model, response_tokenizer
            )

        if detect_skill_model is None:
            return self._handle_insufficient_resources("detect_skill")

        tag_skill = self.assistant.detect_skill_tag(
            transcript, model=detect_skill_model
        )

        return response_transcript, tag_skill

    def _handle_insufficient_resources(self, resource_type):
        if resource_type == "response":
            self.console_manager.console_output(
                text=f"You do not have enough resources for GAIA to {resource_type} directly. Do you want to redirect to use the web? (Y/N)",
                info_log=f"Not enough resources to {resource_type} directly",
            )
            transcript = gaia_bot_v2.input_engine.recognize_input()
            if transcript.lower() == "y":
                # redirect to web
                
                return "Redirect to web", None
            elif transcript.lower() == "n":
                return "Response model is not available", None
        
        if resource_type == "detect_skill":
            self.console_manager.console_output(
                text=f"You do not have enough resources for GAIA to {resource_type}. Redirect to use the web.",
                info_log=f"Not enough resources to {resource_type} directly",
            )
            # redirect to web
            
            return "Redirect to web", None

    def _generate_response(self, text, model, tokenizer, **kwargs):
        try:
            response = AlpacaResponse.generate_response(text, model, tokenizer)
            return response
        except Exception as e:
            response = "Failed to generate response: {}".format(e)
            return response
