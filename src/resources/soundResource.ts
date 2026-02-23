import type { PronunciationConfig, SoundResource } from '@/typings'

export const SOUND_URL_PREFIX = REACT_APP_DEPLOY_ENV === 'pages' ? '/qwerty-learner/sounds/' : './sounds/'
export const KEY_SOUND_URL_PREFIX = SOUND_URL_PREFIX + 'key-sound/'

// will add more sound resource and add config ui in the future
const videoList = import.meta.glob(['../../public/sounds/key-sound/*.(wav|mp3)'], {
  eager: false,
})

/**
 * the Mechanical keyboard sound from https://github.com/tplai/kbsim
 */
export const keySoundResources: SoundResource[] = Object.keys(videoList)
  .map((k) => {
    const name = k.replace(/(.*\/)*([^.]+).*/gi, '$2')
    const suffix = k.substring(k.lastIndexOf('.'))
    return {
      key: name,
      name: `${name}`,
      filename: `${name}${suffix}`,
    }
  })
  .sort((a, b) => {
    // default key should be the first one
    if (a.key === 'Default') {
      return -1
    }
    if (b.key === 'Default') {
      return 1
    }

    return a.key.localeCompare(b.key)
  })

export const wrongSoundResources: SoundResource[] = [{ key: '1', name: '声音1', filename: 'beep.wav' }]
export const correctSoundResources: SoundResource[] = [{ key: '1', name: '声音1', filename: 'correct.wav' }]


export const sentenceClickSoundResources: SoundResource[] = [{ key: '1', name: '句子点击声音1', filename: 'sentence-click.mp3' }]
export const sentenceWrongSoundResources: SoundResource[] = [{ key: '1', name: '句子错误声音1', filename: 'sentence-beep.mp3' }]
export const sentenceCorrectSoundResources: SoundResource[] = [{ key: '1', name: '句子正确声音1', filename: 'sentence-correct.mp3' }]


export const DEFAULT_PRONUNCIATION_MALE = '(男)'
export const DEFAULT_PRONUNCIATION_FEMALE = '(女)'

export const pronunciationList: PronunciationConfig[] = [
  {
    name: '美音' + DEFAULT_PRONUNCIATION_MALE,
    pron: 'us',
    human: 'male',
  },
  {
    name: '美音' + DEFAULT_PRONUNCIATION_FEMALE,
    pron: 'us',
    human: 'female',
  },
  {
    name: '英音' + DEFAULT_PRONUNCIATION_MALE,
    pron: 'uk',
    human: 'male',
  },
  {
    name: '英音' + DEFAULT_PRONUNCIATION_FEMALE,
    pron: 'uk',
    human: 'female',
  },
]
