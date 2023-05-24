from Dream.skills.collection.activation import ActivationSkills
from Dream.skills.collection.boss_email import EmailSkill
from Dream.skills.collection.info import AssistantInfoSkills
from Dream.skills.collection.system_datetime import DateTimeSkill
from Dream.skills.collection.browser import BrowserSkills
from Dream.skills.collection.general import UtilSkills
from Dream.skills.collection.internet import InternetSkills
from Dream.skills.collection.libreoffice import LibreofficeSkills
from Dream.skills.collection.linux import LinuxAppSkills
from Dream.skills.collection.reminder import ReminderSkills
from Dream.skills.collection.system_health import SystemHealthSkills
from Dream.skills.collection.text import WordSkills
from Dream.skills.collection.history import HistorySkill
from Dream.skills.collection.remember import RememberSkill
from Dream.skills.collection.math import MathSkill
from Dream.utils.mapping import math_tags
from Dream.skills.collection.configuration import ConfigurationSkills

CONTROL_SKILLS = [
    {
        'func': ActivationSkills.assistant_greeting,
        'tags': 'start, hi, hello, wake up',
        'description': 'Enables the assistant (ready to hear command)'
    },
    {
        'func': ActivationSkills.disable_assistant,
        'tags': 'bye, shut down, exit, termination',
        'description': 'Stops the assistant service (disable assistant)'
    }
]

AUTORUN_SKILLS = [
    {
        'enable': True,
        'func': EmailSkill.start_auto_check_mail,
        'description': 'auto check new coming email (tell you if have one)'
    }
]

