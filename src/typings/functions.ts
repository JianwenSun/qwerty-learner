import useSWR from 'swr'
import { Dictionary, Word, WordWithIndex } from '.'
import { idDictionaryMap } from '@/resources/dictionary'
import { wordListFetcher } from '@/utils/wordListFetcher'
import { useMemo } from 'react'

export * from './resource'

export type WordListResult = {
    words: Word[]
    dictionary: Dictionary
}

export function getWordList(dictionaryId: string): WordListResult {
    const dictionary = idDictionaryMap[dictionaryId]
    const { data: wordList } = useSWR(dictionary.url, wordListFetcher)

    const words: Word[] = useMemo(() => {
        return wordList ?? []
    }, [wordList])

    return { words, dictionary }
}