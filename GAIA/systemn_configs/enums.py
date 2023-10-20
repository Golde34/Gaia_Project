from enum import Enum


class AuthenType(Enum):
    FACE = 'face'
    VOICE = 'voice'
    TOKEN = 'token'