import json

from gaia_bot.domain.model.enum_model import TypeTaskCRUD


class Task:

    def __init__(self, title=None, description=None, priority=None, status=None, start_date=None, 
                 deadline=None, duration=None, sub_tasks=None, comments=None, created_at=None, updated_at=None, 
                 active_status=None, tag=None):
        self.title = title
        self.description = description
        self.priority = priority
        self.status = status
        self.start_date = start_date
        self.deadline = deadline
        self.duration = duration
        self.sub_tasks = sub_tasks
        self.comments = comments
        self.created_at = created_at
        self.updated_at = updated_at
        self.active_status = active_status
        self.tag = tag

    def task_to_json(self):
        return json.dumps(
            { "task": {
                "title": self.title,
                "description": self.description,
                "priority": self.priority,
                "status": self.status,
                "startDate": self.start_date,
                "deadline": self.deadline,
                "duration": self.duration,
                "subTasks": self.sub_tasks,
            }}
        )

    def json_to_task(self, json_task):
        task = json.loads(json_task)
        self.title = task['title']
        self.description = task['description']
        self.priority = task['priority']
        self.status = task['status']
        self.start_date = task['startDate']
        self.deadline = task['deadline']
        self.duration = task['duration']
        self.sub_tasks = task['subTasks']
        return self