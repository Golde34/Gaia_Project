PORTS = {
    ## CLIENT
    "gaia_connector": {
        "name": "GAIA",
        "port": 5000,
        "programming_language": "Python",
        "description": "GAIA Connector to others microservices",
        "router": "gaia",
        "database": "MongoDB",
        "database_name": "gaia",
        "shell_path": "gaia_bot/microservices/bash_shell/gaia_connector.sh"
    },
    "client_gui": {
        "name": "Client GUI",
        "port": 5173,
        "programming_language": "JavaScript",
        "description": "Client GUI for GAIA",
        "router": None,
        "database": None,
        "database_name": None,
        "shell_path": "gaia_bot/microservices/bash_shell/client_gui.sh"
    },
    "mobile_app": {
        "name": "Mobile App",
        "port": 5002,
        "programming_language": "Dart",
        "description": "Mobile App for GAIA",
        "router": None,
        "database": None,
        "database_name": None,
        "shell_path": ""
    },
    
    ## MIDDLEWARE
    "middleware_loader": {
        "name": "Middleware Loader",
        "port": 4000,
        "programming_language": "Go",
        "description": "Middleware Loader Layer",
        "router": "middleware",
        "database": None,
        "database_name": None,
        "shell_path": "gaia_bot/microservices/bash_shell/middleware_loader.sh"
    },
    "authentication_service": {
        "name": "Authentication Service",
        "port": 4001,
        "programming_language": "Java",
        "description": "Authentication Service API",
        "router": "auth",
        "database": "MySQL",
        "database_name": "authentication_service",
        "shell_path": "gaia_bot/microservices/bash_shell/auth_service.sh"
    },

    ## BACKEND MICROSERVICES
    "task_manager": {
        "name": "Task Manager",
        "port": 3000,
        "programming_language": "TypeScript",
        "description": "Task Manager API",
        "router": "task-manager",
        "database": "MongoDB",
        "database_name": "task_manager",
        "shell_path": "gaia_bot/microservices/bash_shell/task_manager.sh"
    },
    "github_api": {
        "name": "GitHub API",
        "port": 3012,
        "programming_language": "TypeScript",
        "description": "GitHub API",
        "router": "github-api",
        "database": None,
        "database_name": None,
        "shell_path": ""
    },
    "camera_cv": {
        "name": "Camera CV",
        "port": 3007,
        "programming_language": "Python",
        "description": "Camera CV API",
        "router": "camera-cv",
        "database": None,
        "database_name": None,
        "shell_path": "gaia_bot/microservices/bash_shell/camera_cv.sh"
    },
    
    ## THIRD PARTY
    "kafka_server": {
        "name": "Kafka Server",
        "port": 9094,
        "programming_language": "Java, Golang, TypeScript, Python, Rust, C#",
        "description": "Kafka Server",
        "router": None,
        "database": None,
        "database_name": None,
        "shell_path": "gaia_bot/microservices/bash_shell/kafka_server.sh"
    },
}



PORT_COMPONENTS = [
    "gaia_connector",
    "authentication_service",
    "task_manager",
    "client_gui",
    "middleware_loader",
    "kafka_server",
    "camera_cv"
]

DOMAIN = "localhost"