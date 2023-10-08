import { DisplaySmall } from 'baseui/typography'
import { type kanji } from '../api/kanji'
import * as React from 'react'

export function ExampleComponent ({ kanji, style }: { kanji: kanji | undefined, style: React.CSSProperties | undefined }): JSX.Element {
  return (
        <div style={style} aria-label="translation-text">
            <DisplaySmall >
                Example (Japanese): {kanji?.example.japanese}
            </DisplaySmall>
            <DisplaySmall >
                Example (English): {kanji?.example.meaning}
            </DisplaySmall>
        </div>
  )
}
