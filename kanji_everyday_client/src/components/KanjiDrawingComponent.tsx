import * as React from 'react'
import './css/KanjiDrawingComponent.css'
import { Image, Layer, Line, Stage } from 'react-konva'
import { VerticalStack } from '../containers/VericalStack'
import { Button } from 'baseui/button'
import { HorizontalStack } from '../containers/HorizontalStack'
import useImage from 'use-image'
import type Konva from 'konva'

export function KanjiDrawingComponent ({ svgUrl, handleNextSvg }: { svgUrl: string, handleNextSvg: () => void }): JSX.Element {
  const isDrawing = React.useRef(false)
  const [lines, setLines] = React.useState<any[]>([])

  const imageLayerRef = React.useRef<Konva.Layer>(null)
  const drawLayerRef = React.useRef<Konva.Layer>(null)

  const checkTracing = (): boolean => {
    const imageLayerContext = imageLayerRef.current?.getCanvas()?.getContext()
    const drawLayerContext = drawLayerRef.current?.getCanvas()?.getContext()

    if ((imageLayerContext == null) || (drawLayerContext == null)) {
      console.error('Context not available')
    }

    const safeImageWidth = imageLayerContext?.canvas.width ?? 0
    const safeImageHeight = imageLayerContext?.canvas.height ?? 0

    const imagePixelData = imageLayerContext?.getImageData(0, 0, safeImageWidth, safeImageHeight).data ?? new Uint8ClampedArray()
    const imagePixelSvgIndidces: number[] = []

    for (let i = 0; i < (imagePixelData.length); i += 4) {
      if (imagePixelData[i + 3] !== 0) {
        imagePixelSvgIndidces.push(i)
      }
    }

    const drawPixelData = drawLayerContext?.getImageData(0, 0, safeImageWidth, safeImageHeight).data ?? []
    const drawingPixelPossibleIntersections: number[] = []

    for (let i = 0; i < (drawPixelData.length); i += 4) {
      if (drawPixelData[i + 3] !== 0) {
        drawingPixelPossibleIntersections.push(i)
      }
    }
    const intersectionArray = imagePixelSvgIndidces.filter(value => drawingPixelPossibleIntersections.includes(value))

    // Calculate the percentage of covered pixels
    const percentageCovered = (intersectionArray.length / imagePixelSvgIndidces.length) * 100

    return percentageCovered > 85
  }

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
    if (checkTracing()) handleNextSvg()
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
        <DrawingArea
          lines={lines}
          svgUrl={svgUrl}
          imageLayerRef={imageLayerRef}
          drawLayerRef={drawLayerRef}
          handleMouseDown={handleMouseDown}
          handleMouseMove={handleMouseMove}
          handleMouseUp={handleMouseUp}
        />
      </div>
    </VerticalStack>
  )
}

function DrawingArea (
  {
    lines,
    svgUrl,
    imageLayerRef,
    drawLayerRef,
    handleMouseDown,
    handleMouseMove,
    handleMouseUp
  }: {
    lines: any
    svgUrl: string
    imageLayerRef: React.RefObject<Konva.Layer>
    drawLayerRef: React.RefObject<Konva.Layer>
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
        <Layer ref={imageLayerRef} >
          <Image key={0} image={img} width={248} height={248} opacity={0.5}/>
        </Layer>
        <Layer ref={drawLayerRef}>
          {lines.map((line: any, i: number) => (
            <Line
              key={i}
              points={line.points}
              stroke="#FF0000"
              strokeWidth={10}
              hitStrokeWidth={10}
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
