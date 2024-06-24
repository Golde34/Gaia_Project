from concurrent.futures import ThreadPoolExecutor

from gaia_bot.kernel.configs.ai_models_register import AI_INFERENCE
from gaia_bot.kernel.utils import gpu_threads


def _process_model(model_name):
    check_free_gpu_mem = gpu_threads.check_gpu_memory()
    if not check_free_gpu_mem:
        print("Not enough GPU memory")
        return None
    model_func = AI_INFERENCE.get(model_name)
    if model_func is not None:
        result = model_func()
    else:
        print(f"No model found with name: {model_name}")

    return result

def run_model_in_parallel():
    inference_models = AI_INFERENCE
    try:
        with ThreadPoolExecutor(max_workers=len(inference_models)) as executor:
            futures = {model_name: executor.submit(_process_model, model_name) for model_name in inference_models.keys()}
            results = {model_name: future.result() for model_name, future in futures.items()}
        
        return results
    except Exception as e:
        print(f"Some errors break the code: {e}")

