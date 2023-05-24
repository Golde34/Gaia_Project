from Dream.skills.skill import AssistantSkill
from Dream.utils.mongoDB import db
from Dream.utils.console_log import headerize


autorun_skills_format = ""
autorun_skills_body_format = ""
basic_skills_format = ""
basic_skills_body_format = ""
learned_skills_format = ""
learned_skills_body_format = ""

class AssistantInfoSkills(AssistantSkill):

    @classmethod
    def assistant_check(cls, **kwargs):
        cls.response('Hey boss!')

    @classmethod
    def tell_the_skills(cls, **kwargs):
        try:
            response_base = "I can do the following: \n\n"
            response = cls._create_skill_response(response_base)
            cls.response(response)
        except Exception as e:
            cls.console(error_log="Error with the execution of skill with message {0}".format(e))
            cls.response("Sorry I faced an issue")

    @classmethod
    def assistant_help(cls, **kwargs):
        cls.console(headerize('Help'))
        response_base = ''
        try:
            response = cls._create_skill_response(response_base)
            cls.console(response)
        except Exception as e:
            cls.console(error_log="Error with the execution of skill with message {0}".format(e))
            cls.response("Sorry I faced an issue")

    @classmethod
    def _create_skill_response(cls, response):
        autorun_skills = db.get_documents(collection='autorun_skills')
        response = response + autorun_skills_format
        for skill_id, skill in enumerate(autorun_skills, start=1):
            response = response + autorun_skills_body_format.format(skill_id,
                                                                    skill.get('name'),
                                                                    skill.get('description'))
        basic_skills = db.get_documents(collection='enabled_basic_skills')
        response = response + basic_skills_format

        for skill_id, skill in enumerate(basic_skills, start=1):
            response = response + basic_skills_body_format.format(skill_id, skill.get('name'),
                                                                  skill.get('description'), skill.get('tags'))
        skills = db.get_documents(collection='learned_skills')
        response = response + learned_skills_format
        for skill_id, skill in enumerate(skills, start=1):
            response = response + learned_skills_body_format.format(skill_id, skill.get('name'),
                                                                    skill.get('tags'), skill.get('func'))

        return response