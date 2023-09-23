import unittest
from kanji_everyday_service.src.KanjiEverydayServer import app

class TestGetKanjiEndpoint(unittest.TestCase):
    def assembly(self):
        app.config['TESTING'] = True
        self.app = app.test_client()
    
    def testGetKanjiAccess(self):
        response = self.app.get('/api/getKanji')
        self.assertEqual(response.status_code, 200)

    def testGetKanjiResponse(self):
        response = self.app.get('/api/getKanji')
        data = response.get_json()
        self.assertEqual(response.status_code, 200)
        self.assertIsNotNone(data['kanji'])

    def testGetKanjiResponseKanjiIsValid(self):
        response = self.app.get('/api/getKanji')
        data = response.get_json()
        self.assertEqual(response.status_code, 200)
        self.assertRegex(data['kanji'], "[\x3400-\x4DB5\x4E00-\x9FCB\xF900-\xFA6A]")

    def testGetKanjiResponseTranslationIsNotEmpty(self):
        response = self.app.get('/api/getKanji')
        data = response.get_json()
        self.assertEqual(response.status_code, 200)
        self.assertIsNotNone(data['translation'])

if __name__ == '__main__':
    unittest.main()
        