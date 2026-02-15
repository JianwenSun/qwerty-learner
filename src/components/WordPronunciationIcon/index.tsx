import { SoundIcon } from './SoundIcon'
import usePronunciationSound from '@/hooks/usePronunciation'
import type { Word } from '@/typings'
import { useCallback, useEffect, useImperativeHandle } from 'react'
import React from 'react'

type Props = {
  word: Word
  className?: string
  iconClassName?: string
}

export const WordPronunciationIcon = React.forwardRef<WordPronunciationIconRef, Props>(({ word, className, iconClassName }, ref) => {
  const currentWord = () => {
    return word.name
  }

  const { play, stop, isPlaying } = usePronunciationSound(currentWord())

  const playSound = useCallback(() => {
    // 打印播放音频的日志
    console.log(`[${new Date().toISOString()}] [WordPronunciationIcon/index.tsx] 开始播放音频`)
    stop()
    play()
    // 在播放音频后，确保窗口保持焦点，以解决 iPad 上键盘输入无响应的问题
    setTimeout(() => {
      console.log(`[${new Date().toISOString()}] [WordPronunciationIcon/index.tsx] 音频播放完成`)
      //window.focus()
    }, 1000)
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
