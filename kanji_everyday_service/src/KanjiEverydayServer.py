from flask import Flask, jsonify, request
from flask_cors import CORS
import pandas as pd
from util.KanjiObjects import Kanji, Radical, References, Example

app = Flask(__name__)

CORS(app)

@app.route('/api/getKanji')
def get_Kanji():
    kanjiIndex = request.args.get('index')
    data = pd.read_csv("../language_data/language-data/ka_data.csv")
    kanji_obj = Kanji(data.iloc[int(kanjiIndex)])
    return jsonify({
            'kanji': kanji_obj.character,
            'translation': kanji_obj.meaning,
            'kunyomi': {'hiragana': kanji_obj.kunyomi_hiragana, 'romaji': kanji_obj.kunyomi_romaji},
            'onyomi': {'katakana': kanji_obj.onyomi_katakana, 'romaji': kanji_obj.onyomi_romaji}
            })

if __name__ == '__main__':
    app.run()