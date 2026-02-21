import { pronunciationConfigAtom } from '@/store'
import type { PronunciationType } from '@/typings'
import { addHowlListener } from '@/utils'
import { romajiToHiragana } from '@/utils/kana'
import noop from '@/utils/noop'
import { Howl } from 'howler'
import { useAtomValue } from 'jotai'
import { useCallback, useEffect, useMemo, useState } from 'react'
import useSound from 'use-sound'
import type { HookOptions } from 'use-sound/dist/types'

const pronunciationApi = '/dictvoice?audio='
export function generateWordSoundSrc(word: string, pronunciation: Exclude<PronunciationType, false>): string {
  switch (pronunciation) {
    case 'uk':
      return `${pronunciationApi}${word}&type=1`
    case 'us':
      return `${pronunciationApi}${word}&type=2`
    default:
      return ''
  }
}

export default function usePronunciationSound(word: string, isLoop?: boolean) {
  const pronunciationConfig = useAtomValue(pronunciationConfigAtom)
  const url = generateWordSoundSrc(word, pronunciationConfig.type)

  return useUrlPronunciationSound(url)
  // const loop = useMemo(() => (typeof isLoop === 'boolean' ? isLoop : pronunciationConfig.isLoop), [isLoop, pronunciationConfig.isLoop])
  // const [isPlaying, setIsPlaying] = useState(false)

  // const [play, { stop, sound }] = useSound(generateWordSoundSrc(word, pronunciationConfig.type), {
  //   html5: true,
  //   format: ['mp3'],
  //   pool: 20, // 增加HTML5音频池大小，避免音频池耗尽的警告
  //   loop,
  //   volume: pronunciationConfig.volume,
  //   rate: pronunciationConfig.rate,
  // } as HookOptions)

  // useEffect(() => {
  //   if (!sound) return
  //   sound.loop(loop)
  //   return noop
  // }, [loop, sound])

  // useEffect(() => {
  //   if (!sound) return
  //   const unListens: Array<() => void> = []

  //   unListens.push(addHowlListener(sound, 'play', () => setIsPlaying(true)))
  //   unListens.push(addHowlListener(sound, 'end', () => setIsPlaying(false)))
  //   unListens.push(addHowlListener(sound, 'pause', () => setIsPlaying(false)))
  //   unListens.push(addHowlListener(sound, 'playerror', () => setIsPlaying(false)))

  //   return () => {
  //     setIsPlaying(false)
  //     unListens.forEach((unListen) => unListen())
  //       ; (sound as Howl).unload()
  //   }
  // }, [sound])

  // return { play, stop, isPlaying }
}

export function usePrefetchPronunciationSound(word: string | undefined) {
  const pronunciationConfig = useAtomValue(pronunciationConfigAtom)

  useEffect(() => {
    if (!word) return

    const soundUrl = generateWordSoundSrc(word, pronunciationConfig.type)
    if (soundUrl === '') return

    const head = document.head
    const isPrefetch = (Array.from(head.querySelectorAll('link[href]')) as HTMLLinkElement[]).some((el) => el.href === soundUrl)

    if (!isPrefetch) {
      const audio = new Audio()
      audio.src = soundUrl
      audio.preload = 'auto'

      // gpt 说这这两行能尽可能规避下载插件被触发问题。 本地测试不加也可以，考虑到别的插件可能有问题，所以加上保险
      audio.crossOrigin = 'anonymous'
      audio.style.display = 'none'

      head.appendChild(audio)

      return () => {
        head.removeChild(audio)
      }
    }
  }, [pronunciationConfig.type, word])
}

export function useUrlPronunciationSound(soundUrl: string | undefined) {
  const [howl, setHowl] = useState<Howl | null>(null)
  const [isSupported, setIsSupported] = useState<boolean | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)

  useEffect(() => {
    if (!soundUrl || soundUrl === '') {
      setHowl(null)
      setIsSupported(false)
      setIsPlaying(false)
      return
    }

    // 使用Howler库创建音频实例
    const sound = new Howl({
      src: [soundUrl],
      html5: true, // 强制使用HTML5 Audio，更好地支持不同格式
      format: ['aac', 'mp4'], // 指定支持的格式
      pool: 20, // 增加HTML5音频池大小，避免音频池耗尽的警告
      onload: () => {
        setIsSupported(true)
      },
      onloaderror: (id, error) => {
        console.error('Howler loading error:', error)
        console.error('Audio URL:', soundUrl)
        setIsSupported(false)
      },
      onplay: () => {
        setIsPlaying(true)
      },
      onend: () => {
        setIsPlaying(false)
      },
      onpause: () => {
        setIsPlaying(false)
      },
      onplayerror: (id: number, error: unknown) => {
        console.error('Howler playback error:', error)
        console.error('Audio URL:', soundUrl)
        setIsPlaying(false)
      }
    })

    setHowl(sound)
    if (howl) {
      console.log('useUrlPronunciationSound 播放:', soundUrl)
    }

    // 清理函数
    return () => {
      sound.unload()
      setHowl(null)
      setIsSupported(null)
      setIsPlaying(false)
    }
  }, [soundUrl])

  const play = useCallback(() => {
    if (!soundUrl || !howl) {
      console.warn('No sound URL or Howl instance available')
      return
    }

    try {
      if (isSupported !== false) {
        howl.play()
      } else {
        console.warn('Audio format not supported:', soundUrl)
      }
    } catch (error) {
      console.error('Error playing audio with Howler, url:', soundUrl, error)
    }
  }, [soundUrl, howl, isSupported])

  const stop = useCallback(() => {
    if (howl) {
      try {
        howl.stop()
      } catch (error) {
        console.error('Error stopping audio with Howler, url:', soundUrl, error)
      }
    }
  }, [howl, soundUrl])

  return { play, stop, isSupported, isPlaying }
}
