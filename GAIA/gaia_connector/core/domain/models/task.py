import datetime


class Task:
    def __init__(self, title, description, priority, status, startDate, deadline, duration, sub_tasks, comments):
        self.title = title
        self.description = description
        self.priority = priority
        self.status = status
        self.start_date = startDate
        self.deadline = deadline
        self.duration = duration
        self.subTasks = sub_tasks
        self.comments = comments
    
    def init_default(self):
        if self.description == None:
            self.description = ""
        if self.priority == None:
            self.priority = "Medium"
        if self.status == None:
            self.status = "To Do"
        if self.start_date == None:
            self.start_date = datetime.datetime.now()
        if self.deadline == None:
            self.deadline = datetime.datetime.now() + datetime.timedelta(days=1)
        if self.duration == None:
            self.duration = 2
        if self.subTasks == None:
            self.subTasks = []
        if self.comments == None:
            self.comments = []        