class ResponseCreator():
    
    def generate_response(self, text, **kwargs):
        try:
            response = "This is a response." + text
            return response
        except:
            response = "Failed to generate response."
            return response