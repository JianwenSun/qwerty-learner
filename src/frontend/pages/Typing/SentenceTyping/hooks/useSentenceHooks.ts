import { lessonsAtom, lessonsErrorAtom, lessonsLoadingAtom, loadLessonsAtom, lessonDetailAtom, sentenceListAtom } from '@/cache'
import { sentenceDictionaryConverter } from '@/plugins/sb/adepter'
import { LessonCourse, Sentence } from '@/plugins/wxs/wxs'
import { currentSentenceChapterIdAtom, currentSentenceDictionaryIdAtom } from '@/store'
import { SentenceDictionary } from '@/typings'
import { useAtom } from 'jotai'
import { useEffect, useState } from 'react'

export type AsyncResult<T> = {
    data: T | undefined
    loading: boolean
    error: Error | undefined
}

export function useCurrentSentenceDictionaryInfo(): AsyncResult<SentenceDictionary> {
    const [currentSentenceDictionaryId, setCurrentSentenceDictionaryId] = useAtom(currentSentenceDictionaryIdAtom)
    const dictionaries = useSentenceDictionaries()

    // 当 dictionaries.data 加载完成且没有选择字典时，设置默认字典
    useEffect(() => {
        if (!currentSentenceDictionaryId && dictionaries.data && dictionaries.data.length > 0) {
            setCurrentSentenceDictionaryId(dictionaries.data[0].id)
        }
    }, [currentSentenceDictionaryId, dictionaries.data, setCurrentSentenceDictionaryId])

    // 查找当前字典信息
    const currentDictionary = currentSentenceDictionaryId && dictionaries.data
        ? dictionaries.data.find((dict) => dict.id === currentSentenceDictionaryId)
        : (dictionaries.data && dictionaries.data.length > 0 ? dictionaries.data[0] : undefined)

    return {
        data: currentDictionary,
        loading: dictionaries.loading,
        error: dictionaries.error
    }
}

export function useSentenceDictionaries(): AsyncResult<SentenceDictionary[]> {
    const [lessons] = useAtom(lessonsAtom)
    const [loading] = useAtom(lessonsLoadingAtom)
    const [error] = useAtom(lessonsErrorAtom)
    const [, loadLessons] = useAtom(loadLessonsAtom)

    // 当 lessons 为 undefined 时，触发加载
    useEffect(() => {
        const fetchLessons = async () => {
            if (!lessons) {
                await loadLessons()
            }
        }
        fetchLessons()
    }, [lessons, loadLessons])

    // 将 lessons 转换为 SentenceDictionary[]
    const dictionaries = lessons ? lessons.map(sentenceDictionaryConverter) : undefined

    return { data: dictionaries, loading, error }
}

export function useSentenceChapterList(dictionaryId: string): AsyncResult<LessonCourse[]> {
    const [data, setData] = useState<LessonCourse[] | undefined>(undefined)
    const [loading, setLoading] = useState<boolean>(false)
    const [error, setError] = useState<Error | undefined>(undefined)
    const [, getLessonDetail] = useAtom(lessonDetailAtom)

    useEffect(() => {
        const fetchChapters = async () => {
            if (dictionaryId) {
                setLoading(true)
                setError(undefined)
                try {
                    const detail = await getLessonDetail(Number(dictionaryId))
                    setData(detail?.lesson_courses || [])
                } catch (err) {
                    setError(err as Error)
                    setData([])
                } finally {
                    setLoading(false)
                }
            } else {
                setData([])
            }
        }
        fetchChapters()
    }, [dictionaryId, getLessonDetail])

    return { data, loading, error }
}

export function useCurrentSentenceChapterList(): AsyncResult<LessonCourse[]> {
    const [currentSentenceDictionaryId] = useAtom(currentSentenceDictionaryIdAtom)
    return useSentenceChapterList(currentSentenceDictionaryId ?? '')
}

export function useCurrentSentenceChapterInfo(): AsyncResult<LessonCourse> {
    const [currentSentenceDictionaryId] = useAtom(currentSentenceDictionaryIdAtom)
    const [currentSentenceChapterId, setCurrentSentenceChapterId] = useAtom(currentSentenceChapterIdAtom)
    const sentenceChapters = useCurrentSentenceChapterList()

    // 当 sentenceChapters.data 加载完成且没有选择章节时，设置默认章节
    useEffect(() => {
        if (currentSentenceDictionaryId && !currentSentenceChapterId && sentenceChapters.data && sentenceChapters.data.length > 0) {
            setCurrentSentenceChapterId(sentenceChapters.data[0].id.toString())
        }
    }, [currentSentenceDictionaryId, currentSentenceChapterId, sentenceChapters.data, setCurrentSentenceChapterId])

    // 获取当前章节信息
    const currentChapter = currentSentenceChapterId && sentenceChapters.data
        ? sentenceChapters.data.find((chapter) => chapter.id.toString() === currentSentenceChapterId)
        : (sentenceChapters.data && sentenceChapters.data.length > 0 ? sentenceChapters.data[0] : undefined)

    return {
        data: currentChapter,
        loading: sentenceChapters.loading,
        error: sentenceChapters.error
    }
}

/**
 * Use sentence lists from the current selected dictionary. 
 */
export function useSentenceList(): AsyncResult<Sentence[]> {
    const [currentSentenceDictionaryId] = useAtom(currentSentenceDictionaryIdAtom)
    const [currentSentenceChapterId] = useAtom(currentSentenceChapterIdAtom)
    const [data, setData] = useState<Sentence[] | undefined>(undefined)
    const [loading, setLoading] = useState<boolean>(false)
    const [error, setError] = useState<Error | undefined>(undefined)
    const [, getSentenceList] = useAtom(sentenceListAtom)

    useEffect(() => {
        const fetchSentences = async () => {
            if (currentSentenceChapterId && currentSentenceDictionaryId) {
                setLoading(true)
                setError(undefined)
                try {
                    const sentences = await getSentenceList(Number(currentSentenceDictionaryId), Number(currentSentenceChapterId))
                    setData(sentences)
                } catch (err) {
                    setError(err as Error)
                    setData([])
                } finally {
                    setLoading(false)
                }
            } else {
                setData([])
            }
        }
        fetchSentences()
    }, [currentSentenceDictionaryId, currentSentenceChapterId, getSentenceList])

    return { data, loading, error }
}
