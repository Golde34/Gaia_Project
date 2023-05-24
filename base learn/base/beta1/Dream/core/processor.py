from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity

import Dream
from Dream.core.nlp import ResponseCreator
from Dream.skills.analyzer import SkillAnalyzer
from Dream.skills.skill import AssistantSkill
from Dream.skills.collection.activation import ActivationSkills
from Dream.skills.registry import skill_objects, autorun_skill_objects
from Dream.utils.mongoDB import db


class Processor:
    def __init__(self, console_manager, settings_):
        self.console_manager = console_manager
        self.settings = settings_
        self.response_creator = ResponseCreator()
        self.skill_analyzer = SkillAnalyzer(
            weight_measure=TfidfVectorizer,
            similarity_measure=cosine_similarity,
            args=self.settings.SKILL_ANALYZER.get('args'),
            sensitivity=self.settings.SKILL_ANALYZER.get('sensitivity'),
        )

    def run(self):
        transcript = Dream.input_engine.recognize_input()
        skill = self.skill_analyzer.extract(transcript)

        if not skill:
            response = self.response_creator.create_negative_response(transcript)
            Dream.output_engine.assistant_response(response)

        validate_skill = AssistantSkill.validate_assistant_response(skill)

        if validate_skill.get('func'):
            if validate_skill.get('is_new'):
                new_skill = {
                    'name': 'learned_skill',
                    'enable': True,
                    'func': validate_skill.get('func'),
                    'tags': transcript,
                },
                query = {"tags":transcript}
                find_document_from_database = db.find_document(collection='learned_skill', query=query)
                if find_document_from_database:
                    for document in find_document_from_database:
                        db.delete_document(collection='learned_skills', query=document)

                db.insert_many_documents(collection='learned_skills', documents=new_skill)

            if validate_skill.get('is_skill'):
                skill['func'] = validate_skill.get('func')
                response = self.response_creator.create_positive_response(transcript)
                Dream.output_engine.assistant_response(response)

                execute_skill = {'voice_transcript': transcript, 'skill': skill}
                self.execute_skill(execute_skill)
        # else:
        #     response = WolframSkills.call_wolframalpha(transcript)
        #
        #     skill_to_execute = {'voice_transcript': transcript,
        #                         'skill': {'name': 'learned_skills'}
        #                         }
        #     record = {'user_transcript': transcript,
        #               'response': response if response else '--',
        #               'executed_skill': skill_to_execute if skill_to_execute else '--'
        #               }
        #
        #     db.insert_many_documents('history', [record])
        else:
            response = '--'
            execute_skill = {'voice_transcript': transcript,
                             'skill': {'name': 'learned_skills'}}

            record = {'user_transcript': transcript,
                      'response': response,
                      'execute_skill': execute_skill if execute_skill else '--'
                      }

            db.insert_many_document('history', [record])

    def execute_skill(self, skill):
        if skill:
            skill_func_name = skill.get('skill').get('func')
            self.console_manager.console_output(info_log='Executing skill {0}'.format(skill_func_name))
            try:
                ActivationSkills.enable_assistant()
                skill_func_name = skill.get('skill').get('func')
                skill_func = skill_objects[skill_func_name]
                skill_func(**skill)
            except Exception as e:
                self.console_manager.console_output(error_log="Failed to execute skill {0} with message: {1}"
                                                    .format(skill_func_name, e))

    def execute_autorun_skill(self):
        for autorun_skill_name, autorun_skill in autorun_skill_objects.items():
            self.console_manager.console_output(info_log='Automatically executing skill {0}'.format(autorun_skill_name))
            autorun_skill()