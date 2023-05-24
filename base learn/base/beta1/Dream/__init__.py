import os
from logging import config

from Dream.enumerations import InputMode
from Dream import settings
from Dream.settings import ROOT_LOG_CONF
from Dream.utils.startup import configure_database
from Dream.utils.mongoDB import db
from Dream.engines import stt, ttt, tts


config.dictConfig(ROOT_LOG_CONF)

with open(ROOT_LOG_CONF['handlers']['file']['filename'], 'w') as f:
    f.close()

root_file = os.path.dirname(__file__)
with open(root_file+"\\skills\\collection\\temp\\temporary_container.txt", "w") as f:
    f.close()
with open(root_file+"\\skills\\collection\\temp\\temporary_time.txt", "w") as f:
    f.close()

configure_database(db, settings, is_update=False)

assistant_name = db.get_documents(collection='general_settings')[0]['assistant_name']
input_mode = db.get_documents(collection='general_settings')[0]['input_mode']
input_language = db.get_documents(collection='general_settings')[0]['input_language']
response_in_speech = db.get_documents(collection='general_settings')[0]['response_in_speech']

input_engine = stt.STTEngine(input_language) if input_mode == InputMode.VOICE.value else ttt.TTTEngine(input_language)
output_engine = tts.TTSEngine() if response_in_speech else ttt.TTTEngine(input_language)