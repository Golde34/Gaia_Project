from kernel.utils.get_auth_token import _save_middleware_response, _get_token_parameters, _load_user_info
from infrastructure.base_response import status_response


class MiddlewareServiceReponse:
    def __init__(self) -> None:
        pass
    
    def health_service(self, user_info):
        _save_middleware_response(user_info)
        return status_response(200, 'Gaia Connection is OK') 
    
    def gaia_connect(self):
        data = {}
        
        access_token, refresh_token = _get_token_parameters()
        if access_token is None or refresh_token is None:
            data['accessToken'] = None
            data['refreshToken'] = None
         
        username, name, email = _load_user_info()
        if username is None or name is None or email is None:
            data['username'] = None
            data['name'] = None
            data['email'] = None
        
        data['accessToken'] = access_token
        data['refreshToken'] = refresh_token
        data['username'] = username
        data['name'] = name
        data['email'] = email
        
        return status_response(200, data)
    
    def status(self):
        return status_response(200, 'Middleware is up and running')