import asyncio
import threading

from gaia_bot.infrastructures.kafka.kafka_listener import KAFKA_TOPICS_FUNCTION
from gaia_bot.domain.enums import MicroserviceStatusEnum

def start_kafka_consumer_thread(services, console_manager):
    async def run_consumer():
        await start_kafka_consumer(services, console_manager)
    
    def start_loop():
        loop = asyncio.new_event_loop()
        asyncio.set_event_loop(loop)
        loop.run_until_complete(run_consumer())
    
    thread = threading.Thread(target=start_loop)
    thread.start()

async def start_kafka_consumer(services, console_manager):
    try:
        for service in services:
            service_name = list(service.keys())[0]
            service_status = service[service_name]
            if service_name in KAFKA_TOPICS_FUNCTION.keys() and service_status == MicroserviceStatusEnum.ACTIVE.value:
                print(f"Starting Kafka consumer for {service_name}")
                await KAFKA_TOPICS_FUNCTION[service_name](console_manager)
    except Exception as e:
        print(f"Error in starting Kafka consumer: {e}")
        pass