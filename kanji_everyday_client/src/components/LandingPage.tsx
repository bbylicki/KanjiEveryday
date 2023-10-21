import * as React from 'react'
import { KanjiOfTheDayComponent } from './KanjiOfTheDayComponent'
import { type Example, type Kunyomi, type Onyomi, type kanji } from '../api/kanji'
import { DisplayMedium } from 'baseui/typography'
import { HorizontalStack } from '../containers/HorizontalStack'
import { SupplmentalInformationPane } from './SupplementalInformationPane'
import { TitledBorder } from '../containers/TitledBorder'

export function LandingPage (): JSX.Element {
  const [kanji, setKanji] = React.useState<kanji>()
  const [index, setIndex] = React.useState<number>()

  React.useMemo(() => {
    const index = Math.floor(Math.random() * 1234)
    fetch(`http://127.0.0.1:5000/api/getKanji?index=${index}`)
      .then(async (response) => await response.json())
      .then((data) => {
        const kunyomi: Kunyomi = { hiragana: data.kunyomi.hiragana, romaji: data.kunyomi.romaji }
        const onyomi: Onyomi = { katakana: data.onyomi.katakana, romaji: data.onyomi.romaji }
        const example: Example = { japanese: data.example.japanese, meaning: data.example.meaning }
        const kanjiObject: kanji = {
          character: data.kanji,
          meaning: { english: data.translation },
          kunyomi,
          onyomi,
          example
        }
        setKanji(kanjiObject)
        setIndex(index)
      })
      .catch((error) => { console.error('Error fetching message:', error) })
  }, [])

  const componentStyle = { margin: '1rem' }

  return (
        <div style={{
          position: 'fixed',
          left: '10%',
          right: '10%',
          top: '10%',
          bottom: '10%',
          backgroundColor: '#FFFFFF'
        }}>
            <DisplayMedium style={componentStyle}>Kanji Everday</DisplayMedium>
            <HorizontalStack>
              <TitledBorder title='Kanji'>
                {(kanji != null) && <KanjiOfTheDayComponent kanji={kanji} style={componentStyle} index={index}/>}
              </TitledBorder>
              <TitledBorder title='Readings and Translations'>
                {(kanji != null) && <SupplmentalInformationPane kanji={kanji} style={componentStyle}/>}
              </TitledBorder>
            </HorizontalStack>
        </div>
  )
}
