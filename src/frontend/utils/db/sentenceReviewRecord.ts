import { db } from '.'
import { useEffect, useState } from 'react'
import { SentenceReviewRecord } from './sentenceRecord'
import { Sentence } from '@/plugins/wxs/wxs'

export function useGetLatestSentenceReviewRecord(dictID: string) {
  const [sentenceReviewRecord, setSentenceReviewRecord] = useState<SentenceReviewRecord | undefined>(undefined)
  useEffect(() => {
    const fetchSentenceReviewRecords = async () => {
      const record = await getSentenceReviewRecords(dictID)
      setSentenceReviewRecord(record)
    }
    if (dictID) {
      fetchSentenceReviewRecords()
    }
  }, [dictID])
  return sentenceReviewRecord
}

async function getSentenceReviewRecords(dictID: string): Promise<SentenceReviewRecord | undefined> {
  const records = await db.sentenceReviewRecords.where('dict').equals(dictID).toArray()

  const latestRecord = records.sort((a, b) => a.createTime - b.createTime).pop()

  return latestRecord && (latestRecord.isFinished ? undefined : latestRecord)
}

type TErrorSentenceData = Sentence & {
  errorCount: number
  latestErrorTime: number
}

type TRankedSentenceData = TErrorSentenceData & {
  errorCountScore: number
  latestErrorTimeScore: number
}

export async function generateNewSentenceReviewRecord(dictID: string, errorData: TErrorSentenceData[]) {
  const errorCountRankings = [...errorData].sort((a, b) => a.errorCount - b.errorCount)
  const latestErrorTimeRankings = [...errorData].sort((a, b) => a.latestErrorTime - b.latestErrorTime)

  // 计算每个对象的排名得分
  const errorDataWithRank: TRankedSentenceData[] = errorData.map((item) => ({
    ...item,
    errorCountScore: errorCountRankings.indexOf(item) + 1,
    latestErrorTimeScore: latestErrorTimeRankings.indexOf(item) + 1,
  }))

  // 根据加权排名进行排序
  const errorCountWeight = 0.6
  const latestErrorTimeWeight = 0.4

  const sortedSentences: Sentence[] = errorDataWithRank
    .sort((a, b) => {
      // 计算 a 和 b 的得分
      const scoreA = a.errorCountScore * errorCountWeight + a.latestErrorTimeScore * latestErrorTimeWeight
      const scoreB = b.errorCountScore * errorCountWeight + b.latestErrorTimeScore * latestErrorTimeWeight

      // 根据得分进行排序
      return scoreA - scoreB
    })
    .map((item) => item)

  const record = new SentenceReviewRecord(dictID, sortedSentences)

  await db.sentenceReviewRecords.put(record)
  return record
}

export async function putSentenceReviewRecord(record: SentenceReviewRecord) {
  db.sentenceReviewRecords.put(record)
}
