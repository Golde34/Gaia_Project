import argparse
import asyncio

from gaia_bot.kernel.configs.__version__ import __version__
from gaia_bot.kernel.utils.help import help_message
from gaia_bot.domain.enums import Mode


async def main():
    parser = argparse.ArgumentParser(description="Gaia Bot's command line interface")
    parser.add_argument("--gaia-help", "-gh", action="store_true", help="Gaia show help message")
    parser.add_argument("-p", "--process", action="store_true", help="Initiate bot process")
    parser.add_argument("--debug", "-d", action="store_true", help="Debug mode")
    parser.add_argument("-tm", "--train-model", type=str, 
                        choices=["response", "skill_detection", "object_detection"], 
                        help="Train model")
    parser.add_argument("-a", "--abilities", action="store_true", help="Access to abilities")
    parser.add_argument("-s", "--services", action="store_true", help="Access to services")
    # Utils 
    parser.add_argument("--version", "-v", action="store_true", help=f"Show Gaia version")
    parser.add_argument("--mode", type=str, choices=["run", "debug"], help="Bot mode")
    # parser.add_argument("--version", "-v", type=int, default=1, help=f"Gaia version: {__version__}"
    # parser.add_argument('-t', '--test', action='store_true', help='test mode')
    # parser.add_argument('-s', '--skill', action='store_true', help='skill mode')
    # parser.add_argument('-a', '--authen', action='store_true', help='authen mode')
    # parser.add_argument('-m', '--microservice', action='store_true', help='microservice mode')
    
    args, unknown = parser.parse_known_args()
    if unknown:
        print(f"Unknown arguments: {unknown}")
        parser.print_help()
        return
    await _process_arguments(args)

async def _process_arguments(args):
    if args.gaia_help or not any(vars(args).values()):
        help_message() 
    if args.process:
        from gaia_bot.initiate_bot import process_bot
        if args.mode == Mode.DEBUG:
            await process_bot(mode=Mode.DEBUG)
        else:
            await process_bot()
    if args.debug:
        from gaia_bot.initiate_bot import process_bot
        await process_bot(mode=Mode.DEBUG)
    if args.train_model:
        from __train__ import model_switch_case
        model_switch_case(args.train_model)    
    if args.abilities:
        from gaia_bot.domain.skills import SKILLS
        from __access_abilities__ import access_abilities_privately
        access_abilities_privately(SKILLS)
    if args.services:
        from gaia_bot.abilities.microservice_connections import MicroserviceConnection
        microservice_connection = MicroserviceConnection()
        await microservice_connection.activate_microservice()
    if args.version:
        print(f"Gaia version: {__version__}")
    if args.mode:
        print(f"You can only use the argument --mode in the process mode.")
        help_message()
 

if __name__ == "__main__":
    asyncio.run(main())
