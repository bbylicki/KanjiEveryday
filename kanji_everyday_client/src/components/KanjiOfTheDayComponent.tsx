import * as React from 'react'
import { type kanji } from '../api/kanji'
import { VerticalStack } from '../containers/VericalStack'
import { TranslationComponent } from './TranslationComponent'
import { KanjiComponent } from './KanjiComponent'
import { KanjiVideoComponent } from './KanjiVideoComponent'

export function KanjiOfTheDayComponent ({ kanji, style, index }: { kanji: kanji | undefined, style: React.CSSProperties | undefined, index?: number }): JSX.Element {
  return (
    <VerticalStack>
      <KanjiComponent kanji={kanji} style={style} />
      <TranslationComponent kanji={kanji} style={style} />
      <KanjiVideoComponent index={index} />
    </VerticalStack>
  )
}
