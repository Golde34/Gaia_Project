import asyncio
from concurrent.futures import ThreadPoolExecutor

def execute_in_thread(loop, func):
    def wrapper(*args, **kwargs):
        with ThreadPoolExecutor() as pool:
            return loop.run_in_executor(pool, func, *args, **kwargs)
    return wrapper