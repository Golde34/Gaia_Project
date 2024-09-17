class DatabaseQuery:
    def __init__(self, field: list[str], value: list[str]):
        self.field = field
        self.value = value

    def create_query(self, table_name: str) -> str:
        query = f"INSERT INTO {table_name} ("
        query += ", ".join(self.field)
        query += ") VALUES ("
        query += ", ".join([f"'{v}'" if isinstance(v, str) else str(v) for v in self.value])
        query += ")"
        return query

    def update_query(self, table_name: str, condition: str) -> str:
        query = f"UPDATE {table_name} SET "
        query += ", ".join([f"{f} = '{v}'" if isinstance(v, str) else f"{f} = {v}" for f, v in zip(self.field, self.value)])
        query += f" WHERE {condition}"
        return query
    
    def delete_query(self, table_name: str, condition: str) -> str:
        query = f"DELETE FROM {table_name} WHERE {condition}"
        return query
    
    def select_query(self, table_name: str, condition: str) -> str:
        query = f"SELECT * FROM {table_name}"
        if condition:
            query += f" WHERE {condition}"
        return query
    