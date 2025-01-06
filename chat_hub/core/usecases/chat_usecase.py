from flask import jsonify
from core.usecases import SERVICE_FACTORY, semantic_router


def chat(session_id, query):
    guided_route = semantic_router.guide(query=query)[1]
    print(f"Semamtic route: {guided_route}")

    response = _handle_route(guided_route, session_id, query)

    return jsonify({
        'channel': '',
        'session_id': session_id,
        'response': response
    })    

def _handle_route(route, session_id, query):
    service_class = SERVICE_FACTORY.get(route)
    if not service_class:
        return f"Route {route} not found or not implemented"
    
    service_instance = service_class.service()
    return service_instance.handle(session_id, query)