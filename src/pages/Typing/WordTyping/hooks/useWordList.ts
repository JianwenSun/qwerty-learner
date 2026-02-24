import { CHAPTER_LENGTH } from '@/constants'
import { currentWordChapterIdAtom, currentWordDictionaryInfoAtom, wordReviewModeInfoAtom } from '@/store'
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
  const [currentWordChapterId, setCurrentWordChapterId] = useAtom(currentWordChapterIdAtom)
  const { isReviewMode, reviewRecord } = useAtomValue(wordReviewModeInfoAtom)

  // Reset current chapter to 0, when currentChapter is greater than chapterCount.
  if (currentWordChapterId === undefined || currentWordChapterId !== undefined && currentWordChapterId >= currentWordDictionaryInfo.chapterCount) {
    setCurrentWordChapterId(0)
  }

  const isFirstChapter = !isReviewMode && currentWordChapterId === 0
  const { data: wordList, error, isLoading } = useSWR(currentWordDictionaryInfo.url, wordListFetcher)

  const words: WordWithIndex[] = useMemo(() => {
    let newWords: Word[]
    if (isReviewMode) {
      newWords = reviewRecord?.words ?? []
    } else if (wordList) {
      newWords = wordList.slice(
        currentWordChapterId !== undefined ? currentWordChapterId * CHAPTER_LENGTH : 0,
        (currentWordChapterId !== undefined ? currentWordChapterId + 1 : 0) * CHAPTER_LENGTH
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
  }, [isFirstChapter, isReviewMode, wordList, reviewRecord?.words, currentWordChapterId])

  return { words, isLoading, error }
}