from enum import Enum

class StringConstant(Enum):
    authenticated = 'authenticated'
    response = 'response'
    status = 'status'
    
class Status(Enum):
    OK = 'OK'
    ERROR = 'ERROR'