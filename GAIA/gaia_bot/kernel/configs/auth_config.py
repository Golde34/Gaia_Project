from gaia_bot.kernel.configs.load_env import load_env_for_auth

user_id, username, password, name, email, email_password = load_env_for_auth()

USER_PROFILE = {
    'user_id': user_id,
    'username': username,
    'password': password,
    'name': name,
    'email': email,
    'email_password': email_password    
} 
