import { SoundIcon } from './SoundIcon'
import { useUrlPronunciationSound } from '@/hooks/usePronunciation'
import { phoneticConfigAtom } from '@/store'
import type { Word } from '@/typings'
import { useAtomValue } from 'jotai'
import { useCallback, useEffect, useImperativeHandle } from 'react'
import React from 'react'

type Props = {
  word: Word
  className?: string
  iconClassName?: string
}

export const WordPronunciationIcon = React.forwardRef<WordPronunciationIconRef, Props>(({ word, className, iconClassName }, ref) => {
  const phoneticConfig = useAtomValue(phoneticConfigAtom)
  const { play, stop, isPlaying } = useUrlPronunciationSound(phoneticConfig.type === 'us' ? word.sound.us_url : word.sound.uk_url)

  const playSound = useCallback(() => {
    // 打印播放音频的日志
    console.log(`[${new Date().toISOString()}] [WordPronunciationIcon/index.tsx] 开始播放音频`)
    stop()
    play()
  }, [play, stop])

  useEffect(() => {
    return stop
  }, [word, stop])

  useImperativeHandle(
    ref,
    () => ({
      play: playSound,
    }),
    [playSound],
  )

  return (
    <SoundIcon
      animated={isPlaying}
      onClick={playSound}
      className={`cursor-pointer text-gray-600 ${className}`}
      iconClassName={iconClassName}
    />
  )
})

WordPronunciationIcon.displayName = 'WordPronunciationIcon'

export type WordPronunciationIconRef = {
  play: () => void
}
