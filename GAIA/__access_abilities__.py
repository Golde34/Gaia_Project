from gaia_bot.process.assistant_skill import AssistantSkill
from gaia_bot.kernel.utils.trie_node import build_trie_from_skills


assistant_skill = AssistantSkill()

def access_abilities_privately(skills):
    tag_skill = str(input("Enter the skill you want to access: "))
    trie_skills = build_trie_from_skills(skills)
    assistant_skill.skill_process(tag_skill, trie_skills)
