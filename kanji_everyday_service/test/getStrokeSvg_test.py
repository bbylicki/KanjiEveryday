import unittest
import requests

class APITestCase(unittest.TestCase):
  def setUp(self):
    self.base_url = 'http://localhost:5000'

  def test_get_stroke_svg(self):
    # Make a GET request to the /api/getStrokeSvg endpoint
    response = requests.get(f'{self.base_url}/api/getStrokeSvg?fileName=1_1.svg')
    # Check if the response status code is 200 (OK)
    self.assertEqual(response.status_code, 200)
  
  def test_get_stroke_svg_is_valid(self):
    # Make a GET request to the /api/getKanjiAnimation endpoint
    response = requests.get(f'{self.base_url}/api/getStrokeSvg?fileName=1_1.svg')

    # check to see if response is an attachment
    self.assertTrue("Content-Disposition" in response.headers)

    # check to see if file is an mp4
    self.assertTrue(response.headers["Content-Disposition"].endswith(".svg"))

if __name__ == '__main__':
    unittest.main()