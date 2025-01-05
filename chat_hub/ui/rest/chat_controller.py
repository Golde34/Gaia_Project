from flask import request
from core.rag.semantic_router import SemanticRouter
from ui import app


semanticRouter = SemanticRouter(routes=[]) 

@app.route('/chat', methods=['POST'])
def chat():
    data = request.get_json()
    session_id = data.get('session_id', '')
    query = data.get('query', '')

    guided_route = semanticRouter 