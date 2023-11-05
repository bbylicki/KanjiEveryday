import { DisplaySmall } from 'baseui/typography'
import { type kanji } from '../api/kanji'
import * as React from 'react'
import { VerticalStack } from '../containers/VericalStack'
import { HorizontalStack } from '../containers/HorizontalStack'
import { ExampleAudioButton } from './ExampleAudioButton'

export function ExampleComponent ({ kanji, exampleAudioUrl, style }: { kanji: kanji | undefined, exampleAudioUrl: string | undefined, style: React.CSSProperties | undefined }): JSX.Element {
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
                    <ExampleAudioButton exampleAudioUrl={exampleAudioUrl ?? ''}/>
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
