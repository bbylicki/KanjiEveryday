import unittest
from kanji_everyday_service.src.KanjiEverydayServer import app

class TestGetKanjiEndpoint(unittest.TestCase):
    def assembly(self):
        app.config['TESTING'] = True
        self.app = app.test_client()
    
    def testEndpoint(self):
        response = self.app.get('/api/getKanji')
        data = response.get_json()
        self.assertEqual(response.status_code, 200)
        self.assertEqual(data['kanji'], 力)

if __name__ == '__main__':
    unittest.main()
        