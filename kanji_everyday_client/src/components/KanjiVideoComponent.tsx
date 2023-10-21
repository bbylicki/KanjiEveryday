import * as React from 'react'

export function KanjiVideoComponent ({ index }: { index?: number }): JSX.Element {
  const [kanjiVideoUrl, setKanjiVideoUrl] = React.useState('')

  React.useEffect(() => {
    console.warn(index)
    fetch(`http://127.0.0.1:5000/api/getKanjiAnimation?index=${index}`)
      .then(async (response) => await response.blob())
      .then((data) => {
        const url = URL.createObjectURL(data)
        setKanjiVideoUrl(url)
      })
      .catch((error) => { console.error('Error fetching message:', error) })
  }, [])

  return (
  <div>
    {kanjiVideoUrl.length > 0 &&
     <video autoPlay={true} loop={true}>
      <source src={kanjiVideoUrl} type="video/mp4" />
    </video>}
  </div>
  )
}
