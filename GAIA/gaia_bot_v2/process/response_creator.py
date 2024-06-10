from gaia_bot_v2.commands.response import AlpacaResponse

class ResponseCreator():
    
    def generate_response(self, text, model, tokenizer, **kwargs):
        try:
            print("Generating response.")
            response = AlpacaResponse.generate_response(text, model, tokenizer) 
            return response
        except:
            response = "Failed to generate response."
            return response