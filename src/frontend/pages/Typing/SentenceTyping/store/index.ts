import { Sentence, SentenceAndSound } from "@/plugins/wxs/wxs";
import shuffle from "@/utils/shuffle";
import { createContext } from "react";
import { SentenceDisplayContent } from "../components/SentencePanel/Sentence/type";
import { SentenceTypingState, UserSentenceInputLog } from "./type";


export const initialSentenceTypingState: SentenceTypingState = {
    chapterData: {
        sentences: [],
        index: 0,
        inputCount: 0,
        correctCount: 0,
        wrongCount: 0,
        userInputLogs: [],
    },
    timerData: {
        time: 0,
        accuracy: 0,
        wpm: 0,
    },
    isTyping: false,
    isFinished: false,
    isTransVisible: false,
    isShowSkip: false,
    isSavingRecord: false,
}

type SentenceDispatch = (action: SentenceTypingStateAction) => void

export type SentenceTypingStateAction =
    | { type: SentenceTypingStateActionType.SETUP_CHAPTER; payload: { sentences: Sentence[]; shouldShuffle: boolean; initialIndex?: number } }
    | {
        type: SentenceTypingStateActionType.NEXT_SENTENCE; payload?: {
            updateReviewRecord?: (state: SentenceTypingState) => void
        }
    }
    | { type: SentenceTypingStateActionType.TOGGLE_TRANS_VISIBLE }
    | { type: SentenceTypingStateActionType.TOGGLE_IS_TYPING }
    | { type: SentenceTypingStateActionType.REPEAT_CHAPTER; shouldShuffle: boolean }
    | { type: SentenceTypingStateActionType.SKIP_SENTENCE }
    | { type: SentenceTypingStateActionType.FINISH_CHAPTER }
    | { type: SentenceTypingStateActionType.LOOP_CURRENT_SENTENCE }
    | { type: SentenceTypingStateActionType.SKIP_SENTENCE_INDEX; newIndex: number }
    | { type: SentenceTypingStateActionType.SET_IS_SKIP; payload: boolean }
    | { type: SentenceTypingStateActionType.REPORT_CORRECT_SENTENCE }
    | { type: SentenceTypingStateActionType.REPORT_WRONG_SENTENCE, payload: { sentenceAndSound: SentenceAndSound, sentenceContent: SentenceDisplayContent } }
    | { type: SentenceTypingStateActionType.SET_IS_SAVING_RECORD; payload: boolean }
    | { type: SentenceTypingStateActionType.SET_IS_TYPING; payload: boolean }
    | { type: SentenceTypingStateActionType.TICK_TIMER; addTime?: number }

export enum SentenceTypingStateActionType {
    SETUP_CHAPTER = 'SETUP_CHAPTER',
    NEXT_SENTENCE = 'NEXT_SENTENCE',
    TOGGLE_IS_TYPING = 'TOGGLE_IS_TYPING',
    TOGGLE_TRANS_VISIBLE = 'TOGGLE_TRANS_VISIBLE',
    REPEAT_CHAPTER = 'REPEAT_CHAPTER',
    SKIP_SENTENCE = 'SKIP_SENTENCE',
    SKIP_SENTENCE_INDEX = 'SKIP_SENTENCE_INDEX',
    FINISH_CHAPTER = 'FINISH_CHAPTER',
    LOOP_CURRENT_SENTENCE = 'LOOP_CURRENT_SENTENCE',
    SET_IS_SKIP = 'SET_IS_SKIP',
    REPORT_CORRECT_SENTENCE = 'REPORT_CORRECT_SENTENCE',
    REPORT_WRONG_SENTENCE = 'REPORT_WRONG_SENTENCE',
    SET_IS_SAVING_RECORD = 'SET_IS_SAVING_RECORD',
    SET_IS_TYPING = 'SET_IS_TYPING',
    TICK_TIMER = 'TICK_TIMER',
}

