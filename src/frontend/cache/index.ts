import { getLessons, getLessonDetail, getSentenceList, getSentenceSound } from '@/plugins/wxs/wxsApi'
import type { Lesson, LessonDetail as WxsLessonDetail, Sentence } from '@/plugins/wxs/wxs'
import { atom } from 'jotai'


// API 缓存 Atoms
// 课程列表缓存
export const lessonsAtom = atom<Lesson[] | undefined>(undefined)
export const lessonsLoadingAtom = atom<boolean>(false)
export const lessonsErrorAtom = atom<Error | undefined>(undefined)

// 加载课程列表的 action
export const loadLessonsAtom = atom(
    (get) => get(lessonsAtom),
    async (get, set) => {
        if (get(lessonsAtom)) return get(lessonsAtom)

        set(lessonsLoadingAtom, true)
        set(lessonsErrorAtom, undefined)

        try {
            const lessons = await getLessons()
            set(lessonsAtom, lessons)
            return lessons
        } catch (error) {
            set(lessonsErrorAtom, error as Error)
            return undefined
        } finally {
            set(lessonsLoadingAtom, false)
        }
    }
)

// 课程详情缓存 (使用字典 ID 作为参数)
// 使用更简单的方式实现，避免使用 getSelf
export const lessonDetailsCacheAtom = atom<Record<number, WxsLessonDetail>>({})

export const lessonDetailAtom = atom(
    (get) => get(lessonDetailsCacheAtom),
    async (get, set, dictionaryId: number) => {
        const cache = get(lessonDetailsCacheAtom)

        // 检查缓存中是否已有数据
        if (cache[dictionaryId]) {
            return cache[dictionaryId]
        }

        try {
            const detail = await getLessonDetail(dictionaryId)
            // 更新缓存
            set(lessonDetailsCacheAtom, {
                ...cache,
                [dictionaryId]: detail
            })
            return detail
        } catch (error) {
            console.error('Failed to load lesson detail:', error)
            return undefined
        }
    }
)

// 句子列表缓存
export const sentenceListsCacheAtom = atom<Record<string, Sentence[]>>({})

export const sentenceListAtom = atom(
    (get) => get(sentenceListsCacheAtom),
    async (get, set, dictionaryId: number, chapterId: number) => {
        const cacheKey = `${dictionaryId}:${chapterId}`
        const cache = get(sentenceListsCacheAtom)

        if (cache[cacheKey]) {
            return cache[cacheKey]
        }

        try {
            const sentences = await getSentenceList(dictionaryId, chapterId)
            set(sentenceListsCacheAtom, {
                ...cache,
                [cacheKey]: sentences
            })
            return sentences
        } catch (error) {
            console.error('Failed to load sentence list:', error)
            return []
        }
    }
)

// 句子发音缓存
export const sentenceSoundsCacheAtom = atom<Record<number, string>>({})

export const sentenceSoundAtom = atom(
    (get) => get(sentenceSoundsCacheAtom),
    async (get, set, sentenceId: number) => {
        const cache = get(sentenceSoundsCacheAtom)

        if (cache[sentenceId]) {
            return cache[sentenceId]
        }

        try {
            const soundUrl = await getSentenceSound(sentenceId)
            set(sentenceSoundsCacheAtom, {
                ...cache,
                [sentenceId]: soundUrl
            })
            return soundUrl
        } catch (error) {
            console.error('Failed to load sentence sound:', error)
            return ''
        }
    }
)