from aiokafka import AIOKafkaProducer
import asyncio
import json
import os

from kernel.configs.load_env import load_kafka_env


_, kafka_bootstrap_servers = load_kafka_env()

async def send_message(loop, topic, message):
    producer = AIOKafkaProducer(loop=loop, bootstrap_servers=kafka_bootstrap_servers)
    await producer.start()
    try:
        value = json.dumps(message).encode('utf-8')
        await producer.send_and_wait(topic, value)
    finally:
        await producer.stop()