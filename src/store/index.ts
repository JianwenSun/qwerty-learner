import atomForConfig from './atomForConfig'
import { wordReviewInfoAtom } from './wordReviewInfoAtom'
import { DISMISS_START_CARD_DATE_KEY, defaultFontSizeConfig } from '@/constants'
import { wordDictionaryMap, sentenceDictionaryMap } from '@/resources/dictionary'
import { correctSoundResources, keySoundResources, wrongSoundResources } from '@/resources/soundResource'
import type {
  WordDictionary,
  LoopWordTimesOption,
  PhoneticType,
  PronunciationType,
  WordDictationOpenBy,
  WordDictationType,
  LoopSentenceTimesOption,
  SentenceDictionary,
} from '@/typings'
import type { WordReviewRecord } from '@/utils/db/wordRecord'
import { atom } from 'jotai'
import { atomWithStorage } from 'jotai/utils'
import { sentenceReviewInfoAtom } from './sentenceReviewInfoAtom'
import { SentenceReviewRecord } from '@/utils/db/sentenceRecord'

export const currentWordDictionaryIdAtom = atomWithStorage('currentWordDictionaryId', undefined as string | undefined)
export const currentWordDictionaryInfoAtom = atom<WordDictionary>((get) => {
  const id = get(currentWordDictionaryIdAtom)
  if (!id) {
    return Object.values(wordDictionaryMap)[0]
  }
  return wordDictionaryMap[id]
})

export const currentWordChapterAtom = atomWithStorage('currentWordChapter', undefined as number | undefined)

export const loopWordConfigAtom = atomForConfig<{ times: LoopWordTimesOption }>('loopWordConfig', {
  times: 1,
})

export const sentenceReviewModeInfoAtom = sentenceReviewInfoAtom({
  isReviewMode: false,
  reviewRecord: undefined as SentenceReviewRecord | undefined,
})


export const currentSentenceDictionaryIdAtom = atomWithStorage('currentSentenceDictionaryId', undefined as string | undefined)
export const currentSentenceChapterIdAtom = atomWithStorage('currentSentenceChapter', undefined as number | undefined)

export const currentSentenceDictionaryInfoAtom = atom<SentenceDictionary>((get) => {
  const id = get(currentSentenceDictionaryIdAtom)
  if (!id) {
    return Object.values(sentenceDictionaryMap)[0]
  }
  return sentenceDictionaryMap[id]
})

export const currentSentenceChapterAtom = atomWithStorage('currentSentenceChapter', undefined as number | undefined)

export const loopSentenceConfigAtom = atomForConfig<{ times: LoopSentenceTimesOption }>('loopSentenceConfig', {
  times: 1,
})


export const keySoundsConfigAtom = atomForConfig('keySoundsConfig', {
  isOpen: true,
  isOpenClickSound: true,
  volume: 1,
  resource: keySoundResources[0],
})

export const hintSoundsConfigAtom = atomForConfig('hintSoundsConfig', {
  isOpen: true,
  volume: 1,
  isOpenWrongSound: true,
  isOpenCorrectSound: true,
  wrongResource: wrongSoundResources[0],
  correctResource: correctSoundResources[0],
})

export const pronunciationConfigAtom = atomForConfig('pronunciation', {
  isOpen: true,
  volume: 1,
  type: 'us' as PronunciationType,
  name: '美音',
  isLoop: false,
  isTransRead: false,
  transVolume: 1,
  rate: 1,
})

export const fontSizeConfigAtom = atomForConfig('fontsize', defaultFontSizeConfig)

export const pronunciationIsOpenAtom = atom((get) => get(pronunciationConfigAtom).isOpen)

export const pronunciationIsTransReadAtom = atom((get) => get(pronunciationConfigAtom).isTransRead)

export const randomConfigAtom = atomForConfig('randomConfig', {
  isOpen: false,
})

export const isShowPrevAndNextWordAtom = atomWithStorage('isShowPrevAndNextWord', true)

export const isIgnoreCaseAtom = atomWithStorage('isIgnoreCase', true)

export const isShowAnswerOnHoverAtom = atomWithStorage('isShowAnswerOnHover', true)

export const isTextSelectableAtom = atomWithStorage('isTextSelectable', false)

export const wordReviewModeInfoAtom = wordReviewInfoAtom({
  isReviewMode: false,
  reviewRecord: undefined as WordReviewRecord | undefined,
})

export const isReviewModeAtom = atom((get) => get(wordReviewModeInfoAtom).isReviewMode)

export const phoneticConfigAtom = atomForConfig('phoneticConfig', {
  isOpen: true,
  type: 'us' as PhoneticType,
})

export const isOpenDarkModeAtom = atomWithStorage('isOpenDarkModeAtom', window.matchMedia('(prefers-color-scheme: dark)').matches)

export const isShowSkipAtom = atom(false)

export const isInDevModeAtom = atom(false)

export const wordDictationConfigAtom = atomForConfig('wordDictationConfig', {
  isOpen: false,
  type: 'hideAll' as WordDictationType,
  openBy: 'auto' as WordDictationOpenBy,
})

export const dismissStartCardDateAtom = atomWithStorage<Date | null>(DISMISS_START_CARD_DATE_KEY, null)

// Enhanced version promotion popup state
export const hasSeenEnhancedPromotionAtom = atomWithStorage('hasSeenEnhancedPromotion', false)

// for dev test
//   dismissStartCardDateAtom = atom<Date | null>(new Date())

// Authentication state
export const isAuthenticatedAtom = atomWithStorage('isAuthenticated', false)
export const userInfoAtom = atomWithStorage('userInfo', null)
