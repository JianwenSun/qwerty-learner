import { CHAPTER_LENGTH } from '@/constants'
import { getLessonCourseKey } from '@/plugins/wxs/wxsApi'
import { currentSentenceChapterAtom, currentSentenceDictionaryInfoAtom, sentenceReviewModeInfoAtom } from '@/store'
import type { Sentence } from '@/typings/index'
import { sentenceListFetcher } from '@/utils/resourceListFetcher'
import { useAtom, useAtomValue } from 'jotai'
import { useMemo } from 'react'
import useSWR from 'swr'

export type UseSentenceListResult = {
    sentences: Sentence[]
    isLoading: boolean
    error: Error | undefined
}

/**
 * Use sentence lists from the current selected dictionary. 
 */
export function useSentenceList(): UseSentenceListResult {
    const currentSentenceDictionaryInfo = useAtomValue(currentSentenceDictionaryInfoAtom)
    const [currentSentenceChapter, setCurrentSentenceChapter] = useAtom(currentSentenceChapterAtom)

    if (!currentSentenceChapter) {
        return { sentences: [], isLoading: false, error: undefined }
    }

    const { data: sentenceList, error, isLoading } = useSWR(getLessonCourseKey(parseInt(currentSentenceDictionaryInfo.id), currentSentenceChapter), sentenceListFetcher)

    const sentences: Sentence[] = useMemo(() => {
        let newSentences: Sentence[]
        if (sentenceList) {
            newSentences = sentenceList
        } else {
            newSentences = []
        }

        return newSentences.map((sentence, index) => {
            return {
                ...sentence,
                index,
            }
        })
    }, [sentenceList, currentSentenceChapter])

    return { sentences, isLoading, error }
}