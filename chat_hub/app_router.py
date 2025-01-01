from ui import app, bus
import os
from dotenv import load_dotenv


load_dotenv()

if __name__ == '__main__':
    port = os.getenv('PORT')
    bus.run()
    app.run(debug=True, host='localhost', port=port)