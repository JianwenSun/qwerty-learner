import { currentWordDictionaryIdAtom } from '@/store'
import { db } from '@/utils/db'
import type { IWordChapterRecord } from '@/utils/db/wordRecord'
import { useAtomValue } from 'jotai'
import { useEffect, useState } from 'react'

export function useChapterStats(chapter: number, isStartLoad: boolean) {
  const currentWordDictionaryId = useAtomValue(currentWordDictionaryIdAtom)
  const [chapterStats, setChapterStats] = useState<IChapterStats | null>(null)

  useEffect(() => {
    const fetchChapterStats = async () => {
      if (!currentWordDictionaryId) {
        return
      }

      const stats = await getChapterStats(currentWordDictionaryId, chapter)
      setChapterStats(stats)
    }

    if (isStartLoad && !chapterStats) {
      fetchChapterStats()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentWordDictionaryId, chapter, isStartLoad])

  return chapterStats
}

interface IChapterStats {
  exerciseCount: number
  avgWrongCount: number
}

async function getChapterStats(dict: string, chapter: number | null): Promise<IChapterStats> {
  const records: IWordChapterRecord[] = await db.wordChapterRecords.where({ dict, chapter }).toArray()

  const exerciseCount = records.length
  const totalWrongCount = records.reduce((total, { wrongCount }) => total + (wrongCount || 0), 0)
  const avgWrongCount = exerciseCount > 0 ? totalWrongCount / exerciseCount : 0

  return { exerciseCount, avgWrongCount }
}
