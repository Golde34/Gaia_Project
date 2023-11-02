PORTS = {
    "gaia_connector": {
        "name": "GAIA",
        "port": 3000,
        "programming_language": "Python",
        "description": "GAIA Connector to others microservices",
        "database": "MongoDB",
        "database_name": "gaia",
        "shell_path": "gaia_bot/modules/ports/bash_shells/gaia_connector.sh"
    },
    "authentication_service": {
        "name": "Authentication Service",
        "port": 3001,
        "programming_language": "Java",
        "description": "Authentication Service API",
        "database": "MySQL",
        "database_name": "authentication_service",
        "shell_path": "gaia_bot/modules/ports/bash_shells/auth_service.sh"
    },
    "task_manager": {
        "name": "Task Manager",
        "port": 3002,
        "programming_language": "TypeScript",
        "description": "Task Manager API",
        "database": "MongoDB",
        "database_name": "task_manager",
        "shell_path": "gaia_bot/modules/ports/bash_shells/task_manager.sh"
    },
    "client_gui": {
        "name": "Client GUI",
        "port": 5173,
        "programming_language": "JavaScript",
        "description": "Client GUI for GAIA",
        "database": None,
        "database_name": None,
        "shell_path": "gaia_bot/modules/ports/bash_shells/client_gui.sh"
    }
}

PORT_COMPONENTS = [
    "gaia_connector",
    "authentication_service",
    "task_manager",
    "client_gui"
]