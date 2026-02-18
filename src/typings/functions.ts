import useSWR from 'swr'
import { WordDictionary, Word } from '.'
import { idDictionaryMap } from '@/resources/dictionary'
import { wordListFetcher } from '@/utils/wordListFetcher'
import { useMemo } from 'react'

export * from './resource'

export type WordListResult = {
    words: Word[]
    wordDictionary: WordDictionary
}

export function getWordList(dictionaryId: string): WordListResult {
    const wordDictionary = idDictionaryMap[dictionaryId]
    const { data: wordList } = useSWR(wordDictionary.url, wordListFetcher)

    const words: Word[] = useMemo(() => {
        return wordList ?? []
    }, [wordList])

    return { words, wordDictionary }
}