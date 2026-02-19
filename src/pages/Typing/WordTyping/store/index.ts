import type { WordTypingState, UserWordInputLog } from './type'
import type { WordWithIndex } from '@/typings'
import type { WordLetterMistakes } from '@/utils/db/wordRecord'
import '@/utils/db/wordReviewRecord'
import { mergeLetterMistake } from '@/utils/db/utils'
import shuffle from '@/utils/shuffle'
import { createContext } from 'react'

export const initialWordTypingState: WordTypingState = {
  chapterData: {
    words: [],
    index: 0,
    inputCount: 0,
    correctCount: 0,
    wrongCount: 0,
    wordRecordIds: [],
    userInputLogs: [],
  },
  timerData: {
    time: 0,
    accuracy: 0,
    wpm: 0,
  },
  isTyping: false,
  isFinished: false,
  isShowSkip: false,
  isTransVisible: true,
  isLoopSingleWord: false,
  isSavingRecord: false,
}

export const initialUserWordInputLog: UserWordInputLog = {
  index: 0,
  correctCount: 0,
  wrongCount: 0,
  letterMistakes: {},
}

export enum WordTypingStateActionType {
  SETUP_CHAPTER = 'SETUP_CHAPTER',
  SET_IS_SKIP = 'SET_IS_SKIP',
  SET_IS_TYPING = 'SET_IS_TYPING',
  TOGGLE_IS_TYPING = 'TOGGLE_IS_TYPING',
  REPORT_WRONG_WORD = 'REPORT_WRONG_WORD',
  REPORT_CORRECT_WORD = 'REPORT_CORRECT_WORD',
  NEXT_WORD = 'NEXT_WORD',
  LOOP_CURRENT_WORD = 'LOOP_CURRENT_WORD',
  FINISH_CHAPTER = 'FINISH_CHAPTER',
  INCREASE_WRONG_WORD = 'INCREASE_WRONG_WORD',
  SKIP_WORD = 'SKIP_WORD',
  SKIP_2_WORD_INDEX = 'SKIP_2_WORD_INDEX',
  REPEAT_CHAPTER = 'REPEAT_CHAPTER',
  NEXT_CHAPTER = 'NEXT_CHAPTER',
  TOGGLE_WORD_VISIBLE = 'TOGGLE_WORD_VISIBLE',
  TOGGLE_TRANS_VISIBLE = 'TOGGLE_TRANS_VISIBLE',
  TICK_TIMER = 'TICK_TIMER',
  ADD_WORD_RECORD_ID = 'ADD_WORD_RECORD_ID',
  SET_IS_SAVING_RECORD = 'SET_IS_SAVING_RECORD',
  SET_IS_LOOP_SINGLE_WORD = 'SET_IS_LOOP_SINGLE_WORD',
  TOGGLE_IS_LOOP_SINGLE_WORD = 'TOGGLE_IS_LOOP_SINGLE_WORD',
  SET_REVISION_INDEX = 'SET_REVISION_INDEX',
}

export type WordTypingStateAction =
  | { type: WordTypingStateActionType.SETUP_CHAPTER; payload: { words: WordWithIndex[]; shouldShuffle: boolean; initialIndex?: number } }
  | { type: WordTypingStateActionType.SET_IS_SKIP; payload: boolean }
  | { type: WordTypingStateActionType.SET_IS_TYPING; payload: boolean }
  | { type: WordTypingStateActionType.TOGGLE_IS_TYPING }
  | { type: WordTypingStateActionType.REPORT_WRONG_WORD; payload: { letterMistake: WordLetterMistakes } }
  | { type: WordTypingStateActionType.REPORT_CORRECT_WORD }
  | {
    type: WordTypingStateActionType.NEXT_WORD
    payload?: {
      updateReviewRecord?: (state: WordTypingState) => void
    }
  }
  | { type: WordTypingStateActionType.LOOP_CURRENT_WORD }
  | { type: WordTypingStateActionType.FINISH_CHAPTER }
  | { type: WordTypingStateActionType.SKIP_WORD }
  | { type: WordTypingStateActionType.SKIP_2_WORD_INDEX; newIndex: number }
  | { type: WordTypingStateActionType.REPEAT_CHAPTER; shouldShuffle: boolean }
  | { type: WordTypingStateActionType.NEXT_CHAPTER }
  | { type: WordTypingStateActionType.TOGGLE_TRANS_VISIBLE }
  | { type: WordTypingStateActionType.TICK_TIMER; addTime?: number }
  | { type: WordTypingStateActionType.ADD_WORD_RECORD_ID; payload: string }
  | { type: WordTypingStateActionType.SET_IS_SAVING_RECORD; payload: boolean }
  | { type: WordTypingStateActionType.SET_IS_LOOP_SINGLE_WORD; payload: boolean }
  | { type: WordTypingStateActionType.TOGGLE_IS_LOOP_SINGLE_WORD }

type WordDispatch = (action: WordTypingStateAction) => void

