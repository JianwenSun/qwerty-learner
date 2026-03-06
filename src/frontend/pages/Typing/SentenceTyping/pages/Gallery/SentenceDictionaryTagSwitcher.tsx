import { useCallback } from 'react'

type Props = {
  tagList: string[]
  currentTag: string
  onChangeCurrentTag: (tag: string) => void
}

export default function SentenceDictionaryTagSwitcher({ tagList, currentTag, onChangeCurrentTag }: Props) {
  const onChangeTag = useCallback(
    (tag: string) => {
      onChangeCurrentTag(tag)
    },
    [onChangeCurrentTag],
  )

  return (
    <div className="flex flex-wrap gap-2">
      {tagList.map((option) => (
        <button
          key={option}
          type="button"
          onClick={() => onChangeTag(option)}
          className={`flex min-h-[36px] cursor-pointer items-center justify-center whitespace-nowrap rounded-[3rem] px-4 py-2 ${
            currentTag === option ? 'bg-indigo-400 text-white' : 'bg-white text-gray-600 dark:bg-gray-800 dark:text-gray-200'
          } ${currentTag !== option && 'hover:bg-indigo-100 dark:hover:bg-gray-600'}`}
        >
          <span>{option}</span>
        </button>
      ))}
    </div>
  )
}
