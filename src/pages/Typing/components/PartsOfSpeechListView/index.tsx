import PartsOfSpeechView from '../PartsOfSpeechView'
import { Word, type Pos } from '@/typings'

export type PartsOfSpeechListViewProps = {
  word: Word
}

function PartsOfSpeechListView({ word }: PartsOfSpeechListViewProps) {
  // 防御性编程：确保 word.pos 存在且是数组
  if (!word || !word.pos || !Array.isArray(word.pos) || word.pos.length === 0) {
    return null
  }

  return (
    <div className="flex flex-col space-y-2 px-5 py-2">
      {word.pos.map((pos, index) => (
        <div key={pos.type || index} className="text-xs">
          <PartsOfSpeechView pos={pos} />
        </div>
      ))}
    </div>
  )
}

export default PartsOfSpeechListView