export const wordTypingReducer = (state: WordTypingState, action: WordTypingStateAction) => {
  switch (action.type) {
    case WordTypingStateActionType.SETUP_CHAPTER: {
      const newState = structuredClone(initialWordTypingState)
      const words = action.payload.shouldShuffle ? shuffle(action.payload.words) : action.payload.words
      let initialIndex = action.payload.initialIndex ?? 0
      if (initialIndex >= words.length) {
        initialIndex = 0
      }
      newState.chapterData.index = initialIndex
      newState.chapterData.words = words
      newState.chapterData.userInputLogs = words.map((_, index) => ({ ...structuredClone(initialUserWordInputLog), index }))

      return newState
    }
    case WordTypingStateActionType.SET_IS_SKIP:
      state.isShowSkip = action.payload
      break
    case WordTypingStateActionType.SET_IS_TYPING:
      if (action.payload === false) {
        console.log('Setting isTyping to false (SET_IS_TYPING)')
      }
      state.isTyping = action.payload
      break

    case WordTypingStateActionType.TOGGLE_IS_TYPING:
      const newTypingState = !state.isTyping
      if (newTypingState === false) {
        console.log('Setting isTyping to false (TOGGLE_IS_TYPING)')
      }
      state.isTyping = newTypingState
      break
    case WordTypingStateActionType.REPORT_CORRECT_WORD: {
      state.chapterData.correctCount += 1

      const wordLog = state.chapterData.userInputLogs[state.chapterData.index]
      wordLog.correctCount += 1
      break
    }
    case WordTypingStateActionType.REPORT_WRONG_WORD: {
      state.chapterData.wrongCount += 1

      const letterMistake = action.payload.letterMistake
      const wordLog = state.chapterData.userInputLogs[state.chapterData.index]
      wordLog.wrongCount += 1
      wordLog.letterMistakes = mergeLetterMistake(wordLog.letterMistakes, letterMistake)
      break
    }
    case WordTypingStateActionType.NEXT_WORD: {
      state.chapterData.index += 1
      state.chapterData.inputCount += 1
      state.isShowSkip = false

      if (action?.payload?.updateReviewRecord) {
        action.payload.updateReviewRecord(state)
      }
      break
    }
    case WordTypingStateActionType.LOOP_CURRENT_WORD:
      state.isShowSkip = false
      state.chapterData.inputCount += 1
      break
    case WordTypingStateActionType.FINISH_CHAPTER:
      state.chapterData.inputCount += 1
      console.log('Setting isTyping to false (FINISH_CHAPTER)')
      state.isTyping = false
      state.isFinished = true
      state.isShowSkip = false
      break
    case WordTypingStateActionType.SKIP_WORD: {
      const newIndex = state.chapterData.index + 1
      if (newIndex >= state.chapterData.words.length) {
        console.log('Setting isTyping to false (SKIP_WORD)')
        state.isTyping = false
        state.isFinished = true
      } else {
        state.chapterData.index = newIndex
      }
      state.isShowSkip = false
      break
    }
    case WordTypingStateActionType.SKIP_2_WORD_INDEX: {
      const newIndex = action.newIndex
      if (newIndex >= state.chapterData.words.length) {
        console.log('Setting isTyping to false (SKIP_2_WORD_INDEX)')
        state.isTyping = false
        state.isFinished = true
      }
      state.chapterData.index = newIndex
      break
    }
    case WordTypingStateActionType.REPEAT_CHAPTER: {
      const newState = structuredClone(initialWordTypingState)
      newState.chapterData.userInputLogs = state.chapterData.words.map((_, index) => ({ ...structuredClone(initialUserWordInputLog), index }))
      newState.isTyping = true
      newState.chapterData.words = action.shouldShuffle ? shuffle(state.chapterData.words) : state.chapterData.words
      newState.isTransVisible = state.isTransVisible
      return newState
    }
    case WordTypingStateActionType.NEXT_CHAPTER: {
      const newState = structuredClone(initialWordTypingState)
      newState.chapterData.userInputLogs = state.chapterData.words.map((_, index) => ({ ...structuredClone(initialUserWordInputLog), index }))
      newState.isTyping = true
      newState.isTransVisible = state.isTransVisible
      return newState
    }
    case WordTypingStateActionType.TOGGLE_TRANS_VISIBLE:
      state.isTransVisible = !state.isTransVisible
      break
    case WordTypingStateActionType.TICK_TIMER: {
      const increment = action.addTime === undefined ? 1 : action.addTime
      const newTime = state.timerData.time + increment
      const inputSum =
        state.chapterData.correctCount + state.chapterData.wrongCount === 0
          ? 1
          : state.chapterData.correctCount + state.chapterData.wrongCount

      state.timerData.time = newTime
      state.timerData.accuracy = Math.round((state.chapterData.correctCount / inputSum) * 100)
      state.timerData.wpm = Math.round((state.chapterData.inputCount / newTime) * 60)
      break
    }
    case WordTypingStateActionType.ADD_WORD_RECORD_ID: {
      state.chapterData.wordRecordIds.push(action.payload)
      break
    }
    case WordTypingStateActionType.SET_IS_SAVING_RECORD: {
      state.isSavingRecord = action.payload
      break
    }
    case WordTypingStateActionType.SET_IS_LOOP_SINGLE_WORD: {
      state.isLoopSingleWord = action.payload
      break
    }
    case WordTypingStateActionType.TOGGLE_IS_LOOP_SINGLE_WORD: {
      state.isLoopSingleWord = !state.isLoopSingleWord
      break
    }
    default: {
      return state
    }
  }
}

export const WordTypingContext = createContext<{ state: WordTypingState; dispatch: WordDispatch } | null>(null)
