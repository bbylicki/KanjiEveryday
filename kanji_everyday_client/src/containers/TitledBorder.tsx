import * as React from 'react'
import { HorizontalStack } from './HorizontalStack'
import { LabelLarge } from 'baseui/typography'
import { useStyletron } from 'styletron-react'

export function TitledBorder ({ title, children }: { title: string, children?: React.ReactNode }): JSX.Element {
  const [css] = useStyletron()
  return (<div
    style={{
      display: 'flex',
      flexDirection: 'column',
      rowGap: '0.5rem',
      flexGrow: 1
    }}>
      <HorizontalStack>
        <LabelLarge>{title ?? ''}</LabelLarge>
      </HorizontalStack>
      <div aria-label={`${title}-TitledBorder`} className={css({
        marginLeft: '0.5rem',
        borderColor: 'black',
        borderStyle: 'solid',
        borderWidth: '1px',
        padding: '1rem 2rem 1rem 2rem',
        flexGrow: 1
      })}>
        {React.Children.toArray(children)}
      </div>
    </div>
  )
}
