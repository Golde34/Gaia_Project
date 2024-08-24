class TaskMapper:
    def __init__(self) -> None:
        pass

    def map_create_task(self, data):
        task = data['task']
        priority = [task['priority']]
        return {
            'title': task['title'],
            'description': None,
            'priority': priority,
            'status': task['status'],
            'startDate': task['start_date'],
            'deadline': task['deadline'],
            'duration': task['duration'],
            'activeStatus': 'ACTIVE'
        } 

    def map_create_task_to_sor(self, data, task_id):
        return {
            'sentence': data['sentence'],
            'project': data['project'],
            'groupTask': data['group_task'],
            'task': data['task'],
            'task_id': task_id
        }