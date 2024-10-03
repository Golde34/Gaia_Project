from flask import jsonify

from core.domain.constants import Constants
from core.services.client.task_service import TaskServiceRequest
from core.services.mapper.task_mapper import TaskMapper


class TaskUseCase(TaskServiceRequest):
    def __init__(self, url):
        self.url = url
        self.service = TaskServiceRequest(url)

    def create_task(self, data):
        """
            Create task which map from data didnt have group task id
            Get group task id and map it to task object
            Create task with final task object
        :param data: data from request
        :return: final task json object
        """
        try:
            task = TaskMapper().map_create_task(data)
            final_task_obj = self.map_group_task_in_task_object(data, task)
            if final_task_obj is None:
                return jsonify({Constants.StringConstants.status: 'ERROR', Constants.StringConstants.message: 'Invalid group task'})
            return self.service.create_task(final_task_obj)
        except Exception as e:
            print('Create task failed')
            return jsonify({Constants.StringConstants.status: 'ERROR', Constants.StringConstants.message: 'Invalid data'})
         