from gaia_bot_v2.kernel.configs.auth_config import USER_PROFILE

class AuthenticationCommand():
    
    def __init__(self, auth_service_status):
        face_recognition_status = False
        voice_recognition_status = False
        username_password_status = False
        self.token = None
        self.auth_service_status = auth_service_status
    
    def process(self):
        try:
            if (self.face_recognition_method
                and self.voice_recognition_method
                and self.username_password_method):
                username = USER_PROFILE.get("username")
                password = USER_PROFILE.get("password")
                self.auth_service_status = self.check_auth_service_status()
                if self.auth_service_status:
                    self.login_to_get_token(username, password)
                    self.token = self.save_token()
                    return self.token
                else:
                    raise Exception("Authentication service is not available")
        except Exception as e:
            print(f"Error: {e}")
            return None

    def face_recognition_method(self):
        pass

    def voice_recognition_method(self):
        pass

    def username_password_method(self):
        pass

    def check_auth_service_status(self):
        pass
    
    def login_to_get_token(self, username, password):
        from microservices.connection.authen_command import AuthenticationConnector
        authenticationConnector = AuthenticationConnector(username, password)
        return authenticationConnector.call_login_api()
    
    def save_token(self):
        pass