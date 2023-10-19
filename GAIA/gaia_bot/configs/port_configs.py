PORTS = {
    "gaia_connector": {
        "name": "GAIA",
        "port": 5000,
        "program_language": "Python",
        "description": "GAIA Connector to others microservices",
        "database": "MongoDB",
        "database_name": "gaia",
        "shell_path": None
    },
    "authentication_service": {
        "name": "Authentication Service",
        "port": 3001,
        "program_language": "Java",
        "description": "Authentication Service API",
        "database": "MySQL",
        "database_name": "authentication_service",
        "shell_path": "gaia_bot/modules/ports/microservice_connectors/authentication_service.sh"
    },
    "task_manager": {
        "name": "Task Manager",
        "port": 3000,
        "program_language": "NodeJS",
        "description": "Task Manager API",
        "database": "MongoDB",
        "database_name": "task_manager",
        "shell_path": "gaia_bot/modules/ports/microservice_connectors/task_manager.sh"
    }
}