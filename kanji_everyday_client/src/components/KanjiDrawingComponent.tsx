import * as React from 'react'
import './css/KanjiDrawingComponent.css'
import { Layer, Line, Stage } from 'react-konva'
import { VerticalStack } from '../containers/VericalStack'
import { Button } from 'baseui/button'
import { HorizontalStack } from '../containers/HorizontalStack'

export function KanjiDrawingComponent (): JSX.Element {
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
      </HorizontalStack>
      <div className='App drawing-area'>
        <DrawingArea lines={lines} handleMouseDown={handleMouseDown} handleMouseMove={handleMouseMove} handleMouseUp={handleMouseUp}/>
      </div>
    </VerticalStack>
  )
}

function DrawingArea (
  {
    lines,
    handleMouseDown,
    handleMouseMove,
    handleMouseUp
  }: {
    lines: any
    handleMouseDown: (e: any) => void
    handleMouseMove: (e: any) => void
    handleMouseUp: () => void
  }): JSX.Element {
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
          {lines.map((line: any, i: number) => (
            <Line
              key={i}
              points={line.points}
              stroke="#000000"
              strokeWidth={4}
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
