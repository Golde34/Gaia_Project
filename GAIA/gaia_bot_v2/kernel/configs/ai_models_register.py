from gaia_bot_v2.models.alpaca.inference import get_model_and_tokenizer
from gaia_bot_v2.models.task_detect.prompt_to_response.inference import get_detect_skill_model

AI_MODEL_LOCATION = {
    'alpaca': './gaia_bot_v2/models/alpaca/golde_llama',
    'task_detect': './gaia_bot_v2/models/task_detect/prompt_to_response/TrainData.pth'
}

AI_INFERENCE = {
    'response': get_model_and_tokenizer,
    'detect_skill': get_detect_skill_model
}