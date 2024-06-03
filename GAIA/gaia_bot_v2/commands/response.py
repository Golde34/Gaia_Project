import logging


logging.basicConfig(level=logging.ERROR)

class AlpacaResponse():
    
    @classmethod
    def generate_response(cls, text, **kwargs):
        try:
            response = inference(inp=text)
            last_response = cls._format_response(response)
            return last_response
        except Exception as e:
            cls.console_manager.console_output('Failed to generate response.')
            