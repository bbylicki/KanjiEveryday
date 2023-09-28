from flask import Flask, jsonify
from flask_cors import CORS
import requests
from util.KanjiObjects import Kanji, Radical, References, Example

app = Flask(__name__)

CORS(app)

@app.route('/api/message')
def get_message():
    return jsonify({'message': 'Hello from the server'})

@app.route('/api/getKanji')
def get_Kanji():
        kanjiObject = get_All_Kanji()
        return kanjiObject

def get_All_Kanji():
    url = "https://kanjialive-api.p.rapidapi.com/api/public/kanji/all"

    headers = {
        "X-RapidAPI-Key": "ca2db8bceemsh0474786138b609dp13686ajsnfedcb36eb901",
        "X-RapidAPI-Host": "kanjialive-api.p.rapidapi.com"
    }

    try: 
        response = requests.get(url, headers=headers)
        if response.status_code == 200:
            data = response.json()
            kanji_obj = Kanji(data[0])
            return jsonify({
                  'kanji': kanji_obj.character,
                  'translation': kanji_obj.meaning,
                  'kunyomi': {'hiragana': kanji_obj.kunyomi_hiragana, 'romaji': kanji_obj.kunyomi_romaji}
                 })
        else:
            print("Request failed with status code:", response.status_code)
    except requests.exceptions.RequestException as e:
        # Handle any exceptions that may occur during the request
        print("An error occurred:", e)

if __name__ == '__main__':
    app.run()