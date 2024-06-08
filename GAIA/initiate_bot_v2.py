import colorama
from gaia_bot_v2.commands.authentication import AuthenticationCommand


async def process_bot_v2(): 
    # Initiate bot console
    colorama.init()
    print(f"Gaia version: 2.0.0")
    # Startup
    console_manager, assistant = _startup()
     # Authen user
    token = await AuthenticationCommand().process()
    if token == None:
        print("Authentication failed, process user to guess mode.")    
        _process_guess_mode(console_manager, assistant)
    print(token)
    # initiate
    await _initiate_gaia(console_manager=console_manager, assistant=assistant)


def _startup():
    pass

def _process_guess_mode(console_manager, assistant):
    pass

async def _initiate_gaia(console_manager, assistant):
    await print(console_manager, assistant)
    pass
