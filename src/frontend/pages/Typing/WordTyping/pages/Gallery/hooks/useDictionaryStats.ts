import { db } from '@/utils/db'
import type { IWordChapterRecord } from '@/utils/db/wordRecord'
import { useEffect, useState } from 'react'

export function useDictionaryStats(dictID: string, isStartLoad: boolean) {
  const [wordDictionaryStats, setWordDictionaryStats] = useState<IWordDictionaryStats | null>(null)

  useEffect(() => {
    const fetchDictStats = async () => {
      const stats = await getDictStats(dictID)
      setWordDictionaryStats(stats)
    }

    if (isStartLoad && !wordDictionaryStats) {
      fetchDictStats()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dictID, isStartLoad])

  return wordDictionaryStats
}

interface IWordDictionaryStats {
  exercisedChapterCount: number
}

async function getDictStats(dict: string): Promise<IWordDictionaryStats> {
  try {
    const records: IWordChapterRecord[] = await db.wordChapterRecords.where({ dict }).toArray()
    const allChapter = records.map(({ chapter }) => chapter).filter((item) => item !== null && item !== undefined) as number[]
    const uniqueChapter = allChapter.filter((value, index, self) => {
      return self.indexOf(value) === index
    })
    const exercisedChapterCount = uniqueChapter.length

    return { exercisedChapterCount }
  } catch (error) {
    console.error('Error fetching dict stats:', error)
    return { exercisedChapterCount: 0 }
  }
}
