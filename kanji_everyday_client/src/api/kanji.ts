export interface kanji {
  character: string
  meaning: Translations
  kunyomi: Kunyomi
  onyomi: Onyomi
  example: Example
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

export interface Example {
  japanese: string
  meaning: string
}
