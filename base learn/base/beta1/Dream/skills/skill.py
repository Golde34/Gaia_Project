import os
import subprocess
import threading

import Dream
from Dream.core.console import ConsoleManager
from Dream.utils import input


class AssistantSkill:
    first_activation = True
    console_manager = ConsoleManager()
    run_auto_check_email = False
    is_checking_email = False
    skill_dir = os.path.dirname(__file__)

    @classmethod
    def console(cls, text='', debug_log=None, info_log=None, warn_log=None, error_log=None, refresh_console=True):
        cls.console_manager.console_output(text=text,
                                           debug_log=debug_log,
                                           info_log=info_log,
                                           warn_log=warn_log,
                                           error_log=error_log,
                                           refresh_console=refresh_console)

    @classmethod
    def response(cls, text, refresh_console=True):
        Dream.output_engine.assistant_response(text, refresh_console=refresh_console)

    @classmethod
    def user_input(cls):
        user_input = Dream.input_engine.recognize_input(already_activated=True)
        return user_input

    @classmethod
    def extract_tags(cls, voice_transcript, tags):
        try:
            transcript_words = voice_transcript.split()
            tags = tags.split(',')
            return set(transcript_words).intersection(tags)
        except Exception as e:
            cls.console_manager.console_output(info_log='Failed tp extract tags with messages: {0}'.format(e))
            return set()

    @classmethod
    def create_thread(cls, func):
        func_thread = threading.Thread(target=func, args=())
        func_thread.daemon = True
        func_thread.start()

    @classmethod
    def validate_assistant_response(cls, response):
        result = {'func': '', 'is_skill': False, 'is_new': False}
        user_validation = False
        if response:
            result['func'] = response.get('func')
            if response.get('name') == 'learned_skill':
                cls.response(response.get('func'))
            else:
                cls.response('Execute skill: {0}'.format(response.get('name')))
            cls.response("Is that the response you want?", refresh_console=False)
            user_validation = input.check_input_to_continue()
        else:
            result['func'] = ''

        if not user_validation:
            result['func'] = ''
            cls.console(text='Suggested Response: ')
            user_response = cls.user_input()
            if user_response != 'o':
                result['func'] = user_response
                result['is_new'] = True

        if '_' in result['func']:
            result['is_skill'] = True

        return result

    @classmethod
    def open_notification_console(cls, file_path):
        collection_dir = os.path.dirname(__file__)
        notification_console_path = os.path.join(collection_dir, '..', 'core', 'notification_console.py')
        subprocess.call("python" + notification_console_path + " " + file_path, shell=True)

