import * as React from 'react'
import './css/KanjiDrawingComponent.css'
import { Image, Layer, Line, Stage } from 'react-konva'
import { VerticalStack } from '../containers/VericalStack'
import { Button } from 'baseui/button'
import { HorizontalStack } from '../containers/HorizontalStack'
import useImage from 'use-image'

export function KanjiDrawingComponent ({ svgUrl, handleNextSvg }: { svgUrl: string, handleNextSvg: () => void }): JSX.Element {
  const isDrawing = React.useRef(false)
  const [lines, setLines] = React.useState<any[]>([])

  const handleMouseDown = (e: any): void => {
    isDrawing.current = true
    const pos = e.target.getStage().getPointerPosition()
    setLines([...lines, { points: [pos.x, pos.y] }])
  }

  const handleMouseMove = (e: any): void => {
    // no drawing - skipping
    if (!isDrawing.current) {
      return
    }
    const stage = e.target.getStage()
    const point = stage.getPointerPosition()

    // To draw line
    const lastLine: any = lines[lines.length - 1]

    if (lastLine != null || lastLine !== undefined) {
      // add point
      lastLine.points = lastLine.points.concat([point.x, point.y])

      // replace last
      lines.splice(lines.length - 1, 1, lastLine)
      setLines(lines.concat())
    }
  }

  const handleMouseUp = (): void => {
    isDrawing.current = false
  }

  const handleClear = (): void => {
    setLines([])
  }
  const handleBack = (): void => {
    setLines(lines.slice(0, -1))
  }

  return (
    <VerticalStack>
      <HorizontalStack>
      <Button onClick={handleBack}>Back</Button>
      <Button onClick={handleClear}>Clear</Button>
      <Button onClick={handleNextSvg}>Next</Button>
      </HorizontalStack>
      <div className='App drawing-area'>
        <DrawingArea lines={lines} svgUrl={svgUrl} handleMouseDown={handleMouseDown} handleMouseMove={handleMouseMove} handleMouseUp={handleMouseUp}/>
      </div>
    </VerticalStack>
  )
}

function DrawingArea (
  {
    lines,
    svgUrl,
    handleMouseDown,
    handleMouseMove,
    handleMouseUp
  }: {
    lines: any
    svgUrl: string
    handleMouseDown: (e: any) => void
    handleMouseMove: (e: any) => void
    handleMouseUp: () => void
  }): JSX.Element {
  const [img] = useImage(svgUrl)
  return (
    <div className=" text-center text-dark">
      <Stage
          width={248}
          height={248}
          onMouseDown={handleMouseDown}
          onMousemove={handleMouseMove}
          onMouseup={handleMouseUp}
          className="canvas-stage"
      >
        <Layer>
          <Image key={0} image={img} width={248} height={248} opacity={0.5}/>
        </Layer>
        <Layer>
          {lines.map((line: any, i: number) => (
            <Line
              key={i}
              points={line.points}
              stroke="#000000"
              strokeWidth={8}
              tension={0.5}
              lineCap="round"
              globalCompositeOperation={
                  line.tool === 'eraser' ? 'destination-out' : 'source-over'
              }
            />
          ))}
        </Layer>
      </Stage>
    </div>
  )
}
