import asyncio


## DEBUG
# if __name__ == "__main__"
#     from gaia_bot.initiate_bot import process_bot
#     asyncio.run(process_bot(mode="debug"))
    
# TEST BETA FUNCTION
async def why_you_always_die_gaia_connector():
    
    bash_script = "gaia_bot/microservices/bash_shell/kafka_server.sh"
    print(f"Activating Gaia Connector...")
    return await asyncio.create_subprocess_exec(
                "gnome-terminal", "--title", "kafka", 
                "--", "bash", "-c", f"bash {bash_script}"
            )

if __name__ == "__main__":
    asyncio.run(why_you_always_die_gaia_connector())
    # asyncio.run(process_bot())