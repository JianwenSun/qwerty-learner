import type { WordTypingState } from '@/pages/Typing/WordTyping/store/type'
import {
  currentWordChapterIdAtom,
  currentWordDictionaryInfoAtom,
  isOpenDarkModeAtom,
  keySoundsConfigAtom,
  phoneticConfigAtom,
  pronunciationConfigAtom,
  randomConfigAtom,
} from '@/store'
import type { PronunciationType } from '@/typings'
import { useAtomValue } from 'jotai'
import mixpanel from 'mixpanel-browser'
import { useCallback } from 'react'

export type starAction = 'star' | 'dismiss'

export function recordStarAction(action: starAction) {
  const props = {
    action,
  }
  mixpanel.track('star', props)
}

export type openInfoPanelLocation = 'footer' | 'resultScreen'

export type shareType = 'open' | 'download'
export function recordShareAction(type: shareType) {
  mixpanel.track('share', { type })
}

export type analysisType = 'open'
export function recordAnalysisAction(type: analysisType) {
  const props = {
    type,
  }

  mixpanel.track('analysis', props)
}

export type errorBookType = 'open' | 'detail'
export function recordErrorBookAction(type: errorBookType) {
  const props = {
    type,
  }

  mixpanel.track('error-book', props)
}

export type donateCardInfo = {
  type: 'donate' | 'dismiss'
  chapterNumber: number
  wordNumber: number
  sumWrongCount: number
  dayFromFirstWord: number
  dayFromQwerty: number
  amount: number
}

export function reportDonateCard(info: donateCardInfo) {
  const props = {
    ...info,
  }

  mixpanel.track('donate-card', props)
}

/**
 * mixpanel 单词和章节统计事件
 */
export type ModeInfo = {
  modeDark: boolean
  modeShuffle: boolean

  enabledKeyboardSound: boolean
  enabledPhotonicsSymbol: boolean
  enabledSingleWordLoop: boolean

  pronunciationAuto: boolean
  pronunciationOption: PronunciationType | 'none'
}

export type WordLogUpload = ModeInfo & {
  headword: string
  timeStart: string
  timeEnd: string
  countInput: number
  countCorrect: number
  countTypo: number
  order: number
  chapter: string
  wordlist: string
}

export type ChapterLogUpload = ModeInfo & {
  chapter: string
  wordlist: string
  timeEnd: string
  duration: number
  countInput: number
  countCorrect: number
  countTypo: number
}

export function useMixPanelWordLogUploader(wordTypingState: WordTypingState) {
  const currentWordChapterId = useAtomValue(currentWordChapterIdAtom)
  const { name: dictName } = useAtomValue(currentWordDictionaryInfoAtom)
  const isDarkMode = useAtomValue(isOpenDarkModeAtom)
  const keySoundsConfig = useAtomValue(keySoundsConfigAtom)
  const phoneticConfig = useAtomValue(phoneticConfigAtom)
  const pronunciationConfig = useAtomValue(pronunciationConfigAtom)
  const randomConfig = useAtomValue(randomConfigAtom)

  const wordLogUploader = useCallback(
    (wordLog: { headword: string; timeStart: string; timeEnd: string; countInput: number; countCorrect: number; countTypo: number }) => {
      const props: WordLogUpload = {
        ...wordLog,
        order: wordTypingState.chapterData.index + 1,
        chapter: (currentWordChapterId!! + 1).toString(),
        wordlist: dictName,
        modeDark: isDarkMode,
        modeShuffle: randomConfig.isOpen,
        enabledKeyboardSound: keySoundsConfig.isOpen,
        enabledPhotonicsSymbol: phoneticConfig.isOpen,
        enabledSingleWordLoop: wordTypingState.isLoopSingleWord,
        pronunciationAuto: pronunciationConfig.isOpen,
        pronunciationOption: pronunciationConfig.isOpen === false ? 'none' : pronunciationConfig.type,
      }
      mixpanel.track('Word', props)
    },
    [
      wordTypingState,
      currentWordChapterId,
      dictName,
      isDarkMode,
      keySoundsConfig.isOpen,
      phoneticConfig.isOpen,
      pronunciationConfig.isOpen,
      pronunciationConfig.type,
      randomConfig.isOpen,
    ],
  )

  return wordLogUploader
}

export function useMixPanelChapterLogUploader(wordTypingState: WordTypingState) {
  const currentWordChapterId = useAtomValue(currentWordChapterIdAtom)
  const { name: dictName } = useAtomValue(currentWordDictionaryInfoAtom)
  const isDarkMode = useAtomValue(isOpenDarkModeAtom)
  const keySoundsConfig = useAtomValue(keySoundsConfigAtom)
  const phoneticConfig = useAtomValue(phoneticConfigAtom)
  const pronunciationConfig = useAtomValue(pronunciationConfigAtom)
  const randomConfig = useAtomValue(randomConfigAtom)

  const chapterLogUploader = useCallback(() => {
    const props: ChapterLogUpload = {
      timeEnd: getUtcStringForMixpanel(),
      duration: wordTypingState.timerData.time,
      countInput: wordTypingState.chapterData.correctCount + wordTypingState.chapterData.wrongCount,
      countTypo: wordTypingState.chapterData.wrongCount,
      countCorrect: wordTypingState.chapterData.correctCount,
      chapter: (currentWordChapterId!! + 1).toString(),
      wordlist: dictName,
      modeDark: isDarkMode,
      modeShuffle: randomConfig.isOpen,
      enabledKeyboardSound: keySoundsConfig.isOpen,
      enabledPhotonicsSymbol: phoneticConfig.isOpen,
      enabledSingleWordLoop: wordTypingState.isLoopSingleWord,
      pronunciationAuto: pronunciationConfig.isOpen,
      pronunciationOption: pronunciationConfig.isOpen === false ? 'none' : pronunciationConfig.type,
    }
    mixpanel.track('Chapter', props)
  }, [
    wordTypingState,
    currentWordChapterId,
    dictName,
    isDarkMode,
    keySoundsConfig.isOpen,
    phoneticConfig.isOpen,
    pronunciationConfig.isOpen,
    pronunciationConfig.type,
    randomConfig.isOpen,
  ])
  return chapterLogUploader
}

export function recordDataAction({
  type,
  size,
  wordCount,
  chapterCount,
}: {
  type: 'export' | 'import'
  size: number
  wordCount: number
  chapterCount: number
}) {
  const props = {
    type,
    size,
    wordCount,
    chapterCount,
  }

  mixpanel.track('dataAction', props)
}

export function getUtcStringForMixpanel() {
  const now = new Date()
  const isoString = now.toISOString()
  const utcString = isoString.substring(0, 19).replace('T', ' ')

  return utcString
}
