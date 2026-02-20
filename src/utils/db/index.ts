import type { IWordChapterRecord, IWordReviewRecord, IWordRecord, WordLetterMistakes } from './wordRecord'
import { WordChapterRecord, WordReviewRecord, WordRecord } from './wordRecord'
import { WordTypingContext, WordTypingStateActionType } from '@/pages/Typing/WordTyping/store'
import type { WordTypingState } from '@/pages/Typing/WordTyping/store/type'
import { currentWordChapterAtom, currentWordDictionaryIdAtom, isReviewModeAtom } from '@/store'
import type { Table } from 'dexie'
import Dexie from 'dexie'
import { useAtomValue } from 'jotai'
import { useCallback, useContext } from 'react'
import { Word } from '@/typings'
import { ISentenceChapterRecord, ISentenceReviewRecord, SentenceChapterRecord, SentenceReviewRecord } from './sentenceRecord'

class RecordDB extends Dexie {
  wordRecords!: Table<IWordRecord, string>
  wordChapterRecords!: Table<IWordChapterRecord, number>
  wordReviewRecords!: Table<IWordReviewRecord, number>
  sentenceReviewRecords!: Table<ISentenceReviewRecord, number>
  sentenceChapterRecords!: Table<ISentenceChapterRecord, number>

  constructor() {
    super('RecordDB')
    this.version(3).stores({
      wordRecords: '++id,word,timeStamp,dict,chapter,wrongCount,[dict+chapter]',
      wordChapterRecords: '++id,timeStamp,dict,chapter,time,[dict+chapter]',
      wordReviewRecords: '++id,dict,createTime,isFinished',
      sentenceReviewRecords: '++id,dict,createTime,isFinished',
      sentenceChapterRecords: '++id,timeStamp,dict,chapter,time,[dict+chapter]',
    })
  }
}

export const db = new RecordDB()

db.wordRecords.mapToClass(WordRecord)
db.wordChapterRecords.mapToClass(WordChapterRecord)
db.wordReviewRecords.mapToClass(WordReviewRecord)
db.sentenceReviewRecords.mapToClass(SentenceReviewRecord)
db.sentenceChapterRecords.mapToClass(SentenceChapterRecord)

export function useSaveWordChapterRecord() {
  const currentWordChapter = useAtomValue(currentWordChapterAtom)
  const isRevision = useAtomValue(isReviewModeAtom)
  const currentWordDictionaryId = useAtomValue(currentWordDictionaryIdAtom)

  const saveWordChapterRecord = useCallback(
    (wordTypingState: WordTypingState) => {

      if (!currentWordDictionaryId) {
        return
      }

      const {
        chapterData: { correctCount, wrongCount, userInputLogs, inputCount, words, wordRecordIds },
        timerData: { time },
      } = wordTypingState
      const correctWordIndexes = userInputLogs.filter((log) => log.correctCount > 0 && log.wrongCount === 0).map((log) => log.index)

      const chapterRecord = new WordChapterRecord(
        currentWordDictionaryId,
        isRevision ? -1 : currentWordChapter,
        time,
        correctCount,
        wrongCount,
        inputCount,
        correctWordIndexes,
        words.length,
        wordRecordIds ?? [],
      )
      db.wordChapterRecords.add(chapterRecord)
    },
    [currentWordChapter, currentWordDictionaryId, isRevision],
  )

  return saveWordChapterRecord
}

export type WordKeyLogger = {
  letterTimeArray: number[]
  letterMistake: WordLetterMistakes
}

export function useSaveWordRecord() {
  const isRevision = useAtomValue(isReviewModeAtom)
  const currentWordChapter = useAtomValue(currentWordChapterAtom)
  const currentWordDictionaryId = useAtomValue(currentWordDictionaryIdAtom)

  const { dispatch } = useContext(WordTypingContext) ?? {}

  const saveWordRecord = useCallback(
    async ({
      word,
      wrongCount,
      letterTimeArray,
      letterMistake,
    }: {
      word: Word
      wrongCount: number
      letterTimeArray: number[]
      letterMistake: WordLetterMistakes
    }) => {
      const timing = []
      for (let i = 1; i < letterTimeArray.length; i++) {
        const diff = letterTimeArray[i] - letterTimeArray[i - 1]
        timing.push(diff)
      }
      if (!currentWordDictionaryId || !currentWordChapter) {
        return
      }

      const wordRecord = new WordRecord(word.id, word.name, currentWordDictionaryId, isRevision ? -1 : currentWordChapter, timing, wrongCount, letterMistake)

      let dbID: string = ''
      try {
        dbID = await db.wordRecords.add(wordRecord)
        if (dispatch) {
          dispatch({ type: WordTypingStateActionType.ADD_WORD_RECORD_ID, payload: dbID })
          dispatch({ type: WordTypingStateActionType.SET_IS_SAVING_RECORD, payload: false })
        }
      } catch (e) {
        console.error(e)
      }
    },
    [currentWordChapter, currentWordDictionaryId, dispatch, isRevision],
  )

  return saveWordRecord
}

export function useDeleteWordRecord() {
  const deleteWordRecord = useCallback(async (word: string, dict: string) => {
    try {
      const deletedCount = await db.wordRecords.where({ word, dict }).delete()
      return deletedCount
    } catch (error) {
      console.error(`删除单词记录时出错：`, error)
    }
  }, [])

  return { deleteWordRecord }
}
