from enum import Enum

class InputMode(Enum):
    VOICE = 'voice'
    TEXT = 'text'

class MongoCollection(Enum):
    GENERAL_SETTINGS = 'general_settings'
    CONTROL_SKILLS = 'control_skills'
    ENABLE_BASIC_SKILLS = 'enable_basic_skills'
    AUTORUN_SKILLS = 'autorun_skills'
    
class AuthenType(Enum):
    FACE = 'face'
    VOICE = 'voice'
    TOKEN = 'token'