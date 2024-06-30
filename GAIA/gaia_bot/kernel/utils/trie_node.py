class TrieNode:
    def __init__(self):
        self.children = {}
        self.is_end_of_word = False
        self.skills = []

class Trie:
    def __init__(self):
        self.root = TrieNode()

    def insert(self, word, skill):
        node = self.root
        for char in word:
            if char not in node.children:
                node.children[char] = TrieNode()
            node = node.children[char]
        node.is_end_of_word = True
        node.skills.append(skill)

    def search(self, word):
        node = self.root
        for char in word:
            if char not in node.children:
                return []
            node = node.children[char]
        return self._get_all_skills(node)

    def _get_all_skills(self, node):
        result = []
        if node.is_end_of_word:
            result.extend(node.skills)
        for child in node.children.values():
            result.extend(self._get_all_skills(child))
        return result

def build_trie_from_skills(skills):
    trie = Trie()
    for skill in skills:
        tags = skill['tags'].split(', ')
        for tag in tags:
            trie.insert(tag, skill)
    return trie

def search_skills(trie, query):
    return trie.search(query)

# Example usage:
SKILLS = [
    {
        'func': 'DetectSentenceObjects.handle_input',
        'tags': 'detect sentence object, sentence object',
        'description': 'Detect all objects in the sentence like geography, time, person, etc.',
        'service': 'All',
        'authentication': 'Authenticated'
    },
    {
        'func': 'DetectSkill.detect_skill_tag', 
        'tags': 'detect skill, create task, create a new task, detect task, check task, delete task, update task',
        'description': 'Detect Gaia skill through user command',
        'service': 'All',
        'authentication': 'Authenticated'
    },
    {
        'func': 'OpenClientGUI.open_client_gui',
        'tags': 'open client gui, open gui, open client',
        'service': 'All',
        'authentication': 'Not Authenticated'
    },
    {
        'func': 'DetectSkill.test',
        'tags': 'greeting',
        'service': 'All',
        'authentication': 'Authenticated'
    }
]

trie = build_trie_from_skills(SKILLS)
query = str('Greeting').lower()
results = search_skills(trie, query)

for result in results:
    print(result)
