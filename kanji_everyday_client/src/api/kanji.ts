export interface kanji {
  character: string
  meaning: Translations
  kunyomi: Kunyomi
  onyomi: Onyomi
}

interface Translations {
  english: string
}

export interface Kunyomi {
  romaji: string
  hiragana: string
}

export interface Onyomi {
  romaji: string
  katakana: string
}
