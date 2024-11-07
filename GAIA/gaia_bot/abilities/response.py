import re

from gaia_bot.models.alpaca import inference


class AlpacaResponse():
    
    @classmethod
    def generate_response(cls, mode, text, model, tokenize, tag_skill, **kwargs):
        try:
            # Check config that use alpaca, claude or chatgpt ...
            response = inference.call_alpaca_response(inp=text, model=model, tokenizer=tokenize, mode=mode, tag_skill=tag_skill)
            if mode == "run":
                last_response = cls._format_response(response)
                return last_response
            return response
        except Exception as e:
            print(f"Error: {e}")
            return "Failed to generate response."

    @classmethod
    def generate_greeting(cls, model, tokenize):
        try:
            response = inference.gaia_wakeup_generate(model, tokenize)
            last_response = cls._format_response(response)
            return last_response
        except Exception as e:
            print(f"Error: {e}")
            return "Failed to generate greeting."      
            
    @classmethod
    def _format_response(cls, response):
        match = re.search("### Response:\n(.*?)###", response, re.DOTALL)
        if match:
            return match.group(1).strip()
        else:
            parts = response.split("### Response:\n")
            if len(parts) > 1:
                return parts[1].strip()
        return response
    