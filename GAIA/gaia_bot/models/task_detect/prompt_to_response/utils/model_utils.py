import numpy
import nltk
import numpy as np
from nltk.stem.porter import PorterStemmer

Stemmer = PorterStemmer()


def tokenize(sentence):
    return nltk.wordpunct_tokenize(sentence)


def stem(word):
    return Stemmer.stem(word.lower())


def bag_words(tokenized_sentence, words):
    sentence_word = [stem(word) for word in tokenized_sentence]
    bag = np.zeros(len(words), dtype=np.float32)

    for index, w in enumerate(words):
        if w in sentence_word:
            bag[index] = 1

    return bag
