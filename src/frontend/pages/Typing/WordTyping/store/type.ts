import type { WordWithIndex } from '@/typings'
import type { WordLetterMistakes } from '@/utils/db/wordRecord'

export type WordChapterData = {
  // warning: 因为有章节内随机的存在，所有记录 index 的场景都应该使用 WordWithIndex.index
  words: WordWithIndex[]
  // chapter index
  index: number
  // 输入的单词数
  inputCount: number
  // 输入正确的单词数
  correctCount: number
  // 输入错误的单词数
  wrongCount: number
  // 每个单词的输入记录
  userInputLogs: UserWordInputLog[]
  // 本章节用户输入的单词的 record id 列表
  wordRecordIds: string[]
}

export type UserWordInputLog = {
  // the index in ChapterData.words, not the index in WordWithIndex
  index: number
  correctCount: number
  wrongCount: number
  letterMistakes: WordLetterMistakes
}

export type TimerData = {
  time: number
  accuracy: number
  wpm: number
}

export type WrongWordData = {
  name: string
  wrongCount: number
  wrongLetters: Array<{
    letter: string
    count: number
  }>
}

export type WordTypingState = {
  chapterData: WordChapterData
  timerData: TimerData
  isTyping: boolean
  isFinished: boolean
  isShowSkip: boolean
  isTransVisible: boolean
  isLoopSingleWord: boolean
  // 是否正在保存数据
  isSavingRecord: boolean
}
