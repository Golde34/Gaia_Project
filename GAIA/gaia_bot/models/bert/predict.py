import joblib
import torch

from gaia_bot.models.bert import model_config, dataset
from gaia_bot.models.bert.bert_model import EntityModel


def handle_input(sentence):
    # transfer the output tag and pos with tokenized sentence
    tokenized_sentence = model_config.TOKENIZER.encode(sentence)
    sentenceList = sentence.split()

    return tokenized_sentence, sentenceList


def predict(token, sentenceList):
    test_dataset = predict_setup_dataset(sentenceList)

    meta_data = joblib.load(model_config.META_MODEL)
    enc_pos = meta_data["enc_pos"]
    enc_tag = meta_data["enc_tag"]

    device = torch.device("cuda")

    num_pos = len_num_pos(enc_pos=enc_pos)
    num_tag = len_num_tag(enc_tag=enc_tag)

    model = EntityModel(num_tag=num_tag, num_pos=num_pos)
    model.load_state_dict(torch.load(model_config.MODEL_PATH))
    model.to(device)

    with torch.no_grad():
        data = test_dataset[0]
        for k, v in data.items():
            data[k] = v.to(device).unsqueeze(0)
        tag, pos, _ = model(**data)

    res_tag = result_tag(tag, enc_tag, token)
    res_pos = result_pos(pos, enc_pos, token)

    return res_tag, res_pos, token

def predict_setup_dataset(sentenceList):

    test_dataset = dataset.EntityDataset(
        texts=[sentenceList],
        pos=[[0] * len(sentenceList)],
        tags=[[0] * len(sentenceList)]
    )
    return test_dataset

def len_num_pos(enc_pos):
    return len(list(enc_pos.classes_))

def len_num_tag(enc_tag):
    return len(list(enc_tag.classes_))

def result_tag(tag, enc_tag, token):
    return enc_tag.inverse_transform(
        tag.argmax(2).cpu().numpy().reshape(-1)
    )[:len(token)]

def result_pos(pos, enc_pos, token):
    return enc_pos.inverse_transform(
        pos.argmax(2).cpu().numpy().reshape(-1)
    )[:len(token)]


def predict_output(res_tag, res_pos, token):
    word_list = make_word_list(res_tag, res_pos, token)
    word_json_result = filter_words(word_list)
    json_result = return_phrase_json(word_json_result)

    return json_result

def make_word_list(res_tag, res_pos, token):
    word_list = []  # encoded word list stored

    for s in range(1, len(token) - 1):  # Do not count the CLS and SEP
        if res_tag[s] != 'O':

            # Add word to word list
            word = replace_decoded_token_string_to_word(decode(token[s]))

            # if token is start with ## then delete it in word, and delete last word which is not completed word
            if word.startswith("#"):

                # convert token to string
                temp_word = decode(token[s - 1]) + decode(token[s])
                temp_word = replace_decoded_token_string_to_word(temp_word)
                completed_word = temp_word.replace("##", "")

                word_list.pop()  # delete the previous word which is not completed word
                add_word(word_list, res_tag[s], res_pos[s], completed_word)  # add again

            else:
                add_word(word_list, res_tag[s], res_pos[s], word)

            # print(res_tag[s], decode(token[s]), res_pos[s])
            # print(word_list)

    return word_list

def decode(token):
    return model_config.TOKENIZER.decode(token)

def replace_decoded_token_string_to_word(token):
    token = token.replace(" ", "")
    return token

def add_word(array, tag, pos, word):
    dictionary = {"tag": tag, "pos": pos, "word": word}
    array.append(dictionary)

def filter_words(word_list):
    per_list = []  # person
    geo_list = []  # geographic entity
    org_list = []  # organization
    gpe_list = []  # geopolitical entity
    tim_list = []  # time indicator
    art_list = []  # artifact
    eve_list = []  # event
    nat_list = []  # natural phenomenon

    for word in word_list:
        if word["tag"].__contains__('per'):
            per_list.append(word)
        elif word["tag"].__contains__('geo'):
            geo_list.append(word)
        elif word["tag"].__contains__('gpe'):
            gpe_list.append(word)
        elif word["tag"].__contains__('org'):
            org_list.append(word)
        elif word["tag"].__contains__('tim'):
            tim_list.append(word)
        elif word["tag"].__contains__('art'):
            art_list.append(word)
        elif word["tag"].__contains__('eve'):
            eve_list.append(word)
        elif word["tag"].__contains__('nat'):
            nat_list.append(word)

    word_json_result = {
        "person": per_list,
        "geographic": geo_list,
        "organization": org_list,
        "geopolitical": gpe_list,
        "time_indicator": tim_list,
        "artifact": art_list,
        "event": eve_list,
        "natural": nat_list
    }

    return word_json_result

def return_phrase_json(word_json_result):

    per_list = []  # person
    geo_list = []  # geographic entity
    org_list = []  # organization
    gpe_list = []  # geopolitical entity
    tim_list = []  # time indicator
    art_list = []  # artifact
    eve_list = []  # event
    nat_list = []  # natural phenomenon

    word_combinations = []
    current_combination = []

    for tag_list in word_json_result.values():
        add_phrase(tag_list, word_combinations, current_combination)

    for phrase in word_combinations:
        if phrase['tag'].__contains__('per'):
            per_list.append(phrase)
        elif phrase['tag'].__contains__('geo'):
            geo_list.append(phrase)
        elif phrase['tag'].__contains__('gpe'):
            gpe_list.append(phrase)
        elif phrase['tag'].__contains__('org'):
            org_list.append(phrase)
        elif phrase['tag'].__contains__('tim'):
            tim_list.append(phrase)
        elif phrase['tag'].__contains__('eve'):
            eve_list.append(phrase)
        elif phrase['tag'].__contains__('nat'):
            nat_list.append(phrase)

    json_result = {
        "person": per_list,
        "geographic": geo_list,
        "organization": org_list,
        "geopolitical": gpe_list,
        "time_indicator": tim_list,
        "artifact": art_list,
        "event": eve_list,
        "natural": nat_list
    }

    return json_result

def add_phrase(tag_list, word_combinations, current_combination):

    for i in range(0, len(tag_list)):
        tag = tag_list[i]['tag']
        word = tag_list[i]['word']
        if tag.startswith("B-"):
            if i + 1 < len(tag_list):
                if tag_list[i + 1]['tag'].startswith("B-"):
                    temp_dict = {"tag": tag[2:], "word": word}
                    word_combinations.append(temp_dict)
                elif tag_list[i + 1]['tag'].startswith("I-"):
                    current_combination.append(word)
            else:
                temp_dict = {"tag": tag[2:], "word": word}
                word_combinations.append(temp_dict)

        elif tag.startswith("I-"):
            current_combination.append(word)
            if i + 1 < len(tag_list):
                if tag_list[i + 1]['tag'].startswith("B-"):
                    temp_dict = {"tag": tag[2:], "word": " ".join(current_combination)}
                    word_combinations.append(temp_dict)
                    current_combination = []
            else:
                temp_dict = {"tag": tag[2:], "word": " ".join(current_combination)}
                word_combinations.append(temp_dict)
                current_combination = []


# run the def main
# if __name__ == "__main__":

#     ip = str(input())
#     token_sentence, sentence_list = handle_input(ip)
#     _tag, _pos, _token = predict(token_sentence, sentence_list)
#     json_output = predict_output(_tag, _pos, _token)
#     print(json_output)