from Dream.skills.skill import AssistantSkill
from Dream.utils.mongoDB import db
from Dream.utils import input

header = ""


class RememberSkill(AssistantSkill):

    @classmethod
    def remember(cls, **kwargs):
        cls.console(header)
        continue_add = True
        while continue_add:
            cls.console(text='Question: ')
            tags = cls.user_input()
            cls.console(text='Suggested Response: ')
            response = cls.user_input()
            new_skill = {'name': 'learned_skill',
                         'enable': True,
                         'func': cls.tell_response.__name__,
                         'response': response,
                         'tags': tags,
                         },

            cls.response('Add more? ', refresh_console=False)
            continue_add = input.check_input_to_continue()
            db.insert_many_documents(collection='learned_skills', documents=new_skill)

    @classmethod
    def tell_response(cls, **kwargs):
        cls.response(kwargs.get('skill').get('response'))

    @classmethod
    def clear_learned_skills(cls, **kwargs):
        if db.is_collection_empty(collection='learned_skills'):
            cls.response("I can't find learned skills in my database")
        else:
            cls.response('I found learned skills..')
            cls.response('Are you sure to remove learned skills?', refresh_console=False)
            user_answer = input.check_input_to_continue()
            if user_answer:
                db.drop_collection(collection='learned_skills')
                cls.response("I perfectly deleted them all.")