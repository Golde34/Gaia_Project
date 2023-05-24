import os
import time
import logging

from Dream.enumerations import MongoCollections
from Dream.utils import console_log
from Dream.skills.registry import CONTROL_SKILLS, ENABLE_BASIC_SKILLS, AUTORUN_SKILLS
from Dream.skills.collection.security import master_recognize


def configure_database(db, settings, is_update=False):
    if db.is_collection_empty(collection=MongoCollections.GENERAL_SETTINGS.value) or is_update:
        console_log.print_console_header()
        print('First time configuration..')
        console_log.print_console_header()
        time.sleep(1)

        default_assistant_name = settings.DEFAULT_GENERAL_SETTINGS['assistant_name']
        default_input_mode = settings.DEFAULT_GENERAL_SETTINGS['input_mode']
        default_input_language = settings.DEFAULT_GENERAL_SETTINGS['input_language']
        default_response_in_speech = settings.DEFAULT_GENERAL_SETTINGS['response_in_speech']

        new_settings = {
            'assistant_name': default_assistant_name,
            'input_mode': default_input_mode,
            'input_language': default_input_language,
            'response_in_speech': default_response_in_speech
        }

        try:
            db.update_collection(collection=MongoCollections.GENERAL_SETTINGS.value, documents=[new_settings])
            print('Assistant name -{0} configured successfully!'.format(default_assistant_name.lower()))
            print('Input mode -{0} configured successfully!'.format(default_input_mode))
            print('Input language -{0} configured successfully!'.format(default_input_language))
            print('Response in speech -{0} configured successfully!'.format(default_response_in_speech))
            time.sleep(4)

        except Exception as e:
            logging.error('Failed to configure assistant settings with error messages {0}'.format(e))

    # Set up assistant skill registry
    all_skills = {
        MongoCollections.CONTROL_SKILLS.value: CONTROL_SKILLS,
        MongoCollections.ENABLED_BASIC_SKILLS.value: ENABLE_BASIC_SKILLS,
        MongoCollections.AUTORUN_SKILLS.value: AUTORUN_SKILLS
    }
    for collection, documents in all_skills.items():
        db.update_collection(collection, documents)

# Recognize your boss
def recognize_owner(is_owner):
    if is_owner:
        return True
    utils_dir = os.path.dirname(__file__)
    protoPath = os.path.join(utils_dir, '..', 'resources\\face_recognize_model', 'deploy.prototxt')
    modelPath = os.path.join(utils_dir, '..', 'resources\\face_recognize_model', 'res10_300x300_ssd_iter_140000.caffemodel')
    embedderPath = os.path.join(utils_dir, '..', 'resources\\face_recognize_model', 'embedding_model.t7')
    recognizerPath = os.path.join(utils_dir, '..', 'resources\\face_recognize_model', 'recognizer.pickle')
    lePath = os.path.join(utils_dir, '..', 'resources\\face_recognize_model', 'le.pickle')

    result = master_recognize(protoPath, modelPath, embedderPath, recognizerPath, lePath)
    return result