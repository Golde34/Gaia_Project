from ui import mysql

class DatabaseConnection:
    def __init__(self):
        self.connection = mysql.connection
        self.cursor = self.connection.cursor()

    def execute_query(self, query):
        self.cursor.execute(query)
        return self.cursor.fetchall()
    
    def execute_insert_query(self, query):
        self.cursor.execute(query)
        self.connection.commit()
        return self.cursor.lastrowid
    
    def execute_update_query(self, query):
        self.cursor.execute(query)
        self.connection.commit()
        return self.cursor.rowcount
    
    def execute_delete_query(self, query):
        self.cursor.execute(query)
        self.connection.commit()
        return self.cursor.rowcount
    
    def close_connection(self):
        self.cursor.close()
        self.connection.close()
