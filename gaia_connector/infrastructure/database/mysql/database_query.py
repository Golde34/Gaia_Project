class DatabaseQuery:
    def __init__(self, field: list[str], value: list[str]):
        self.field = field
        self.value = value

    def create_query(self) -> str:
        query = "INSERT INTO table_name ("
        query += self.field.__getitem__(0)
        query += ", ".join(self.field)
        query += ") VALUES ("
        query += self.value.__getitem__(0)
        query += ", ".join(self.value)
        query += ")"
        return query
    
    def update_query(self) -> str:
        query = "UPDATE table_name SET "
        for i in range(len(self.field)):
            query += self.field[i] + " = " + self.value[i]
            if i != len(self.field) - 1:
                query += ", "
        return query
    
    def delete_query(self) -> str:
        query = "DELETE FROM table_name WHERE "
        for i in range(len(self.field)):
            query += self.field[i] + " = " + self.value[i]
            if i != len(self.field) - 1:
                query += " AND "
        return query
    
    def select_query(self) -> str:
        query = "SELECT * FROM table_name WHERE "
        for i in range(len(self.field)):
            query += self.field[i] + " = " + self.value[i]
            if i != len(self.field) - 1:
                query += " AND "
        return query
