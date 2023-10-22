import * as React from 'react'

export function HorizontalStack ({ gap = '1.5rem', children, style }: { gap?: string, children: React.ReactNode, style?: React.CSSProperties }): JSX.Element {
  return (
    <div style={{
      ...style,
      paddingTop: '0.5rem',
      paddingRight: '1rem',
      paddingLeft: '1rem',
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      justifyItems: 'center',
      height: 'auto',
      gap
    }}>
      {React.Children.toArray(children)}
    </div>
  )
}
