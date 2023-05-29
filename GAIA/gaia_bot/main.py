from core.console_manager import ConsoleManager
def main():
    # Startup
    console_manager = ConsoleManager()
    console_manager.console_output(info_log="Wait a second for startup check...")

if __name__ == '__main__':
    main()