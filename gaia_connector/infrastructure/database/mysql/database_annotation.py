import inspect

from infrastructure.database.mysql.database_connection import DatabaseConnection


def database(name=None):
    """
    Decorator tạo bảng tự động cho class nếu chưa tồn tại trong cơ sở dữ liệu.
    Tên bảng có thể được chỉ định qua tham số `name`. Nếu không có, mặc định sẽ dùng tên class.
    """
    def decorator(cls):
        class Wrapped(cls):
            def __init__(self, *args, **kwargs):
                super().__init__(*args, **kwargs)
                
                db_connection = DatabaseConnection()
                
                table_name = name if name else cls.__name__.lower()
                
                fields = []
                for field_name, type_hint in cls.__annotations__.items():
                    if type_hint == str:
                        fields.append(f"{field_name} VARCHAR(255)")
                    elif type_hint == int:
                        fields.append(f"{field_name} INT")
                    
                create_table_query = f"""
                CREATE TABLE IF NOT EXISTS {table_name} (
                    {', '.join(fields)},
                    PRIMARY KEY ({list(cls.__annotations__.keys())[0]})
                );
                """
                
                db_connection.execute_query(create_table_query)

        return Wrapped
    return decorator