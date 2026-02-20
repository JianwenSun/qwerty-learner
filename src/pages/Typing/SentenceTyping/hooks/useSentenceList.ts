import { Sentence } from '@/plugins/wxs/wxs'
import { getSentenceList } from '@/plugins/wxs/wxsApi'
import { currentSentenceChapterAtom, currentSentenceDictionaryInfoAtom } from '@/store'
import { useAtom, useAtomValue } from 'jotai'
import { useEffect, useState } from 'react'

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

    const [isLoading, setIsLoading] = useState(true)
    const [sentenceList, setSentenceList] = useState<Sentence[]>([])
    const [error, setError] = useState<Error | undefined>(undefined)

    useEffect(() => {
        const loadChapterDetail = async () => {
            try {
                setIsLoading(true)
                setError(undefined)
                if (!currentSentenceChapter || !currentSentenceDictionaryInfo) {
                    return
                }
                let sentences = await getSentenceList(Number(currentSentenceDictionaryInfo.id), currentSentenceChapter)
                setSentenceList(sentences)
            } catch (error) {
                console.error('Error loading chapter detail:', error)
                setSentenceList([])
                setError(error instanceof Error ? error : new Error(String(error)))
            } finally {
                setIsLoading(false)
            }
        }

        loadChapterDetail()
    }, [currentSentenceDictionaryInfo, currentSentenceChapter])

    return { sentences: sentenceList, isLoading, error }
}
