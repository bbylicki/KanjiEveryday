import * as React from "react"
import { KanjiComponent } from "./KanjiComponent";
import { Kunyomi, kanji } from "../api/kanji";
import { TranslationComponent } from "./TranslationComponent";
import { DisplayMedium } from "baseui/typography";
import { ReadingsComponent } from "./ReadingsComponent";

export function LandingPage(): JSX.Element {
    const [kanji, setKanji] = React.useState<kanji>();

    React.useEffect(() => {
        const index = Math.floor(Math.random() * 1234)
        fetch(`http://127.0.0.1:5000/api/getKanji?index=${index}`)
        .then((response) => response.json())
        .then((data) => {
            const kunyomi: Kunyomi = {hiragana: data['kunyomi']['hiragana'], romaji: data['kunyomi']['romaji']}
            const kanjiObject: kanji = {character: data['kanji'], meaning: {english: data['translation']}, kunyomi: kunyomi}
            setKanji(kanjiObject);
        })
        .catch((error) => console.error("Error fetching message:", error))


    }, [])

    const componentStyle = {margin: "1rem"};

    return(
        <div style={{
            position: "fixed",
            left: "10%",
            right: "10%",
            top: "10%",
            bottom: "10%",
            backgroundColor: "#FFFFFF",
            }}>
            <DisplayMedium style={componentStyle}>Kanji Everday</DisplayMedium>
            {kanji && <KanjiComponent kanji={kanji} style={componentStyle}/>}
            {kanji && <TranslationComponent kanji={kanji} style={componentStyle} />}
            {kanji && <ReadingsComponent kanji={kanji} style={componentStyle} />}
        </div>
    )
}
