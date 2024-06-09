class TrieNode:
    def __init__(self):
        self.children = {}
        self.skill = None
        
class Trie:
    def __init__(self):
        self.root = TrieNode()
        
    def insert(self, tag, skill):
        node = self.root
        for char in tag:
            if char not in node.children:
                node.children[char] = TrieNode()
            node = node.children[char]
        node.skill = skill
        
    def search(self, tag):
        node = self.root
        for char in tag:
            if char not in node.children:
                return None
            node = node.children[char]
        return node.skill
    

def create_skill_trie(skills):
    trie = Trie()
    for skill in skills:
        for tag in skill['tags'].split(', '):
            trie.insert(tag, skill)
    return trie