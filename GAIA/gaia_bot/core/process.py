import gaia_bot


class Process:

    def __init__(self, console_manager, settings, assistant, skills):
        self.console_manager = console_manager
        self.settings = settings
        self.assistant = assistant
        self.skills = skills
        # Maybe in here I need to create a response creator

    def run(self):
        transcript = gaia_bot.input_engine.recognize_input()
        self.console_manager.console_output(text="I will connect to dictionary of plugins to handle input",
                                            info_log="Handle input")

        self.assistant.sentence_detect(transcript, self.skills)
        # assistant.validate_assistant_response(i, SKILLS)
        return transcript

