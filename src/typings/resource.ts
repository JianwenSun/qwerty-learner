import type { LanguageType, PronunciationType } from '.'

export type DictionaryType = 'word' | 'sentence'

export interface DictionaryBase {
  id: string
  name: string
  description: string
  category: string
  tags: string[]
  url: string
  icon_url?: string
  length: number
  type: DictionaryType
  app?: string
}

export interface DictionaryResource extends DictionaryBase {
  //override default pronunciation when not undefined
  defaultPronIndex?: number
}

export interface Dictionary extends DictionaryBase {
  // calculated in the store
  chapterCount: number
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
