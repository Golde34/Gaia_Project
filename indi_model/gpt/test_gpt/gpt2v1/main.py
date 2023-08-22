import train
import inference


if __name__ == "__main__":
    print("Console test")
    choose = str(input())
    if choose == 'train':
        dataset = "./chat_data.json"
        train.train(dataset)
    if choose == 'inf':
        while True:
            inp = str(input())
            print(inference.infer(inp))
    if choose == 'load model':
        inference.load_model()
    if choose == 'pretrained':
        train.pretrained()