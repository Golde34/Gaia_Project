from gaia_bot.abilities.sentence_object_recognizer import SOR
from gaia_bot.abilities.skill_detection import DetectSkill
from gaia_bot.abilities.open_client_gui import OpenClientGUI
from gaia_bot.abilities.task_crud_abilities import TaskCRUDSkill


SKILLS = [
    {
        'func': SOR.handle_input,
        'tags': 'detect sentence object, sentence object',
        'description': 'Detect all objects in the sentence like geography, time, person, etc.',
        'service': 'All',
        'authentication': 'Authenticated'
    },
    {
        'func': TaskCRUDSkill.create_task, 
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