

def normal_encode_token(text):
    chars = sorted(list(set(text)))
    vocab_size = len(chars)

    # create mapping form characters to integers
    stoi = {ch: i for i, ch in enumerate(chars)}
    itos = {i: ch for i, ch in enumerate(chars)}
    encode = lambda s: [stoi[c] for c in s]
    decode = lambda l: ''. join(itos[i] for i in l)

    return vocab_size, encode, decode

if __name__ == "__main__":
    v, e, d = normal_encode_token("</s>")
    print(v)
    print(e("</s>"))
    print(d)