from gaia_bot.configs.port_configs import PORTS
import os
import subprocess
import asyncio


async def activate_microservice():
    await asyncio.gather(
        activate_gaia_connector(),
        activate_auth_service(),
        activate_task_manager()
    )

async def activate_gaia_connector():
    bash_script_path = PORTS['gaia_connector']['shell_path']
    return await asyncio.create_subprocess_exec('gnome-terminal', '--', 'bash', '-c', f'bash {bash_script_path}')

async def activate_auth_service():
    bash_script_path = PORTS['authentication_service']['shell_path']
    return await asyncio.create_subprocess_exec('gnome-terminal', '--', 'bash', '-c', f'bash {bash_script_path}')
    
async def activate_task_manager():
    bash_script_path = PORTS['task_manager']['shell_path']
    return await asyncio.create_subprocess_exec('gnome-terminal', '--', 'bash', '-c', f'bash {bash_script_path}')

async def wait_for_all_microservices():
    gaia_lock_file = '/tmp/gaia_connector_lock'
    auth_lock_file = '/tmp/auth_service_lock'
    task_lock_file = '/tmp/task_manager_lock'

    while True:
        gaia_connector_ready = await is_microservice_ready(gaia_lock_file)
        auth_service_ready = await is_microservice_ready(auth_lock_file)
        task_manager_ready = await is_microservice_ready(task_lock_file)
        
        if gaia_connector_ready and auth_service_ready and task_manager_ready:
            break
        
        await asyncio.sleep(1)

async def is_microservice_ready(lock_file):
    return os.path.exists(lock_file)

async def wait_authen_microservice():
    auth_lock_file = '/tmp/auth_service_lock'
    while True:
        auth_service_ready = os.path.exists(auth_lock_file)
        print("Check wait function")
        print(auth_service_ready)
        if auth_service_ready:
            return True
        await asyncio.sleep(1)
    return False