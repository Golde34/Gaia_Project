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

class MicroserviceAcronymsEnum(Enum):
    GC = 'gaia_connector'
    CLG = 'client_gui'
    ML = 'middleware_loader'
    AS = 'authentication_service'
    TM = 'task_manager'
    SP = 'schedule_plan'
    WO = 'work_optimization'

class MicroserviceStatusEnum(Enum):
    ACTIVE = 'ACTIVE'
    INACTIVE = 'INACTIVE'

class StringConstant:
    Authenticated = 'Authenticated'
    All = 'All'
    NotAuthenticated = 'Not Authenticated'