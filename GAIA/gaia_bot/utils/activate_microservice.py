from gaia_bot.configs.port_configs import PORTS, PORT_COMPONENTS
import os
import socket
import asyncio


async def activate_microservice():
    microservice_state = check_microservice_state()
    for item in microservice_state:
        if microservice_state[item] == False:
            await asyncio.gather(activate_microservice_by_name(item))

async def activate_microservice_by_name(microservice_name):
    bash_script_path = PORTS[microservice_name]['shell_path']
    return await asyncio.create_subprocess_exec('gnome-terminal', '--', 'bash', '-c', f'bash {bash_script_path}')

def check_port_in_use(port):
    sock = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
    sock.settimeout(1)
    
    try:
        sock.bind(('localhost', port))
        available = False # not running
    except OSError:
        available = True # running
        
    sock.close()
    
    return available

def check_microservice_state():
    microservice_state = {
        "gaia_connector": False, # Default, false is not running
        # "authentication_service": False,
        # "task_manager": False
    }
    for microservice in PORT_COMPONENTS:
        if check_port_in_use(PORTS[microservice]['port']) == False:
            microservice_state[microservice] = False
        else:
            microservice_state[microservice] = True
    return microservice_state   

async def wait_microservice(microservice_name):
    while True:
        auth_service_ready = check_port_in_use(PORTS[microservice_name]['port'])
        if auth_service_ready:
            return True
        await asyncio.sleep(1)
    return False






































# async def wait_for_all_microservices():
#     gaia_lock_file = '/tmp/gaia_connector_lock'
#     auth_lock_file = '/tmp/auth_service_lock'
#     task_lock_file = '/tmp/task_manager_lock'

#     while True:
#         gaia_connector_ready = await is_microservice_ready(gaia_lock_file)
#         auth_service_ready = await is_microservice_ready(auth_lock_file)
#         task_manager_ready = await is_microservice_ready(task_lock_file)
        
#         if gaia_connector_ready and auth_service_ready and task_manager_ready:
#             break
        
#         await asyncio.sleep(1)

# async def is_microservice_ready(lock_file):
#     return os.path.exists(lock_file)

# def microservice_activated_port():
#     count = 0
#     if check_port_in_use(PORTS['gaia_connector']['port']): #  if true is running
#         count += 1
#     if check_port_in_use(PORTS['authentication_service']['port']):
#         count += 1
#     if check_port_in_use(PORTS['task_manager']['port']):
#         count += 1
#     if count == 3: # all microservices are running
#         return True
#     else:
#         return False

# def check_port_in_use(port):
#     sock = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
#     sock.settimeout(1)
    
#     try:
#         sock.bind(('localhost', port))
#         available = False # not running
#     except OSError:
#         available = True # running
        
#     sock.close()
    
#     return available