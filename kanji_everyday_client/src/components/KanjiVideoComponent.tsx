import * as React from 'react'

export function KanjiVideoComponent ({ kanjiVideoUrl }: { kanjiVideoUrl: string }): JSX.Element {
  return (
  <div>
    {kanjiVideoUrl.length > 0 &&
     <video autoPlay={true} loop={true} muted={true} aria-label='kanjiAnimation'>
      <source src={kanjiVideoUrl} type="video/mp4" />
    </video>}
  </div>
  )
}
