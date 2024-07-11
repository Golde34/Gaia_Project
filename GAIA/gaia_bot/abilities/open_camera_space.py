from gaia_bot.microservices.connection.camera_cv_command import CameraCVConnector


class OpenCameraSpace():

    def __init__(self, console_manager):
        self.console_manager = console_manager

    def call_open_space_api():
        response = CameraCVConnector.open_command()
        return response