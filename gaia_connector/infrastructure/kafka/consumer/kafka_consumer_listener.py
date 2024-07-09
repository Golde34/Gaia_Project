class KafkaConsumerListener:
    def __init__(self) -> None:
        pass

    def __call__(self, func):
        def wrapper(*args, **kwargs):
            return func(*args, **kwargs)
        return wrapper
 