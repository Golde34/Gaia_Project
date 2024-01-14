import json

from configs.gaia_resources import gaia_resource_path


def _get_token_parameters():
    
    token_path = gaia_resource_path / 'authen_cache' / 'token.json'

    with open(token_path, 'r') as f:
        response = json.load(f)
       
    return response['data']['signin']['accessToken'], response['data']['signin']['refreshToken']

def _load_user_info():
    token_path = gaia_resource_path / 'authen_cache' / 'token.json'

    with open(token_path, 'r') as f:
        response = json.load(f)
        
    username = response['data']['signin']['username']
    name = response['data']['signin']['name']
    email = response['data']['signin']['email']
    
    return username, name, email