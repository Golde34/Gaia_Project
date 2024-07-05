from ui import app
from pathlib import Path

camera_cv_path = Path(__file__).parent.parent

if __name__ == "__main__":
    app.run(host='localhost', port=3007, debug=True)