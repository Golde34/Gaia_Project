from gaia_bot.domain.skills import SKILLS
from gaia_bot.kernel.utils.trie_node import create_skill_trie


class SkillRegistry:
    def __init__(self, services, token):
        self.services = services
        self.token = token

    def generate_user_skill(self):
        available_skills = self._generate_available_skills(self.services, self.token)
        user_skills = self._create_user_skill_trie(available_skills)
        return user_skills

    def _generate_available_skills(self, services, token):
        services_status = {list(service.keys())[0]: list(service.values())[0] == 'ACTIVE' for service in services}
        print(services_status)
        valid_role = self.token != None
        available_skills = [
            skill for skill in SKILLS
            if services_status.get(skill['service'], False) and valid_role
        ]
        return available_skills

    def _create_user_skill_trie(self,available_skills):
        trie = create_skill_trie(available_skills)
        return trie