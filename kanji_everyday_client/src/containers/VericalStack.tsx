import * as React from 'react'

export function VerticalStack ({ gap = '1.5rem', children, style }: { gap?: string, children: React.ReactNode, style?: React.CSSProperties }): JSX.Element {
  return (
    <div style={{
      ...style,
      display: 'flex',
      flexDirection: 'column',
      gap
    }}>
      {React.Children.toArray(children)}
    </div>
  )
}
