import unittest
import requests

class APITestCase(unittest.TestCase):

  def setUp(self):
    self.base_url = 'http://localhost:5000'

  def test_post_kanji_finished_accessible(self):
    # Make a GET request to the /api/getKanjiAnimation endpoint
    response = requests.post(f'{self.base_url}/api/postKanjiFinished', json={ 'kanjiIndex': 0 }, headers={ 'Content-Type': 'application/json' })

    # Check if the response status code is 200 (OK)
    self.assertEqual(response.status_code, 200)

if __name__ == '__main__':
    unittest.main()