from dotenv import load_dotenv
import os

def load_env_for_auth():
    username = os.getenv("username")
    password = os.getenv("password")
    name = os.getenv("name")
    email = os.getenv("email")
    email_password = os.getenv("email_password")
    return username, password, name, email, email_password