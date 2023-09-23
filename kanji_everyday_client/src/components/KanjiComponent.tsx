import * as React from "react"
import { kanji } from "../api/kanji";
import {DisplayLarge} from 'baseui/typography'

export function KanjiComponent({kanji}:{kanji: kanji | undefined}): JSX.Element {
    return(
        <div style={{margin: "1rem"}}>
            <DisplayLarge>{kanji?.character}</DisplayLarge>
        </div>
    )
}