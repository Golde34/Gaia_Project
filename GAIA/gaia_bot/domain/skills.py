from gaia_bot.abilities.detect_sentence_objects import DetectSentenceObjects
from gaia_bot.abilities.task_detection import DetectSkill
from gaia_bot.abilities.open_client_gui import OpenClientGUI

SKILLS = [
    {
        'func': DetectSentenceObjects.handle_input,
        'tags': 'detect sentence object, sentence object',
        'description': 'Detect all objects in the sentence like geography, time, person, etc.',
        'service': 'All',
        'authentication': 'Authenticated'
    },
    {
        'func': DetectSkill.detect_skill_tag, 
        'tags': 'detect skill, create task, create a new task, detect task, check task, delete task, update task',
        'description': 'Detect Gaia skill through user command',
        'service': 'All',
        'authentication': 'Authenticated'
    },
    {
        'func': OpenClientGUI.open_client_gui,
        'tags': 'open client gui, open gui, open client',
        'service': 'All',
        'authentication': 'Not Authenticated'
    },
    {
        'func': DetectSkill.test,
        'tags': 'greeting',
        'service': 'All',
        'authentication': 'Authenticated'
    } 
]