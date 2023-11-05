import unittest
import requests

class APITestCase(unittest.TestCase):

  def setUp(self):
    self.base_url = 'http://localhost:5000'

  def test_get_kanji_animation_accessible(self):
    # Make a GET request to the /api/getKanjiAnimation endpoint
    response = requests.get(f'{self.base_url}/api/getKanjiAnimation?index=0')

    # Check if the response status code is 200 (OK)
    self.assertEqual(response.status_code, 200)

  def test_get_kanji_animation_is_valid(self):
    # Make a GET request to the /api/getKanjiAnimation endpoint
    response = requests.get(f'{self.base_url}/api/getKanjiAnimation?index=0')

    # check to see if response is an attachment
    self.assertTrue("Content-Disposition" in response.headers)

    # check to see if file is an mp4
    self.assertTrue(response.headers["Content-Disposition"].endswith(".mp4"))

if __name__ == '__main__':
    unittest.main()