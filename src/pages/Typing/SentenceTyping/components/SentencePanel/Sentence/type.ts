import type { LetterState } from './Letter'
import type { WordLetterMistakes } from '@/utils/db/wordRecord'

export type SentenceState = {
  displayContent: string
  inputWord: string
  letterStates: LetterState[]
  isFinished: boolean
  // 是否出现输入错误
  hasWrong: boolean
  // 用户输入错误的次数
  wrongCount: number
  startTime: string
  endTime: string
  inputCount: number
  correctCount: number
  letterTimeArray: number[]
  letterMistake: WordLetterMistakes
  // 用于随机隐藏字母功能
  randomLetterVisible: boolean[]
}

export const initialSentenceState: SentenceState = {
  displayContent: '',
  inputWord: '',
  letterStates: [],
  isFinished: false,
  hasWrong: false,
  wrongCount: 0,
  startTime: '',
  endTime: '',
  inputCount: 0,
  correctCount: 0,
  letterTimeArray: [],
  letterMistake: {},
  randomLetterVisible: [],
}
