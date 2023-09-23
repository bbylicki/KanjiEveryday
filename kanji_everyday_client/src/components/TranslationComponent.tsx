import * as React from "react"
import { kanji } from "../api/kanji"
import { DisplaySmall } from "baseui/typography"

export function TranslationComponent({kanji}:{kanji: kanji | undefined}): React.JSX.Element {
    return(
        <div style={{margin: "1rem"}} aria-label="translation-text">
            <DisplaySmall >
                {kanji?.meaning.english}
            </DisplaySmall>
        </div>
    )
}