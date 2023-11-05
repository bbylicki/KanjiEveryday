import * as React from 'react'

export function VerticalStack ({ gap = '1.5rem', children, style, label }: { gap?: string, children: React.ReactNode, style?: React.CSSProperties, label?: string }): JSX.Element {
  return (
    <div style={{
      ...style,
      display: 'flex',
      flexDirection: 'column',
      gap
    }} aria-label={label}>
      {React.Children.toArray(children)}
    </div>
  )
}