BASIC_SKILLS = [
    {
        'enable': True,
        'func': EmailSkill.check_mail,
        'tags': 'check email, new email, c e',
        'description': 'Opens a domain in browser'
    },

    {
        'enable': True,
        'func': EmailSkill.start_auto_check_mail,
        'tags': 'a c e,automatically check email',
        'description': 'automatically check email'
    },

    {
        'enable': True,
        'func': EmailSkill.stop_auto_check_mail,
        'tags': 's a c e, stop automatically check email',
        'description': 'stop automatically check email'
    },
    {
        'enable': True,
        'func': BrowserSkills.open_website_in_browser,
        'tags': 'open',
        'description': 'Opens a domain in browser'
    },

    {
        'enable': True,
        'func': BrowserSkills.tell_me_today_news,
        'tags': 'news, today news, t n',
        'description': 'Tells the daily news (find on Google newsfeed)'
    },

    {
        'enable': True,
        'func': DateTimeSkill.tell_the_time,
        'tags': 'time, hour',
        'description': 'Tells the current time'
    },

    {
        'enable': True,
        'func': DateTimeSkill.tell_the_date,
        'tags': 'date',
        'description': 'Tells the current date'
    },

    {
        'enable': True,
        'func': BrowserSkills.tell_me_about,
        'tags': 'search',
        'description': 'Tells about something based on Google search'
    },

    {
        'enable': True,
        'func': UtilSkills.speech_interruption,
        'tags': 'stop',
        'description': 'Stop/interrupt assistant speech'
    },

    {
        'enable': True,
        'func': AssistantInfoSkills.assistant_help,
        'tags': 'help',
        'description': 'A list with all the available skills'
    },

    {
        'enable': True,
        'func': AssistantInfoSkills.assistant_check,
        'tags': 'hey, hi',
        'description': 'User check if assistant works'
    },

    {
        'enable': True,
        'func': SystemHealthSkills.tell_memory_consumption,
        'tags': 'ram, ram usage, memory, memory consumption',
        'description': 'The assistant current memory consumption, '

    },

    {
        'enable': True,
        'func': BrowserSkills.open_in_youtube,
        'tags': 'play',
        'description': 'Plays music in Youtube'
    },

    {
        'enable': True,
        'func': InternetSkills.run_speedtest,
        'tags': 'speedtest, internet speed, ping, st',
        'description': 'Checks internet speed'
    },

    {
        'enable': True,
        'func': InternetSkills.internet_availability,
        'tags': 'internet conection, ic',
        'description': 'Checks for internet availability'
    },

    {
        'enable': False,
        'func': WordSkills.spell_a_word,
        'tags': 'spell, spell the word',
        'description': 'Spells a word'
    },

    {
        'enable': True,
        'func': ReminderSkills.create_reminder,
        'tags': 'reminder',
        'description': 'Create a time reminder'
    },

    {
        'enable': True,
        'func': AssistantInfoSkills.tell_the_skills,
        'tags': 'skills, your skills, what are your skills',
        'description': 'Tells all assistant available skills'
    },

    {
        'enable': True,
        'func': LinuxAppSkills.open_new_bash,
        'tags': 'bash',
        'description': 'Ask to open new bash'
    },

    {
        'enable': True,
        'func': HistorySkill.show_history_log,
        'tags': 'history, history log, user history',
        'description': 'Ask to tell you asked commands'
    },

    {
        'enable': True,
        'func': RememberSkill.remember,
        'tags': 'remember',
        'description': 'Remember question - answer pairs'
    },

    {
        'enable': True,
        'func': RememberSkill.tell_response,
        'tags': '',
        'description': 'Util skill, there is no tags to call it'
    },

    {
        'enable': True,
        'func': RememberSkill.clear_learned_skills,
        'tags': 'clear learned skills, drop learned skills, remove learned skills',
        'description': 'Clear the learned skills'
    },

    {
        'enable': True,
        'func': UtilSkills.clear_console,
        'tags': 'clear, clear console',
        'description': 'Clears bash console'
    },

    {
        'enable': True,
        'func': ReminderSkills.set_alarm,
        'tags': 'alarm, set alarm',
        'description': 'Set daily alarm (the assistant service should be running)'
    },

    {
        'enable': True,
        'func': MathSkill.do_calculations,
        'tags': math_tags,
        'description': 'Do basic math calculations in bash terminal e.g " (5+5) ^ 2"'
    },

    {
        'enable': True,
        'func': ConfigurationSkills.configure_assistant,
        'tags': 'configure, change settings',
        'description': 'Change the assistant setting values'
    },

    {
        'enable': False,
        'func': UtilSkills.increase_master_volume,
        'tags': 'increase volume, volume up, speak louder',
        'description': 'Increases the speakers master volume'
    },

    {
        'enable': False,
        'func': UtilSkills.reduce_master_volume,
        'tags': 'reduce volume, volume down',
        'description': 'Decreases the speakers master volume'
    },

    {
        'enable': False,
        'func': UtilSkills.mute_master_volume,
        'tags': 'mute',
        'description': 'Mutes the speakers master volume'
    },

    {
        'enable': False,
        'func': UtilSkills.max_master_volume,
        'tags': 'volume max',
        'description': 'Set max the speakers master volume'
    },

]

for skill in CONTROL_SKILLS + BASIC_SKILLS:
    skill['name'] = skill['func'].__name__

skill_objects = {skill['func'].__name__: skill['func'] for skill in CONTROL_SKILLS + BASIC_SKILLS}

for autorun_skill in AUTORUN_SKILLS:
    autorun_skill['name'] = autorun_skill['func'].__name__

autorun_skill_objects = {autorun_skill['func'].__name__: autorun_skill['func'] for autorun_skill in AUTORUN_SKILLS if autorun_skill['enable']}

def _convert_skill_object_to_str(skill):
    for sk in skill:
        sk.update((k, v.__name__) for k, v in sk.items() if k == 'func')

_convert_skill_object_to_str(CONTROL_SKILLS)
_convert_skill_object_to_str(AUTORUN_SKILLS)

ENABLE_BASIC_SKILLS = [skill for skill in BASIC_SKILLS if skill['enable']]
_convert_skill_object_to_str(ENABLE_BASIC_SKILLS)