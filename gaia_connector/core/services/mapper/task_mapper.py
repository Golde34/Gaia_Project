from core.domain.constants import Constants


class TaskMapper:
    def __init__(self) -> None:
        pass

    def map_create_task(self, data):
        task = data['task']
        priority = [task['priority']]
        return {
            'title': task['title'],
            'description': task['description'],
            'priority': priority,
            'status': task['status'],
            'startDate': task['start_date'],
            'deadline': task['deadline'],
            'duration': float(task['duration']),
            'activeStatus': 'ACTIVE'
        } 

    def map_create_task_to_sor(self, data, task_id):
        try:
            task = data['task']
            mapped_sor_object = {
                'sentence': data['sentence'],
                'project': data['project'],
                'groupTask': data['group_task'],
                'task': {
                    'title': task['title'],
                    'priority': task['priority'],
                    'status': task['status'],
                    'startDate': task['start_date'],
                    'deadline': task['deadline'],
                    'duration': float(task['duration']),
                },
                'taskId': task_id
            }
            return mapped_sor_object
        except Exception as e:
            print(f"Failed to map create task to SOR: {e}")
            return None 
