from gaia_bot.kernel.utils.load_env import load_env_for_auth

username, password, name, email, email_password = load_env_for_auth()

USER_PROFILE = {
    'username': username,
    'password': password,
    'name': name,
    'email': email,
    'email_password': email_password    
} 
