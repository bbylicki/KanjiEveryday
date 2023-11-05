import * as React from 'react'
import { type Example, type Kunyomi, type Onyomi, type kanji } from './api/kanji'
import { LandingPage } from './components/LandingPage'

export function UserApp (): JSX.Element {
  const [kanji, setKanji] = React.useState<kanji>()
  const [kanjiVideoURL, setKanjiVideoUrl] = React.useState('')
  const [exampleAudioURL, setExampleAudioUrl] = React.useState('')

  const fetchPosts = async (): Promise<void> => {
    let index = 0
    await fetch('http://127.0.0.1:5000/api/getKanjiEveryday')
      .then(async (response) => await response.json())
      .then((data) => {
        index = data.index
        const kunyomi: Kunyomi = { hiragana: data.kunyomi.hiragana, romaji: data.kunyomi.romaji }
        const onyomi: Onyomi = { katakana: data.onyomi.katakana, romaji: data.onyomi.romaji }
        const example: Example = { japanese: data.example.japanese, meaning: data.example.meaning }
        const kanjiObject: kanji = {
          character: data.kanji,
          meaning: { english: data.translation },
          kunyomi,
          onyomi,
          example,
          index: data.index
        }
        setKanji(kanjiObject)
      })
      .catch((error) => { console.error('Error fetching message:', error) })

    fetch(`http://127.0.0.1:5000/api/getKanjiAnimation?index=${index}`)
      .then(async (response) => await response.blob())
      .then((data) => {
        const url = URL.createObjectURL(data)
        setKanjiVideoUrl(url)
      })
      .catch((error) => { console.error('Error fetching message:', error) })

    fetch(`http://127.0.0.1:5000/api/getExampleAudio?index=${index}`)
      .then(async (response) => await response.blob())
      .then((data) => {
        const url = URL.createObjectURL(data)
        setExampleAudioUrl(url)
      })
      .catch((error) => { console.error('Error fetching message:', error) })
  }

  React.useEffect(() => {
    void fetchPosts()
  }, [])

  return (<LandingPage kanji={kanji} kanjiVideoUrl={kanjiVideoURL} exampleAudioUrl={exampleAudioURL}/>)
}
