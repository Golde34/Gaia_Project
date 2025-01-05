from abc import ABC, abstractmethod


class BaseService(ABC):
    @abstractmethod
    def handle(self, session_id, query):
        """Handle request"""
        pass