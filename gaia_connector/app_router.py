from ui import app, bus

if __name__ == '__main__':
    bus.run()
    app.run(debug=True, host='localhost', port=5000)