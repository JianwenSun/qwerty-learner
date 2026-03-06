import type { WordReviewRecord } from '@/utils/db/wordRecord'
import { putWordReviewRecord } from '@/utils/db/wordReviewRecord'
import { atom } from 'jotai'
import { atomWithStorage } from 'jotai/utils'

type WordReviewInfoAtom = {
  isReviewMode: boolean
  reviewRecord: WordReviewRecord | undefined
}

export function wordReviewInfoAtom(initialValue: WordReviewInfoAtom) {
  const storageAtom = atomWithStorage('wordReviewModeInfo', initialValue)

  return atom(
    (get) => {
      return get(storageAtom)
    },
    (get, set, updater: WordReviewInfoAtom | ((oldValue: WordReviewInfoAtom) => WordReviewInfoAtom)) => {
      const newValue = typeof updater === 'function' ? updater(get(storageAtom)) : updater

      // update reviewRecord to indexdb
      if (newValue.reviewRecord?.id) {
        putWordReviewRecord(newValue.reviewRecord)
      }
      set(storageAtom, newValue)
    },
  )
}
