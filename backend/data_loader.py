import json

def load_data():
    with open("paimana_data.json","r") as f:
        return json.load(f)
