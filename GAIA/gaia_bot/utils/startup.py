import os
from gaia_bot.modules.ports.commands.authen_command import AuthenticationConnector 
from gaia_bot.utils.activate_microservice import wait_authen_microservice


def recognize_owner_by_voice():
    pass

def recognize_owner_by_face(is_owner):
    if is_owner:
        return True
    util_dir = os.path.dirname(os.path.abspath(__file__))
    proto_path = os.path.join(util_dir, '..', 'modules\\local\\resources\\face_recognition\\face_detection_model', 'deploy.prototxt')
    model_path = os.path.join(util_dir, '..', 'modules\\local\\resources\\face_recognition\\face_detection_model', 'res10_300x300_ssd_iter_140000.caffemodel')
    embedder_path = os.path.join(util_dir, '..', 'modules\\local\\resources\\face_recognition\\openface_nn4.small2.v1.t7')
    recognizer_path = os.path.join(util_dir, '..', 'modules\\local\\resources\\face_recognition\\output\\recognizer.pickle')
    le_path = os.path.join(util_dir, '..', 'modules\\local\\resources\\face_recognition\\output\\le.pickle')
    
    # result = master_recognize(proto_path, model_path, embedder_path, recognizer_path, le_path)
    # return result

async def recognize_owner_by_authen_service(username, password):
    wait = await wait_authen_microservice()
    print(wait)
    if wait == True:
        authentication = AuthenticationConnector(username, password)
        token_string = authentication.activate_authentication_command()
        return token_string
    else:
        return "Later kickoff authen skill"