from flask import request

from ui import app
from kernel.utils.base_response import status_response


@app.route('/status')
def status():
    return status_response(200, '3003')
    