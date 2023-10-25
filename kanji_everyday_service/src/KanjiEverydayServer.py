from flask import Flask, jsonify, request, send_file
from flask_cors import CORS
import pandas as pd
from util.KanjiObjects import Kanji, References, Example
import ast
import os
import fnmatch

app = Flask(__name__)

CORS(app)

@app.route('/api/getKanji')
def get_Kanji():
    kanjiIndex = request.args.get('index')
    data = pd.read_csv("../language_data/language-data/ka_data.csv", keep_default_na=False)
    data['examples'] = data['examples'].apply(lambda x: ast.literal_eval(x))
    kanji_obj = Kanji(data.iloc[int(kanjiIndex)])
    sortedSVGs = compileStrokeSvgs(kanji_obj.kanji_name)
    return jsonify({
            'kanji': kanji_obj.character,
            'translation': kanji_obj.meaning,
            'kunyomi': {'hiragana': kanji_obj.kunyomi_hiragana, 'romaji': kanji_obj.kunyomi_romaji},
            'onyomi': {'katakana': kanji_obj.onyomi_katakana, 'romaji': kanji_obj.onyomi_romaji},
            'example': {'japanese': kanji_obj.examples.japanese, 'meaning': kanji_obj.examples.meaning}
            })

# used to get numeric portion of SVG for placing double digits after single digits
def numeric_sort_key(filename):
    parts = filename.split("_")
    if len(parts) > 1:
        numeric_part = parts[1].split(".")[0]
        return int(numeric_part)
    return 0

def compileStrokeSvgs(kanjiName):
    kanjiStrokeDir = os.path.abspath("../language_data/kanji-strokes")
    fileList = os.listdir(kanjiStrokeDir)
    matching_files = [file for file in fileList if fnmatch.fnmatch(file, f"*{kanjiName}*")]
    return sorted(matching_files, key=numeric_sort_key)
    

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