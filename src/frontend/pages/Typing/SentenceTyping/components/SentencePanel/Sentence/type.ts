import { Sentence } from '@/plugins/wxs/wxs'
import { immerable } from 'immer'
import { ChuckIndex, SentenceSymbol, SentenceSymbols } from '../../../store/type'

export enum JustifyType {
  MOVE_TO_NEXT_WORD = 'MOVE_TO_NEXT_WORD',
  COMPLETE = 'COMPLETE',
}

export class WordContent implements ChuckIndex {
  [immerable] = true
  content: string
  //letter展示样式
  //用户输入的单词
  inputWord: string | undefined
  hasWrong: boolean | undefined
  //随机字母展示
  randomLetterVisible: boolean[]
  isCurrent: boolean
  index: number

  constructor(content: string, index: number) {
    this.index = index
    this.content = content
    this.inputWord = undefined
    this.hasWrong = undefined
    this.isCurrent = false
    this.randomLetterVisible = content.split('').map(() => Math.random() > 0.4)
  }

  static newContent(content: WordContent): WordContent {
    return new WordContent(content.content, content.index)
  }

  static copy(from: WordContent, to: WordContent) {
    to.hasWrong = from.hasWrong
    to.isCurrent = from.isCurrent
    to.inputWord = from.inputWord
    to.content = from.content
    to.randomLetterVisible = [...from.randomLetterVisible]
  }

  static input(state: WordContent, letter: string): WordContent {
    // 创建一个新的 WordContent 对象
    const newState = WordContent.newContent(state)
    WordContent.copy(state, newState)
    if (newState.hasWrong) {
      newState.inputWord = letter
    }
    else {
      newState.inputWord = state.inputWord === undefined ? letter : state.inputWord + letter
    }
    newState.hasWrong = undefined
    return newState
  }

  static delete(state: WordContent): [WordContent, boolean] {
    const newState = WordContent.newContent(state)
    WordContent.copy(state, newState)

    if (newState.inputWord === undefined) {
      newState.hasWrong = undefined
      return [newState, false]
    }
    else if (newState.inputWord.length === 1) {
      newState.inputWord = undefined
      newState.hasWrong = undefined
      return [newState, true]
    }
    else if (newState.inputWord.length > 0) {
      if (newState.hasWrong) {
        newState.inputWord = undefined
      }
      else {
        newState.inputWord = newState.inputWord.slice(0, -1)
      }
      newState.hasWrong = undefined
      return [newState, true]
    }
    else {
      return [newState, false]
    }
  }

  static calculate(state: WordContent): WordContent {
    const newState = WordContent.newContent(state)
    WordContent.copy(state, newState)
    // 去除末尾的 '.' 后比较
    const cleanInput = newState.inputWord?.replace(/\.$/, '') || ''
    const cleanContent = state.content.replace(/\.$/, '')
    newState.hasWrong = cleanInput.toLowerCase() !== cleanContent.toLowerCase()
    return newState
  }
}

export class SentenceDisplayContent {
  [immerable] = true
  wordCount: number
  words: WordContent[]
  //当前正在输入的单词
  currentWordIndex: number
  content: string
  symbols: SentenceSymbol[]

  constructor(content: string, words: WordContent[], symbols: SentenceSymbol[] = []) {
    this.content = content
    this.wordCount = words.length
    this.words = words
    this.symbols = symbols
    this.currentWordIndex = words.length > 0 ? 0 : -1

    words.forEach((word, index) => {
      if (word.isCurrent) {
        this.currentWordIndex = index
      }
    });
  }

  static newContent(state: SentenceDisplayContent): SentenceDisplayContent {
    return new SentenceDisplayContent(state.content, state.words, state.symbols)
  }

