import * as React from "react"

export function HelloWorld(): JSX.Element {
    const [message, setMessage] = React.useState<string>("");
    const [kanji, setKanji] = React.useState<string>("");

    React.useEffect(() => {
        fetch('http://127.0.0.1:5000/api/message')
        .then((response) => response.json())
        .then((data) => {setMessage(data.message)})
        .catch((error) => console.error("Error fetching message:", error))
    }, [])

    React.useEffect(() => {
        fetch('http://127.0.0.1:5000/api/getKanji')
        .then((response) => response.json())
        .then((data) => {setKanji(data.kanji)})
        .catch((error) => console.error("Error fetching message:", error))
    }, [])

    console.warn(`hello: ${message}`);

    return(<div>
        <h1>This is my application</h1>
        <p>{message}</p>
        <p>{kanji}</p>
    </div>)
}