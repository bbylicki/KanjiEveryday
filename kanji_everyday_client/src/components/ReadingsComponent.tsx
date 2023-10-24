import { DisplayXSmall } from 'baseui/typography'
import { type kanji } from '../api/kanji'
import * as React from 'react'
import { VerticalStack } from '../containers/VericalStack'
import { HorizontalStack } from '../containers/HorizontalStack'

export function ReadingsComponent ({ kanji, style }: { kanji: kanji | undefined, style: React.CSSProperties | undefined }): JSX.Element {
  return (
        <div style={style} aria-label="translation-text">
            <VerticalStack>
                <HorizontalStack>
                    <DisplayXSmall >
                        Kunyomi:
                    </DisplayXSmall>
                    <DisplayXSmall aria-label='kunyomiReadings'>
                        {kanji?.kunyomi.hiragana}
                    </DisplayXSmall>
                    <DisplayXSmall aria-label='kunyomiRomajiReadings'>
                        {kanji?.kunyomi.romaji}
                    </DisplayXSmall>
                </HorizontalStack>
                <HorizontalStack>
                    <DisplayXSmall >
                        Onyomi:
                    </DisplayXSmall>
                    <DisplayXSmall aria-label='onyomiReadings'>
                        {kanji?.onyomi.katakana}
                    </DisplayXSmall>
                    <DisplayXSmall aria-label='onyomiRomajiReadings'>
                        {kanji?.onyomi.romaji}
                    </DisplayXSmall>
                </HorizontalStack>
            </VerticalStack>
        </div>
  )
}
