from infrastructure.database.mysql.database_connection import DatabaseConnection


def database(name=None):
    """
    Decorator to automatically create table for class if not exists in the database.
    Table name can be specified through the `name` parameter. If not, the class name will be used by default.
    """
    def decorator(cls):
        class Wrapped(cls):
            def __init__(self, *args, **kwargs):
                super().__init__(*args, **kwargs)
                
                db_connection = DatabaseConnection()
                
                table_name = name if name else cls.__name__.lower()
                
                fields = []
                primary_key = None
                for field_name, type_hint in cls.__annotations__.items():
                    if type_hint == str:
                        fields.append(f"{field_name} VARCHAR(255)")
                    elif type_hint == int:
                        fields.append(f"{field_name} INT")
                    elif type_hint == float:
                        fields.append(f"{field_name} FLOAT")
                    elif type_hint == bool:
                        fields.append(f"{field_name} TINYINT(1)")
                    else:
                        raise ValueError(f"Unsupported type {type_hint} for field {field_name}")

                    if field_name =='id':
                        fields[-1] = f"{field_name} INT AUTO_INCREMENT"
                        primary_key = field_name

                if primary_key is None:
                    fields.insert(0, "id INT AUTO_INCREMENT")
                    primary_key = "id"

                create_table_query = f"""
                CREATE TABLE IF NOT EXISTS {table_name} (
                    {', '.join(fields)},
                    PRIMARY KEY ({primary_key})
                );
                """
               
                db_connection.execute_query(create_table_query)

        return Wrapped
    return decorator