import datetime


class Project:
    def __init__(self, name, description, status, color, group_tasks, owner_id):
        self.name = name
        self.description = description
        self.status = status
        self.color = color
        self.group_tasks = group_tasks
        self.owner_id = owner_id
        
    def init_default(self):
        if self.description == None:
            self.description = ""
        if self.status == None:
            self.status = "To Do"
        if self.color == None:
            self.color = "blue"
        if self.group_tasks == None:
            self.group_tasks = []
        if self.owner_id == None:
            self.owner_id = 1