import { db } from '.'
import { WordReviewRecord } from './wordRecord'
import type { TErrorWordData } from '@/pages/Typing/WordTyping/pages/Gallery/hooks/useErrorWords'
import type { Word } from '@/typings'
import { useEffect, useState } from 'react'

export function useGetLatestWordReviewRecord(dictID: string) {
  const [wordReviewRecord, setWordReviewRecord] = useState<WordReviewRecord | undefined>(undefined)
  useEffect(() => {
    const fetchWordReviewRecords = async () => {
      const record = await getWordReviewRecords(dictID)
      setWordReviewRecord(record)
    }
    if (dictID) {
      fetchWordReviewRecords()
    }
  }, [dictID])
  return wordReviewRecord
}

async function getWordReviewRecords(dictID: string): Promise<WordReviewRecord | undefined> {
  const records = await db.wordReviewRecords.where('dict').equals(dictID).toArray()

  const latestRecord = records.sort((a, b) => a.createTime - b.createTime).pop()

  return latestRecord && (latestRecord.isFinished ? undefined : latestRecord)
}

type TRankedErrorWordData = TErrorWordData & {
  errorCountScore: number
  latestErrorTimeScore: number
}

export async function generateNewWordReviewRecord(dictID: string, errorData: TErrorWordData[]) {
  const errorCountRankings = [...errorData].sort((a, b) => a.errorCount - b.errorCount)
  const latestErrorTimeRankings = [...errorData].sort((a, b) => a.latestErrorTime - b.latestErrorTime)

  // 计算每个对象的排名得分
  const errorDataWithRank: TRankedErrorWordData[] = errorData.map((item) => ({
    ...item,
    errorCountScore: errorCountRankings.indexOf(item) + 1,
    latestErrorTimeScore: latestErrorTimeRankings.indexOf(item) + 1,
  }))

  // 根据加权排名进行排序
  const errorCountWeight = 0.6
  const latestErrorTimeWeight = 0.4

  const sortedWords: Word[] = errorDataWithRank
    .sort((a, b) => {
      // 计算 a 和 b 的得分
      const scoreA = a.errorCountScore * errorCountWeight + a.latestErrorTimeScore * latestErrorTimeWeight
      const scoreB = b.errorCountScore * errorCountWeight + b.latestErrorTimeScore * latestErrorTimeWeight

      // 根据得分进行排序
      return scoreA - scoreB
    })
    .map((item) => item.originData)

  const record = new WordReviewRecord(dictID, sortedWords)

  await db.wordReviewRecords.put(record)
  return record
}

export async function putWordReviewRecord(record: WordReviewRecord) {
  db.wordReviewRecords.put(record)
}