export const sentenceTypingReducer = (state: SentenceTypingState, action: SentenceTypingStateAction) => {
    switch (action.type) {
        case SentenceTypingStateActionType.SETUP_CHAPTER: {
            const newState = structuredClone(initialSentenceTypingState)
            const sentences = action.payload.shouldShuffle ? shuffle(action.payload.sentences) : action.payload.sentences
            let initialIndex = action.payload.initialIndex ?? 0
            if (initialIndex >= sentences.length) {
                initialIndex = 0
            }
            newState.chapterData.index = initialIndex
            newState.chapterData.sentences = sentences
            return newState
        }
        case SentenceTypingStateActionType.NEXT_SENTENCE: {
            state.chapterData.index += 1
            state.chapterData.inputCount += 1
            if (action?.payload?.updateReviewRecord) {
                action.payload.updateReviewRecord(state)
            }
            break
        }
        case SentenceTypingStateActionType.TOGGLE_TRANS_VISIBLE: {
            state.isTransVisible = !state.isTransVisible
            break
        }
        case SentenceTypingStateActionType.TOGGLE_IS_TYPING: {
            const newTypingState = !state.isTyping
            if (newTypingState === false) {
                console.log('Setting isTyping to false (TOGGLE_IS_TYPING)')
            }
            state.isTyping = newTypingState
            break
        }
        case SentenceTypingStateActionType.REPEAT_CHAPTER: {
            const newState = structuredClone(initialSentenceTypingState)
            newState.isTyping = true
            newState.chapterData.sentences = action.shouldShuffle ? shuffle(state.chapterData.sentences) : state.chapterData.sentences
            newState.isTransVisible = state.isTransVisible
            newState.chapterData.index = 0
            return newState
        }
        case SentenceTypingStateActionType.SKIP_SENTENCE: {
            const newIndex = state.chapterData.index + 1
            if (newIndex >= state.chapterData.sentences.length) {
                state.isTyping = false
                state.isFinished = true
            } else {
                state.chapterData.index = newIndex
            }
            state.isShowSkip = false
            break
        }
        case SentenceTypingStateActionType.SKIP_SENTENCE_INDEX: {
            const newIndex = action.newIndex
            if (newIndex >= (state.chapterData.sentences?.length || 0)) {
                state.isTyping = false
                state.isFinished = true
            }
            state.chapterData.index = newIndex
            break
        }
        case SentenceTypingStateActionType.FINISH_CHAPTER: {
            state.chapterData.inputCount += 1
            state.isTyping = false
            state.isFinished = true
            state.isShowSkip = false
            break
        }
        case SentenceTypingStateActionType.LOOP_CURRENT_SENTENCE: {
            state.isShowSkip = false
            state.chapterData.inputCount += 1
            break
        }
        case SentenceTypingStateActionType.SET_IS_SKIP: {
            state.isShowSkip = action.payload
            break
        }
        case SentenceTypingStateActionType.REPORT_CORRECT_SENTENCE: {
            state.chapterData.correctCount += 1
            break
        }
        case SentenceTypingStateActionType.REPORT_WRONG_SENTENCE: {
            const { sentenceAndSound, sentenceContent } = action.payload
            state.chapterData.userInputLogs.push({
                sentenceIndex: state.chapterData.index,
                soundUrl: sentenceAndSound.soundUrl,
                hasWrong: true,
            } as UserSentenceInputLog)
            state.chapterData.wrongCount += 1
            break
        }
        case SentenceTypingStateActionType.SET_IS_SAVING_RECORD: {
            state.isSavingRecord = action.payload
            break
        }
        case SentenceTypingStateActionType.SET_IS_TYPING: {
            state.isTyping = action.payload
            break
        }
        case SentenceTypingStateActionType.TICK_TIMER: {
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
        default: {
            return state
        }
    }
}

export const SentenceTypingContext = createContext<{ state: SentenceTypingState; dispatch: SentenceDispatch } | null>(null)