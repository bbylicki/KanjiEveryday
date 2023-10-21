import unittest
import requests

class APITestCase(unittest.TestCase):

  def setUp(self):
    self.base_url = 'http://localhost:5000'  # Update the URL if needed

  def test_get_kanji_animation_accessible(self):
    # Make a GET request to the /api/getKanji endpoint
    response = requests.get(f'{self.base_url}/api/getKanjiAnimation?index=0')

    # Check if the response status code is 200 (OK)
    self.assertEqual(response.status_code, 200)