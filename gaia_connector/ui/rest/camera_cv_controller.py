from flask import request

from ui import app
from kernel.utils.middleware_connection import MiddlewareConnection
from core.services.client.camera_service import CameraServiceRequest


camera_cv_url = MiddlewareConnection('camera_cv').url
camera_cv_request = CameraServiceRequest(camera_cv_url)

@app.route('/camera/open-space')
def open_space():
    return camera_cv_request.open_space() 