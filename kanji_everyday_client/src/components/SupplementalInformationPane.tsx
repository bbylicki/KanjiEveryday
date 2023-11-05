import * as React from 'react'
import { VerticalStack } from '../containers/VericalStack'
import { type kanji } from '../api/kanji'
import { ReadingsComponent } from './ReadingsComponent'
import { ExampleComponent } from './ExampleComponent'

export function SupplmentalInformationPane ({ kanji, exampleAudioUrl, style }: { kanji: kanji, exampleAudioUrl: string | undefined, style: React.CSSProperties | undefined }): JSX.Element {
  return (
  <VerticalStack>
    <ReadingsComponent kanji={kanji} style={style} />
    <ExampleComponent kanji={kanji} exampleAudioUrl={exampleAudioUrl} style={style} />
  </VerticalStack>
  )
}
