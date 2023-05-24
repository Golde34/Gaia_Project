from Dream.core.console import ConsoleManager
from Dream.core.processor import Processor
from Dream.utils.internet import internet_connectivity_check
from Dream.utils.startup import recognize_owner
from Dream.skills.collection.activation import ActivationSkills
from Dream import settings

def main():
    # Startup
    console_manager = ConsoleManager()
    console_manager.console_output(info_log="Wait a second for startup check..")
    internet_connectivity_check()
    console_manager.console_output(info_log='Application started.')
    processor_skill = Processor(console_manager=console_manager, settings_=settings)

    is_owner = recognize_owner(False)

    if is_owner:
        console_manager.console_output(info_log="recognize boss temporarily successful")
        ActivationSkills().assistant_greeting()
        # processor_skill.execute_autorun_skill()
        console_manager.console_output(info_log="I'm ready! Say something :-)")
        while True:
            processor_skill.run()

if __name__ == '__main__':
    main()