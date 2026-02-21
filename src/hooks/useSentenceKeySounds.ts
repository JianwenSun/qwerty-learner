import { KEY_SOUND_URL_PREFIX, SOUND_URL_PREFIX, keySoundResources } from '@/resources/soundResource'
import { hintSentenceSoundsConfigAtom, keySoundsConfigAtom } from '@/store'
import noop from '@/utils/noop'
import { useAtomValue, useSetAtom } from 'jotai'
import { useEffect, useState } from 'react'
import useSound from 'use-sound'

export type PlayFunction = ReturnType<typeof useSound>[0]

export default function useSentenceKeySound(): [PlayFunction, PlayFunction, PlayFunction] {
  const { isOpen: isKeyOpen, isOpenClickSound, volume: keyVolume, resource: keyResource } = useAtomValue(keySoundsConfigAtom)
  const setKeySoundsConfig = useSetAtom(keySoundsConfigAtom)
  const {
    isOpen: isHintOpen,
    isOpenWrongSound,
    isOpenCorrectSound,
    volume: hintVolume,
    wrongResource: sentenceWrongResource,
    correctResource: sentenceCorrectResource,
  } = useAtomValue(hintSentenceSoundsConfigAtom)

  const [keySoundUrl, setKeySoundUrl] = useState(`${KEY_SOUND_URL_PREFIX}${keyResource.filename}`)

  useEffect(() => {
    if (!keySoundResources.some((item) => item.filename === keyResource.filename && item.key === keyResource.key)) {
      const defaultKeySoundResource = keySoundResources.find((item) => item.key === 'Default') || keySoundResources[0]

      setKeySoundUrl(`${KEY_SOUND_URL_PREFIX}${defaultKeySoundResource.filename}`)
      setKeySoundsConfig((prev) => ({ ...prev, resource: defaultKeySoundResource }))
    }
  }, [keyResource, setKeySoundsConfig])

  const [playClickSound] = useSound(keySoundUrl, {
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
