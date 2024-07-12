from GAIA.gaia_bot.kernel.configs.__config_path__ import __filename__
from gaia_bot.domain.enums import InputMode


ROOT_LOG_CONFIG = {
    'version': 1,
    'root': {
        'level': 'INFO',
        'handlers': ['file'],
    },
    'handlers': {
        'file': {
            'class': 'logging.handlers.RotatingFileHandler',
            'level': 'DEBUG',
            'formatter': 'detailed',
            'filename': __filename__,
            'mode': 'log',
            'maxBytes': 10000000,
            'backupCount': 3,
        },
    },
    'formatters': {
        'detailed': {
            'format': '%(asctime)s - %(name)s - %(levelname)s - %(message)s'
        },
    }
}

DEFAULT_GENERAL_SETTINGS = {
    'assistant_name': 'gaia',
    'input_mode': InputMode.TEXT.value,
    'input_language': 'en',
    'response_in_speech': False
}

AI_MODEL_LOCATION = {
    'alpaca': './gaia_bot/models/alpaca/golde_llama',
    'skill_detection': "./gaia_bot/resources/ai_models/task_detect/TrainData.pth",
    'object_detect': "./gaia_bot/resources/ai_models/bert/model.bin",
}
