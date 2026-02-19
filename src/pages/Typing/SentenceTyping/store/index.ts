import { Sentence } from "@/typings";
import shuffle from "@/utils/shuffle";
import { createContext } from "react";
import { SentenceTypingState } from "./type";


export const initialSentenceTypingState: SentenceTypingState = {
    chapterData: {
        sentences: [],
        index: 0,
        inputCount: 0,
        correctCount: 0,
        wrongCount: 0,
        sentenceRecordIds: [],
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
            if (newIndex >= state.chapterData.sentences.length) {
                console.log('Setting isTyping to false (SKIP_SENTENCE_INDEX)')
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
        default: {
            return state
        }
    }
}

export const SentenceTypingContext = createContext<{ state: SentenceTypingState; dispatch: SentenceDispatch } | null>(null)