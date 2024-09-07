from gaia_bot.models.bert import predict as detect_sentence
from gaia_bot.domain.enums import SORModel
from gaia_bot.models.task_detect.task_prediction import inference
from gaia_bot.kernel.configs.auth_config import USER_PROFILE
from gaia_bot.domain.mapper.model_enum import TaskField
from gaia_bot.domain.mapper.task import Task


class SORSkill():
    def __init__(self):
        self.task_object = Task()
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
            if label == TaskField.TASK:
                self.title = entity
            elif label == TaskField.PROJECT:
                self.project = entity
            elif label == TaskField.DURATION:
                self.duration = entity

        sorted_categories = sorted(categories.items(), key=lambda item: item[1], reverse=True)
        group_task_count = 0
        priority_count = 0
        status_count = 0
        start_date_count = 0
        deadline_count = 0
        for element, _ in sorted_categories:
            if (group_task_count == 1 and priority_count == 1 and status_count == 1 and
                    start_date_count == 1 and deadline_count == 1):
                break      
            if element.__contains__(TaskField.GROUP_TASK) and group_task_count == 0:
                group_task_count += 1
                self.group_task = element.split("GROUPTASK_")[1]
            if element.__contains__(TaskField.PRIORITY) and priority_count == 0:
                priority_count += 1
                self.priority = element.split("PRIORITY_")[1]
            if element.__contains__(TaskField.STATUS) and status_count == 0:
                status_count += 1
                self.status = element.split("STATUS_")[1]
            if element.__contains__(TaskField.START_DATE) and start_date_count == 0:
                start_date_count += 1
                self.start_date = element.split("STARTDATE_")[1]
            if element.__contains__(TaskField.DEADLINE) and deadline_count == 0:
                deadline_count += 1
                self.deadline = element.split("DEADLINE_")[1]

        return self.task_object.map_task(sentence, self.project, 
                                         self.group_task, self.title, 
                                         self.description, self.priority, 
                                         self.status, self.start_date, 
                                         self.deadline, self.duration, 
                                         USER_PROFILE.get("user_id"))

    def _handle_bert_model(self, sentence):
        token_sentence, sentence_list = detect_sentence.handle_input(sentence)
        _tag, _pos, _token = detect_sentence.predict(token_sentence, sentence_list)
        json_output = detect_sentence.predict_output(_tag, _pos, _token)
        return json_output
    