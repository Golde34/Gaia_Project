from gaia_bot.models.alpaca.inference import get_model_and_tokenizer
from gaia_bot.models.task_detect.prompt_to_response.inference import get_detect_skill_model

AI_MODEL_LOCATION = {
    'alpaca': './gaia_bot/models/alpaca/golde_llama',
    'skill_detection': "./gaia_bot/resources/ai_models/task_detect/TrainData.pth",
}

AI_INFERENCE = {
    'response': get_model_and_tokenizer,
    'skill_detection': get_detect_skill_model
}