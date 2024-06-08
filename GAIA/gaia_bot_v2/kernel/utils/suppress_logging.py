import logging


class SupressLogging():
    
    def __enter__(self):
        logging.disable(logging.CRITICAL)
        
    def __exit__(self, exc_type, exc_val, exc_tb):
        logging.disable(logging.NOTSET)
    