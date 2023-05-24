import Dream
from Dream.core.console import ConsoleManager

console_manager = ConsoleManager()

def digits_input_validation(message, values_range=True):
    input_number = None
    while True:
        Dream.output_engine.assistant_response(message)
        user_input = Dream.input_engine.recognize_input(already_activated=True)
        try:
            input_number = int(user_input)
        except ValueError:
            continue

        if values_range:
            min_value = values_range[0]
            max_value = values_range[1]
            if not min_value <= input_number <= max_value:
                Dream.output_engine.assistant_response('Please give a number higher/equal than {0} and smaller than {0}.'.format(min_value, max_value))
                raise ValueError
            else:
                break
    return input_number

def check_input_to_continue(message=''):
    positive_answer = ['yes', 'y', 'yeah', 'true', 'sure']
    if message:
        console_manager.console_output(message + ' (y/n): ', refresh_console=False)
    return Dream.input_engine.recognize_input(already_activated=True) in positive_answer

def input_with_choices_validation(available_choices):
    user_input = Dream.input_engine.recognize_input(already_activated=True)
    while not user_input in available_choices:
        Dream.output_engine.assistant_response('Please select on of the values: {0}'.format(available_choices))
        user_input = Dream.input_engine.recognize_input(already_activated=True)
    return user_input