import * as React from 'react'
import { KanjiOfTheDayComponent } from './KanjiOfTheDayComponent'
import { type kanji } from '../api/kanji'
import { DisplayMedium } from 'baseui/typography'
import { HorizontalStack } from '../containers/HorizontalStack'
import { SupplmentalInformationPane } from './SupplementalInformationPane'
import { TitledBorder } from '../containers/TitledBorder'
import { KanjiVideoComponent } from './KanjiVideoComponent'

export function LandingPage ({ kanji, kanjiVideoUrl }: { kanji?: kanji, kanjiVideoUrl: string }): JSX.Element {
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
                {(kanji != null) ? (<KanjiOfTheDayComponent kanji={kanji} style={componentStyle}/>) : (<></>)}
                <KanjiVideoComponent kanjiVideoUrl={kanjiVideoUrl ?? ''} />
              </TitledBorder>
              <TitledBorder title='Readings and Translations'>
                {(kanji != null) ? (<SupplmentalInformationPane kanji={kanji} style={componentStyle}/>) : (<></>)}
              </TitledBorder>
            </HorizontalStack>
        </div>
  )
}
