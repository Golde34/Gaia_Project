import webbrowser


def model_switch_case(model_name):
    if model_name == "response":
        webbrowser.open("https://colab.research.google.com/drive/1pssTvcJ6hw4GjSSyO9V-XxDr2X0e1Y1Z?usp=sharing")
        pass
    elif model_name == "task_detection":
        from gaia_bot.models.task_detect.prompt_to_response import train
        # train.train()
        pass
    elif model_name == "object_detection":
        from gaia_bot.models.bert import train
        train.train()   
