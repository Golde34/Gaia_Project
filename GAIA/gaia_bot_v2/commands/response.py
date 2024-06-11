import logging
import re

from gaia_bot_v2.models.alpaca import inference
import gaia_bot_v2.kernel.utils.gpu_threads as gpuutils

# logging.basicConfig(level=logging.ERROR)

class AlpacaResponse():
    
    @classmethod
    def generate_response(cls, text, model, tokenize, **kwargs):
        try:
            check_gpu = gpuutils.check_gpu_memory()
            if check_gpu:
                print("Generating response by alpaca")
                response = inference.call_alpaca_response(inp=text, model=model, tokenizer=tokenize)
                last_response = cls._format_response(response)
                return last_response
            else:
                gpuutils.clear_gpu_memory()
                print("GPU Mempry is not enough, holding the next model.")
                return "Gaia is not available now. Open web browser to access Gaia's Service."
        except Exception as e:
            print(f"Error: {e}")
            cls.console_manager.console_output('Failed to generate response.')
            
    @classmethod
    def _format_response(cls, response):
        matches = re.findall(r'{(.+?)}', response)
        if matches:
            return matches[-1].strip()
        
        return response
    