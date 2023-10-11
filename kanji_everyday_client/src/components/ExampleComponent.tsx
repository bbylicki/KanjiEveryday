import { DisplaySmall } from 'baseui/typography'
import { type kanji } from '../api/kanji'
import * as React from 'react'
import { VerticalStack } from '../containers/VericalStack'
import { HorizontalStack } from '../containers/HorizontalStack'

export function ExampleComponent ({ kanji, style }: { kanji: kanji | undefined, style: React.CSSProperties | undefined }): JSX.Element {
  return (
        <div style={style} aria-label="translation-text">
            <VerticalStack>
                <HorizontalStack>
                    <DisplaySmall >
                        Example (Japanese):
                    </DisplaySmall>
                    <DisplaySmall aria-label='exampleJapanese'>
                        {kanji?.example.japanese}
                    </DisplaySmall>
                </HorizontalStack>
                <HorizontalStack>
                    <DisplaySmall >
                        Example (English):
                    </DisplaySmall>
                    <DisplaySmall aria-label='exampleEnglish'>
                        {kanji?.example.meaning}
                    </DisplaySmall>
                </HorizontalStack>
            </VerticalStack>
        </div>
  )
}
