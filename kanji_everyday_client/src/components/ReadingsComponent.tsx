import { DisplaySmall } from 'baseui/typography'
import { type kanji } from '../api/kanji'
import * as React from 'react'
import { VerticalStack } from '../containers/VericalStack'
import { HorizontalStack } from '../containers/HorizontalStack'

export function ReadingsComponent ({ kanji, style }: { kanji: kanji | undefined, style: React.CSSProperties | undefined }): JSX.Element {
  return (
        <div style={style} aria-label="translation-text">
            <VerticalStack>
                <HorizontalStack>
                    <DisplaySmall >
                        Kunyomi:
                    </DisplaySmall>
                    <DisplaySmall aria-label='kunyomiReadings'>
                        {kanji?.kunyomi.hiragana}
                    </DisplaySmall>
                    <DisplaySmall aria-label='kunyomiRomajiReadings'>
                        {kanji?.kunyomi.romaji}
                    </DisplaySmall>
                </HorizontalStack>
                <HorizontalStack>
                    <DisplaySmall >
                        Onyomi:
                    </DisplaySmall>
                    <DisplaySmall aria-label='onyomiReadings'>
                        {kanji?.onyomi.katakana}
                    </DisplaySmall>
                    <DisplaySmall aria-label='onyomiRomajiReadings'>
                        {kanji?.onyomi.romaji}
                    </DisplaySmall>
                </HorizontalStack>
            </VerticalStack>
        </div>
  )
}
