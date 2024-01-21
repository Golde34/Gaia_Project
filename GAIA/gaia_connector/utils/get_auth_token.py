import json
import os

from configs.gaia_resources import gaia_resource_path


token_path = gaia_resource_path / 'authen_cache' / 'token.json'

def _get_token_parameters():
    with open(token_path, 'r') as f:
        response = json.load(f)
       
    return response['data']['gaiaAutoSignin']['accessToken'], response['data']['gaiaAutoSignin']['refreshToken']

def _load_user_info():
    with open(token_path, 'r') as f:
        response = json.load(f)
        
    username = response['data']['gaiaAutoSignin']['username']
    name = response['data']['gaiaAutoSignin']['name']
    email = response['data']['gaiaAutoSignin']['email']
    
    return username, name, email

def _save_middleware_response(result):
    user_info = {'data': { 'gaiaSigninFromClient': {} }}
    result['gaiaHealth'] = 'Gaia Connection is OK' 
    user_info['data']['gaiaSigninFromClient'] = result
    os.makedirs(os.path.dirname(token_path), exist_ok=True)
    
    with open(token_path, 'w') as f:
        json.dump(user_info, f)