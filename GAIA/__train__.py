import webbrowser

from gaia_bot.kernel.utils.load_env import load_alpaca_env


def model_switch_case(model_name):
    if model_name == "response":
        google_colab_link = load_alpaca_env()
        webbrowser.open(google_colab_link)
        # webbrowser.open("https://colab.research.google.com/drive/1pssTvcJ6hw4GjSSyO9V-XxDr2X0e1Y1Z?usp=sharing")
        pass
    elif model_name == "task_detection":
        from gaia_bot.models.task_detect.prompt_to_response import train
        # train.train()
        pass
    elif model_name == "object_detection":
        from gaia_bot.models.bert import train
        train.train()   
