import asyncio
from concurrent.futures import ThreadPoolExecutor
from gaia_bot_v2.kernel.configs.auth_config import USER_PROFILE


class AuthenticationCommand():
    
    def __init__(self, auth_service_status):
        self.token = None
        self.auth_service_status = auth_service_status
   
    async def authenticate(self):
        loop = asyncio.new_event_loop()
        with ThreadPoolExecutor() as executor:
            # Tạo các future để chạy các phương pháp xác thực song song
            futures = [
                loop.run_in_executor(executor, self.face_recognition_method),
                loop.run_in_executor(executor, self.voice_recognition_method),
                loop.run_in_executor(executor, self.username_password_method),
            ]
            
            # Đợi phương pháp đầu tiên hoàn thành
            done, pending = await asyncio.wait(futures, return_when=asyncio.FIRST_COMPLETED)
            # Hủy bỏ các tác vụ còn lại nếu một tác vụ đã hoàn thành thành công
            for future in pending:
                future.cancel()
            
            if result:
                print("Authentication successful")
            else:
                print("Authentication failed")
            # Lấy kết quả của phương pháp đầu tiên hoàn thành
            result = done.pop().result()
    
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