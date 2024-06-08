import datetime


class GroupTask:
    def __init__(self, title, description, status, tasks):
        self.title = title
        self.description = description
        self.status = status
        self.tasks = tasks
        
    def init_default(self):
        if self.description == None:
            self.description = ""
        if self.status == None:
            self.status = "To Do"
        if self.tasks == None:
            self.tasks = [] 