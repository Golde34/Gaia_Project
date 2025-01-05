from flask import request
from ui import app
from core.usecases import chat_usecase


@app.route('/chat', methods=['POST'])
def chat():
    data = request.get_json()
    session_id = data.get('session_id', '')
    query = data.get('query', '')

    return chat_usecase.chat(session_id, query)
