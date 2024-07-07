import gaia_bot.kernel.configs.auth_config as auth_config
import time

test_prompt = """
    Answer, reply your boss question or chat with him as Gaia the virtual assistant. 
    Your boss named """ + auth_config.username + """. 
    Below is an instruction that describes a task, paired with an input that provides further context. 
    Write a response that appropriately completes the request.

    ### Instruction:
    {}

    ### Input:
    {}

    ### Response:
    {}
"""

final_prompt = """
    Answer, reply your boss question or chat with him as Gaia the virtual assistant. 
    Your boss name is """ + auth_config.username + """. 
    Write a response that appropriately completes the request.

    ### Instruction:
    {}

    ### Input:
    {}

    ### Response:
    {}
"""

greeting_prompt = """
    Now is """ + time.strftime("%H:%M:%S") + """.
    Say a greeting to your boss. For example:
    "Good morning, boss. How can I assist you today?"

    ### Instruction:
    {}

    ### Input:
    {}

    ### Response:
    {}
"""