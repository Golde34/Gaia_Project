from gaia_bot.configs.port_configs import PORTS, PORT_COMPONENTS
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

def check_microservice_state():
    microservice_state = { }
    for microservice in PORT_COMPONENTS:
        if check_port_in_use(PORTS[microservice]['port']) == False:
            microservice_state[microservice] = False # Default, false is not running
        else:
            microservice_state[microservice] = True
    return microservice_state   

def check_microservice_state_by_name(microservice_name):
    if check_port_in_use(PORTS[microservice_name]['port']) == False:
        return False # Default, false is not running
    else:
        return True
    
async def wait_microservice(microservice_name):
    while True:
        auth_service_ready = check_port_in_use(PORTS[microservice_name]['port'])
        if auth_service_ready:
            return True
        await asyncio.sleep(1)

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