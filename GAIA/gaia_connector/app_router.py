from controllers import app

if __name__ == "__main__":
    app.run(host='localhost', port=3000, debug=True)

from controllers import auth_service_controller, task_manager_controller, gaia_connector    