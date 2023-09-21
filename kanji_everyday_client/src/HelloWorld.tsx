import * as React from "react"
import { kanji } from "./api/kanji";

export function HelloWorld(): JSX.Element {
    const [message, setMessage] = React.useState<string>("");
    const [kanji, setKanji] = React.useState<kanji>();

    React.useEffect(() => {
        fetch('http://127.0.0.1:5000/api/message')
        .then((response) => response.json())
        .then((data) => {setMessage(data.message)})
        .catch((error) => console.error("Error fetching message:", error))
    }, [])

    React.useEffect(() => {
        fetch('http://127.0.0.1:5000/api/getKanji')
        .then((response) => response.json())
        .then((data) => {
            const kanjiObject: kanji = {character: data['kanji'], meaning: {english: data['translation']}}
            setKanji(kanjiObject);
        })
        .catch((error) => console.error("Error fetching message:", error))


    }, [])

    console.warn(`hello: ${message}`);
    console.warn("Kanji:", kanji)

    return(<div>
        <h1>This is my application</h1>
        <p>{message}</p>
        <p>{kanji?.character}</p>
        <p>{kanji?.meaning.english}</p>
    </div>)
}