import os
import speech_recognition as sr

from gaia_bot.modules.ports.commands.authen_command import AuthenticationConnector 
from gaia_bot.kernel.utils.activate_microservice import wait_microservice
from gaia_bot.modules.skills.collections.face_security import master_recognize


async def multi_authenticate(console_manager):
    voice_result = await recognize_owner_by_voice()
    if voice_result:
        return "authenticate by voice"
    else:
        console_manager.console_output(error_log="Voice authentication failed")
        face_result = await recognize_owner_by_face(False)
        if face_result:
            return "authenticate by face"
        else:
            console_manager.console_output(error_log="Face authentication failed")
            username = "golde"
            password = "483777"
            access_token = await recognize_owner_by_authen_service(username=username, password=password)
            return access_token
        

async def recognize_owner_by_voice():
    recognizer = sr.Recognizer()
    with sr.Microphone() as source:
        print("Say something!")
        audio = recognizer.listen(source)
    try: 
        text = await recognizer.recognize_google(audio)
        return text
    except sr.UnknownValueError:
        return None
    
async def recognize_owner_by_face(is_owner):
    if is_owner:
        return True
    util_dir = os.path.dirname(os.path.abspath(__file__))
    proto_path = os.path.join(util_dir, '..', 'modules\\local\\resources\\face_recognition\\face_detection_model', 'deploy.prototxt')
    model_path = os.path.join(util_dir, '..', 'modules\\local\\resources\\face_recognition\\face_detection_model', 'res10_300x300_ssd_iter_140000.caffemodel')
    embedder_path = os.path.join(util_dir, '..', 'modules\\local\\resources\\face_recognition\\openface_nn4.small2.v1.t7')
    recognizer_path = os.path.join(util_dir, '..', 'modules\\local\\resources\\face_recognition\\output\\recognizer.pickle')
    le_path = os.path.join(util_dir, '..', 'modules\\local\\resources\\face_recognition\\output\\le.pickle')
    
    result = await master_recognize(proto_path, model_path, embedder_path, recognizer_path, le_path)
    return result

async def recognize_owner_by_authen_service(username, password):
    wait = await wait_microservice('authentication_service')
    if wait == True:
        authentication = AuthenticationConnector(username, password)
        token_string = authentication.activate_authentication_command()
        return "Authentication successfully with token id: " + token_string
    else:
        return "Later kickoff authen skill"
    