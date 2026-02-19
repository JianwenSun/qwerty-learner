import type { Dictionary, LanguageType, PronunciationType } from '.'

export interface DictionaryResource extends Dictionary {
  //override default pronunciation when not undefined
}

export interface UrlDictionaryResource extends DictionaryResource {
  //override default pronunciation when not undefined
  url?: string
  length: number
}

export type PronunciationConfig = {
  name: string
  pron: PronunciationType
}

export type LanguagePronunciationMapConfig = {
  defaultPronIndex: number
  pronunciation: PronunciationConfig[]
}

export type LanguagePronunciationMap = {
  [key in LanguageType]: LanguagePronunciationMapConfig
}

export type SoundResource = {
  key: string
  name: string
  filename: string
}
