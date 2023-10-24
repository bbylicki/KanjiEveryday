import json
import ast

class Kanji:
    def __init__(self, data):
        self.character = data["kanji"]
        self.meaning = data["kmeaning"]
        self.strokes = data["kstroke"]
        self.onyomi_romaji = data["onyomi"]
        self.onyomi_katakana = data["onyomi_ja"]
        self.kunyomi_romaji = data["kunyomi"]
        self.kunyomi_hiragana = data["kunyomi_ja"]
        self.examples = Example(data)

class References:
    def __init__(self, data):
        self.grade = data["references"]["grade"]
        self.kodansha = data["references"]["kodansha"]
        self.classic_nelson = data["references"]["classic_nelson"]

class Example:
    def __init__(self, data):
        self.japanese = data["examples"][0][0]
        self.meaning = data['examples'][0][1]