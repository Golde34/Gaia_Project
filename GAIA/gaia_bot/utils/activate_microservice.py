from gaia_bot.configs.port_configs import PORTS
import subprocess


def activate_microservice():
    activate_gaia_connector()
    # activate_auth_service()
    # activate_task_manager()

def activate_gaia_connector():
    bash_script_path = PORTS['gaia_connector']['shell_path']
    subprocess.run(['gnome-terminal', '--', 'bash', '-c', f'bash {bash_script_path}'])

def activate_auth_service():
    bash_script_path = PORTS['authentication_service']['shell_path']
    subprocess.run(['gnome-terminal', '--', 'bash', '-c', f'bash {bash_script_path}'])
    
def activate_task_manager():
    bash_script_path = PORTS['task_manager']['shell_path']
    subprocess.run(['gnome-terminal', '--', 'bash', '-c', f'bash {bash_script_path}'])