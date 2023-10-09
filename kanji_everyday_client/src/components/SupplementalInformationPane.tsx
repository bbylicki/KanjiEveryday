import * as React from 'react'
import { VerticalStack } from '../containers/VericalStack'
import { type kanji } from '../api/kanji'
import { ReadingsComponent } from './ReadingsComponent'
import { ExampleComponent } from './ExampleComponent'

export function SupplmentalInformationPane ({ kanji, style }: { kanji: kanji, style: React.CSSProperties | undefined }): JSX.Element {
  return (
  <VerticalStack>
    <ReadingsComponent kanji={kanji} style={style} />
    <ExampleComponent kanji={kanji} style={style} />
  </VerticalStack>
  )
}
