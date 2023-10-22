import * as React from 'react'
import { type kanji } from '../api/kanji'
import { VerticalStack } from '../containers/VericalStack'
import { TranslationComponent } from './TranslationComponent'
import { KanjiComponent } from './KanjiComponent'

export function KanjiOfTheDayComponent ({ kanji, style }: { kanji: kanji | undefined, style: React.CSSProperties | undefined }): JSX.Element {
  return (
    <VerticalStack>
      <KanjiComponent kanji={kanji} style={style} />
      <TranslationComponent kanji={kanji} style={style} />
    </VerticalStack>
  )
}
