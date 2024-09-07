class Task:

    def __init__(self):
        pass
        
    def map_task(self, sentence, project, group_task, title, 
                 description, priority, status, start_date, deadline, 
                 duration, user_id):
        return {
            'sentence': sentence,
            'project': project,
            'group_task': group_task,
            'task': {
                'title': title,
                'description': description,
                'priority': priority,
                'status': status,
                'start_date': start_date,
                'deadline': deadline,
                'duration': duration,
            },
            'user_id': user_id
        }
