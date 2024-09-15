from flask import jsonify

from core.domain.constants import Constants


class RAGFileUsecase:
    def __init__(self):
        pass

    def create_rag_file(self, data):
        """
            Create rag file in local storage
            Push kafka to gaia pipeline to store this file
        :param data: data from request
        :return: final rag file json object
        """ 
        try:
            # Store rag file in local storage
            # Push kafka to gaia pipeline to store this file
            # return
            return jsonify({Constants.StringConstants.status: 'OK', Constants.StringConstants.message: 'Create rag file successfully'})
        except Exception as e:
            print('Cannot create rag file')
            return jsonify

    def store_rag_file(self, data):
        pass

    def update_rag_file(self, data):
        pass

    def delete_rag_file(self, data):
        pass

    def view_rag_file(self, data):
        pass 