from flask import jsonify
from core.domain.enums import StringConstant


def build_auth_login_response(status, response):
    return jsonify({
        StringConstant.authenticated.value: status,
        StringConstant.response.value: response
    })
    
def build_auth_status_response(status):
    return jsonify({
        StringConstant.status.value: status
    })