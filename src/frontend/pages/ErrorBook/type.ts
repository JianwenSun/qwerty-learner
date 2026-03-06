import type { WordRecord } from '@/utils/db/wordRecord'

export type groupedWordRecords = {
  word: string
  dict: string
  records: WordRecord[]
  wrongCount: number
}
