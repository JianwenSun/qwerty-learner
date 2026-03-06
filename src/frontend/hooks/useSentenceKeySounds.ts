import { SOUND_URL_PREFIX } from '@/resources/soundResource'
import { hintSentenceSoundsConfigAtom, keySoundsConfigAtom } from '@/store'
import noop from '@/utils/noop'
import { useAtomValue } from 'jotai'
import useSound from 'use-sound'

export type PlayFunction = ReturnType<typeof useSound>[0]

export default function useSentenceKeySound(): [PlayFunction, PlayFunction, PlayFunction] {
  const { isOpen: isKeyOpen, isOpenClickSound, volume: keyVolume } = useAtomValue(keySoundsConfigAtom)
  const {
    isOpen: isHintOpen,
    isOpenWrongSound,
    isOpenCorrectSound,
    volume: hintVolume,
    clickResource: sentenceClickResource,
    wrongResource: sentenceWrongResource,
    correctResource: sentenceCorrectResource,
  } = useAtomValue(hintSentenceSoundsConfigAtom)

  const [playClickSound] = useSound(`${SOUND_URL_PREFIX}${sentenceClickResource.filename}`, {
    volume: keyVolume,
    interrupt: true,
  })
  const [playWrongSound] = useSound(`${SOUND_URL_PREFIX}${sentenceWrongResource.filename}`, {
    volume: hintVolume,
    interrupt: true,
  })
  const [playCorrectSound] = useSound(`${SOUND_URL_PREFIX}${sentenceCorrectResource.filename}`, {
    volume: hintVolume,
    interrupt: true,
  })

  return [
    isKeyOpen && isOpenClickSound ? playClickSound : noop,
    isHintOpen && isOpenWrongSound ? playWrongSound : noop,
    isHintOpen && isOpenCorrectSound ? playCorrectSound : noop,
  ]
}
