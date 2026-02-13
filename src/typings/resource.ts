import type { LanguageCategoryType, LanguageType, PronunciationType } from '.'

export interface DictionaryBase {
  id: string
  name: string
  description: string
  category: string
  tags: string[]
  url: string
  icon_url?: string
  length: number
  language: LanguageType
  languageCategory: LanguageCategoryType
  app?: string
}

export interface DictionaryResource extends DictionaryBase {
  //override default pronunciation when not undefined
  defaultPronIndex?: number
}

export interface Dictionary extends DictionaryBase {
  // calculated in the store
  chapterCount: number
  //override default pronunciation when not undefined
  defaultPronIndex?: number
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
