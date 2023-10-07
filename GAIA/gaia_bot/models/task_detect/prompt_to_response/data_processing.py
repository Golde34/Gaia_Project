import string
from nltk import pos_tag
from nltk.corpus import stopwords, wordnet
from nltk.stem.porter import PorterStemmer
from nltk.stem import WordNetLemmatizer
from collections import Counter
from spellchecker import SpellChecker


STOPWORDS = set(stopwords.words('english'))


class DataProcessing:

    def __init__(self, data):
        self.ps = PorterStemmer()
        self.spell = SpellChecker()
        self.pre_data = self.convert_to_lowercase(data)
        self.pre_data = self.data_remove_punc(data)
        self.pre_data = self.data_remove_stopwords(data)
        # self.pre_data = self.correct_spellings(data)
        self.pre_data = self.stemming(data)

        # # preprocessing by word count
        # self.pre_data = self.data_remove_freq(data)
        # self.pre_data = self.data_remove_rare(data)
        # # lemmatizer
        # self.lemmatizer = WordNetLemmatizer()
        # self.wordnet_map = {"N": wordnet.NOUN, "V": wordnet.VERB,
        #                     "J": wordnet.ADJ, "R": wordnet.ADV}

    @staticmethod
    def convert_to_lowercase(data):
        data['prompt'] = data['prompt'].str.lower()
        data['response'] = data['response'].str.lower()
        return data

    def data_remove_punc(self, data):
        data['prompt'] = data['prompt'].apply(lambda x: self._remove_punctuations(x))
        data['response'] = data['response'].apply(lambda x: self._remove_punctuations(x))
        return data

    def data_remove_stopwords(self, data):
        data['prompt'] = data['prompt'].apply(lambda x: self._remove_stopwords(x))
        data['response'] = data['response'].apply(lambda x: self._remove_stopwords(x))
        return data

    def stemming(self, data):
        data['prompt'] = data['prompt'].apply(lambda x: self._stemming_words(x))
        data['response'] = data['response'].apply(lambda x: self._stemming_words(x))
        return data

    def correct_spellings(self, data):
        data['prompt'] = data['prompt'].apply(lambda x: self._correct_spelling(x))
        data['response'] = data['response'].apply(lambda x: self._correct_spelling(x))
        return data

    def _correct_spelling(self, text):
        corrected_text = []
        misspelled_text = self.spell.unknown(text.split())
        for word in text.split():
            if word in misspelled_text:
                corrected_text.append(self.spell.correction(word))
            else:
                corrected_text.append(word)
        print(corrected_text)
        return " ".join(corrected_text)

    def _stemming_words(self, text):
        return " ".join([self.ps.stem(word) for word in text.split()])

    @staticmethod
    def _remove_stopwords(text):
        return " ".join([word for word in text.split() if word not in STOPWORDS])

    @staticmethod
    def _remove_punctuations(text):
        punctuations = string.punctuation
        return text.translate(str.maketrans('', '', punctuations))

    # Remove word by word count
    def data_remove_freq(self, data):
        data['prompt'] = data['prompt'].apply(lambda x: self._remove_freq_words(x))
        data['response'] = data['response'].apply(lambda x: self._remove_freq_words(x))
        return data

    def data_remove_rare(self, data):
        data['prompt'] = data['prompt'].apply(lambda x: self._remove_rare_words(x))
        data['response'] = data['response'].apply(lambda x: self._remove_rare_words(x))
        return data

    def _remove_freq_words(self, text):
        word_count = self._count_word(text)
        FREQUENT_WORDS = set(word for (word, wc) in word_count.most_common(3))
        return " ".join([word for word in text.split() if word not in FREQUENT_WORDS])

    def _remove_rare_words(self, text):
        word_count = self._count_word(text)
        RARE_WORDS = set(word for (word, wc) in word_count.most_common()[:-10:-1])
        return " ".join([word for word in text.split() if word not in RARE_WORDS])

    @staticmethod
    def _count_word(text):
        word_count = Counter()
        for t in text:
            for word in t.split():
                word_count[word] += 1
        return word_count

    # Lemmatizer
    # def lemmatizing(self, data):
    #     data['prompt'] = data['prompt'].apply(lambda x: self._lemmatize_word(x))
    #     data['response'] = data['response'].apply(lambda x: self._lemmatize_word(x))
    #     return data
    #
    # def _lemmatize_word(self, text):
    #     pos_text = pos_tag(text.split())
    #     return " ".join([self.lemmatizer.lemmatize(
    #         word, self.wordnet_map.get(pos[0], wordnet.NOUN))
    #         for word, pos in pos_text])
