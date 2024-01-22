class Project:
    def __init__(self, text):
        self.name = text
        self.description = ""
        self.status = "To Do"
        self.color = "blue"
        self.group_tasks = []
        self.owner_id = []