class KafkaTopic:
    
    def __init__(self, topic: str):
        self.topic = topic

    def __call__(self, func):
        def wrapper(*args, **kwargs):
            print(f"Topic: {self.topic}")
            return func(*args, **kwargs)
        return wrapper
    
    