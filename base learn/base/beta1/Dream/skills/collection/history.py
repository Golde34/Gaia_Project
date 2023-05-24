import re

from Dream.skills.skill import AssistantSkill
from Dream.utils.mongoDB import db

header = ""
response_base = ""

class HistorySkill(AssistantSkill):
    default_limit = 3

    @classmethod
    def show_history_log(cls, voice_transcript, skill):
        limit = cls._extract_history_limit(voice_transcript, skill)
        limit = limit if limit else cls.default_limit
        documents = db.get_documents(collection='history', limit=limit)
        response = cls._create_response(documents)
        cls.console(response)

    @classmethod
    def _create_response(cls, documents):
        response = ''
        try:
            for document in documents:
                response += response_base.format(document.get('user_transcript', '--'),
                                                 document.get('response', '--'),
                                                 document.get('executed_skill').get('skill').get('name') if
                                                 document.get('executed_skill') else '--')
        except Exception as e:
            cls.console(error_log=e)
        finally:
            from Dream.utils import input, console_log
            return header + response

    @classmethod
    def _extract_history_limit(cls, voice_transcript, skill):
        tags = cls.extract_tags(voice_transcript, skill['tags'])
        number_regex = '([0-9]+$)'
        for tag in tags:
            regex = re.search(tag + ' ' + number_regex, voice_transcript)
            if regex:
                limit = int(regex.group(1))
                return limit