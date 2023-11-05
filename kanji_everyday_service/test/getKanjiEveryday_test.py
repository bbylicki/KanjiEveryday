import unittest
import requests
import time

# note this test assumes env var KED_TESTING is set to '1'
class APITestCase(unittest.TestCase):

  def setUp(self):
    self.base_url = 'http://localhost:5000'

  def test_get_kanji_everyday(self):
    # Make a GET request to the /api/getKanjiEveryday endpoint
    response = requests.get(f'{self.base_url}/api/getKanjiEveryday')

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
    self.assertIn('index', response_data)

  def test_get_kanji_everyday_doesnt_change_within_time_limit(self):
    # Make a GET request to the /api/getKanjiEveryday endpoint
    response = requests.get(f'{self.base_url}/api/getKanjiEveryday')

    # Check if the response status code is 200 (OK)
    self.assertEqual(response.status_code, 200)

    # Parse the JSON response
    initial_response_data = response.json()

    second_response = requests.get(f'{self.base_url}/api/getKanjiEveryday')

    second_response_data = second_response.json()

    # Check that the responses are equal
    assert(initial_response_data == second_response_data)

  def test_get_kanji_everyday_changes_outside_of_time_limit(self):
    # Make a GET request to the /api/getKanjiEveryday endpoint
    response = requests.get(f'{self.base_url}/api/getKanjiEveryday')

    # Check if the response status code is 200 (OK)
    self.assertEqual(response.status_code, 200)

    # Parse the JSON response
    initial_response_data = response.json()

    # Turnover value is specified in server file
    time.sleep(5)

    second_response = requests.get(f'{self.base_url}/api/getKanjiEveryday')

    second_response_data = second_response.json()

    # Check that the responses are not equal
    assert(initial_response_data != second_response_data)

if __name__ == '__main__':
    unittest.main()