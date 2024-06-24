from gaia_bot.models.task_detect.prompt_to_response import inference

class DetectSkill():
    
    def __init__(self, text, model):
        self.text = text
        self.model = model

    @classmethod
    def detect_skill_tag(cls, text, model):
        try:
            detected_task = inference.infer(text, model)
            return detected_task
        except Exception as e:
            print(f"Failed to detect skill tag: {e}")
            return None