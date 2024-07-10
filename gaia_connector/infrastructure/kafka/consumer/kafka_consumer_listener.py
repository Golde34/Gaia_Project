class KafkaConsumerListener:
    
    def __init__(self, service_name: str):
        self.service_name = service_name

    def __call__(self, func):
        def wrapper(*args, **kwargs):
            return func(self.service_name, *args, **kwargs)
        return wrapper