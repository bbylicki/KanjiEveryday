from flask import Flask, jsonify, request, send_file, send_from_directory
from flask_cors import CORS
from RandomNumberGenerator import durable_randint
from datetime import timedelta
import pandas as pd
from util.KanjiObjects import Kanji
import ast
import os
import fnmatch


app = Flask(__name__)

CORS(app)

testingFlag = os.environ.get('KED_TESTING')

if testingFlag:
    kanjiDelta = timedelta(seconds = 5)
else: 
    kanjiDelta = timedelta(days=1)

indexGenerator = durable_randint(low=0, high=1234, duration=kanjiDelta)

@app.route('/api/getKanjiEveryday')
def get_Kanji_Everyday():
    index = indexGenerator.__next__()
    return get_Kanji(index)

@app.route('/api/getKanji')
def get_Kanji(index = 0):
    index_param = request.args.get('index')
    if index_param:
        kanjiIndex = index_param
    else:
        kanjiIndex = index
    data = pd.read_csv("../language_data/language-data/ka_data.csv", keep_default_na=False)
    data['examples'] = data['examples'].apply(lambda x: ast.literal_eval(x))
    kanji_obj = Kanji(data.iloc[int(kanjiIndex)])
    sortedSVGs = compileStrokeSvgs(kanji_obj.kanji_name)
    return jsonify({
            'kanji': kanji_obj.character,
            'kanjiStrokeFileNames': sortedSVGs,
            'translation': kanji_obj.meaning,
            'kunyomi': {'hiragana': kanji_obj.kunyomi_hiragana, 'romaji': kanji_obj.kunyomi_romaji},
            'onyomi': {'katakana': kanji_obj.onyomi_katakana, 'romaji': kanji_obj.onyomi_romaji},
            'example': {'japanese': kanji_obj.examples.japanese, 'meaning': kanji_obj.examples.meaning},
            'index': kanjiIndex
            })

# used to get numeric portion of SVG for placing double digits after single digits
def numeric_sort_key(filename):
    parts = filename.split("_")
    if len(parts) > 1:
        numeric_part = parts[1].split(".")[0]
        return int(numeric_part)
    return 0

def compileStrokeSvgs(kanjiName: str):
    kanjiStrokeDir = os.path.abspath("../language_data/kanji-strokes")
    fileList = os.listdir(kanjiStrokeDir)
    if(kanjiName.isnumeric()):
        kanjiName = kanjiName + "_"
    matching_files = [file for file in fileList if fnmatch.fnmatch(file, f"*{kanjiName}*")]
    return sorted(matching_files, key=numeric_sort_key)

@app.route('/api/getStrokeSvg')
def get_Stroke_Svg():
    strokeFileName = request.args.get('fileName')
    kanjiStrokeDir = os.path.abspath("../language_data/kanji-strokes")
    return send_from_directory(kanjiStrokeDir, strokeFileName)

@app.route('/api/getKanjiAnimation')
def get_Kanji_Animation(index = 0):
    index_param = request.args.get('index')
    if index_param:
        kanjiIndex = index_param
    else:
        kanjiIndex = index
    data = pd.read_csv("../language_data/language-data/ka_data.csv")
    kanji = data.iloc[int(kanjiIndex)]
    return createVideoObject(kanji['kname'])

def createVideoObject(kanjiName):
    fileName = kanjiName+"_00.mp4"
    filePath = os.path.abspath("../language_data/kanji-animations/animations-mp4/kanji-animations/"+fileName)
    return send_file(filePath, as_attachment=True)

@app.route('/api/getExampleAudio')
def get_Example_Audio():
    index = request.args.get('index')
    data = pd.read_csv("../language_data/language-data/ka_data.csv")
    kanji = data.iloc[int(index)]
    return createSoundObject(kanji['kname'])

def createSoundObject(kanjiName):
    fileName = kanjiName+"_06_a.mp3"
    filePath = os.path.abspath("../language_data/examples-audio/"+fileName)
    return send_file(filePath, as_attachment=True)

@app.route('/api/postKanjiFinished', methods=['POST'])
def post_Kanji_Finished():
    try:
        data = request.get_json()
        kanji_index = data.get('kanjiIndex')
        flipKanjiCompleted(kanji_index)
        response_data = {'status': 'success', 'message': 'Kanji processing complete'}
        return jsonify(response_data)

    except Exception as e:
        error_message = str(e)
        print(error_message)
        response_data = {'status': 'error', 'message': error_message}
        return jsonify(response_data), 500

def flipKanjiCompleted(index):
    try:
        csvPath = "../language_data/completed_Kanji.csv"
        data = pd.read_csv(csvPath)
        columnName = "completed"
        data.at[int(index), columnName] = 1 - data.at[int(index), columnName]
        data.to_csv(csvPath, index=False)
        return True

    except Exception as e:
        raise(e)

if __name__ == '__main__':
    app.run()