import logging
from pymongo import MongoClient, DESCENDING

class MongoDB:

    def __init__(self, host='localhost', port=27017):
        self.client = MongoClient("mongodb://"+host+":"+str(port)+"/")
        self.databases = self.client["dream"]

    def insert_many_documents(self, collection, documents):
        collection_obj = self.databases[collection]
        try:
            collection_obj.insert_many(documents)
        except Exception as e:
            logging.error(e)

    def get_documents(self, collection, key=None, limit=None):
        collection_obj = self.databases[collection]
        try:
            result = collection_obj.find(key).sort("_id", DESCENDING)
            return list(result.limit(limit) if limit else result)
        except Exception as e:
            logging.error(e)

    def drop_collection(self, collection):
        collection_obj = self.databases[collection]
        try:
            collection_obj.drop()
        except Exception as e:
            logging.error(e)

    def delete_document(self, collection, query):
        collection_obj = self.databases[collection]
        try:
            collection_obj.delete_one(query)
        except Exception as e:
            logging.error(e)

    def update_collection(self, collection, documents):
        try:
            self.drop_collection(collection)
            self.insert_many_documents(collection, documents)
        except Exception as e:
            logging.error(e)

    def update_document(self, collection, query, new_value, upsert=True):
        collection_obj = self.databases[collection]
        try:
            collection_obj.update_one(query, {"$set", new_value}, upsert)
        except Exception as e:
            logging.error(e)

    def is_collection_empty(self, collection):
        collection_obj = self.databases[collection]
        try:
            return collection_obj.estimated_document_count() == 0
        except Exception as e:
            logging.error(e)

    def find_document(self, collection, query):
        collection_obj = self.databases[collection]
        return collection_obj.find(query)

db = MongoDB()