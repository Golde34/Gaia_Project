import json
import os

module_path = os.path.dirname(__file__)


class Memory:
    '''
        Initialize data with saved json file
    '''

    def __init__(self, mfile='memory.py.json'):
        self.json_file = os.path.join(module_path, mfile)
        self.data = ''
        # Try to open file if it doesnt exist it will throw an error
        try:
            with open(self.json_file, 'r') as f:
                self.data = json.load(f)
        except IOError:
            # create the new file with an empty json object
            with open(self.json_file, 'w') as f:
                f.write('{}')
            # add the data to the memory.py object
            with open(self.json_file, 'r') as f:
                self.data = json.load(f)

    '''
        returns the json string
    '''

    def get_all(self):
        return self.data

    '''
        get a specific key from memory.py
    '''

    def get_data(self, key):
        try:
            return self.data[key]
        except BaseException:
            return None

    '''
        add a key and value to memory.py
    '''

    def add_data(self, key, value):
        if self.get_data(key) is not None:
            print("data already exists with that name")
        else:
            self.data[key] = value

    '''
        Updates a key with supplied value.
    '''

    def update_data(self, key, value):
        self.data[key] = value

    '''
        delete a key from memory.py
    '''

    def del_data(self, key):
        try:
            del self.data[key]
        except KeyError:
            pass

    '''
        !!!!DANGER!!!!!
        deletes the entire memory.py and overwrites the file with a blank file
        only use when absolutely needed.
    '''

    def del_all(self):
        with open(self.json_file, 'w') as f:
            f.write('')

    '''
        Saves memory.py to disk. This must be ran before memory.py object
        is destroyed. Otherwise all changes will be lost.
    '''

    def save(self):
        with open(self.json_file, 'w') as f:
            json.dump(self.data, f)