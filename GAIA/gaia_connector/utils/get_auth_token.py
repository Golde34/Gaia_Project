import json
import os

from configs.gaia_resources import gaia_resource_path


token_path = gaia_resource_path / 'authen_cache' / 'token.json'

def _get_token_parameters():
    try:
        with open(token_path, 'r') as f:
            response = json.load(f)
            
        return response['data']['gaiaAutoSignin']['accessToken'], response['data']['gaiaAutoSignin']['refreshToken']    
    except FileNotFoundError:
        return None, None

def _load_user_info():
    try:
        with open(token_path, 'r') as f:
            response = json.load(f)
                    
        username = response['data']['gaiaAutoSignin']['username']
        name = response['data']['gaiaAutoSignin']['name']
        email = response['data']['gaiaAutoSignin']['email']
        return username, name, email
    except FileNotFoundError:
        return None, None, None

def _save_middleware_response(result):
    user_info = {'data': { 'gaiaAutoSignin': {} }}
    result['gaiaHealth'] = True 
    user_info['data']['gaiaAutoSignin'] = result
    os.makedirs(os.path.dirname(token_path), exist_ok=True)
    
    with open(token_path, 'w') as f:
        json.dump(user_info, f)