from flask import jsonify
import requests

from core.domain.enums import Status
from kernel.utils.build_response import build_status_response


class CameraServiceRequest:
    def __init__(self, url):
        self.url = url
        
    def open_space(self):
        try:
            camera_response = requests.get(f"{self.url}/camera-cv/open-space")
            if camera_response.status_code == 200:
                return build_status_response(Status.OK)
            else:
                return build_status_response(Status.FAIL)
        except Exception as e:
            print(f"Exception when calling camera cv service: {e}")
            return build_status_response(Status.ERROR)