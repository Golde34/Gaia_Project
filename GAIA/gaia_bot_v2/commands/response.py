import logging

from gaia_bot_v2.models.alpaca import inference


# logging.basicConfig(level=logging.ERROR)

class AlpacaResponse():
    
    @classmethod
    def generate_response(cls, text, model, tokenize, **kwargs):
        try:
            print("Generating response by alpaca")
            response = inference.call_alpaca_response(inp=text, model=model, tokenizer=tokenize)
            last_response = cls._format_response(response)
            return last_response
        except Exception as e:
            print(f"Error: {e}")
            cls.console_manager.console_output('Failed to generate response.')
            
    @classmethod
    def _format_response(cls, response):
        return response
    