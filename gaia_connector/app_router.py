from ui import app
from pathlib import Path

from ui.kafka.kafka_listener import registry_consumer


gaia_parent_path = Path(__file__).parent.parent

if __name__ == "__main__":
    app.run(host='localhost', port=5000, debug=True)
    kafka_registry_consumer = registry_consumer()
