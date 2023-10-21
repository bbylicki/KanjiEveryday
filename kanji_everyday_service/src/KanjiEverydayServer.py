from flask import Flask, jsonify, request, send_file
from flask_cors import CORS
import pandas as pd
from util.KanjiObjects import Kanji, Radical, References, Example
import ast
import os

app = Flask(__name__)

CORS(app)

@app.route('/api/getKanji')
def get_Kanji():
    kanjiIndex = request.args.get('index')
    data = pd.read_csv("../language_data/language-data/ka_data.csv")
    data['examples'] = data['examples'].apply(lambda x: ast.literal_eval(x))
    kanji_obj = Kanji(data.iloc[int(kanjiIndex)])
    return jsonify({
            'kanji': kanji_obj.character,
            'translation': kanji_obj.meaning,
            'kunyomi': {'hiragana': kanji_obj.kunyomi_hiragana, 'romaji': kanji_obj.kunyomi_romaji},
            'onyomi': {'katakana': kanji_obj.onyomi_katakana, 'romaji': kanji_obj.onyomi_romaji},
            'example': {'japanese': kanji_obj.examples.japanese, 'meaning': kanji_obj.examples.meaning}
            })

@app.route('/api/getKanjiAnimation')
def get_Kanji_Animation():
    kanjiIndex = request.args.get('index')
    data = pd.read_csv("../language_data/language-data/ka_data.csv")
    kanji = data.iloc[int(kanjiIndex)]
    return createVideoObject(kanji['kname'])

def createVideoObject(kanjiName):
    fileName = kanjiName+"_00.mp4"
    filePath = os.path.abspath("../language_data/kanji-animations/animations-mp4/kanji-animations/"+fileName)
    return send_file(filePath, as_attachment=True)

if __name__ == '__main__':
    app.run()