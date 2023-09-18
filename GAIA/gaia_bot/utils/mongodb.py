import logging
from pymongo import MongoClient, DESCENDING


class MongoDB:
    
    def __init__(self, host, port, username, password, db_name):
        self.url_conection = MongoClient("mongodb://%s:%s@%s:%s" % (username, password, host, port))
        self.databases = self.url_conection[db_name]  
    
    def insert_many_documents(self, collection, documents):
        collection_obj = self.databases[collection]
        try: 
            collection_obj.insert_many(documents)
        except Exception as e:
            logging.error("Error inserting documents: %s" % e)
            return False
        return True
    
    def get_documents(self, collection, key=None, limit=None):
        collection_obj = self.databases[collection]
        try:
            result = collection_obj.find(key).sort("_id", DESCENDING)
            return list(result.limit(limit) if limit else result)
        except Exception as e:
            logging.error("Error getting documents: %s" % e)
            return []  
            
    def update_document(self, collection, key, new_value, upsert=True):
        collection_obj = self.databases[collection]
        try:
            collection_obj.update_one(key, {"$set": new_value}, upsert=upsert)
        except Exception as e:
            logging.error("Error updating document: %s" % e)
            return False
        return True
                
    def delete_document(self, collection, key):
        collection_obj = self.databases[collection]
        try:
            collection_obj.delete_one(key)
        except Exception as e:
            logging.error("Error deleting document: %s" % e)
            return False
        return True 
    
    def find_document(self, collection, key):
        collection_obj = self.databases[collection]
        try:
            return collection_obj.find(key)
        except Exception as e:
            logging.error("Error finding document: %s" % e)
            return None
    
    def update_colection(self, collection, documents):
        try:
            self.drop_collection(collection)
            self.insert_many_documents(collection, documents)
        except Exception as e:
            logging.error("Error updating collection: %s" % e)
            return False
        return True
    
    def drop_collection(self, collection):
        collection_obj = self.databases[collection]
        try:
            collection_obj.drop()
        except Exception as e:
            logging.error("Error dropping collection: %s" % e)
            return False
        return True
    
    def is_collection_empty(self, collection):
        collection_obj = self.databases[collection]
        try:
            return collection_obj.count_documents({}) == 0
        except Exception as e:
            logging.error("Error checking if collection is empty: %s" % e)
            return False
        
# database = MongoDB("localhost", 27017, "gaia", "gaia", "gaia")