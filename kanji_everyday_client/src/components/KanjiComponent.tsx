import * as React from "react"
import { kanji } from "../api/kanji";
import {DisplayLarge} from 'baseui/typography'

export function KanjiComponent({kanji, style}:{kanji: kanji | undefined, style: React.CSSProperties | undefined}): JSX.Element {
    return(
        <div style={style}>
            <DisplayLarge>{kanji?.character}</DisplayLarge>
        </div>
    )
}