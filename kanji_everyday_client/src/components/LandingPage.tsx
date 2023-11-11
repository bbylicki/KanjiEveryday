import * as React from 'react'
import { KanjiOfTheDayComponent } from './KanjiOfTheDayComponent'
import { type kanji } from '../api/kanji'
import { DisplayMedium } from 'baseui/typography'
import { HorizontalStack } from '../containers/HorizontalStack'
import { SupplmentalInformationPane } from './SupplementalInformationPane'
import { TitledBorder } from '../containers/TitledBorder'
import { KanjiVideoComponent } from './KanjiVideoComponent'
import { KanjiDrawingComponent } from './KanjiDrawingComponent'

export function LandingPage ({ kanji, kanjiVideoUrl, exampleAudioUrl, kanjiSvgList }: { kanji?: kanji, kanjiVideoUrl: string, exampleAudioUrl: string, kanjiSvgList: string[] }): JSX.Element {
  const componentStyle = { margin: '1rem' }
  const [svgUrl, setSvgUrl] = React.useState('')
  const [svgIndex, setSvgIndex] = React.useState(0)

  React.useEffect(() => {
    fetch(`http://127.0.0.1:5000/api/getStrokeSvg?fileName=${kanjiSvgList[svgIndex]}`)
      .then(async (response) => await response.blob())
      .then((data) => {
        const url = URL.createObjectURL(data)
        setSvgUrl(url)
      })
      .catch((error) => { console.error('Error fetching message:', error) })
  }, [kanjiSvgList, svgIndex])

  const handleSvgIndexIncrement = React.useCallback(() => {
    const incrementedIndex = svgIndex + 1
    if (incrementedIndex >= kanjiSvgList.length) { setSvgIndex(0) } else setSvgIndex(incrementedIndex)
  }, [svgIndex, kanjiSvgList])

  const handleSvgIndexDecrement = React.useCallback(() => {
    if (svgIndex <= 0) setSvgIndex(0)
    else setSvgIndex(svgIndex - 1)
  }, [svgIndex, kanjiSvgList])

  const handleSvgIndexReset = React.useCallback(() => {
    setSvgIndex(0)
  }, [svgIndex, kanjiSvgList])

  return (
        <div style={{
          position: 'fixed',
          left: '5%',
          right: '5%',
          top: '5%',
          bottom: '5%',
          backgroundColor: '#FFFFFF'
        }}>
            <DisplayMedium style={componentStyle}>Kanji Everday</DisplayMedium>
            <HorizontalStack>
              <TitledBorder title='Kanji'>
                {(kanji != null) ? (<KanjiOfTheDayComponent kanji={kanji} style={componentStyle}/>) : (<></>)}
                <HorizontalStack>
                  <KanjiVideoComponent kanjiVideoUrl={kanjiVideoUrl} />
                  <KanjiDrawingComponent svgUrl={svgUrl} handleNextSvg={handleSvgIndexIncrement} handlePreviousSvg={handleSvgIndexDecrement} handleResetSvg={handleSvgIndexReset}/>
                </HorizontalStack>
              </TitledBorder>
              <TitledBorder title='Readings and Translations'>
                {(kanji != null) ? (<SupplmentalInformationPane kanji={kanji} exampleAudioUrl={exampleAudioUrl} style={componentStyle}/>) : (<></>)}
              </TitledBorder>
            </HorizontalStack>
        </div>
  )
}
