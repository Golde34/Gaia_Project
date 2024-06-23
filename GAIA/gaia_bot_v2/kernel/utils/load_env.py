from dotenv import load_dotenv
import os

load_dotenv()

def load_env_for_auth():
    username = os.getenv("USERNAME")
    password = os.getenv("PASSWORD")
    name = os.getenv("NAME")
    email = os.getenv("EMAIL")
    email_password = os.getenv("EMAIL_PWD")
    return username, password, name, email, email_password