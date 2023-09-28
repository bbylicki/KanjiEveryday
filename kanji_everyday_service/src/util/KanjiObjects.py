import json

class Kanji:
    def __init__(self, data):
        self.character = data["kanji"]["character"]
        self.meaning = data["kanji"]["meaning"]["english"]
        self.strokes = data["kanji"]["strokes"]
        self.onyomi_romaji = data["kanji"]["onyomi"]["romaji"]
        self.onyomi_katakana = data["kanji"]["onyomi"]["katakana"]
        self.kunyomi_romaji = data["kanji"]["kunyomi"]["romaji"]
        self.kunyomi_hiragana = data["kanji"]["kunyomi"]["hiragana"]
        self.video_poster = data["kanji"]["video"]["poster"]
        self.video_mp4 = data["kanji"]["video"]["mp4"]
        self.video_webm = data["kanji"]["video"]["webm"]

class Radical:
    def __init__(self, data):
        self.character = data["radical"]["character"]
        self.strokes = data["radical"]["strokes"]
        self.image = data["radical"]["image"]
        self.position_hiragana = data["radical"]["position"]["hiragana"]
        self.position_romaji = data["radical"]["position"]["romaji"]
        self.position_icon = data["radical"]["position"]["icon"]
        self.name_hiragana = data["radical"]["name"]["hiragana"]
        self.name_romaji = data["radical"]["name"]["romaji"]
        self.meaning = data["radical"]["meaning"]["english"]
        self.animation = data["radical"]["animation"]

class References:
    def __init__(self, data):
        self.grade = data["references"]["grade"]
        self.kodansha = data["references"]["kodansha"]
        self.classic_nelson = data["references"]["classic_nelson"]

class Example:
    def __init__(self, data):
        self.japanese = data["japanese"]
        self.meaning = data["meaning"]["english"]
        self.audio_opus = data["audio"]["opus"]
        self.audio_aac = data["audio"]["aac"]
        self.audio_ogg = data["audio"]["ogg"]
        self.audio_mp3 = data["audio"]["mp3"]