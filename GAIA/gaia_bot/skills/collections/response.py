from gaia_bot.model.gpt.inference import inference
from gaia_bot.skills.assistant_skill import AssistantSkill
import re


class GPT2GenerateResponse(AssistantSkill):

    @classmethod
    def generate_response(cls, text, **kwargs):
        try:
            response = inference(inp=text)
            cls.response(cls._format_response(response))
        except Exception as e:
            cls.console_manager.console_output('Failed to generate response.')

    @staticmethod
    def _format_response(response):
        pattern = r"<bot>:(.*?)<endofstring>"
        match = re.search(pattern, response)

        if match:
            extracted_sentence = match.group(1).strip()
            return extracted_sentence
        else:
            return "Failed to generate response."