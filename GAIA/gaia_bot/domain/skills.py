from gaia_bot.abilities.detect_sentence_objects import DetectSentenceObjects
from gaia_bot.abilities.task_detection import DetectSkill

SKILLS = [
    {
        'func': DetectSentenceObjects.handle_input,
        'tags': 'detect sentence object, sentence object',
        'description': 'Detect all objects in the sentence like geography, time, person, etc.',
        'service': 'All'
    },
    {
        'func': DetectSkill.detect_skill_tag, 
        'tags': 'detect skill, create task, create a new task, detect task, check task, delete task, update task',
        'description': 'Detect Gaia skill through user command',
        'service': 'All'
    },
    {
        'func': None,
        'tags': 'open client gui, open gui, open client',
    }, 
]