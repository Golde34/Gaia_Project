from flask import request

from ui import app


@app.route('/chat', methods=['POST'])
def chat():
    data = request.get_json()
    session_id = data.get('session_id', '')
    query = data.get('query', '')

    