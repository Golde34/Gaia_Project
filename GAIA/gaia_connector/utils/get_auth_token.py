import json

from configs.gaia_resources import gaia_resource_path


def _get_token_parameters():
    
    token_path = gaia_resource_path / 'authen_cache' / 'token.json'

    # Open the token.json file and load its content
    with open(token_path, 'r') as f:
        response = json.load(f)
       
    # with open(absolute_path, 'w') as f:
    #     response = json.load(f)   
        
    return response['accessToken'], response['refreshToken']
