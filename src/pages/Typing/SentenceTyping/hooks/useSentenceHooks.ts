import { sentenceDictionaryConverter } from '@/plugins/sb/adepter'
import { LessonCourse, Sentence } from '@/plugins/wxs/wxs'
import { getLessonDetail, getLessons, getSentenceChapterInfo, getSentenceDictionaryInfo, getSentenceList } from '@/plugins/wxs/wxsApi'
import { currentSentenceChapterIdAtom, currentSentenceDictionaryIdAtom } from '@/store'
import { SentenceDictionary } from '@/typings'
import { useAsyncData } from '@/utils/async'
import { useAtom } from 'jotai'

export type AsyncResult<T> = {
    data: T | undefined
    loading: boolean
    error: Error | undefined
}

export function useCurrentSentenceDictionaryInfo(): AsyncResult<SentenceDictionary> {
    const [currentSentenceDictionaryId, setCurrentSentenceDictionaryId] = useAtom(currentSentenceDictionaryIdAtom)
    const dictionaries = useSentenceDictionaries()

    const currentSentenceDictionaryInfo = useAsyncData(async () => {
        if (currentSentenceDictionaryId) {
            return getSentenceDictionaryInfo(currentSentenceDictionaryId)
        }
        else if (dictionaries.data && dictionaries.data.length > 0) {
            setCurrentSentenceDictionaryId(dictionaries.data[0].id)
            return dictionaries.data[0]
        }
    }, [currentSentenceDictionaryId, dictionaries.data])
    return currentSentenceDictionaryInfo
}

export function useSentenceDictionaries(): AsyncResult<SentenceDictionary[]> {
    const sentenceDictionaries = useAsyncData(async () => {
        return getLessons().then((lessons) => lessons.map(sentenceDictionaryConverter))
    }, [])
    return sentenceDictionaries
}

export function useSentenceChapterList(dictionaryId: string): AsyncResult<LessonCourse[]> {
    const sentenceChapters = useAsyncData(async () => {
        if (dictionaryId) {
            return getLessonDetail(Number(dictionaryId)).then((detail) => detail.lesson_courses || ([] as LessonCourse[]))
        }
        return []
    }, [dictionaryId])
    return sentenceChapters
}

export function useCurrentSentenceChapterList(): AsyncResult<LessonCourse[]> {
    const [currentSentenceDictionaryId] = useAtom(currentSentenceDictionaryIdAtom)
    const sentenceChapters = useAsyncData(async () => {
        if (currentSentenceDictionaryId) {
            return getLessonDetail(Number(currentSentenceDictionaryId)).then((detail) => detail.lesson_courses || ([] as LessonCourse[]))
        }
        return []
    }, [currentSentenceDictionaryId])
    return sentenceChapters
}

export function useCurrentSentenceChapterInfo(): AsyncResult<LessonCourse> {
    const [currentSentenceDictionaryId] = useAtom(currentSentenceDictionaryIdAtom)
    const [currentSentenceChapterId, setCurrentSentenceChapterId] = useAtom(currentSentenceChapterIdAtom)
    const sentenceChapters = useCurrentSentenceChapterList()

    const currentSentenceChapterInfo = useAsyncData(async () => {
        if (currentSentenceChapterId && currentSentenceDictionaryId) {
            return getSentenceChapterInfo(currentSentenceDictionaryId, currentSentenceChapterId)
        }
        else if (currentSentenceDictionaryId) {
            if (sentenceChapters.data && sentenceChapters.data.length > 0) {
                setCurrentSentenceChapterId(sentenceChapters.data[0].id.toString())
                return sentenceChapters.data[0]
            }
        }
    }, [currentSentenceDictionaryId, currentSentenceChapterId, sentenceChapters.data])
    return currentSentenceChapterInfo
}

/**
 * Use sentence lists from the current selected dictionary. 
 */
export function useSentenceList(): AsyncResult<Sentence[]> {

    const [currentSentenceDictionaryId] = useAtom(currentSentenceDictionaryIdAtom)
    const [currentSentenceChapterId] = useAtom(currentSentenceChapterIdAtom)

    const sentenceList = useAsyncData(async () => {
        if (currentSentenceChapterId && currentSentenceDictionaryId) {
            return getSentenceList(Number(currentSentenceDictionaryId), Number(currentSentenceChapterId))
        }
        return []
    }, [currentSentenceDictionaryId, currentSentenceChapterId])

    return sentenceList
}
