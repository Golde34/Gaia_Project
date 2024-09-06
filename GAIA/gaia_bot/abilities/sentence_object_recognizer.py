from gaia_bot.models.bert import predict as detect_sentence
from gaia_bot.domain.enums import SORModel
from gaia_bot.models.task_detect.task_prediction import inference
from gaia_bot.kernel.configs.auth_config import USER_PROFILE
import pandas as pd


class SORSkill():
    def __init__(self):
        self.title = ""
        self.description = ""
        self.priority = ""
        self.status = ""
        self.start_date = ""
        self.deadline = ""
        self.duration = ""
        self.project = ""
    
    def handle_input(self, sentence, sor_model):
        if sor_model == SORModel.TASK_DETECTION:
            return self._handle_task_detection_model(sentence)
        elif sor_model == SORModel.BERT_MODEL:
            return self._handle_bert_model(sentence)
        else:
            return None
    
    def _handle_task_detection_model(self, sentence):
        entities, categories = inference.predict(sentence)
        self.description = "Gaia detect task: " + sentence

        for entity, _, _, label in entities:
            if label == "TASK":
                self.title = entity
            elif label == "PROJECT":
                self.project = entity
            elif label == "DURATION":
                self.duration = entity

        sorted_categories = sorted(categories.items(), key=lambda item: item[1], reverse=True)
        print(sorted_categories)
        for element, _ in sorted_categories:
            group_task_count = 0
            priority_count = 0
            status_count = 0
            start_date_count = 0
            deadline_count = 0
            if element.__contains__("GROUPTASK") and group_task_count == 0:
                group_task_count += 1
                self.group_task = element.strip("GROUPTASK_")
            if element.__contains__("PRIORITY") and priority_count == 0:
                priority_count += 1
                self.priority = element.strip("PRIORITY_")
            if element.__contains__("STATUS") and status_count == 0:
                status_count += 1
                self.status = element.strip("STATUS_")
            if element.__contains__("STARTDATE") and start_date_count == 0:
                start_date_count += 1
                self.start_date = element.strip("STARTDATE_")
            if element.__contains__("DEADLINE"):
                deadline_count += 1
                self.deadline = element.strip("DEADLINE_")

        return {
            'sentence': sentence,
            'project': self.project,
            'group_task': self.group_task,
            'task': {
                'title': self.title,
                'description': self.description,
                'priority': self.priority,
                'status': self.status,
                'startDate': self.start_date,
                'deadline': self.deadline,
                'duration': self.duration,
            }, 
            'user_id': int(USER_PROFILE.get("user_id"))
        }

    def _handle_bert_model(self, sentence):
        token_sentence, sentence_list = detect_sentence.handle_input(sentence)
        _tag, _pos, _token = detect_sentence.predict(token_sentence, sentence_list)
        json_output = detect_sentence.predict_output(_tag, _pos, _token)
        return json_output

    def call_detect_sentence_api(self, sentence):
        return {
            'title': sentence,
            'description': 'Example description',
            'priority': 'High',
            'status': 'To Do',
            'startDate': '2024-08-10',
            'deadline': '2024-08-11',
            'duration': '8',
            'groupTaskId': 'abc',
            'activeStatus': 'ACTIVE'
            # 'tag': 'Example'
        }
    
    