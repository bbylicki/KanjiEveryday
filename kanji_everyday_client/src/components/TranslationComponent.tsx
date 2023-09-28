import * as React from "react"
import { kanji } from "../api/kanji"
import { DisplaySmall } from "baseui/typography"

export function TranslationComponent({kanji, style}:{kanji: kanji | undefined, style: React.CSSProperties | undefined}): React.JSX.Element {
    return(
        <div style={style} aria-label="translation-text">
            <DisplaySmall >
                {kanji?.meaning.english}
            </DisplaySmall>
        </div>
    )
}