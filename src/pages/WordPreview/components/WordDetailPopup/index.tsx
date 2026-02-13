import { getWordDetail } from '@/api/sbApi'
import { WordDetail } from '@/models/shanbei'
import { useState, useEffect, useRef } from 'react'

interface WordDetailPopupProps {
  selectedWord: string | null
  isVisible: boolean
  onClose: () => void
}

export default function WordDetailPopup({ selectedWord, isVisible, onClose }: WordDetailPopupProps) {
  const detailViewRef = useRef<HTMLDivElement>(null)
  const [wordDetail, setWordDetail] = useState<WordDetail | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // 查询单词详情
  useEffect(() => {
    if (!isVisible || !selectedWord) {
      setWordDetail(null)
      setLoading(false)
      setError(null)
      return
    }

    const fetchWordDetail = async () => {
      setLoading(true)
      setError(null)
      try {
        const wordDetail = await getWordDetail(selectedWord)
        setWordDetail(wordDetail)
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

  if (!isVisible || !selectedWord) return null

  return (
    <div
      ref={detailViewRef}
      className="absolute bottom-0 left-0 right-0 z-10 border-t border-gray-200 bg-white p-4 shadow-lg dark:border-gray-700 dark:bg-gray-900"
    >
      <div className="mb-2 flex items-center justify-between">
        <h3 className="text-xl font-semibold">单词解释</h3>
        <button className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200" onClick={onClose}>
          ×
        </button>
      </div>
      <div className="text-lg font-medium">{selectedWord}</div>
      <div className="mt-2 text-gray-600 dark:text-gray-400">
        {loading ? (
          <p>加载中...</p>
        ) : error ? (
          <p className="text-red-500 dark:text-red-400">{error}</p>
        ) : wordDetail ? (
          <div className="space-y-3">
            {/* 展示音标 */}
            {wordDetail.audios && wordDetail.audios.length > 0 && (
              <div className="flex items-center space-x-4">
                {wordDetail.audios[0].uk && wordDetail.audios[0].uk.ipa && (
                  <div className="text-gray-500 dark:text-gray-400">UK: {wordDetail.audios[0].uk.ipa}</div>
                )}
                {wordDetail.audios[0].us && wordDetail.audios[0].us.ipa && (
                  <div className="text-gray-500 dark:text-gray-400">US: {wordDetail.audios[0].us.ipa}</div>
                )}
              </div>
            )}

            {/* 展示中文定义 */}
            {wordDetail.definitions && wordDetail.definitions.cn && wordDetail.definitions.cn.length > 0 ? (
              wordDetail.definitions.cn.map((definition, index) => (
                <div key={index} className="space-y-1">
                  <div className="font-medium text-gray-700 dark:text-gray-300">{definition.pos}</div>
                  <div className="mt-1">{definition.def}</div>
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
  )
}
