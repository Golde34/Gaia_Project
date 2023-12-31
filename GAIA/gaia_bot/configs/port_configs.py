PORTS = {
    ## CLIENT
    "gaia_connector": {
        "name": "GAIA",
        "port": 5000,
        "programming_language": "Python",
        "description": "GAIA Connector to others microservices",
        "database": "MongoDB",
        "database_name": "gaia",
        "shell_path": "gaia_bot/modules/ports/bash_shells/gaia_connector.sh"
    },
    "client_gui": {
        "name": "Client GUI",
        "port": 5173,
        "programming_language": "JavaScript",
        "description": "Client GUI for GAIA",
        "database": None,
        "database_name": None,
        "shell_path": "gaia_bot/modules/ports/bash_shells/client_gui.sh"
    },
    "mobile_app": {
        "name": "Mobile App",
        "port": 5002,
        "programming_language": "Dart",
        "description": "Mobile App for GAIA",
        "database": None,
        "database_name": None,
        "shell_path": "gaia_bot/modules/ports/bash_shells/mobile_app.sh"
    },
    
    ## MIDDLEWARE
    "middleware_loader": {
        "name": "Middleware Loader",
        "port": 4000,
        "programming_language": "Go",
        "description": "Middleware Loader Layer",
        "database": None,
        "database_name": None,
        "shell_path": "gaia_bot/modules/ports/bash_shells/middleware_loader.sh"
    },
    "authentication_service": {
        "name": "Authentication Service",
        "port": 4001,
        "programming_language": "Java",
        "description": "Authentication Service API",
        "database": "MySQL",
        "database_name": "authentication_service",
        "shell_path": "gaia_bot/modules/ports/bash_shells/auth_service.sh"
    },

    ## BACKEND MICROSERVICES
    "task_manager": {
        "name": "Task Manager",
        "port": 3000,
        "programming_language": "TypeScript",
        "description": "Task Manager API",
        "database": "MongoDB",
        "database_name": "task_manager",
        "shell_path": "gaia_bot/modules/ports/bash_shells/task_manager.sh"
    },
    "github_api": {
        "name": "GitHub API",
        "port": 3012,
        "programming_language": "TypeScript",
        "description": "GitHub API",
        "database": None,
        "database_name": None,
        "shell_path": "gaia_bot/modules/ports/bash_shells/github_api.sh"
    },
}



PORT_COMPONENTS = [
    "gaia_connector",
    "authentication_service",
    "task_manager",
    "client_gui"
]