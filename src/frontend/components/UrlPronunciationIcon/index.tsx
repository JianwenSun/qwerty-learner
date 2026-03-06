import { SoundIcon } from './SoundIcon'
import { useUrlPronunciationSound } from '@/hooks/usePronunciation'
import { useCallback, useEffect, useImperativeHandle } from 'react'
import React from 'react'

type Props = {
  url?: string
  className?: string
  iconClassName?: string
}

export const UrlPronunciationIcon = React.forwardRef<UrlPronunciationIconRef, Props>(({ url, className, iconClassName }, ref) => {
  const { play, stop, isSupported } = useUrlPronunciationSound(url)

  const playSound = useCallback(() => {
    stop()
    play()
  }, [play, stop])

  useEffect(() => {
    return stop
  }, [stop])

  useImperativeHandle(
    ref,
    () => ({
      play: playSound,
    }),
    [playSound],
  )

  // 当音频格式不支持时，显示禁用状态
  const isDisabled = isSupported === false

  return (
    <SoundIcon
      onClick={playSound}
      className={`cursor-pointer text-gray-600 ${isDisabled ? 'cursor-not-allowed opacity-50' : ''} ${className}`}
      iconClassName={iconClassName}
    />
  )
})

UrlPronunciationIcon.displayName = 'UrlPronunciationIcon'

export type UrlPronunciationIconRef = {
  play: () => void
}
