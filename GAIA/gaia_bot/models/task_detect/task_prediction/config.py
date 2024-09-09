from gaia_bot.kernel.configs.load_env import load_task_prediction_env


model_name, train_data = load_task_prediction_env()

MODEL_NAME=model_name
TRAIN_DATA=train_data

EPOCH=20
DROP=0.2
