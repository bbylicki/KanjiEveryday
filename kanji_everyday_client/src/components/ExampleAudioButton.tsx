import { Button } from 'baseui/button'
import { ChevronRight } from 'baseui/icon'
import * as React from 'react'

export function ExampleAudioButton ({ exampleAudioUrl }: { exampleAudioUrl: string }): JSX.Element {
  const exampleAudioRef = React.useRef<HTMLAudioElement>(null)
  const [isPlaying, setIsPlaying] = React.useState(false)

  const togglePlay = (): void => {
    if (exampleAudioRef.current != null) {
      exampleAudioRef.current.play().then(() => { setIsPlaying(!isPlaying) }).catch((error) => { console.error('Error fetching message:', error) })
    }
  }
  return (
  <>
    <Button onClick={togglePlay} aria-label='example-play-button'>
      <ChevronRight size={32}/>
    </Button>
    {
    exampleAudioUrl !== '' &&
      <audio ref={exampleAudioRef} autoPlay={false} aria-label='example-audio'>
        <source src={exampleAudioUrl} />
      </audio>
    }
  </>
  )
}
