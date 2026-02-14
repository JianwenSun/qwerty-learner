import { UrlPronunciationIcon } from '@/components/UrlPronunciationIcon'
import type { UrlPronunciationIconRef } from '@/components/UrlPronunciationIcon'
import { Vocabulary } from '@/models/shanbei'
import { getVocabWork } from '@/storage/shanbeiStroageApi'
import { useState, useEffect, useRef } from 'react'

interface WordDetailPopupProps {
  selectedWord: string | null
  isVisible: boolean
  onClose: () => void
}

export default function WordDetailPopup({ selectedWord, isVisible, onClose }: WordDetailPopupProps) {
  const detailViewRef = useRef<HTMLDivElement>(null)
  const urlPronunciationIconRef = useRef<UrlPronunciationIconRef>(null)
  const [vocabulary, setVocabulary] = useState<Vocabulary | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [selectedPronunciation, setSelectedPronunciation] = useState<'us' | 'uk'>('us') // 默认选择美音

  // 查询单词详情
  useEffect(() => {
    if (!isVisible || !selectedWord) {
      setVocabulary(null)
      setLoading(false)
      setError(null)
      return
    }

    const fetchWordDetail = async () => {
      setLoading(true)
      setError(null)
      try {
        const vocabulary = await getVocabWork(selectedWord)
        setVocabulary(vocabulary)
      } catch (err) {
        setError('查询单词详情失败，请稍后重试')
        console.error('Error fetching word detail:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchWordDetail()
  }, [selectedWord, isVisible])

  // 处理点击非视图部分自动关闭
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (detailViewRef.current && !detailViewRef.current.contains(event.target as Node)) {
        onClose()
      }
    }

    if (isVisible) {
      document.addEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isVisible, onClose])

  // 当单词详情加载完成后自动播放发音
  useEffect(() => {
    if (vocabulary && vocabulary.sound) {
      // 使用 setTimeout 确保组件已经渲染完成
      setTimeout(() => {
        urlPronunciationIconRef.current?.play()
      }, 100)
    }
  }, [vocabulary, selectedPronunciation])

  // 播放发音
  const playPronunciation = () => {
    if (!vocabulary || !vocabulary.sound) return

    const soundUrl = selectedPronunciation === 'us' ? vocabulary.sound.audio_us_urls?.[0] : vocabulary.sound.audio_uk_urls?.[0]

    if (soundUrl) {
      const audio = new Audio(soundUrl)
      audio.play().catch((err) => console.error('Error playing audio:', err))
    }
  }

  if (!isVisible || !selectedWord) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div
        ref={detailViewRef}
        className="max-h-3/4 relative min-h-[300px] w-11/12 max-w-lg rounded-lg bg-white p-6 shadow-xl dark:bg-gray-800"
      >
        <div className="mb-4">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white">单词解释</h3>
        </div>
        <div className="text-lg font-medium text-gray-900 dark:text-white">{selectedWord}</div>
        <div className="mt-4 text-gray-700 dark:text-gray-200">
          {loading ? (
            <p>加载中...</p>
          ) : error ? (
            <p className="text-red-500 dark:text-red-400">{error}</p>
          ) : vocabulary ? (
            <div className="space-y-4">
              {/* 展示音标和发音选择 */}
              {vocabulary.sound && (
                <div className="flex items-center space-x-4">
                  {/* 发音选择按钮 */}
                  <div className="flex space-x-2">
                    <button
                      className={`rounded-lg px-3 py-1.5 text-sm font-medium ${
                        selectedPronunciation === 'uk'
                          ? 'bg-blue-500 text-white dark:bg-blue-600 dark:text-white'
                          : 'bg-gray-200 text-gray-800 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600'
                      }`}
                      onClick={() => setSelectedPronunciation('uk')}
                    >
                      英音
                    </button>
                    <button
                      className={`rounded-lg px-3 py-1.5 text-sm font-medium ${
                        selectedPronunciation === 'us'
                          ? 'bg-blue-500 text-white dark:bg-blue-600 dark:text-white'
                          : 'bg-gray-200 text-gray-800 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600'
                      }`}
                      onClick={() => setSelectedPronunciation('us')}
                    >
                      美音
                    </button>
                  </div>

                  {/* 展示对应音标的音标 */}
                  <div className="flex-1 text-gray-600 dark:text-gray-300">
                    {selectedPronunciation === 'uk' ? 'UK: ' : 'US: '}
                    {selectedPronunciation === 'uk' ? vocabulary.sound.ipa_uk : vocabulary.sound.ipa_us}
                  </div>

                  {/* 发音图标 */}
                  <UrlPronunciationIcon
                    url={selectedPronunciation === 'us' ? vocabulary.sound.audio_us_urls?.[0] : vocabulary.sound.audio_uk_urls?.[0]}
                    className="h-8 w-8"
                    ref={urlPronunciationIconRef}
                  />
                </div>
              )}

              {/* 展示 senses 中的不同 pos 以及对应的含义 */}
              {vocabulary.senses && vocabulary.senses.length > 0 ? (
                vocabulary.senses.map((sense, index) => (
                  <div key={index} className="flex items-start space-x-2">
                    <div className="font-medium text-gray-800 dark:text-gray-200">{sense.pos}</div>
                    <div className="flex-1 text-gray-700 dark:text-gray-300">{sense.definition_cn}</div>
                  </div>
                ))
              ) : (
                <p>暂无定义数据</p>
              )}
            </div>
          ) : (
            <p>暂无解释数据</p>
          )}
        </div>
      </div>
    </div>
  )
}
