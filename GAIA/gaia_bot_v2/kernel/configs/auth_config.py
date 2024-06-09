<<<<<<< HEAD
from gaia_bot_v2.kernel.utils.load_env import load_env_for_auth
=======
from kernel.utils.load_env import load_env_for_auth
>>>>>>> 5deb538553f6a3a268cddcf5959fd1eb064ffa05

username, password, name, email, email_password = load_env_for_auth()

USER_PROFILE = {
    'username': username,
    'password': password,
    'name': name,
    'email': email,
    'email_password': email_password    
} 