  static moveToNextWord(state: SentenceDisplayContent) {

    let num = state.wordCount;
    let hasWrong = undefined, hasEmpty = undefined
    let wordIndex = undefined

    for (let i = state.currentWordIndex + 1; num > 0; i++, num--) {
      if (state.words[i % state.wordCount].inputWord === undefined) {
        hasEmpty = true
        wordIndex = i % state.wordCount
        break
      }
      if (state.words[i % state.wordCount].hasWrong) {
        hasWrong = true
        wordIndex = i % state.wordCount
        break
      }
    }

    //先调整当前index
    let currentIndex = state.currentWordIndex
    state.words[currentIndex].isCurrent = false

    //处理下一个index
    if ((hasWrong || hasEmpty) && wordIndex !== undefined) {
      currentIndex = wordIndex
    }
    else {
      if (currentIndex >= state.wordCount - 1) {
        currentIndex = 0
      }
      else {
        currentIndex++
      }
    }

    state.currentWordIndex = currentIndex
    state.words[currentIndex].isCurrent = true
  }

  static moveToPreviousWord(state: SentenceDisplayContent) {
    state.words[state.currentWordIndex].isCurrent = false
    if (state.currentWordIndex <= 0) {
      state.currentWordIndex = state.wordCount - 1
    }
    else {
      state.currentWordIndex--
    }
    state.words[state.currentWordIndex].isCurrent = true
  }

  static moveToIndexWord(state: SentenceDisplayContent, index: number) {
    state.words[state.currentWordIndex].isCurrent = false
    state.currentWordIndex = index
    state.words[index].isCurrent = true
  }

  static inputCurrentWord(state: SentenceDisplayContent, letter: string): SentenceDisplayContent {
    // 更新当前单词
    const currentWord = state.words[state.currentWordIndex]
    if (currentWord) {
      state.words[state.currentWordIndex] = WordContent.input(currentWord, letter)
    }
    return state
  }

  static deleteCurrentWord(state: SentenceDisplayContent): [SentenceDisplayContent, boolean] {
    // 更新当前单词
    const currentWord = state.words[state.currentWordIndex]
    if (currentWord) {
      const [deletedWord, isDeleted] = WordContent.delete(currentWord)
      state.words[state.currentWordIndex] = deletedWord
      return [state, isDeleted]
    }
    return [state, false]
  }
}

export class SentenceState {
  [immerable] = true
  displayContent: SentenceDisplayContent
  isFinished: boolean
  hasWrong: boolean | undefined
  startTime: string | undefined
  endTime: string | undefined
  //用户输入错误的次数
  wrongCount: number
  hasChanged: boolean

  constructor(displayContent: SentenceDisplayContent) {
    this.displayContent = displayContent
    this.isFinished = false
    this.wrongCount = 0
    this.hasChanged = false
  }

  static copy(from: SentenceState, to: SentenceState) {
    to.isFinished = from.isFinished
    to.hasWrong = from.hasWrong
    to.startTime = from.startTime
    to.endTime = from.endTime
    to.wrongCount = from.wrongCount
    to.hasChanged = from.hasChanged
  }

  static calculate(state: SentenceState): SentenceState {
    const newState = new SentenceState(state.displayContent)
    SentenceState.copy(state, newState)
    const words = newState.displayContent.words.map(word => WordContent.calculate(word))
    newState.hasWrong = words.some(word => word.hasWrong === true)
    newState.displayContent.words = words
    newState.isFinished = newState.hasWrong === false
    return newState
  }

  public static justifyOrMoveToNext(state: SentenceState): [JustifyType, SentenceState] {
    const isAllWordsInputted = state.displayContent.words.every(word => {
      return word.inputWord?.length
    })

    const hasJustify = state.displayContent.words.some(word => word.hasWrong === true)

    if (!hasJustify && isAllWordsInputted) {
      let result = SentenceState.calculate(state)
      if (result.hasWrong) {
        const currentWord = result.displayContent.words[result.displayContent.currentWordIndex]
        if (!currentWord.hasWrong) {
          result = SentenceState.moveToNextWord(result)
        }
        return [JustifyType.COMPLETE, result]
      }
      else {
        return [JustifyType.COMPLETE, result]
      }
    }
    else {
      return [JustifyType.MOVE_TO_NEXT_WORD, SentenceState.moveToNextWord(state)]
    }
  }

  public static moveToPreviousWord(state: SentenceState): SentenceState {
    // 创建一个新的 SentenceDisplayContent 对象
    const newDisplayContent = SentenceDisplayContent.newContent(state.displayContent)
    newDisplayContent.currentWordIndex = state.displayContent.currentWordIndex
    SentenceDisplayContent.moveToPreviousWord(newDisplayContent)
    // 创建一个新的 SentenceState 对象
    const newState = new SentenceState(newDisplayContent)
    SentenceState.copy(state, newState)
    newState.hasChanged = true
    return newState
  }

