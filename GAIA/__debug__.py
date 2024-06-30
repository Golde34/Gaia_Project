import asyncio

from gaia_bot.initiate_bot import process_bot


## DEBUG
if __name__ == "__main__":
    asyncio.run(process_bot(mode="debug"))
    
## TEST BETA FUNCTION
# async def why_you_always_die_gaia_connector():
#     bash_script = "gaia_bot/modules/ports/bash_shells/middlware_loader.sh"
#     return await asyncio.create_subprocess_exec('gnome-terminal', '--', 'bash', '-c', f'bash {bash_script}')

# if __name__ == "__main__":
#     asyncio.run(why_you_always_die_gaia_connector())
#     asyncio.run(process_bot())