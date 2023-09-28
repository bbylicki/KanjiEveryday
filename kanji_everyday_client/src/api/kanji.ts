export interface kanji {
    character: string;
    meaning: Translations;
    kunyomi: Kunyomi;
}

interface Translations {
    english: string;
}

export interface Kunyomi {
    romaji: string;
    hiragana: string;
}