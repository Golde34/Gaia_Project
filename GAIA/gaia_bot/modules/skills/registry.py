from gaia_bot.modules.skills.collections.extract_sentence_object import SentenceExtractSkill
from gaia_bot.modules.skills.collections.default_skill import DefaultSkill
from gaia_bot.modules.skills.collections.response import GPT2GenerateResponse
from gaia_bot.modules.skills.collections.detect_skill import DetectSkill
from gaia_bot.modules.skills.collections.open_client_gui import OpenClientGUI
from gaia_bot.modules.skills.collections.task_crud_skill import TaskCRUDSkill


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
    },
    {
        'func': OpenClientGUI.open_client_gui,
        'tags': 'open client gui, open gui, open client',
    },
    # TASK MANAGER FUNCTION
    {
        'func': TaskCRUDSkill.execute,
        'tags': 'Create Task'
    }
]