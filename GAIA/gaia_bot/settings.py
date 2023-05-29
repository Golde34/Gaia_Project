# from Dream.enumerations import InputMode

ROOT_LOG_CONF = {
    'version': 1,
    'root': {
        'level': 'INFO',
        'handlers': ['file'],
    },
    'handlers':{
        'file':{
            'class': 'logging.handlers.RotatingFileHandler',
            'level': 'DEBUG',
            'formatter': 'detailed',
            'filename': 'D:\\Code\\PersonalProject\\\Golde_AI_Assistant_System\\GAIA\\bot',
            'mode': 'a',
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

# DEFAULT_GENERAL_SETTINGS = {
#     'assistant_name': 'dream',
#     'input_mode': InputMode.TEXT.value,
#     'input_language' : 'en',
#     #'output_language' : 'en',
#     'response_in_speech': True,
# }


SKILL_ANALYZER = {
    'args': {
                "stop_words": None,
                "lowercase": True,
                "norm": 'l1',
                "use_idf": False,
            },
    'sensitivity': 0.2,

}

GMAIL_SETTINGS = {
    'account':'nguyendongducviet2001@gmail.com',
    'password':'Gegterss03042001@',
    'sleep_time':60
}

GOOGLE_SPEECH = {

    'lang': 'en',
}


# """
# Open weather map API settings
# Create key: https://openweathermap.org/appid
# """
# WEATHER_API = {
#     'unit': 'celsius',
#     'key': "d99ef95122116203cbcf117ff5e4f3c9"
# }
#
#
# """
# WolframAlpha API settings
# Create key: https://developer.wolframalpha.com/portal/myapps/
# """
# WOLFRAMALPHA_API = {
#     'key': "A8LHWQ-Q97RRT29PU"
# }
# #A8LHWQ-6U5LL6G5LY
# #A8LHWQ-Q97RRT29PU
# """
# IPSTACK API settings
# Create key: https://ipstack.com/signup/free
# """
# IPSTACK_API = {
#     'key': None
# }