  public static moveToNextWord(state: SentenceState): SentenceState {
    // 创建一个新的 SentenceDisplayContent 对象
    const newDisplayContent = SentenceDisplayContent.newContent(state.displayContent)
    newDisplayContent.currentWordIndex = state.displayContent.currentWordIndex
    SentenceDisplayContent.moveToNextWord(newDisplayContent)
    // 创建一个新的 SentenceState 对象
    const newState = new SentenceState(newDisplayContent)
    SentenceState.copy(state, newState)
    newState.hasChanged = true

    return newState
  }

  public static moveToIndexWord(state: SentenceState, index: number): SentenceState {
    // 创建一个新的 SentenceDisplayContent 对象
    const newDisplayContent = SentenceDisplayContent.newContent(state.displayContent)
    SentenceDisplayContent.moveToIndexWord(newDisplayContent, index)
    newDisplayContent.currentWordIndex = index

    // 创建一个新的 SentenceState 对象
    const newState = new SentenceState(newDisplayContent)
    SentenceState.copy(state, newState)
    newState.hasChanged = true
    return newState
  }

  public static inputCurrentWord(state: SentenceState, letter: string): SentenceState {
    // 创建一个新的 SentenceDisplayContent 对象
    const newDisplayContent = SentenceDisplayContent.newContent(state.displayContent)
    newDisplayContent.currentWordIndex = state.displayContent.currentWordIndex
    SentenceDisplayContent.inputCurrentWord(newDisplayContent, letter)

    // 创建一个新的 SentenceState 对象
    const newState = new SentenceState(newDisplayContent)
    SentenceState.copy(state, newState)
    newState.hasChanged = true
    return newState
  }

  public static deleteCurrentWord(state: SentenceState): SentenceState {
    // 创建一个新的 SentenceDisplayContent 对象
    const newDisplayContent = SentenceDisplayContent.newContent(state.displayContent)
    newDisplayContent.currentWordIndex = state.displayContent.currentWordIndex
    const [, isDeleted] = SentenceDisplayContent.deleteCurrentWord(newDisplayContent)

    // 创建一个新的 SentenceState 对象
    const newState = new SentenceState(newDisplayContent)
    if (!isDeleted) {
      return this.moveToPreviousWord(newState)
    }
    else {
      SentenceState.copy(state, newState)
      newState.hasChanged = true
      return newState
    }
  }
}

export const initialSentenceState: SentenceState = new SentenceState(new SentenceDisplayContent('', []));

export function generateSentenceDisplayContent(sentence: Sentence): SentenceDisplayContent {
  // 按照空格拆分句子，并过滤掉空字符串
  const wordsWithSpaces = sentence.content.split(' ').filter(word => word.trim() !== '');

  // 提取符号及其在句子中的索引（忽略空格，按照元素顺序编号）
  const symbols: SentenceSymbol[] = [];

  // 生成单词列表，记录每个单词在句子中的索引（忽略空格，按照元素顺序编号）
  const words: WordContent[] = [];

  // 索引计数器
  let currentIndex = 0;

  // 遍历所有单词
  for (const wordWithSpace of wordsWithSpaces) {
    // 按照标点符号拆分每个单词
    const parts = wordWithSpace
      .split(/([,.;:!?()\[\]{}'"-]|\.\.\.)/)
      .filter(part => part.trim() !== '');

    // 遍历拆分后的部分
    for (const part of parts) {
      // 检查是否是符号
      if (/[,.;:!?()\[\]{}'"-]|\.\.\./.test(part)) {
        // 是符号，添加到 symbols 数组
        symbols.push({
          symbol: part as SentenceSymbols,
          index: currentIndex
        });
      } else {
        // 是单词，添加到 words 数组
        words.push(new WordContent(part, currentIndex));
      }
      // 增加索引计数器
      currentIndex++;
    }
  }

  if (words.length > 0) {
    words[0].isCurrent = true
  }
  return new SentenceDisplayContent(sentence.content, words, symbols)
}