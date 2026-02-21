import Tooltip from '@/components/Tooltip'
import { Link, useLocation } from 'react-router-dom'

const PracticeModeSwitcher = () => {
  const location = useLocation()
  const isWordTyping = location.pathname.startsWith('/word-typing')
  const isSentenceTyping = location.pathname.startsWith('/sentence-typing')

  return (
    <div className="flex space-x-2">
      <Tooltip content="单词练习">
        <Link
          to="/word-typing"
          className={`rounded-md px-3 py-1 text-sm font-medium transition-colors duration-300 ${
            isWordTyping
              ? 'bg-indigo-500 text-white'
              : 'bg-gray-200 text-gray-800 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600'
          }`}
        >
          单词
        </Link>
      </Tooltip>
      <Tooltip content="句子练习">
        <Link
          to="/sentence-typing"
          className={`rounded-md px-3 py-1 text-sm font-medium transition-colors duration-300 ${
            isSentenceTyping
              ? 'bg-indigo-500 text-white'
              : 'bg-gray-200 text-gray-800 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600'
          }`}
        >
          句子
        </Link>
      </Tooltip>
    </div>
  )
}

export default PracticeModeSwitcher
