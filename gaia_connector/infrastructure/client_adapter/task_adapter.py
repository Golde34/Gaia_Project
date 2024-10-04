import requests


class TaskAdapter:
    def __init__(self, url):
        self.url = url

    def get_group_task_id(self, group_task, user_id, project):
        try:
            print(f"{self.url}/group-task/find-by-name?name={group_task}&userId={user_id}&project={project}")
            group_task_response = requests.get(f"{self.url}/group-task/find-by-name?name={group_task}&userId={user_id}&project={project}")
            if group_task_response.status_code == 200:
                return group_task_response.json()['data']['message']['_id']
            else:
                return None
        except:
            print('There is an error when getting group task id')

    def create_task(self, data):
        task_response = requests.post(f"{self.url}/task/private-create", json=data)
        print(f"Create task response: {task_response.json()}")
        return task_response