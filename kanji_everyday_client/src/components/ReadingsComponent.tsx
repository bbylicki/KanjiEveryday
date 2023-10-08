import { DisplaySmall } from 'baseui/typography'
import { type kanji } from '../api/kanji'
import * as React from 'react'

export function ReadingsComponent ({ kanji, style }: { kanji: kanji | undefined, style: React.CSSProperties | undefined }): JSX.Element {
  return (
        <div style={style} aria-label="translation-text">
            <DisplaySmall >
                Kunyomi: {kanji?.kunyomi.hiragana} {kanji?.kunyomi.romaji}
            </DisplaySmall>
            <DisplaySmall >
                Onyomi: {kanji?.onyomi.katakana} {kanji?.onyomi.romaji}
            </DisplaySmall>
        </div>
  )
}
