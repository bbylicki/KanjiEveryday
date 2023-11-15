import json
import ast

class Kanji:
    def __init__(self, data):
        self.character = data["kanji"]
        self.kanji_name = data["kname"]
        self.meaning = data["kmeaning"]
        self.strokes = data["kstroke"]
        self.onyomi_romaji = data["onyomi"]
        self.onyomi_katakana = data["onyomi_ja"]
        self.kunyomi_romaji = data["kunyomi"]
        self.kunyomi_hiragana = data["kunyomi_ja"]
        self.examples = Example(data)

class Example:
    def __init__(self, data):
        self.japanese = data["examples"][0][0]
        self.meaning = data['examples'][0][1]