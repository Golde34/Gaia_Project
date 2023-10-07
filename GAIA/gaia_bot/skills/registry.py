from gaia_bot.skills.collections.extract_sentence_object import SentenceExtractSkill
from gaia_bot.skills.collections.default_skill import DefaultSkill
from gaia_bot.skills.collections.response import GPT2GenerateResponse
from gaia_bot.skills.collections.detect_skill import DetectSkill

SKILLS = [
    {
        'func': DefaultSkill.detect_sentence_object,
        'tags': 'first skill, default skill',
        'description': 'Detect all objects in the sentence like geography, time, person, etc.'
    },
    {
        'func': SentenceExtractSkill.predict,
        'tags': 'detect sentence object, sentence object',
        'description': 'Detect all objects in the sentence like geography, time, person, etc.'
    },
    {
        'func': GPT2GenerateResponse.generate_response,
        'tags': 'generate response, response',
        'description': 'Generate response for assistant'
    },
    {
        'func': DetectSkill.detect_skill_tag,
        'tags': 'detect skill, create task, create a new task, detect task, check task, delete task, update task',
    }
]