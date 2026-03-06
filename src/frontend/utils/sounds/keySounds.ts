import { KEY_SOUND_URL_PREFIX } from '@/resources/soundResource'
import type { SoundResource } from '@/typings'
import { Howl, Howler } from 'howler'

// 缓存音频对象，避免频繁创建新实例
const soundCache = new Map<string, Howl>()

export function playKeySoundResource(soundResource: SoundResource) {
  const path = KEY_SOUND_URL_PREFIX + soundResource.filename

  // 检查缓存中是否已有音频对象
  if (!soundCache.has(path)) {
    const sound = new Howl({
      src: path,
      format: ['wav'],
      pool: 20, // 增加HTML5音频池大小，避免音频池耗尽的警告
    })
    soundCache.set(path, sound)
  }

  // 从缓存中获取音频对象并播放
  const sound = soundCache.get(path)!
  Howler.volume(1)
  sound.play()
}
