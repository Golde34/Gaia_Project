from flask import jsonify

def status_response(state_response, data):
    status_response = response_frame(state_response)
    return jsonify({'status': status_response['status'], 
                    'statusMessage': status_response['status_message'], 
                    'errorCode': status_response['error_code'],
                    'errorMessage': status_response['error_message'], 
                    'data': data})
    
def response_frame(status):
    if status == 200:
        return build_status_response('success', 'success', 200, 'OK')
    if status == 400:
        return build_status_response('error', 'error', 400, 'Bad Request')
    if status == 401:
        return build_status_response('error', 'error', 401, 'Unauthorized')
    if status == 403:
        return build_status_response('error', 'error', 403, 'Forbidden')
    if status == 404:
        return build_status_response('error', 'error', 404, 'Not Found')
    if status == 405:
        return build_status_response('error', 'error', 405, 'Method Not Allowed')
    if status == 500:
        return build_status_response('error', 'error', 500, 'Internal Server Error')    
        
def build_status_response(status, status_message, error_code, error_message):
    status_response = {}
    status_response['status'] = status
    status_response['status_message'] = status_message
    status_response['error_code'] = error_code
    status_response['error_message'] = error_message
    return status_response
