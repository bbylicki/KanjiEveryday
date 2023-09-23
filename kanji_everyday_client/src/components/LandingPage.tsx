import * as React from "react"
import { KanjiComponent } from "./KanjiComponent";
import { kanji } from "../api/kanji";
import { TranslationComponent } from "./TranslationComponent";
import { DisplayMedium } from "baseui/typography";

export function LandingPage(): JSX.Element {
    const [kanji, setKanji] = React.useState<kanji>();

    React.useEffect(() => {
        fetch('http://127.0.0.1:5000/api/getKanji')
        .then((response) => response.json())
        .then((data) => {
            const kanjiObject: kanji = {character: data['kanji'], meaning: {english: data['translation']}}
            setKanji(kanjiObject);
        })
        .catch((error) => console.error("Error fetching message:", error))


    }, [])

    return(
        <div style={{
            position: "fixed",
            left: "10%",
            right: "10%",
            top: "10%",
            bottom: "10%",
            backgroundColor: "#FFFFFF",
            }}>
            <DisplayMedium style={{margin: "1rem"}}>Kanji Everday</DisplayMedium>
            {kanji && <KanjiComponent kanji={kanji}/>}
            {kanji && <TranslationComponent kanji={kanji}/>}
        </div>
    )
}
