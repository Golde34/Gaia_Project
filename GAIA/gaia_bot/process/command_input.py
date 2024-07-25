import gaia_bot
from gaia_bot.kernel.utils.console_log import USER_INPUT

class CommandInput:
    
    def __init__(self, transcript: str):
        self.transcript = transcript

    def get_command(self):
        if self.transcript.lower() in ["cmd", "command"]:
            user_command = input("Enter your command (what do you want to Gaia to process?): ")
            return user_command
        if self.transcript.lower() == "help":
            return "help"
        return None
     
    def handle_command(self, command):
        if command is None:
            return None, None
        if command == "help":
            return self._get_gaia_help_message()
        if command == "create task":
            return self._create_task()
        return None, None
    
    def _get_gaia_help_message(self):
        return "Gaia Bot's command line interface:\n" \
                "Input: exit, q, bye, quit  to exit the program\n" \
                "Input: help                to show this message\n" \
                "Input: cmd, c, command     to enter your command", "Help message"
    
    def _create_task(self):
        title = input("Enter your task title: ")
        content = input("Enter your task content: ")
        duration = input("Enter your task duration: ")
        priority = input("Enter your task priority(Low, Medium, High, Star): ")
        deadline = input("Enter your task deadline: ")
        return f"Task created with title: {title}, content: {content}, duration: {duration}, priority: {priority}, deadline: {deadline}", "Create task"