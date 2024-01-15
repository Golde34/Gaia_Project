import json

from configs.gaia_resources import gaia_resource_path


def _get_token_parameters():
    
    token_path = gaia_resource_path / 'authen_cache' / 'token.json'

    with open(token_path, 'r') as f:
        response = json.load(f)
       
    return response['data']['gaiaAutoSignin']['accessToken'], response['data']['gaiaAutoSignin']['refreshToken']

def _load_user_info():
    token_path = gaia_resource_path / 'authen_cache' / 'token.json'

    with open(token_path, 'r') as f:
        response = json.load(f)
        
    username = response['data']['gaiaAutoSignin']['username']
    name = response['data']['gaiaAutoSignin']['name']
    email = response['data']['gaiaAutoSignin']['email']
    
    return username, name, email