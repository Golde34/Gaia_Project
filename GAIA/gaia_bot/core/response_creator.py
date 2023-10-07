from gaia_bot.skills.collections.response import GPT2GenerateResponse


class ResponseCreator():
    def __init__(self):
        # super().__init__()  # Dung de init class NLP truyen vao response creator, chua can thiet
        pass

    def generate_response(self, text, **kwargs):
        try:
            response = GPT2GenerateResponse.generate_response(text)
            return response
        except:
            response = "Failed to generate response."
            return response