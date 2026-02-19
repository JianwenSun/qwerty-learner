import { Sentence } from "@/typings";


export type SentenceChapterData = {
    // warning: 因为有章节内随机的存在，所有记录 index 的场景都应该使用 WordWithIndex.index
    sentences: Sentence[]
    // chapter index
    index: number
    // 输入的单词数
    inputCount: number
    // 输入正确的单词数
    correctCount: number
    // 输入错误的单词数
    wrongCount: number
    // 本章节用户输入的单词的 record id 列表
    sentenceRecordIds: string[]
}

export type TimerData = {
    time: number
    accuracy: number
    wpm: number
}


export type SentenceTypingState = {
    chapterData: SentenceChapterData,
    timerData: TimerData,
    isTyping: boolean,
    isFinished: boolean,
    isTransVisible: boolean,
    isShowSkip: boolean
}