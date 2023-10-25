import unittest
import requests

class APITestCase(unittest.TestCase):

    def setUp(self):
        self.base_url = 'http://localhost:5000'

    def test_get_kanji(self):
        # Make a GET request to the /api/getKanji endpoint
        response = requests.get(f'{self.base_url}/api/getKanji?index=0')

        # Check if the response status code is 200 (OK)
        self.assertEqual(response.status_code, 200)

        # Parse the JSON response
        response_data = response.json()

        # Check the expected keys in the JSON response
        self.assertIn('kanji', response_data)
        self.assertIn('kanjiStrokeFileNames', response_data)
        self.assertIn('translation', response_data)
        self.assertIn('kunyomi', response_data)
        self.assertIn('hiragana', response_data['kunyomi'])
        self.assertIn('romaji', response_data['kunyomi'])
        self.assertIn('onyomi', response_data)
        self.assertIn('katakana', response_data['onyomi'])
        self.assertIn('romaji', response_data['onyomi'])
        self.assertIn('example', response_data)
        self.assertIn('japanese', response_data['example'])
        self.assertIn('meaning', response_data['example'])

    def test_get_kanji_valid_Kanji_response(self):
        # Make a GET request to the /api/getKanji endpoint
        response = requests.get(f'{self.base_url}/api/getKanji?index=0')

        # Check if the response status code is 200 (OK)
        self.assertEqual(response.status_code, 200)

        # Parse the JSON response
        response_data = response.json()

        # Check the expected keys in the JSON response
        self.assertEqual(response_data['kanji'], "一")

    def test_get_kanji_valid_SVG_response(self):
        # Make a GET request to the /api/getKanji endpoint
        response = requests.get(f'{self.base_url}/api/getKanji?index=0')

        # Check if the response status code is 200 (OK)
        self.assertEqual(response.status_code, 200)

        # Parse the JSON response
        response_data = response.json()

        # Check the expected keys in the JSON response
        self.assertEqual(response_data['kanjiStrokeFileNames'], ["1_1.svg"])

    def test_get_kanji_valid_english_kanji_translation_response(self):
        # Make a GET request to the /api/getKanji endpoint
        response = requests.get(f'{self.base_url}/api/getKanji?index=0')

        # Check if the response status code is 200 (OK)
        self.assertEqual(response.status_code, 200)

        # Parse the JSON response
        response_data = response.json()

        # Check the expected keys in the JSON response
        self.assertEqual(response_data['translation'], "one")

    def test_get_kanji_valid_hiragana_kunyomi_response(self):
        # Make a GET request to the /api/getKanji endpoint
        response = requests.get(f'{self.base_url}/api/getKanji?index=0')

        # Check if the response status code is 200 (OK)
        self.assertEqual(response.status_code, 200)

        # Parse the JSON response
        response_data = response.json()

        # Check the expected keys in the JSON response
        self.assertEqual(response_data['kunyomi']['hiragana'], "ひと")

    def test_get_kanji_valid_romaji_kunyomi_response(self):
        # Make a GET request to the /api/getKanji endpoint
        response = requests.get(f'{self.base_url}/api/getKanji?index=0')

        # Check if the response status code is 200 (OK)
        self.assertEqual(response.status_code, 200)

        # Parse the JSON response
        response_data = response.json()

        # Check the expected keys in the JSON response
        self.assertEqual(response_data['kunyomi']['romaji'], "hito")

    def test_get_kanji_valid_katakana_onyomi_response(self):
        # Make a GET request to the /api/getKanji endpoint
        response = requests.get(f'{self.base_url}/api/getKanji?index=0')

        # Check if the response status code is 200 (OK)
        self.assertEqual(response.status_code, 200)

        # Parse the JSON response
        response_data = response.json()

        # Check the expected keys in the JSON response
        self.assertEqual(response_data['onyomi']['katakana'], "イチ")

    def test_get_kanji_valid_romaji_onyomi_response(self):
        # Make a GET request to the /api/getKanji endpoint
        response = requests.get(f'{self.base_url}/api/getKanji?index=0')

        # Check if the response status code is 200 (OK)
        self.assertEqual(response.status_code, 200)

        # Parse the JSON response
        response_data = response.json()

        # Check the expected keys in the JSON response
        self.assertEqual(response_data['onyomi']['romaji'], "ichi")

    def test_get_kanji_valid_japanese_example_response(self):
        # Make a GET request to the /api/getKanji endpoint
        response = requests.get(f'{self.base_url}/api/getKanji?index=0')

        # Check if the response status code is 200 (OK)
        self.assertEqual(response.status_code, 200)

        # Parse the JSON response
        response_data = response.json()

        # Check the expected keys in the JSON response
        self.assertEqual(response_data['example']['japanese'], "一年生（いちねんせい）")

    def test_get_kanji_valid_english_example_response(self):
        # Make a GET request to the /api/getKanji endpoint
        response = requests.get(f'{self.base_url}/api/getKanji?index=0')

        # Check if the response status code is 200 (OK)
        self.assertEqual(response.status_code, 200)

        # Parse the JSON response
        response_data = response.json()

        # Check the expected keys in the JSON response
        self.assertEqual(response_data['example']['meaning'], "first-year student")

if __name__ == '__main__':
    unittest.main()