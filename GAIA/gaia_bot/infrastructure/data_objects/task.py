import datetime


class Task:
    def __init__(self, title):
        self.title = title
        self.description = ""
        self.priority = "Medium"
        self.status = "To Do"
        self.start_date = str(datetime.datetime.now())
        self.deadline = str(datetime.datetime.now() + datetime.timedelta(days=1))
        self.duration = 2
        self.subTasks = []
        self.comments = []
