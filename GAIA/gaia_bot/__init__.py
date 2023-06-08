from logging import config
from gaia_bot.configs.settings import ROOT_LOG_CONFIG


config.dictConfig(ROOT_LOG_CONFIG)

with open(ROOT_LOG_CONFIG['handlers']['file']['filename'], 'w') as f:
    f.close()