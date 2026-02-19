import { CHAPTER_LENGTH } from '@/constants'
import { currentWordChapterAtom, currentWordDictionaryInfoAtom, wordReviewModeInfoAtom } from '@/store'
import type { Word, WordWithIndex } from '@/typings/index'
import { wordListFetcher } from '@/utils/resourceListFetcher'
import { useAtom, useAtomValue } from 'jotai'
import { useMemo } from 'react'
import useSWR from 'swr'

export type UseWordListResult = {
  words: WordWithIndex[]
  isLoading: boolean
  error: Error | undefined
}

/**
 * Use word lists from the current selected dictionary.
 */
export function useWordList(): UseWordListResult {
  const currentWordDictionaryInfo = useAtomValue(currentWordDictionaryInfoAtom)
  const [currentWordChapter, setCurrentWordChapter] = useAtom(currentWordChapterAtom)
  const { isReviewMode, reviewRecord } = useAtomValue(wordReviewModeInfoAtom)

  // Reset current chapter to 0, when currentChapter is greater than chapterCount.
  if (currentWordChapter === undefined || currentWordChapter !== undefined && currentWordChapter >= currentWordDictionaryInfo.chapterCount) {
    setCurrentWordChapter(0)
  }

  const isFirstChapter = !isReviewMode && currentWordChapter === 0
  const { data: wordList, error, isLoading } = useSWR(currentWordDictionaryInfo.url, wordListFetcher)

  const words: WordWithIndex[] = useMemo(() => {
    let newWords: Word[]
    if (isReviewMode) {
      newWords = reviewRecord?.words ?? []
    } else if (wordList) {
      newWords = wordList.slice(
        currentWordChapter !== undefined ? currentWordChapter * CHAPTER_LENGTH : 0,
        (currentWordChapter !== undefined ? currentWordChapter + 1 : 0) * CHAPTER_LENGTH
      )
    } else {
      newWords = []
    }

    return newWords.map((word, index) => {
      return {
        ...word,
        index,
      }
    })
  }, [isFirstChapter, isReviewMode, wordList, reviewRecord?.words, currentWordChapter])

  return { words, isLoading, error }
}