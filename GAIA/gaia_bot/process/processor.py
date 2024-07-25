import gaia_bot

from gaia_bot.abilities.response import AlpacaResponse
from gaia_bot.domain.enums import Mode, AIModel
from gaia_bot.process.command_input import CommandInput


class Processor:
    def __init__(self, console_manager, assistant, settings, register_models, user_skills):
        self.console_manager = console_manager
        self.assistant = assistant
        self.settings = settings
        self.register_models = register_models
        self.user_skills = user_skills

    async def run(self, mode="run"):
        """This function is used to run the Gaia bot.

        Returns:
            response_transcript: Gaia response
            tag_skill: detected Gaia skill
        """
        transcript = gaia_bot.input_engine.recognize_input()
        self.console_manager.console_output(
            text="Handling your command", info_log="Handle input"
        )

        # Instruction command
        self._check_exit_gaia(transcript)
        response_transcript, tag_skill = self._input_command(transcript)
        
        # Process
        # Response transcript
        if response_transcript is None and tag_skill is None:
            response_transcript, tag_skill = self._response_and_detect_skill(transcript, mode)

        # Skill process
        self.assistant.skill_process(tag_skill, self.user_skills)

        return response_transcript, tag_skill

    def _check_exit_gaia(self, transcript):
        if transcript.lower() in ["exit", "quit", "q", "bye"]:
            self.console_manager.console_output(
                text="Goodbye, see you later.", info_log="Exit Gaia"
            )
            exit()

    def _input_command(self, transcript):
        command_input = CommandInput(transcript)
        command = command_input.get_command()
        if command is None:
            self.console_manager.console_log(
                error_log="Command is not recognized"
            )
            return None, None
        response_transcript, tag_skill = command_input.handle_command(command)
        if  response_transcript is None or tag_skill is None:
            self.console_manager.console_log(
                error_log="There is an error when execute commands"
            )
            return None, None
        return response_transcript, tag_skill

    def _response_and_detect_skill(self, transcript, mode=Mode.RUN):
        response_model, response_tokenizer = self.register_models[AIModel.ResponseModel]
        detect_skill_model = self.register_models[AIModel.SkillDetectionModel]

        if response_model is None:
            response_transcript, _ = self._handle_insufficient_resources(AIModel.ResponseModel)
        else:
            response_transcript = self._generate_response(
                mode, transcript, response_model, response_tokenizer
            )

        if detect_skill_model is None:
            response_transcript, _ = self._handle_insufficient_resources(AIModel.SkillDetectionModel)

        tag_skill = self.assistant.detect_skill_tag(
            transcript, model=detect_skill_model
        )

        return response_transcript, tag_skill

    def _handle_insufficient_resources(self, resource_type):
        if resource_type == AIModel.ResponseModel:
            self.console_manager.console_output(
                text=f"You do not have enough resources for GAIA to {resource_type} directly. Do you want to redirect to use the web? (Y/N)",
                info_log=f"Not enough resources to {resource_type} directly",
            )
            transcript = gaia_bot.input_engine.recognize_input()
            if transcript.lower() == "y":
                # redirect to web
                
                return "Redirect to web", None
            elif transcript.lower() == "n":
                return "Response model is not available", None
        
        if resource_type == AIModel.SkillDetectionModel:
            self.console_manager.console_output(
                text=f"You do not have enough resources for GAIA to {resource_type}. Redirect to use the web.",
                info_log=f"Not enough resources to {resource_type} directly",
            )
            # redirect to web
            
            return "Redirect to web", None

    def _generate_response(self, mode, text, model, tokenizer, **kwargs):
        try:
            response = AlpacaResponse.generate_response(mode, text, model, tokenizer)
            return response
        except Exception as e:
            response = "Failed to generate response: {}".format(e)
            return response
