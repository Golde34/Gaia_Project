PORTS = {
    "gaia_connector": {
        "name": "GAIA",
        "port": 3000,
        "program_language": "Python",
        "description": "GAIA Connector to others microservices",
        "database": "MongoDB",
        "database_name": "gaia",
        "shell_path": "gaia_bot/modules/ports/bash_shells/gaia_connector.sh"
    },
    "authentication_service": {
        "name": "Authentication Service",
        "port": 3001,
        "program_language": "Java",
        "description": "Authentication Service API",
        "database": "MySQL",
        "database_name": "authentication_service",
        "shell_path": "gaia_bot/modules/ports/bash_shells/auth_service.sh"
    },
    "task_manager": {
        "name": "Task Manager",
        "port": 3002,
        "program_language": "NodeJS",
        "description": "Task Manager API",
        "database": "MongoDB",
        "database_name": "task_manager",
        "shell_path": "gaia_bot/modules/ports/bash_shells/task_manager.sh"
    }
}

PORT_COMPONENTS = [
    "gaia_connector",
    "authentication_service",
    "task_manager"
]