import WordDetail from './components/WordDetail'
import WordList from './components/WordList'
import { isOpenDarkModeAtom } from '@/store'
import { getWordList } from '@/typings/functions'
import { useAtom } from 'jotai'
import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'

export default function WordPreviewPage() {
  const navigate = useNavigate()
  const [isOpenDarkMode] = useAtom(isOpenDarkModeAtom)

  const { dictionaryId } = useParams<{ dictionaryId: string }>()
  const [selectedWord, setSelectedWord] = useState<any>(null)

  const handleBackToGallery = () => {
    // 直接导航回画廊页面，而不是使用浏览器的回退功能
    navigate('/gallery')
  }

  const { words = [], dictionary } = getWordList(dictionaryId!) || {}

  useEffect(() => {
    // 如果没有选择单词且有单词列表，则默认选择第一个单词
    if (!selectedWord && words.length > 0) {
      setSelectedWord(words[0])
    }
  }, [words, selectedWord])

  const handleWordSelect = (word: any) => {
    setSelectedWord(word)
  }

  return (
    <div className={`min-h-screen ${!isOpenDarkMode ? 'bg-gray-50 text-gray-900' : 'bg-gray-900 text-gray-100'}`}>
      {/* 页面头部 */}
      <header className="sticky top-0 z-10">
        {/* 悬浮的返回按钮 */}
        <button
          onClick={handleBackToGallery}
          className={`absolute right-4 top-4 rounded-md px-4 py-2 text-white ${
            !isOpenDarkMode ? 'bg-indigo-300 shadow-sm hover:bg-indigo-200' : 'bg-indigo-700 bg-opacity-40 shadow-sm hover:bg-opacity-60'
          }`}
        >
          返回
        </button>
      </header>

      {/* 页面主体 */}
      <div className="min-h-[calc(100vh-env(safe-area-inset-bottom))]">
        <div className="flex min-h-[calc(100vh-env(safe-area-inset-bottom))]">
          {/* 左侧单词清单 */}
          <div className="h-[calc(100vh-env(safe-area-inset-bottom))] w-[25%] flex-shrink-0 md:min-w-[400px] lg:min-w-[400px] xl:min-w-[600px]">
            <div className="h-full">
              <WordList
                words={words}
                dictionary={dictionary}
                onWordClick={handleWordSelect}
                isActive={(word) => selectedWord?.name === word.name}
              />
            </div>
          </div>

          {/* 右侧单词详情 */}
          <div className="h-[calc(100vh-env(safe-area-inset-bottom))] flex-1 overflow-auto">
            <div className="p-6">
              {selectedWord ? (
                <WordDetail word={selectedWord} />
              ) : (
                <div className={`flex h-64 items-center justify-center ${!isOpenDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                  <p>请从左侧选择一个单词查看详情</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
