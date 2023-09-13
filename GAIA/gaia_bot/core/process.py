import gaia_bot

from gaia_bot.core.response_creator import ResponseCreator

class Process:

    def __init__(self, console_manager, settings, assistant, skills):
        self.console_manager = console_manager
        self.settings = settings
        self.assistant = assistant
        self.skills = skills
        self.response_creator = ResponseCreator()

    def run(self):
        transcript = gaia_bot.input_engine.recognize_input()
        self.console_manager.console_output(text="Handling your command",
                                            info_log="Handle input")
        # Response
        response_transcript = self.response_creator.generate_response(transcript)
        # Execute Script



        # self.assistant.sentence_detect(transcript, self.skills)
        self.assistant.validate_assistant_response(transcript, self.skills)

        return response_transcript

