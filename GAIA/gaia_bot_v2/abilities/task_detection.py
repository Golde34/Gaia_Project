# from gaia_bot.modules.skills.assistant_skill import AssistantSkill
# from gaia_bot.modules.local.models.task_detect.prompt_to_response import inference


class DetectSkill(AssistantSkill):
    
    def __init__(self):
        pass

    @classmethod
    def detect_skill_tag(cls, text):
        try:
            infer = inference.infer(text)
            cls.console_manager.console_output(infer)
            cls.response(str(infer))
        except Exception as e:
            cls.console_manager.console_output('Failed to detect skill tag.')