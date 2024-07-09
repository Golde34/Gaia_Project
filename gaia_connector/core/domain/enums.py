from enum import Enum

class StringConstant(Enum):
    authenticated = 'authenticated'
    response = 'response'
    status = 'status'
    
class Status(Enum):
    OK = 'OK'
    ERROR = 'ERROR'

class AcronymsEnum(Enum):
    GC = 'gaia_connector'
    CLG = 'client_gui'
    ML = 'middleware_loader'
    AS = 'authentication_service'
    TM = 'task_manager'
    SP = 'schedule_plan'
    WO = 'work_optimization'
    CMC = "camera_cv"