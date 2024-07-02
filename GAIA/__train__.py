import webbrowser

from gaia_bot.kernel.configs.load_env import load_alpaca_env
from gaia_bot.domain.enums import AIModel

def model_switch_case(model_name):
    if model_name == AIModel.ResponseModel.value:
        google_colab_link = load_alpaca_env()
        webbrowser.open(google_colab_link)
        # webbrowser.open("https://colab.research.google.com/drive/1pssTvcJ6hw4GjSSyO9V-XxDr2X0e1Y1Z?usp=sharing")
        pass
    elif model_name == AIModel.SkillDetectionModel.value:
        from gaia_bot.models.task_detect.prompt_to_response import train
        # train.train()
        pass
    elif model_name == AIModel.ObjectDetectionModel.value:
        from gaia_bot.models.bert import train
        train.train()   
