# sentence_object_recognizer

Input: sentence

Output: json: {
  'task': {
    'title': sentence,
    'description': 'Example description',
    'priority': 'High',
    'status': 'To Do',
    'startDate': '2024-08-10',
    'deadline': '2024-08-11',
    'duration': '8',
    'groupTaskId': 'abc',
    'activeStatus': 'ACTIVE'
  }
}

# Method

Input Sentence --> AI Model to detect object --> validate required field --> script to response + Output
