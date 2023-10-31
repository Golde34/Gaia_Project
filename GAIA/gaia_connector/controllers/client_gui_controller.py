authentication_service_port = PORTS['authentication_service']
authentication_service_url = f"http://localhost:{authentication_service_port['port']}"

@app.route('/auth/sign-in', methods=['POST'])
def auth():
    data = request.get_json()
    username = data['username']
    password = data['password']
    print(data)
    
    auth_response = requests.post(f"{authentication_service_url}/auth/sign-in", json={'username': username, 'password': password})
    print(auth_response.status_code)
    
    if auth_response.status_code == 200:
        print('authenticate successfully')
        return jsonify({'authenticated': True, 'data': auth_response.json()})
    else :
        return jsonify({'authenticated': False, 'message': 'Invalid credentials'}) 