from gaia_bot.skills.collections.extract_sentence_object import ActivationSkills


SKILLS = [
    {
        'func': ActivationSkills.predict,
        'tags': 'detect sentence object, sentence object, first skill',
        'description': 'Detect all objects in the sentence like geography, time, person, etc.'
    }
]