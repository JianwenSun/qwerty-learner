import { SentenceReviewRecord } from '@/utils/db/sentenceRecord'
import { putSentenceReviewRecord } from '@/utils/db/sentenceReviewRecord'
import { atom } from 'jotai'
import { atomWithStorage } from 'jotai/utils'

type SentenceReviewInfoAtom = {
  isReviewMode: boolean
  reviewRecord: SentenceReviewRecord | undefined
}

export function sentenceReviewInfoAtom(initialValue: SentenceReviewInfoAtom) {
  const storageAtom = atomWithStorage('sentenceReviewModeInfo', initialValue)

  return atom(
    (get) => {
      return get(storageAtom)
    },
    (get, set, updater: SentenceReviewInfoAtom | ((oldValue: SentenceReviewInfoAtom) => SentenceReviewInfoAtom)) => {
      const newValue = typeof updater === 'function' ? updater(get(storageAtom)) : updater

      // update reviewRecord to indexdb
      if (newValue.reviewRecord?.id) {
        putSentenceReviewRecord(newValue.reviewRecord)
      }
      set(storageAtom, newValue)
    },
  )
}
