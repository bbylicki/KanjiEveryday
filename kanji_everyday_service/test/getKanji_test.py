import unittest
from kanji_everyday_service.src.KanjiEverydayServer import app

class TestGetKanjiEndpoint(unittest.TestCase):
    def assembly(self):
        app.config['TESTING'] = True
        self.app = app.test_client()
    
    def testGetKanjiAccess(self):
        response = app.test_client().get('/api/getKanji')
        self.assertEqual(response.status_code, 200)

    def testGetKanjiResponse(self):
        response = app.test_client().get('/api/getKanji')
        data = response.get_json()
        self.assertEqual(response.status_code, 200)
        self.assertIsNotNone(data['kanji'])

    def testGetKanjiResponseKanjiIsValid(self):
        response = app.test_client().get('/api/getKanji')
        data = response.get_json()
        self.assertEqual(response.status_code, 200)
        self.assertRegex(data['kanji'], "^[一-龠]*$")

    def testGetKanjiResponseTranslationIsNotEmpty(self):
        response = app.test_client().get('/api/getKanji')
        data = response.get_json()
        self.assertEqual(response.status_code, 200)
        self.assertIsNotNone(data['translation'])

if __name__ == '__main__':
    unittest.main()
        