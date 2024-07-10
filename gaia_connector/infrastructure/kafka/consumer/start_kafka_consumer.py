import asyncio
import threading

from kernel.configs.port_configs import KAFKA_COMPONENTS
from ui.kafka.kafka_listener import KAFKA_TOPIC_FUNCTION


def start_kafka():
    async def run_consumer():
        await start_kafka_consumer()
    
    def start_loop():
        loop = asyncio.new_event_loop()
        asyncio.set_event_loop(loop)
        loop.run_until_complete(run_consumer())

    thread = threading.Thread(target=start_loop)
    thread.start()    

async def start_kafka_consumer():
    try:
        for service in KAFKA_COMPONENTS:
            if service in KAFKA_TOPIC_FUNCTION.keys():
                print(f"Starting Kafka Consumer for {service}")
                await KAFKA_TOPIC_FUNCTION[service]()
    except Exception as e:
        print(f"Error starting Kafka Consumer: {e}")
        pass