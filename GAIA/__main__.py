import argparse
import asyncio

from initiate_bot import process_bot
from initiate_bot_v2 import process_bot_v2
from gaia_bot_v2.process.authentication import AuthenticationCommand


async def main():
    parser = argparse.ArgumentParser(description="Gaia Bot")
    parser.add_argument("--process", action="store_true", help="Initiate bot process")
    parser.add_argument("--version", "-v", type=int, default=1, help="Version of the bot")
    parser.add_argument("--auth", action="store_true", help="Authentication process")
    # parser.add_argument('-v', '--version', action='version', version=f'Gaia version: ${__version__}')
    # parser.add_argument('-t', '--test', action='store_true', help='test mode')
    # parser.add_argument('-d', '--debug', action='store_true', help='debug mode')
    # parser.add_argument('-s', '--skill', action='store_true', help='skill mode')
    # parser.add_argument('-a', '--authen', action='store_true', help='authen mode')
    # parser.add_argument('-m', '--microservice', action='store_true', help='microservice mode')
    args = parser.parse_args()

    if args.process:
        if args.version == 1:
            await process_bot()
        elif args.version == 2:
            await process_bot_v2()
        else:
            await process_bot()

    if args.auth:
        auth_service = AuthenticationCommand()
        token, username, auth_status = await auth_service.process(auth_service_status=True)
        print(f"Token: {token}")
        print(f"Username: {username}")
        print(f"Auth status: {auth_status}")

if __name__ == "__main__":
    asyncio.run(main())
