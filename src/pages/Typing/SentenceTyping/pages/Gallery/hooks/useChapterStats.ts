import { toFixedNumber } from '@/utils'
import { db } from '@/utils/db'
import { ISentenceChapterRecord } from '@/utils/db/sentenceRecord'
import { useEffect, useState } from 'react'

export function useChapterStats(chapterId: number, dictionaryId: string, isStartLoad: boolean) {
  const [chapterStats, setChapterStats] = useState<ISentenceChapterStats | null>(null)

  useEffect(() => {
    const fetchChapterStats = async () => {
      const stats = await getChapterStats(dictionaryId, chapterId)
      setChapterStats(stats)
    }

    if (isStartLoad && !chapterStats) {
      fetchChapterStats()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dictionaryId, chapterId, isStartLoad])

  return chapterStats
}

interface ISentenceChapterStats {
  exerciseCount: number
  avgWrongWordCount: number
  avgWrongInputCount: number
}

async function getChapterStats(dictionaryId: string, chapterId: number | null): Promise<ISentenceChapterStats> {
  try {
    let records: ISentenceChapterRecord[] = []

    // 根据 chapter 是否为 null 构建不同的查询条件
    if (chapterId === null) {
      // 如果 chapter 为 null，查询所有 dict 匹配的记录
      records = await db.sentenceChapterRecords.where({ dict: dictionaryId }).toArray()
    } else {
      // 如果 chapter 不为 null，查询 dict 和 chapter 都匹配的记录
      records = await db.sentenceChapterRecords.where({ dict: dictionaryId, chapter: chapterId }).toArray()
    }

    const exerciseCount = records.length
    const totalWrongWordCount = records.reduce(
      (total, { wordNumber, correctWordIndexes }) => total + (wordNumber - correctWordIndexes.length),
      0,
    )
    const avgWrongWordCount = exerciseCount > 0 ? toFixedNumber(totalWrongWordCount / exerciseCount, 2) : 0

    const totalWrongInputCount = records.reduce((total, { wrongCount }) => total + (wrongCount ?? 0), 0)
    const avgWrongInputCount = exerciseCount > 0 ? toFixedNumber(totalWrongInputCount / exerciseCount, 2) : 0

    return { exerciseCount, avgWrongWordCount, avgWrongInputCount }
  } catch (error) {
    console.error('Error fetching chapter stats:', error)
    return { exerciseCount: 0, avgWrongWordCount: 0, avgWrongInputCount: 0 }
  }
}
