import { getUTCUnixTimestamp } from '../index'
import type { Sentence, Word } from '@/typings'

export interface ISentenceRecord {
  id: string
  word: string
  timeStamp: number
  // 正常章节为 dictKey, 其他功能则为对应的类型
  dict: string
  // 用户可能是在 错题/其他类似组件中 进行的练习则为 null, start from 0
  chapter: number | null
  // 正确次数中输入每个字母的时间差，可以据此计算出总时间
  timing: number[]
  // 出错的次数
  wrongCount: number
  // 每个字母被错误输入成什么, index 为字母的索引, 数组内为错误的 e.key
  mistakes: WordLetterMistakes
}

export interface WordLetterMistakes {
  // 每个字母被错误输入成什么, index 为字母的索引, 数组内为错误的 e.key
  [index: number]: string[]
}

export class SentenceRecord implements ISentenceRecord {
  id: string
  word: string
  timeStamp: number
  dict: string
  chapter: number | null
  timing: number[]
  wrongCount: number
  mistakes: WordLetterMistakes

  constructor(id: string, word: string, dict: string, chapter: number | null, timing: number[], wrongCount: number, mistakes: WordLetterMistakes) {
    this.id = id
    this.word = word
    this.timeStamp = getUTCUnixTimestamp()
    this.dict = dict
    this.chapter = chapter
    this.timing = timing
    this.wrongCount = wrongCount
    this.mistakes = mistakes
  }

  get totalTime() {
    return this.timing.reduce((acc, curr) => acc + curr, 0)
  }
}

export interface ISentenceReviewRecord {
  id?: number
  dict: string
  // 当前练习进度
  index: number
  // 创建时间
  createTime: number
  // 是否已经完成
  isFinished: boolean
  // 句子列表, 根据复习算法生成和修改，可能会有重复值
  sentences: Sentence[]
}

export class SentenceReviewRecord implements ISentenceReviewRecord {
  id?: number
  dict: string
  index: number
  createTime: number
  isFinished: boolean
  sentences: Sentence[]

  constructor(dict: string, sentences: Sentence[]) {
    this.dict = dict
    this.index = 0
    this.createTime = getUTCUnixTimestamp()
    this.sentences = sentences
    this.isFinished = false
  }
}