import re

from gaia_bot.models.alpaca import inference


class AlpacaResponse():
    
    @classmethod
    def generate_response(cls, text, model, tokenize, **kwargs):
        try:
            response = inference.call_alpaca_response(inp=text, model=model, tokenizer=tokenize)
            last_response = cls._format_response(response)
            return last_response
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
    