import asyncio
import os
import warnings

from gaia_bot.abilities.microservice_connections import MicroserviceConnection
from gaia_bot.abilities.authentication import face_recognition_authen
from gaia_bot.domain.enums import InputMode, AuthenType, MicroserviceAcronymsEnum
from gaia_bot.kernel.configs.auth_config import USER_PROFILE
from gaia_bot.kernel.configs.settings import DEFAULT_GENERAL_SETTINGS
from gaia_bot.kernel.configs.__config__ import __path__
from gaia_bot.microservices.connection.authen_command import AuthenticationConnector


warnings.filterwarnings("ignore", category=UserWarning, module="sklearn.base")

class AuthenticationCommand():
    
    def __init__(self, auth_service_status):
        self.token = None
        self.auth_service_status = auth_service_status
        self.input_mode = DEFAULT_GENERAL_SETTINGS['input_mode']

    async def process(self):
        try:
            username = USER_PROFILE.get("username")
            password = USER_PROFILE.get("password")
            method, status = await self.select_authentication_method()
            if method is not None and status:
                if self.auth_service_status:
                    token = await self.login_to_get_token(username, password)
                    return token, username, True
                else:
                    raise Exception("Authentication service is not available")
            raise Exception("Authentication failed")
        except Exception as e:
            print(f"Error: {e}")
            return None, username, False

    async def select_authentication_method(self):
        if self.input_mode == InputMode.VOICE.value:
            result = await self.authentication_task(self.voice_recognition_method)
            if result:
                print("Voice authentication successful")
                return AuthenType.VOICE._value_, True
            else:
                print("Voice authentication failed")

        # If input_mode is text, or voice authentication failed
        face_task = asyncio.create_task(self.authentication_task(self.face_recognition_method))
        done, pending = await asyncio.wait([face_task], timeout=15)

        if face_task in done:
            if await face_task:
                print("Face authentication successful")
                return AuthenType.FACE._value_, True
            else:
                print("Face authentication failed")
        else:
            print("Face authentication timeout")
            face_task.cancel()

        username_password_authen_result = await self.authentication_task(self.username_password_method)
        if username_password_authen_result:
            return AuthenType.TOKEN._value_, True
        
        return None, False

    async def authentication_task(self, method):
        result = await asyncio.get_running_loop().run_in_executor(None, method)
        return result

    def face_recognition_method(self):
        utils_dir = os.path.dirname(__path__)

        protoPath = os.path.join(utils_dir, 'resources', 'face_recognize_model', 'deploy.prototxt')
        modelPath = os.path.join(utils_dir, 'resources', 'face_recognize_model', 'res10_300x300_ssd_iter_140000.caffemodel')
        embedderPath = os.path.join(utils_dir, 'resources', 'face_recognize_model', 'embedding_model.t7')
        recognizerPath = os.path.join(utils_dir, 'resources', 'face_recognize_model', 'recognizer.pickle')
        lePath = os.path.join(utils_dir, 'resources', 'face_recognize_model', 'le.pickle')
        
        return face_recognition_authen.master_recognize(protoPath, modelPath, embedderPath, recognizerPath, lePath)

    def voice_recognition_method(self):
        pass

    def username_password_method(self):
        return "Golde", "483777"
    
    async def login_to_get_token(self, username, password):
        wait = await MicroserviceConnection().wait_microservice(MicroserviceAcronymsEnum.AS._value_)
        if wait == True: 
            authenticationConnector = AuthenticationConnector(username, password)
            return authenticationConnector.call_login_api()
        else:
            return "Later kickoff authen process."
