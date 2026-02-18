import type { WordDictionary, DictionaryResource } from '@/typings/index'
import { calcChapterCount } from '@/utils'
import { vocabularyDictionaryResources } from './vocabularyDictionary'

/**
 * Built-in dictionaries in an array.
 * Why arrays? Because it keeps the order across browsers.
 */
export const dictionaryResources: DictionaryResource[] = [
  ...vocabularyDictionaryResources
]

export const dictionaries: WordDictionary[] = dictionaryResources.map((resource) => ({
  ...resource,
  chapterCount: calcChapterCount(resource.length),
}))

/**
 * An object-map from dictionary IDs to dictionary themselves.
 */
export const idDictionaryMap: Record<string, WordDictionary> = Object.fromEntries(dictionaries.map((dict) => [dict.id, dict]))
